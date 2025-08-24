import { env, isGoogleTranslateAvailable } from './env';

// Translation API Configuration
export const translationConfig = {
  // Google Translate API (Premium - requires API key)
  googleTranslate: {
    enabled: isGoogleTranslateAvailable(),
    apiKey: env.GOOGLE_TRANSLATE_API_KEY,
    url: 'https://translation.googleapis.com/language/translate/v2',
    priority: 1, // Highest priority
    rateLimit: 1000000, // 1M characters per month (free tier)
    costPerMillionChars: 20 // $20 per million characters
  },
  
  // Free Translation APIs (in order of reliability)
  freeAPIs: [
    {
      name: 'LibreTranslate',
      url: 'https://libretranslate.com/translate',
      method: 'POST',
      priority: 2,
      rateLimit: 'Unlimited',
      reliability: 'High',
      notes: 'Most reliable free API, but can be slow'
    },
    {
      name: 'MyMemory',
      url: 'https://api.mymemory.translated.net/get',
      method: 'GET',
      priority: 3,
      rateLimit: '1000 requests/day',
      reliability: 'Medium',
      notes: 'Good fallback, limited daily requests'
    },
    {
      name: 'LingvaTranslate',
      url: 'https://lingva.ml/api/v1/auto/en',
      method: 'GET',
      priority: 4,
      rateLimit: 'Unlimited',
      reliability: 'Medium',
      notes: 'Community-maintained, variable reliability'
    },
    {
      name: 'TranslateAPI',
      url: 'https://translate.argosopentech.com/translate',
      method: 'POST',
      priority: 5,
      rateLimit: 'Unlimited',
      reliability: 'Low',
      notes: 'Last resort, may be unstable'
    }
  ],
  
  // Fallback strategies
  fallbackStrategies: [
    'sequential', // Try APIs in order until one succeeds
    'parallel',   // Try all APIs simultaneously, use first successful result
    'smart'       // Use API health monitoring to prioritize working APIs
  ],
  
  // Cache settings
  cache: {
    enabled: true,
    duration: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxSize: 100 * 1024 * 1024, // 100MB
    cleanupInterval: 24 * 60 * 60 * 1000 // 24 hours
  },
  
  // Content processing
  contentProcessing: {
    maxChunkSize: 500, // Maximum characters per translation chunk
    maxRetries: 3,     // Maximum retry attempts per API
    timeout: 10000,    // 10 seconds timeout per request
    preserveFormatting: true // Preserve HTML formatting
  }
};

// Environment variables needed
export const requiredEnvVars = {
  // Optional: Google Translate API key for premium service
  REACT_APP_GOOGLE_TRANSLATE_API_KEY: 'Google Translate API key (optional)',
  
  // Optional: Custom translation service URLs
  REACT_APP_CUSTOM_TRANSLATION_URL: 'Custom translation service URL (optional)',
  REACT_APP_CUSTOM_TRANSLATION_API_KEY: 'Custom translation service API key (optional)'
};

// Usage instructions
export const usageInstructions = {
  setup: [
    '1. For premium service: Get Google Translate API key from Google Cloud Console',
    '2. Add REACT_APP_GOOGLE_TRANSLATE_API_KEY to your .env file',
    '3. Free APIs will work automatically as fallbacks',
    '4. Monitor API status using the "🔍 API Status" button'
  ],
  monitoring: [
    'Use the debug buttons to monitor translation performance:',
    '🧪 Test API: Test basic translation functionality',
    '📝 Test Content: Test content translation specifically',
    '🔍 API Status: Check which APIs are currently working'
  ],
  troubleshooting: [
    'If translation fails:',
    '1. Check API status using the "🔍 API Status" button',
    '2. Try the "🔄 Re-translate" button',
    '3. Check console logs for detailed error information',
    '4. Consider adding Google Translate API key for reliability'
  ]
}; 