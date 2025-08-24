// Environment Configuration - Safe for both browser and Node.js
export const env = {
  // Google Translate API Key
  GOOGLE_TRANSLATE_API_KEY: getEnvVar('REACT_APP_GOOGLE_TRANSLATE_API_KEY'),
  
  // Other environment variables can be added here
  NODE_ENV: getEnvVar('NODE_ENV'),
  IS_DEVELOPMENT: getEnvVar('NODE_ENV') === 'development',
  IS_PRODUCTION: getEnvVar('NODE_ENV') === 'production'
};

// Helper function to safely get environment variables
function getEnvVar(key: string): string {
  try {
    // Try to get from environment variable (works in build tools like Vite, Create React App)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] || '';
    }
    
    // Fallback for browser environment - you can set this manually
    if (typeof window !== 'undefined' && (window as any)[key]) {
      return (window as any)[key] || '';
    }
    
    return '';
  } catch (error) {
    console.warn(`Could not access environment variable ${key}:`, error);
    return '';
  }
}

// Method to manually set environment variables in browser (for testing)
export function setEnvVar(key: string, value: string): void {
  if (typeof window !== 'undefined') {
    (window as any)[key] = value;
    console.log(`Set environment variable ${key} to ${value}`);
  }
}

// Method to check if Google Translate is available
export function isGoogleTranslateAvailable(): boolean {
  return env.GOOGLE_TRANSLATE_API_KEY !== '';
} 