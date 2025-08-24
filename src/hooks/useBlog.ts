import { useState, useEffect, useCallback } from 'react';
import { BlogService, BlogPost, BlogApiResponse } from '@/services/blogService';

interface UseBlogReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchPostBySlug: (slug: string) => Promise<BlogPost | null>;
  fetchPostById: (id: string) => Promise<BlogPost | null>;
}

export const useBlog = (): UseBlogReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response: BlogApiResponse = await BlogService.getBlogPosts({ status: 'published' });
      
      if (response.result && Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        setError('Failed to fetch blog posts');
      }
    } catch (err) {
      setError('Failed to fetch blog posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPostBySlug = useCallback(async (slug: string): Promise<BlogPost | null> => {
    try {
      const response: BlogApiResponse = await BlogService.getBlogPostBySlug(slug);
      
      if (response.result && !Array.isArray(response.data)) {
        return response.data as BlogPost;
      } else {
        setError('Failed to fetch blog post');
        return null;
      }
    } catch (err) {
      setError('Failed to fetch blog post');
      console.error('Error fetching post by slug:', err);
      return null;
    }
  }, []);

  const fetchPostById = useCallback(async (id: string): Promise<BlogPost | null> => {
    try {
      const response: BlogApiResponse = await BlogService.getBlogPostById(id);
      
      if (response.result && !Array.isArray(response.data)) {
        return response.data as BlogPost;
      } else {
        setError('Failed to fetch blog post');
        return null;
      }
    } catch (err) {
      setError('Failed to fetch blog post');
      console.error('Error fetching post by ID:', err);
      return null;
    }
  }, []);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostBySlug,
    fetchPostById,
  };
}; 