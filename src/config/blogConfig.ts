export const blogConfig = {
  // Tripgate Blog API Configuration
  api: {
    baseUrl: 'https://apis.tripgate.in/api/v1',
    endpoints: {
      posts: '/blog/posts',
      postBySlug: '/blog/posts',
    },
    headers: {
      'Content-Type': 'application/json',
      // Add your authentication headers here if needed
      // 'Authorization': `Bearer ${process.env.REACT_APP_BLOG_API_TOKEN}`,
    }
  },
  
  // Blog Settings
  settings: {
    postsPerPage: 10,
    defaultStatus: 'published',
    supportedStatuses: ['draft', 'published', 'archived'],
    maxTagsPerPost: 10,
    maxContentLength: 50000, // characters
    imageFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    maxImageSize: 5 * 1024 * 1024, // 5MB
  },
  
  // Translation Settings
  translation: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'ko', 'zh'],
    autoTranslate: true,
    cacheDuration: 30 * 24 * 60 * 60 * 1000, // 30 days
  }
}; 