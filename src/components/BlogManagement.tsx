import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { BlogService, BlogPost } from '@/services/blogService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  Globe,
  Languages,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface BlogManagementProps {
  onPostSelect?: (post: BlogPost) => void;
}

const BlogManagement: React.FC<BlogManagementProps> = ({ onPostSelect }) => {
  const { t, language, translateDynamicContent } = useLanguage();
  const { theme } = useTheme();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    tags: '',
    category: '',
    featuredImage: '',
    metaDescription: ''
  });

  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await BlogService.getBlogPosts({ status: 'published' });
      if (response.success && Array.isArray(response.data)) {
        setPosts(response.data);
      }
    } catch (err) {
      setError('Failed to fetch blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      tags: '',
      category: '',
      featuredImage: '',
      metaDescription: ''
    });
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      author: post.author,
      tags: post.tags.join(', '),
      category: post.category || '',
      featuredImage: post.featuredImage || '',
      metaDescription: post.metaDescription || ''
    });
  };

  const handleCancel = () => {
    setEditingPost(null);
    setIsCreating(false);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      tags: '',
      category: '',
      featuredImage: '',
      metaDescription: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.author) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        readTime: calculateReadTime(formData.content)
      };

      if (editingPost) {
        // Update existing post
        await BlogService.updateBlogPost(editingPost.id, postData);
      } else {
        // Create new post
        await BlogService.createBlogPost(postData);
      }

      // Refresh posts and reset form
      await fetchBlogPosts();
      handleCancel();
      
    } catch (err) {
      setError('Failed to save blog post');
      console.error(err);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await BlogService.deleteBlogPost(id);
      await fetchBlogPosts();
    } catch (err) {
      setError('Failed to delete blog post');
      console.error(err);
    }
  };

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-foreground' : 'text-gray-900'
        }`}>
          {language === 'en' ? 'Blog Management' : 
           language === 'ko' ? '블로그 관리' : '博客管理'}
        </h2>
        <Button onClick={handleCreatePost} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>
            {language === 'en' ? 'New Post' : 
             language === 'ko' ? '새 게시물' : '新文章'}
          </span>
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center space-x-2 ${
            theme === 'dark' 
              ? 'bg-red-900/20 border border-red-500/30 text-red-300' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setError(null)}
            className="ml-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* Create/Edit Form */}
      {(isCreating || editingPost) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-foreground' : 'text-gray-900'
          }`}>
            {editingPost ? 
              (language === 'en' ? 'Edit Post' : 
               language === 'ko' ? '게시물 편집' : '编辑文章') :
              (language === 'en' ? 'Create New Post' : 
               language === 'ko' ? '새 게시물 작성' : '创建新文章')
            }
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-foreground' : 'text-gray-700'
                }`}>
                  {language === 'en' ? 'Title *' : 
                   language === 'ko' ? '제목 *' : '标题 *'}
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={language === 'en' ? 'Enter post title' : 
                             language === 'ko' ? '게시물 제목 입력' : '输入文章标题'}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-foreground' : 'text-gray-700'
                }`}>
                  {language === 'en' ? 'Author *' : 
                   language === 'ko' ? '작성자 *' : '作者 *'}
                </label>
                <Input
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder={language === 'en' ? 'Enter author name' : 
                             language === 'ko' ? '작성자 이름 입력' : '输入作者姓名'}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-foreground' : 'text-gray-700'
              }`}>
                {language === 'en' ? 'Content *' : 
                 language === 'ko' ? '내용 *' : '内容 *'}
              </label>
              <Textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder={language === 'en' ? 'Write your blog post content...' : 
                           language === 'ko' ? '블로그 게시물 내용을 작성하세요...' : '撰写您的博客文章内容...'}
                rows={8}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-foreground' : 'text-gray-700'
                }`}>
                  {language === 'en' ? 'Tags' : 
                   language === 'ko' ? '태그' : '标签'}
                </label>
                <Input
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder={language === 'en' ? 'tag1, tag2, tag3' : 
                             language === 'ko' ? '태그1, 태그2, 태그3' : '标签1, 标签2, 标签3'}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-foreground' : 'text-gray-700'
                }`}>
                  {language === 'en' ? 'Category' : 
                   language === 'ko' ? '카테고리' : '分类'}
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder={language === 'en' ? 'Enter category' : 
                             language === 'ko' ? '카테고리 입력' : '输入分类'}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-foreground' : 'text-gray-700'
              }`}>
                {language === 'en' ? 'Featured Image URL' : 
                 language === 'ko' ? '특징 이미지 URL' : '特色图片URL'}
              </label>
              <Input
                value={formData.featuredImage}
                onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                placeholder={language === 'en' ? 'https://example.com/image.jpg' : 
                           language === 'ko' ? 'https://example.com/image.jpg' : 'https://example.com/image.jpg'}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={handleCancel}>
                {language === 'en' ? 'Cancel' : 
                 language === 'ko' ? '취소' : '取消'}
              </Button>
              <Button type="submit" className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>
                  {editingPost ? 
                    (language === 'en' ? 'Update Post' : 
                     language === 'ko' ? '게시물 업데이트' : '更新文章') :
                    (language === 'en' ? 'Create Post' : 
                     language === 'ko' ? '게시물 작성' : '创建文章')
                  }
                </span>
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-card border border-border rounded-lg p-4 ${
              theme === 'dark' ? 'hover:border-primary/50' : 'hover:border-blue-300'
            } transition-all duration-300`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-foreground' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>
                <p className={`text-sm text-muted-foreground mb-2 ${
                  theme === 'dark' ? 'text-muted-foreground' : 'text-gray-600'
                }`}>
                  {post.excerpt || post.content.substring(0, 150)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className={`flex items-center space-x-4 text-xs ${
                  theme === 'dark' ? 'text-muted-foreground' : 'text-gray-500'
                }`}>
                  <span>{post.author}</span>
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                {onPostSelect && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPostSelect(post)}
                    className="flex items-center space-x-1"
                  >
                    <Eye className="h-3 w-3" />
                    <span>
                      {language === 'en' ? 'View' : 
                       language === 'ko' ? '보기' : '查看'}
                    </span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPost(post)}
                  className="flex items-center space-x-1"
                >
                  <Edit className="h-3 w-3" />
                  <span>
                    {language === 'en' ? 'Edit' : 
                     language === 'ko' ? '편집' : '编辑'}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePost(post.id)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>
                    {language === 'en' ? 'Delete' : 
                     language === 'ko' ? '삭제' : '删除'}
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className={`text-lg font-medium mb-2 ${
            theme === 'dark' ? 'text-foreground' : 'text-gray-900'
          }`}>
            {language === 'en' ? 'No blog posts yet' : 
             language === 'ko' ? '아직 블로그 게시물이 없습니다' : '还没有博客文章'}
          </h3>
          <p className={`text-muted-foreground mb-4 ${
            theme === 'dark' ? 'text-muted-foreground' : 'text-gray-600'
          }`}>
            {language === 'en' ? 'Create your first blog post to get started!' : 
             language === 'ko' ? '첫 번째 블로그 게시물을 작성하여 시작하세요!' : '创建您的第一篇博客文章开始吧！'}
          </p>
          <Button onClick={handleCreatePost}>
            {language === 'en' ? 'Create First Post' : 
             language === 'ko' ? '첫 번째 게시물 작성' : '创建第一篇文章'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogManagement; 