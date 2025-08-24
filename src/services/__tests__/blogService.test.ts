import { BlogService } from '../blogService';

// Mock fetch globally
global.fetch = jest.fn();

describe('BlogService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBlogPosts', () => {
    it('should fetch blog posts successfully', async () => {
      const mockResponse = {
        message: 'Posts fetched successfully',
        result: true,
        data: [
          {
            id: '1',
            title: 'Test Post 1',
            slug: 'test-post-1',
            excerpt: 'Test excerpt 1',
            featured_image: 'https://example.com/image1.jpg',
            category_name: 'Test Category',
            author_name: 'Test Author',
            created_at: '2025-01-01T00:00:00.000Z',
            updated_at: '2025-01-01T00:00:00.000Z'
          }
        ]
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await BlogService.getBlogPosts();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://apis.tripgate.in/api/v1/blog/posts'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await expect(BlogService.getBlogPosts()).rejects.toThrow('Blog API error: 500');
    });
  });

  describe('getBlogPostBySlug', () => {
    it('should fetch blog post by slug successfully', async () => {
      const mockResponse = {
        message: 'Post fetched successfully',
        result: true,
        data: {
          id: '1',
          title: 'Test Post',
          slug: 'test-post',
          content: '<p>Test content</p>',
          excerpt: 'Test excerpt',
          featured_image: 'https://example.com/image.jpg',
          category_name: 'Test Category',
          author_name: 'Test Author',
          created_at: '2025-01-01T00:00:00.000Z',
          updated_at: '2025-01-01T00:00:00.000Z'
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await BlogService.getBlogPostBySlug('test-post');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://apis.tripgate.in/api/v1/blog/posts/test-post'
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBlogPostById', () => {
    it('should fetch blog post by ID successfully', async () => {
      const mockResponse = {
        message: 'Post fetched successfully',
        result: true,
        data: {
          id: '1',
          title: 'Test Post',
          slug: 'test-post',
          content: '<p>Test content</p>',
          excerpt: 'Test excerpt',
          featured_image: 'https://example.com/image.jpg',
          category_name: 'Test Category',
          author_name: 'Test Author',
          created_at: '2025-01-01T00:00:00.000Z',
          updated_at: '2025-01-01T00:00:00.000Z'
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await BlogService.getBlogPostById('1');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://apis.tripgate.in/api/v1/blog/posts/1'
      );
      expect(result).toEqual(mockResponse);
    });
  });
}); 