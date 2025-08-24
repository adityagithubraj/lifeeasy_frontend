export interface BlogPost {
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

export interface BlogApiResponse {
  message: string;
  result: boolean;
  data: BlogPost[] | BlogPost;
}

export interface BlogFilters {
  search?: string;
  category?: string;
  author?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export class BlogService {
  private static readonly API_BASE_URL = 'https://apis.tripgate.in/api/v1';
  
  // Get all blog posts with optional filters
  static async getBlogPosts(filters: BlogFilters = {}): Promise<BlogApiResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.author) queryParams.append('author', filters.author);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());
      
      const response = await fetch(`${this.API_BASE_URL}/blog/posts?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`Blog API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      throw error;
    }
  }
  
  // Get a single blog post by slug
  static async getBlogPostBySlug(slug: string): Promise<BlogApiResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/blog/posts/${slug}`);
      
      if (!response.ok) {
        throw new Error(`Blog API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      throw error;
    }
  }
  
  // Get a single blog post by ID
  static async getBlogPostById(id: string): Promise<BlogApiResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/blog/posts/${id}`);
      
      if (!response.ok) {
        throw new Error(`Blog API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      throw error;
    }
  }
  
  // Search blog posts
  static async searchBlogPosts(query: string, filters: Omit<BlogFilters, 'search'> = {}): Promise<BlogApiResponse> {
    return this.getBlogPosts({ ...filters, search: query });
  }
} 