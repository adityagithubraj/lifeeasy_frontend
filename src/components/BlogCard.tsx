import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, TrendingUp } from 'lucide-react';
import { BlogPost } from '@/services/blogService';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  onClick: (post: BlogPost) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card 
        className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
        onClick={() => onClick(post)}
      >
        {/* Featured Image */}
        {post.featured_image && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <CardHeader className="pb-3">
          {/* Category and Date */}
          <div className="flex items-center justify-between mb-2">
            {post.category_name && (
              <Badge variant="secondary" className="text-xs">
                {post.category_name}
              </Badge>
            )}
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>
          
          {/* Title */}
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {post.excerpt}
            </p>
          )}
          
          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{post.author_name || 'Unknown'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span>{post.view_count || 0}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogCard; 