# Blog API Integration

This document describes the integration with the Tripgate Blog API for fetching blog posts and individual blog content.

## API Endpoints

### Base URL
```
https://apis.tripgate.in/api/v1
```

### Available Endpoints

1. **Get All Blog Posts**
   - **URL**: `/blog/posts`
   - **Method**: GET
   - **Description**: Fetches all published blog posts
   - **Response**: Array of blog post objects

2. **Get Blog Post by Slug**
   - **URL**: `/blog/posts/{slug}`
   - **Method**: GET
   - **Description**: Fetches a specific blog post by its slug
   - **Example**: `/blog/posts/explore-indonesia-with-tripgate-unforgettable-tours`

## API Response Structure

### Blog Post Object
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  status?: 'published' | 'draft' | 'archived';
  category_name?: string;
  author_name?: string;
  meta_title?: string;
  meta_description?: string;
  view_count?: number;
  like_count?: number;
  created_at: string;
  updated_at: string;
}
```

### API Response
```typescript
interface BlogApiResponse {
  message: string;
  result: boolean;
  data: BlogPost[] | BlogPost;
}
```

## Usage Examples

### Fetching All Blog Posts

```typescript
import { BlogService } from '@/services/blogService';

// Get all published posts
const response = await BlogService.getBlogPosts({ status: 'published' });

if (response.result && Array.isArray(response.data)) {
  const posts = response.data;
  console.log('Blog posts:', posts);
}
```

### Fetching Blog Post by Slug

```typescript
import { BlogService } from '@/services/blogService';

// Get post by slug
const response = await BlogService.getBlogPostBySlug('explore-indonesia-with-tripgate-unforgettable-tours');

if (response.result && !Array.isArray(response.data)) {
  const post = response.data;
  console.log('Blog post:', post);
}
```

### Using the useBlog Hook

```typescript
import { useBlog } from '@/hooks/useBlog';

function BlogComponent() {
  const { posts, loading, error, fetchPosts, fetchPostBySlug } = useBlog();

  // Posts are automatically fetched on component mount
  // You can also manually refresh or fetch specific posts
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

## Components

### BlogCard
A reusable component for displaying blog posts in a grid layout.

```typescript
import BlogCard from '@/components/BlogCard';

<BlogCard
  post={blogPost}
  index={0}
  onClick={(post) => handlePostSelect(post)}
/>
```

### BlogPost
A component for displaying the full content of a blog post.

```typescript
import BlogPost from '@/components/BlogPost';

<BlogPost {...blogPostData} />
```

## Features

- **Automatic Translation**: Content is automatically translated based on the selected language
- **Responsive Design**: Components are mobile-friendly and responsive
- **Error Handling**: Comprehensive error handling for API failures
- **Loading States**: Loading indicators during API calls
- **Search & Filter**: Search by title/excerpt and filter by category
- **View Counts**: Display view counts and like counts from the API

## Error Handling

The service includes comprehensive error handling:

- Network errors
- API response errors
- Invalid data format errors
- Timeout handling

## Testing

Run the test suite to verify API integration:

```bash
npm test src/services/__tests__/blogService.test.ts
```

## Configuration

Blog API configuration is located in `src/config/blogConfig.ts`:

```typescript
export const blogConfig = {
  api: {
    baseUrl: 'https://apis.tripgate.in/api/v1',
    endpoints: {
      posts: '/blog/posts',
      postBySlug: '/blog/posts',
    },
    // ... other config
  }
};
```

## Notes

- The API only supports GET requests for fetching data
- All blog posts are publicly accessible
- Content is returned in HTML format
- Images are served from external URLs
- No authentication is required for reading blog posts 