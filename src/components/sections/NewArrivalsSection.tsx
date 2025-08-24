import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Eye } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface NewProduct {
  id: number;
  name: string;
  itemCode: string;
  quantity: string;
  mrp: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
  originalPrice?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

const NewArrivalsSection = () => {
  const { theme } = useTheme();

  const newProducts: NewProduct[] = [
    {
      id: 1,
      name: 'Lifeeasy Detergent',
      itemCode: 'HBPRCEWS00007',
      quantity: '2 Pcs',
      mrp: 299,
      originalPrice: 299,
      image: '/product1.jpeg',
      category: 'detergent',
      rating: 4.8,
      reviews: 156,
      discount: 0,
      isNew: false,
      isFeatured: false
    },
    {
      id: 2,
      name: 'Lifeeasy Detergent',
      itemCode: 'HBPBCCOM00096N',
      quantity: '40 Pcs',
      mrp: 299,
      originalPrice: 299,
      image: '/product2.jpeg',
      category: 'detergent',
      rating: 4.9,
      reviews: 89,
      discount: 0,
      isNew: false,
      isFeatured: false
    },
    {
      id: 3,
      name: 'Lifeeasy Detergent',
      itemCode: 'HBPBCEZC00012',
      quantity: '50 ml',
      mrp: 299,
      originalPrice: 299,
      image: '/product1.jpeg',
      category: 'detergent',
      rating: 4.7,
      reviews: 234,
      discount: 0,
      isNew: false,
      isFeatured: false
    },
    {
      id: 4,
      name: 'Lifeeasy Detergent',
      itemCode: 'HBPBCEZC00011',
      quantity: '250 ml',
      mrp: 299,
      originalPrice: 299,
      image: '/product2.jpeg',
      category: 'detergent',
      rating: 4.6,
      reviews: 189,
      discount: 0,
      isNew: false,
      isFeatured: false
    }
  ];

  return (
    <section className={`py-16 md:py-20 lg:py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'}`}>
      <div className="container mx-auto px-1">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2 fill-current" />
            New Arrivals
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 leading-tight">
            Discover Our Latest
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Product Collection
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Stay ahead with our newest arrivals featuring premium quality, innovative designs, and exclusive offers
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
            {newProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden group-hover:scale-[1.01]">
                  
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
                    <div className="text-xs text-blue-600 font-medium mb-2 uppercase tracking-wide">
                      {product.category}
                    </div>
                    
                    {/* Product Name */}
                    <h3 className="text-sm md:text-base font-bold mb-2 text-gray-800 leading-tight min-h-[2.5rem] md:min-h-[3rem] line-clamp-2">
                      {product.name}
                    </h3>
                    
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
                      <span className="text-xs text-gray-600 ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    {/* Item Code and Quantity */}
                    <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
                      <span>Code: {product.itemCode}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{product.quantity}</span>
                    </div>
                    
                    {/* Enhanced Price Section */}
                    <div className="mb-4">
                      <span className="text-lg md:text-xl font-bold text-gray-800">
                        ₹{product.mrp.toLocaleString()}
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

export default NewArrivalsSection; 