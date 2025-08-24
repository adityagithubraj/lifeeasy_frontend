import { env } from '@/config/env';

// Free translation service using LibreTranslate
export interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: {
    confidence: number;
    language: string;
  };
}

export interface TranslationCache {
  [key: string]: {
    text: string;
    timestamp: number;
    expiresAt: number;
  };
}

export class LibreTranslationService {
  private static readonly CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days
  
  // Google Translate API (Premium - requires API key)
  private static readonly GOOGLE_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';
  private static readonly GOOGLE_API_KEY = env.GOOGLE_TRANSLATE_API_KEY;
  
  // Multiple free translation APIs for reliability
  private static readonly TRANSLATION_APIS = [
    {
      name: 'LibreTranslate',
      url: 'https://libretranslate.com/translate',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: (text: string, targetLang: string, sourceLang: string) => ({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'html'
      })
    },
    {
      name: 'MyMemory',
      url: 'https://api.mymemory.translated.net/get',
      method: 'GET',
      headers: {},
      body: (text: string, targetLang: string, sourceLang: string) => ({
        q: text,
        langpair: `${sourceLang}|${targetLang}`
      })
    },
    {
      name: 'LingvaTranslate',
      url: 'https://lingva.ml/api/v1/auto/en',
      method: 'GET',
      headers: {},
      body: (text: string, targetLang: string, sourceLang: string) => ({
        q: text
      })
    },
    {
      name: 'TranslateAPI',
      url: 'https://translate.argosopentech.com/translate',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: (text: string, targetLang: string, sourceLang: string) => ({
        q: text,
        source: sourceLang,
        target: targetLang
      })
    }
  ];
  
  // Map our language codes to API language codes
  private static readonly LANGUAGE_MAP: { [key: string]: string } = {
    'ko': 'ko',
    'zh': 'zh',
    'en': 'en'
  };
  
  // Cache translations in localStorage
  private static getCacheKey(text: string, targetLang: string): string {
    return `translation_${targetLang}_${this.hashString(text)}`;
  }
  
