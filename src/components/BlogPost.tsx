import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Globe, Languages, Clock, User, Calendar, TrendingUp } from 'lucide-react';
import { LibreTranslationService } from '@/services/translationService';
import { setEnvVar, isGoogleTranslateAvailable } from '@/config/env';

interface BlogPostProps {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  category_name?: string;
  author_name?: string;
  meta_title?: string;
  meta_description?: string;
  view_count?: number;
  like_count?: number;
  created_at: string;
  updated_at: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  slug,
  content,
  excerpt,
  featured_image,
  category_name,
  author_name,
  meta_title,
  meta_description,
  view_count,
  like_count,
  created_at,
  updated_at
}) => {
  // Destructure from useLanguage hook, renaming to avoid conflict
  const { t, language, translateDynamicContent, isTranslating: globalIsTranslating } = useLanguage();
  const { theme } = useTheme();
   
  // Local state for this component's translation status
  const [translatedTitle, setTranslatedTitle] = useState(title);
  const [translatedContent, setTranslatedContent] = useState(content || '');
  const [translationError, setTranslationError] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // Debug logging
  console.log('BlogPost component received:', {
    id,
    title,
    slug,
    hasContent: !!content,
    contentLength: content?.length || 0,
    hasExcerpt: !!excerpt,
    excerptLength: excerpt?.length || 0,
    currentLanguage: language,
    translatedTitle,
    translatedContentLength: translatedContent?.length || 0,
    isTranslating,
    translationError
  });

  // Log when translation state changes
  useEffect(() => {
    console.log('Translation state changed:', {
      language,
      isTranslating,
      translationError,
      hasTranslatedTitle: !!translatedTitle,
      hasTranslatedContent: !!translatedContent,
      titleChanged: translatedTitle !== title,
      contentChanged: translatedContent !== content
    });
  }, [language, isTranslating, translationError, translatedTitle, translatedContent, title, content]);

  // Translate content when language changes
  useEffect(() => {
    if (language !== 'en' && content) {
      console.log('Language changed to:', language, 'Translating content...');
      translateContent();
    } else if (language === 'en') {
      console.log('Language changed to English, using original content');
      setTranslatedTitle(title);
      setTranslatedContent(content || '');
      setTranslationError(false);
      setIsTranslating(false);
    }
  }, [language, title, content]);

  const translateContent = async () => {
    if (!content) {
      console.log('No content to translate');
      return;
    }
    
    try {
      console.log('Starting translation for language:', language);
      setTranslationError(false);
      setIsTranslating(true);
      
      // Test translation first to debug
      const testResult = await LibreTranslationService.testTranslation(title, language);
      console.log('Translation test result:', testResult);
      
      if (!testResult.success) {
        console.error('Translation test failed:', testResult.error);
        setTranslationError(true);
        setIsTranslating(false);
        return;
      }
      
      // Translate title first
      console.log('Translating title...');
      const newTitle = await LibreTranslationService.translateText(title, language);
      console.log('Title translation result:', { original: title, translated: newTitle });
      
      // Translate content using the specialized blog post translation method
      console.log('Translating content...');
      const newContent = await LibreTranslationService.translateBlogPost(content, language);
      console.log('Content translation result:', { 
        originalLength: content.length, 
        translatedLength: newContent.length,
        originalPreview: content.substring(0, 100) + '...',
        translatedPreview: newContent.substring(0, 100) + '...'
      });
      
      // Verify that translation actually changed the text
      if (newTitle === title && newContent === content) {
        console.warn('Translation returned identical text - possible API issue');
        setTranslationError(true);
        setIsTranslating(false);
        return;
      }
      
      // Check if content translation failed
      if (newContent === content) {
        console.warn('Content translation failed - trying alternative method');
        // Try translating content in smaller chunks
        const chunkedContent = await translateContentInChunks(content, language);
        if (chunkedContent !== content) {
          console.log('Chunked translation successful');
          setTranslatedTitle(newTitle);
          setTranslatedContent(chunkedContent);
        } else {
          console.error('All content translation methods failed');
          setTranslationError(true);
          setTranslatedTitle(newTitle); // At least title was translated
          setTranslatedContent(content);
        }
      } else {
        console.log('Translation completed successfully');
        setTranslatedTitle(newTitle);
        setTranslatedContent(newContent);
      }
      
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslationError(true);
      // Fallback to original content
      setTranslatedTitle(title);
      setTranslatedContent(content);
    } finally {
      setIsTranslating(false);
    }
  };
  
  // Alternative method: translate content in smaller chunks
  const translateContentInChunks = async (content: string, targetLang: string): Promise<string> => {
    try {
      console.log('Attempting chunked translation...');
      
      // Split content into sentences
      const sentences = content.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
      console.log(`Split content into ${sentences.length} sentences`);
      
      // Translate each sentence individually
      const translatedSentences = [];
      for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i].trim();
        if (sentence.length > 0) {
          try {
            const translatedSentence = await LibreTranslationService.translateText(sentence, targetLang);
            translatedSentences.push(translatedSentence);
            
            // Log progress every 5 sentences
            if ((i + 1) % 5 === 0) {
              console.log(`Translated ${i + 1}/${sentences.length} sentences`);
            }
          } catch (error) {
            console.warn(`Failed to translate sentence ${i + 1}:`, error);
            translatedSentences.push(sentence); // Keep original if translation fails
          }
        }
      }
      
      const result = translatedSentences.join(' ');
      console.log('Chunked translation completed');
      return result;
      
    } catch (error) {
      console.error('Chunked translation failed:', error);
      return content; // Return original content if all methods fail
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 
                                  language === 'ko' ? 'ko-KR' : 'zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`max-w-4xl mx-auto ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}
    >
      {/* Featured Image */}
      {featured_image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={featured_image}
            alt={translatedTitle}
            className="w-full h-64 object-cover"
          />
        </motion.div>
      )}

      {/* Translation Status */}
      {language !== 'en' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`mb-6 p-4 rounded-lg border ${
            translationError 
              ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300' 
              : isTranslating
                ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
                : 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Languages className={`h-4 w-4 ${isTranslating ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">
              {translationError 
                ? t('blog.translation.error') || 'Translation failed'
                : isTranslating 
                  ? t('blog.translation.translating') || 'Translating...'
                  : t('blog.translation.complete') || 'Translated to ' + (language === 'ko' ? 'Korean' : language === 'zh' ? 'Chinese' : language)
              }
            </span>
          </div>
          {isTranslating && (
            <div className="mt-2 space-y-2">
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Please wait while we translate the content to {language === 'ko' ? 'Korean' : language === 'zh' ? 'Chinese' : language}...
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Translating: Title and {content ? `${content.length} characters` : 'content'} of blog post
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                This may take a few moments for longer content...
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 dark:bg-blue-700">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Processing content in chunks for better translation quality...
              </div>
            </div>
          )}
          {translationError && (
            <div className="mt-2 space-y-2">
              <div className="text-xs text-red-600 dark:text-red-400">
                ❌ Translation failed. Please try the "Test API" button to check if the translation service is working.
              </div>
              <div className="text-xs text-red-600 dark:text-red-400">
                If the issue persists, the translation API might be temporarily unavailable.
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Current language: {language} | Content length: {content?.length || 0} characters
              </div>
            </div>
          )}
          {!isTranslating && !translationError && translatedContent && (
            <div className="mt-2 text-xs text-green-600 dark:text-green-400">
              ✓ Title and content successfully translated to {language === 'ko' ? 'Korean' : language === 'zh' ? 'Chinese' : language}
            </div>
          )}
        </motion.div>
      )}

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        {/* Category and Meta */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {category_name && (
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {category_name}
              </span>
            )}
            {language !== 'en' && (
              <button
                onClick={() => {
                  // This will trigger the useEffect to reset to English
                  setTranslatedTitle(title);
                  setTranslatedContent(content || '');
                  setTranslationError(false);
                }}
                className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
              >
                <Globe className="h-3 w-3" />
                <span>Show Original</span>
              </button>
            )}
            {language !== 'en' && (
              <button
                onClick={() => {
                  // Manually trigger translation
                  if (content) {
                    translateContent();
                  }
                }}
                disabled={isTranslating}
                className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-300 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Languages className="h-3 w-3" />
                <span>{isTranslating ? 'Translating...' : 'Re-translate'}</span>
              </button>
            )}
            {language !== 'en' && (
              <button
                onClick={async () => {
                  // Test translation API
                  console.log('Testing translation API...');
                  const testResult = await LibreTranslationService.testTranslation('Hello World', language);
                  console.log('API Test Result:', testResult);
                  alert(`Translation Test: ${testResult.success ? 'SUCCESS' : 'FAILED'}\nMethod: ${testResult.method}\nError: ${testResult.error || 'None'}`);
                }}
                className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-800 dark:hover:bg-yellow-700 text-yellow-700 dark:text-yellow-300 rounded-full transition-colors"
              >
                <span>🧪</span>
                <span>Test API</span>
              </button>
            )}
            {language !== 'en' && (
              <button
                onClick={async () => {
                  // Test content translation specifically
                  if (content) {
                    console.log('Testing content translation...');
                    const contentPreview = content.substring(0, 200) + '...';
                    console.log('Content preview:', contentPreview);
                    
                    try {
                      const translatedContent = await LibreTranslationService.translateBlogPost(contentPreview, language);
                      console.log('Content translation test result:', {
                        original: contentPreview,
                        translated: translatedContent,
                        success: translatedContent !== contentPreview
                      });
                      
                      alert(`Content Translation Test:\n\nOriginal: ${contentPreview}\n\nTranslated: ${translatedContent}\n\nSuccess: ${translatedContent !== contentPreview ? 'YES' : 'NO'}`);
                    } catch (error) {
                      console.error('Content translation test failed:', error);
                      alert(`Content Translation Test FAILED:\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`);
                    }
                  } else {
                    alert('No content available to test');
                  }
                }}
                className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-purple-100 hover:bg-purple-200 dark:bg-purple-800 dark:hover:bg-purple-700 text-purple-700 dark:text-purple-300 rounded-full transition-colors"
              >
                <span>📝</span>
                <span>Test Content</span>
              </button>
            )}
            {language !== 'en' && (
              <button
                onClick={async () => {
                  // Check API status
                  console.log('Checking API status...');
                  try {
                    const apiStatus = await LibreTranslationService.checkAPIStatus();
                    const availableMethods = LibreTranslationService.getAvailableMethods();
                    
                    console.log('API Status:', apiStatus);
                    console.log('Available Methods:', availableMethods);
                    
                    let statusMessage = '🔍 Translation API Status:\n\n';
                    
                    // Google Translate status
                    statusMessage += `🌐 Google Translate (Premium):\n`;
                    statusMessage += `   Status: ${apiStatus.googleTranslate.available ? '✅ Available' : '❌ Unavailable'}\n`;
                    if (apiStatus.googleTranslate.error) {
                      statusMessage += `   Error: ${apiStatus.googleTranslate.error}\n`;
                    }
                    statusMessage += '\n';
                    
                    // Free APIs status
                    statusMessage += `🆓 Free APIs:\n`;
                    apiStatus.freeAPIs.forEach(api => {
                      statusMessage += `   ${api.name}: ${api.available ? '✅ Available' : '❌ Unavailable'}\n`;
                      if (api.error) {
                        statusMessage += `     Error: ${api.error}\n`;
                      }
                    });
                    
                    alert(statusMessage);
                  } catch (error) {
                    console.error('API status check failed:', error);
                    alert(`API Status Check FAILED:\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`);
                  }
                }}
                className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-700 dark:text-green-300 rounded-full transition-colors"
              >
                <span>🔍</span>
                <span>API Status</span>
              </button>
            )}
            {language !== 'en' && (
              <button
                onClick={() => {
                  // Allow user to set Google Translate API key
                  const apiKey = prompt('Enter your Google Translate API key (optional):\n\nLeave empty to use free APIs only.\n\nGet your key from: https://console.cloud.google.com/');
                  
                  if (apiKey !== null) { // User didn't cancel
                    if (apiKey.trim() === '') {
                      // Clear the API key
                      setEnvVar('REACT_APP_GOOGLE_TRANSLATE_API_KEY', '');
                      alert('Google Translate API key cleared. Using free APIs only.');
                    } else {
                      // Set the API key
                      setEnvVar('REACT_APP_GOOGLE_TRANSLATE_API_KEY', apiKey.trim());
                      alert(`Google Translate API key set successfully!\n\nKey: ${apiKey.trim().substring(0, 10)}...\n\nYou can now use the "🔍 API Status" button to verify it works.`);
                    }
                  }
                }}
                className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-800 dark:hover:bg-indigo-700 text-indigo-700 dark:text-indigo-300 rounded-full transition-colors"
              >
                <span>🔑</span>
                <span>{isGoogleTranslateAvailable() ? 'Change API Key' : 'Set API Key'}</span>
              </button>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>{view_count || 0} {t('blog.views')}</span>
            </div>
            {like_count !== undefined && (
              <div className="flex items-center space-x-1">
                <span>❤️</span>
                <span>{like_count}</span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
          {translatedTitle}
          {language !== 'en' && (
            <span className="ml-3 inline-block px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
              {language === 'ko' ? '🇰🇷 Korean' : language === 'zh' ? '🇨🇳 Chinese' : language}
            </span>
          )}
        </h1>
        
        {/* Translation Info */}
        {language !== 'en' && translatedContent && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-green-800 dark:text-green-200">
              <Languages className="h-4 w-4" />
              <span>
                <strong>Title and content are now displayed in {language === 'ko' ? 'Korean' : language === 'zh' ? 'Chinese' : language}</strong>
                <br />
                <span className="text-xs opacity-75">
                  Original English: "{title}" → Translated: "{translatedTitle}"
                </span>
              </span>
            </div>
          </div>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{author_name || t('blog.unknown.author')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(created_at)}</span>
          </div>
          {updated_at !== created_at && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{t('blog.updated')}: {formatDate(updated_at)}</span>
            </div>
          )}
        </div>
      </motion.header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="prose prose-lg max-w-none"
      >
        {/* Language indicator for content */}
        {language !== 'en' && translatedContent && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-blue-800 dark:text-blue-200">
              <Languages className="h-4 w-4" />
              <span>
                <strong>Content displayed in {language === 'ko' ? 'Korean' : language === 'zh' ? 'Chinese' : language}</strong>
                <br />
                <span className="text-xs opacity-75">This is a machine translation of the original English content</span>
              </span>
            </div>
          </div>
        )}
        
        {/* Content Translation Progress */}
        {language !== 'en' && isTranslating && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-yellow-800 dark:text-yellow-200">
              <Languages className="h-4 w-4 animate-spin" />
              <span>
                <strong>Translating blog content...</strong>
                <br />
                <span className="text-xs opacity-75">
                  Content length: {content?.length || 0} characters | 
                  Target language: {language === 'ko' ? 'Korean' : language === 'zh' ? 'Chinese' : language}
                </span>
              </span>
            </div>
          </div>
        )}

        {translatedContent ? (
          <div 
            dangerouslySetInnerHTML={{ __html: translatedContent }}
            className="leading-relaxed"
          />
        ) : content ? (
          <div 
            dangerouslySetInnerHTML={{ __html: content }}
            className="leading-relaxed"
          />
        ) : excerpt ? (
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground italic">
              {excerpt}
            </p>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Full content is not available for this post. Only the excerpt is shown.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="text-lg text-muted-foreground italic text-center">
              {t('blog.no.content')}
            </p>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 pt-8 border-t border-border"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>{t('blog.post.id')}: {id}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {t('blog.slug')}: {slug}
          </div>
        </div>
      </motion.footer>
    </motion.article>
  );
};

export default BlogPost; 