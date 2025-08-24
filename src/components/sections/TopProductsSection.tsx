import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Eye, TrendingUp, Award } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Product {
  id: number;
  name: string;
  productId: string;
  brand: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
  isBestSeller?: boolean;
  isTrending?: boolean;
}

const TopProductsSection = () => {
  const { theme } = useTheme();

  const products: Product[] = [
    {
      id: 1,
      name: 'Lifeeasy Detergent',
      productId: 'BMS-001',
      brand: 'LifeEasy',
      price: '₹ 299',
      originalPrice: '₹ 299',
      image: '/product1.jpeg',
      category: 'detergent',
      rating: 4.8,
      reviews: 124,
      discount: 0,
      isBestSeller: false,
      isTrending: false
    },
    {
      id: 2,
      name: 'Lifeeasy Detergent',
      productId: 'NMP-002',
      brand: 'LifeEasy',
      price: '₹ 299',
      originalPrice: '₹ 299',
      image: '/product2.jpeg',
      category: 'detergent',
      rating: 4.9,
      reviews: 89,
      discount: 0,
      isBestSeller: false,
      isTrending: false
    },
    {
      id: 3,
      name: 'Lifeeasy Detergent',
      productId: 'CTS-003',
      brand: 'LifeEasy',
      price: '₹ 299',
      originalPrice: '₹ 299',
      image: '/product1.jpeg',
      category: 'detergent',
      rating: 4.7,
      reviews: 156,
      discount: 0,
      isBestSeller: false,
      isTrending: false
    },
    {
      id: 4,
      name: 'Lifeeasy Detergent',
      productId: 'TMT-004',
      brand: 'LifeEasy',
      price: '₹ 299',
      originalPrice: '₹ 299',
      image: '/product2.jpeg',
      category: 'detergent',
      rating: 4.6,
      reviews: 98,
      discount: 0,
      isBestSeller: false,
      isTrending: false
    }
  ];

  return (
    <section className={`py-16 md:py-20 lg:py-24 ${theme === 'dark' ? 'bg-background' : 'bg-gradient-to-br from-white via-gray-50 to-blue-50'}`}>
      <div className="container mx-auto px-1">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-medium mb-4">
            <Award className="h-4 w-4 mr-2 fill-current" />
            Featured Products
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
            Featured Products
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover our premium Lifeeasy Detergent products for all your cleaning needs
          </p>
        </motion.div>

        {/* Products Grid - Single row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                 <div className={`border border-gray-200 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden group-hover:scale-[1.01] ${theme === 'dark' ? 'bg-card' : 'bg-white'}`}>
                   {/* Enhanced Product Image */}
                   <div className="relative">
                     <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                       <img 
                         src={product.image} 
                         alt={product.name}
                         className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                         onError={(e) => {
                           const target = e.target as HTMLImageElement;
                           target.style.display = 'none';
                           target.nextElementSibling?.classList.remove('hidden');
                         }}
                       />
                       {/* Fallback placeholder */}
                       <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-xs hidden">
                         {product.category}
                       </div>
                     </div>
                     
                     {/* Enhanced Image overlay effects */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                     
                     {/* Quick Action Buttons */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                       <div className="flex space-x-2">
                         <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110">
                           <Eye className="h-5 w-5 text-gray-700" />
                         </button>
                         <button className="p-3 bg-[#0288D1] text-white rounded-full shadow-lg hover:bg-[#0277BD] transition-all duration-300 hover:scale-110">
                           <ShoppingCart className="h-5 w-5" />
                         </button>
                       </div>
                     </div>
                   </div>
                   
                   {/* Enhanced Product Details */}
                   <div className="p-3 md:p-4">
                     {/* Category */}
                     <div className={`text-xs font-medium mb-2 uppercase tracking-wide ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                       {product.category}
                     </div>
                     
                     {/* Product Name */}
                     <h3 className={`text-sm md:text-base font-bold mb-2 leading-tight min-h-[2.5rem] md:min-h-[3rem] line-clamp-2 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
                       {product.name}
                     </h3>
                     
                     {/* Brand */}
                     <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-muted-foreground' : 'text-gray-500'}`}>
                       {product.brand}
                     </p>
                     
                     {/* Rating and Reviews */}
                     <div className="flex items-center mb-3">
                       <div className="flex items-center">
                         {[...Array(5)].map((_, i) => (
                           <Star
                             key={i}
                             className={`h-3 w-3 md:h-4 md:w-4 ${
                               i < product.rating
                                 ? 'text-yellow-400 fill-current'
                                 : 'text-gray-300'
                             }`}
                           />
                         ))}
                       </div>
                       <span className={`text-xs ml-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                         ({product.reviews})
                       </span>
                     </div>
                     
                     {/* Enhanced Price Section */}
                     <div className="mb-4">
                       <span className={`text-lg md:text-xl font-bold ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
                         {product.price}
                       </span>
                     </div>
                     
                     {/* Enhanced Add to Cart Button */}
                     <button className="w-full bg-[#0288D1] hover:bg-[#0277BD] text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                       <ShoppingCart className="h-4 w-4" />
                       <span>Add to Cart</span>
                     </button>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </motion.div>
       </div>
     </section>
   );
 };

 export default TopProductsSection; 