  private static hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }
  
  private static getCachedTranslation(cacheKey: string): string | null {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return null;
      
      const cacheData: TranslationCache[string] = JSON.parse(cached);
      
      // Check if cache is expired
      if (Date.now() > cacheData.expiresAt) {
        localStorage.removeItem(cacheKey);
        return null;
      }
      
      return cacheData.text;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  }
  
  private static setCachedTranslation(cacheKey: string, translatedText: string): void {
    try {
      const cacheData: TranslationCache[string] = {
        text: translatedText,
        timestamp: Date.now(),
        expiresAt: Date.now() + this.CACHE_DURATION
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }
  
  static async translateText(
    text: string, 
    targetLanguage: string, 
    sourceLanguage: string = 'auto'
  ): Promise<string> {
    // Don't translate if target is English
    if (targetLanguage === 'en') {
      return text;
    }
    
    // Validate and map language code
    const apiTargetLang = this.LANGUAGE_MAP[targetLanguage];
    if (!apiTargetLang) {
      console.error(`Unsupported target language: ${targetLanguage}`);
      return text;
    }
    
    // Check cache first
    const cacheKey = this.getCacheKey(text, targetLanguage);
    const cached = this.getCachedTranslation(cacheKey);
    if (cached) {
      console.log('Translation served from cache');
      return cached;
    }
    
    try {
      console.log(`Translating to ${targetLanguage} (${apiTargetLang})...`);
      
      // Try Google Translate first if API key is available (Premium option)
      if (this.GOOGLE_API_KEY) {
        try {
          console.log('Trying Google Translate (Premium)...');
          const googleResult = await this.tryGoogleTranslate(text, apiTargetLang, sourceLanguage);
          if (googleResult && googleResult !== text) {
            this.setCachedTranslation(cacheKey, googleResult);
            console.log('Translation completed successfully via Google Translate');
            return googleResult;
          }
        } catch (error) {
          console.warn('Google Translate failed, falling back to free APIs:', error);
        }
      }
      
      // Try all free translation APIs in sequence until one succeeds
      for (let i = 0; i < this.TRANSLATION_APIS.length; i++) {
        const api = this.TRANSLATION_APIS[i];
        try {
          console.log(`Trying ${api.name} (Free API ${i + 1}/${this.TRANSLATION_APIS.length})...`);
          
          const translatedText = await this.tryTranslationAPI(api, text, apiTargetLang, sourceLanguage);
          
          if (translatedText && translatedText !== text) {
            // Cache the successful translation
            this.setCachedTranslation(cacheKey, translatedText);
            console.log(`Translation completed successfully via ${api.name}`);
            return translatedText;
          } else {
            console.log(`${api.name} returned identical text, trying next API...`);
          }
        } catch (error) {
          console.warn(`${api.name} failed:`, error);
          continue; // Try next API
        }
      }
      
      throw new Error('All translation APIs failed');
      
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  }
  
  static async translateBlogPost(
    blogContent: string, 
    targetLanguage: string
  ): Promise<string> {
    try {
      console.log(`Translating blog post to ${targetLanguage}, content length: ${blogContent.length}`);
      
      // For very long content, use chunked translation
      if (blogContent.length > 2000) {
        console.log('Content is very long, using chunked translation');
        return await this.translateLongContent(blogContent, targetLanguage);
      }
      
      // For medium content, try direct translation first
      if (blogContent.length > 500) {
        console.log('Content is medium length, trying direct translation first');
        const directResult = await this.translateText(blogContent, targetLanguage);
        if (directResult !== blogContent) {
          return directResult;
        }
        console.log('Direct translation failed, falling back to chunked');
      }
      
      // For long content, split into chunks to avoid timeouts
      const chunks = this.splitTextIntoChunks(blogContent, 500);
      console.log(`Split content into ${chunks.length} chunks`);
      
      const translatedChunks = await Promise.all(
        chunks.map(async (chunk, index) => {
          try {
            const translated = await this.translateText(chunk, targetLanguage);
            console.log(`Chunk ${index + 1}/${chunks.length} translated successfully`);
            return translated;
          } catch (error) {
            console.warn(`Failed to translate chunk ${index + 1}:`, error);
            return chunk; // Return original chunk if translation fails
          }
        })
      );
      
      const result = translatedChunks.join('');
      console.log('Blog post translation completed successfully');
      return result;
      
    } catch (error) {
      console.error('Blog post translation failed:', error);
      return blogContent; // Return original content if all methods fail
    }
  }
  
  // Handle very long content with better chunking
  private static async translateLongContent(content: string, targetLanguage: string): Promise<string> {
    try {
      // Split by paragraphs first
      const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
      console.log(`Split long content into ${paragraphs.length} paragraphs`);
      
      const translatedParagraphs = [];
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i].trim();
        if (paragraph.length > 0) {
          try {
            // If paragraph is still too long, split into sentences
            if (paragraph.length > 1000) {
              const sentences = this.splitTextIntoChunks(paragraph, 300);
              const translatedSentences = await Promise.all(
                sentences.map(sentence => this.translateText(sentence, targetLanguage))
              );
              translatedParagraphs.push(translatedSentences.join(' '));
            } else {
              const translatedParagraph = await this.translateText(paragraph, targetLanguage);
              translatedParagraphs.push(translatedParagraph);
            }
            
            // Log progress every 3 paragraphs
            if ((i + 1) % 3 === 0) {
              console.log(`Translated ${i + 1}/${paragraphs.length} paragraphs`);
            }
          } catch (error) {
            console.warn(`Failed to translate paragraph ${i + 1}:`, error);
            translatedParagraphs.push(paragraph); // Keep original if translation fails
          }
        }
      }
      
      const result = translatedParagraphs.join('\n\n');
      console.log('Long content translation completed successfully');
      return result;
      
    } catch (error) {
      console.error('Long content translation failed:', error);
      return content;
    }
  }
  
  private static splitTextIntoChunks(text: string, maxLength: number): string[] {
    const chunks: string[] = [];
    let currentChunk = '';
    
    // Split by sentences to maintain readability
    const sentences = text.split(/(?<=[.!?])\s+/);
    
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > maxLength) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          // If a single sentence is too long, split by words
          const words = sentence.split(' ');
          let tempChunk = '';
          
          for (const word of words) {
            if ((tempChunk + word).length > maxLength) {
              if (tempChunk) {
                chunks.push(tempChunk.trim());
                tempChunk = word;
              } else {
                chunks.push(word);
              }
            } else {
              tempChunk += (tempChunk ? ' ' : '') + word;
            }
          }
          
          if (tempChunk.trim()) {
            currentChunk = tempChunk.trim();
          }
        }
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  }
  
  // Clear expired cache entries
  static cleanupCache(): void {
    try {
      const keys = Object.keys(localStorage);
      const translationKeys = keys.filter(key => key.startsWith('translation_'));
      
      translationKeys.forEach(key => {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const cacheData: TranslationCache[string] = JSON.parse(cached);
            if (Date.now() > cacheData.expiresAt) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          localStorage.removeItem(key);
        }
      });
      
      console.log('Cache cleanup completed');
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }
  
  // Get cache statistics
  static getCacheStats(): { totalEntries: number; totalSize: number } {
    try {
      const keys = Object.keys(localStorage);
      const translationKeys = keys.filter(key => key.startsWith('translation_'));
      
      let totalSize = 0;
      translationKeys.forEach(key => {
        const cached = localStorage.getItem(key);
        if (cached) {
          totalSize += cached.length;
        }
      });
      
      return {
        totalEntries: translationKeys.length,
        totalSize: totalSize
      };
    } catch (error) {
      return { totalEntries: 0, totalSize: 0 };
    }
  }
  
  // Test translation method for debugging
  static async testTranslation(text: string, targetLanguage: string): Promise<{
    success: boolean;
    originalText: string;
    translatedText: string;
    error?: string;
    method: string;
  }> {
    try {
      console.log(`Testing translation: "${text}" to ${targetLanguage}`);
      
      const translatedText = await this.translateText(text, targetLanguage);
      const success = translatedText !== text;
      
      return {
        success,
        originalText: text,
        translatedText,
        method: success ? 'API' : 'Fallback',
        error: success ? undefined : 'Translation returned same text'
      };
      
    } catch (error) {
      return {
        success: false,
        originalText: text,
        translatedText: text,
        error: error instanceof Error ? error.message : 'Unknown error',
        method: 'Error'
      };
    }
  }
  
  // Check status of all translation APIs
  static async checkAPIStatus(): Promise<{
    googleTranslate: { available: boolean; error?: string };
    freeAPIs: Array<{ name: string; available: boolean; error?: string }>;
  }> {
    const results = {
      googleTranslate: { available: false, error: undefined as string | undefined },
      freeAPIs: [] as Array<{ name: string; available: boolean; error?: string }>
    };
    
    // Check Google Translate
    if (this.GOOGLE_API_KEY) {
      try {
        await this.tryGoogleTranslate('Hello', 'ko', 'en');
        results.googleTranslate.available = true;
      } catch (error) {
        results.googleTranslate.available = false;
        results.googleTranslate.error = error instanceof Error ? error.message : 'Unknown error';
      }
    } else {
      results.googleTranslate.error = 'No API key configured';
    }
    
    // Check free APIs
    for (const api of this.TRANSLATION_APIS) {
      try {
        await this.tryTranslationAPI(api, 'Hello', 'ko', 'en');
        results.freeAPIs.push({ name: api.name, available: true });
      } catch (error) {
        results.freeAPIs.push({ 
          name: api.name, 
          available: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }
    
    return results;
  }
  
  // Get available translation methods
  static getAvailableMethods(): Array<{ name: string; type: 'premium' | 'free'; status: 'available' | 'unavailable' }> {
    const methods = [];
    
    // Google Translate
    methods.push({
      name: 'Google Translate',
      type: 'premium',
      status: this.GOOGLE_API_KEY ? 'available' : 'unavailable'
    });
    
    // Free APIs
    this.TRANSLATION_APIS.forEach(api => {
      methods.push({
        name: api.name,
        type: 'free',
        status: 'available' // We assume they're available, actual status is checked at runtime
      });
    });
    
    return methods;
  }
  
  // Try LibreTranslate API
  private static async tryLibreTranslate(text: string, targetLang: string, sourceLang: string): Promise<string> {
    try {
      const response = await fetch(this.TRANSLATION_APIS[0].url, {
        method: this.TRANSLATION_APIS[0].method,
        headers: this.TRANSLATION_APIS[0].headers,
        body: JSON.stringify(this.TRANSLATION_APIS[0].body(text, targetLang, sourceLang))
      });
      
      if (!response.ok) {
        throw new Error(`LibreTranslate failed: ${response.status}`);
      }
      
      const result = await response.json();
      return result.translatedText || text;
      
    } catch (error) {
      console.error('LibreTranslate error:', error);
      return text;
    }
  }
  
  // Try MyMemory API as fallback
  private static async tryMyMemoryAPI(text: string, targetLang: string): Promise<string> {
    try {
      const url = `${this.TRANSLATION_APIS[1].url}?${new URLSearchParams(this.TRANSLATION_APIS[1].body(text, targetLang, 'en')).toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`MyMemory API failed: ${response.status}`);
      }
      
      const result = await response.json();
      return result.responseData?.translatedText || text;
      
    } catch (error) {
      console.error('MyMemory API error:', error);
      return text;
    }
  }

  // Generic method to try any translation API
  private static async tryTranslationAPI(
    api: any, 
    text: string, 
    targetLang: string, 
    sourceLang: string
  ): Promise<string> {
    try {
      let url = api.url;
      let options: RequestInit = {
        method: api.method,
        headers: api.headers
      };
      
      if (api.method === 'GET') {
        // For GET requests, append query parameters
        const params = new URLSearchParams(api.body(text, targetLang, sourceLang));
        url = `${url}?${params.toString()}`;
      } else {
        // For POST requests, add body
        options.body = JSON.stringify(api.body(text, targetLang, sourceLang));
      }
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`${api.name} failed: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Handle different API response formats
      let translatedText = '';
      switch (api.name) {
        case 'LibreTranslate':
        case 'TranslateAPI':
          translatedText = result.translatedText || text;
          break;
        case 'MyMemory':
          translatedText = result.responseData?.translatedText || text;
          break;
        case 'LingvaTranslate':
          translatedText = result.translation || text;
          break;
        default:
          translatedText = result.translatedText || result.translation || text;
      }
      
      return translatedText;
      
    } catch (error) {
      console.error(`${api.name} error:`, error);
      throw error;
    }
  }

  // Google Translate API method (Premium)
  private static async tryGoogleTranslate(text: string, targetLang: string, sourceLang: string): Promise<string> {
    try {
      const url = `${this.GOOGLE_TRANSLATE_URL}?key=${this.GOOGLE_API_KEY}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'html'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Google Translate failed: ${response.status}`);
      }
      
      const result = await response.json();
      const translatedText = result.data?.translations?.[0]?.translatedText || text;
      
      return translatedText;
      
    } catch (error) {
      console.error('Google Translate error:', error);
      throw error;
    }
  }
} 