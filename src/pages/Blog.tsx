import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Car, Smartphone, Factory, Cloud, BookOpen, Search, Filter, RefreshCw } from 'lucide-react';
import BlogPost from '@/components/BlogPost';
import BlogCard from '@/components/BlogCard';
import { useBlog } from '@/hooks/useBlog';
import { BlogPost as BlogPostType } from '@/services/blogService';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const { theme } = useTheme();
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loadingPost, setLoadingPost] = useState(false);
  
  const { posts, loading, error, fetchPosts, fetchPostBySlug } = useBlog();

  const industries = [
    {
      id: 1,
      name: 'Automotive',
      icon: Car,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 2,
      name: 'Mobile',
      icon: Smartphone,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      name: 'Industrial',
      icon: Factory,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 4,
      name: 'IOT',
      icon: Cloud,
      color: 'from-blue-500 to-blue-600'
    }
  ];

  // Extract unique categories from posts
  const allCategories = [...new Set(posts.map(post => post.category_name).filter(Boolean))];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostSelect = async (post: BlogPostType) => {
    console.log('Selected post:', post);
    console.log('Post slug:', post.slug);
    setLoadingPost(true);
    try {
      // Fetch the full blog post content by slug
      console.log('Fetching full post by slug:', post.slug);
      const fullPost = await fetchPostBySlug(post.slug);
      console.log('Full post fetched:', fullPost);
      
      if (fullPost) {
        console.log('Setting full post with content:', fullPost.content ? 'Content available' : 'No content');
        setSelectedPost(fullPost);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.log('Fallback to list post');
        // Fallback to the post from the list if fetch fails
        setSelectedPost(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to fetch full post:', err);
      // Fallback to the post from the list if fetch fails
      setSelectedPost(post);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoadingPost(false);
    }
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setSearchTerm('');
    setSelectedCategory('');
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={handleBackToList}
            variant="outline"
            className="mb-6"
          >
            ← Back to Blog
          </Button>
          <BlogPost {...selectedPost} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Leading Innovation Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Leading Innovation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              We aim to provide a full-stack supply chain management solution for both our customers and suppliers.
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ranked one of the largest electronic components distributors in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-8">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Our Blog
              </h2>
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {allCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <Button
                  onClick={() => fetchPosts()}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Blog Posts Grid */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading blog posts...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">Error loading blog posts: {error}</p>
                <Button onClick={() => fetchPosts()} className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No blog posts found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <BlogCard
                      post={post}
                      onSelect={handlePostSelect}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            {/* Section Header with Teal Lines */}
            <div className="flex items-center justify-center mb-12">
              <div className="w-16 h-0.5 bg-teal-500 mr-4"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                Industries Served
              </h2>
              <div className="w-16 h-0.5 bg-teal-500 ml-4"></div>
            </div>

            {/* Industries Grid */}
            <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-md mx-auto">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center shadow-lg`}>
                    <industry.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-gray-700">
                    {industry.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;