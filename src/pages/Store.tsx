import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import PageWrapper from '@/components/layout/PageWrapper';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  code: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  category: string;
  availability: 'in-stock' | 'out-of-stock';
}

const Store = () => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const navigate = useNavigate();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      code: 'DET-001',
      brand: 'LifeEasy',
      price: 299,
      description: 'Lifeeasy Detergent - Premium Cleaning Solution',
      image: '/product1.jpeg',
      category: 'detergent',
      availability: 'in-stock'
    },
    {
      id: 2,
      code: 'DET-002',
      brand: 'LifeEasy',
      price: 299,
      description: 'Lifeeasy Detergent - Advanced Formula',
      image: '/product2.jpeg',
      category: 'detergent',
      availability: 'in-stock'
    },
    {
      id: 3,
      code: 'DET-003',
      brand: 'LifeEasy',
      price: 299,
      description: 'Lifeeasy Detergent - Professional Grade',
      image: '/product1.jpeg',
      category: 'detergent',
      availability: 'in-stock'
    },
    {
      id: 4,
      code: 'DET-004',
      brand: 'LifeEasy',
      price: 299,
      description: 'Lifeeasy Detergent - Eco-Friendly Formula',
      image: '/product2.jpeg',
      category: 'detergent',
      availability: 'in-stock'
    },
    {
      id: 5,
      code: 'DET-005',
      brand: 'LifeEasy',
      price: 299,
      description: 'Lifeeasy Detergent - Stain Removal Power',
      image: '/product1.jpeg',
      category: 'detergent',
      availability: 'in-stock'
    },
    {
      id: 6,
      code: 'DET-006',
      brand: 'LifeEasy',
      price: 299,
      description: 'Lifeeasy Detergent - Long-lasting Freshness',
      image: '/product2.jpeg',
      category: 'detergent',
      availability: 'in-stock'
    },
    {
      id: 7,
      code: 'DET-007',
      brand: 'LifeEasy',
      price: 299,
      description: 'Lifeeasy Detergent - Gentle on Fabrics',
      image: '/product1.jpeg',
      category: 'detergent',
      availability: 'in-stock'
    },
    {
      id: 8,
      code: 'DET-008',
      brand: 'LifeEasy',
      price: 299,
      description: 'Lifeeasy Detergent - Concentrated Formula',
      image: '/product2.jpeg',
      category: 'detergent',
      availability: 'in-stock'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'detergent', name: 'Detergent', icon: '🧴' }
  ];

  const brands = [
    { name: 'LifeEasy', count: 8 }
  ];

  const filteredProducts = products.filter(product => {
    if (hideOutOfStock && product.availability === 'out-of-stock') return false;
    if (searchQuery && !product.code.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  return (
    <PageWrapper>
      <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="w-full px-1 py-4 md:py-8">
          {/* Page Header - Compressed for Mobile */}
          <div className="mb-4 md:mb-6 lg:mb-8 px-2 w-full">
            <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 text-center md:text-left ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Detergent Store
            </h1>
            <p className={`text-sm md:text-base lg:text-lg text-center md:text-left ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Browse our collection of premium Lifeeasy Detergent products
            </p>
          </div>

          {/* Category Navigation - Compressed Mobile Layout */}
          <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6 px-1 md:px-2 justify-center md:justify-start w-full">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg border transition-colors text-xs md:text-sm lg:text-base ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white border-blue-500'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm md:text-base">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-6 w-full">
            {/* Left Sidebar - Filters - Compressed Mobile */}
            <div className="lg:w-64 space-y-3 md:space-y-4 lg:space-y-6 order-2 lg:order-1 flex-shrink-0">
              {/* Mobile Filter Toggle - Compressed */}
              <div className="lg:hidden">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className={`w-full p-2 md:p-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-1 md:gap-2 ${
                    theme === 'dark' 
                      ? 'border-gray-600 text-gray-300 hover:border-gray-500' 
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span className="text-xs md:text-sm">Filters & Categories</span>
                </button>
              </div>

              {/* Filters Container - Compressed Padding */}
              <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
                {/* Categories Filter */}
                <div className={`p-2 md:p-3 lg:p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-black' : 'bg-white'
                } shadow-sm`}>
                  <h3 className={`font-semibold mb-2 md:mb-3 text-xs md:text-sm lg:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Categories
                  </h3>
                  <div className="space-y-1 md:space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={selectedCategory === 'all'}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className={`text-xs md:text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        All Products
                      </span>
                    </label>
                  </div>
                </div>

                {/* Brand Filter */}
                <div className={`p-2 md:p-3 lg:p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-black' : 'bg-white'
                } shadow-sm`}>
                  <h3 className={`font-semibold mb-2 md:mb-3 text-xs md:text-sm lg:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Brand
                  </h3>
                  <div className="space-y-1 md:space-y-2">
                    {brands.map((brand) => (
                      <label key={brand.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                          />
                          <span className={`text-xs md:text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {brand.name}
                          </span>
                        </div>
                        <span className={`text-xs ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          ({brand.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability Filter */}
                <div className={`p-2 md:p-3 lg:p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-black' : 'bg-white'
                } shadow-sm`}>
                  <h3 className={`font-semibold mb-2 md:mb-3 text-xs md:text-sm lg:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Availability
                  </h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hideOutOfStock}
                      onChange={(e) => setHideOutOfStock(e.target.checked)}
                      className="mr-2"
                    />
                    <span className={`text-xs md:text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Hide Out of Stock
                    </span>
                  </label>
                </div>

                {/* Price Range Filter */}
                <div className={`p-2 md:p-3 lg:p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-black' : 'bg-white'
                } shadow-sm`}>
                  <h3 className={`font-semibold mb-2 md:mb-3 text-xs md:text-sm lg:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Price Range
                  </h3>
                  <div className="space-y-2 md:space-y-3 lg:space-y-4">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        ₹ {priceRange[0]}
                      </span>
                      <span className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        ₹ {priceRange[1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Product Grid - Compressed Mobile Layout */}
            <div className="flex-1 order-1 lg:order-2 min-w-0 w-full">
              <div className={`grid gap-2 md:gap-3 lg:gap-6 w-full ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className={`border border-gray-200 rounded-xl md:rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden group-hover:scale-[1.01] ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      {/* Product Image */}
                      <div className="relative">
                        <div className="w-full h-40 md:h-48 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          <img
                            src={product.image}
                            alt={product.code}
                            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
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
                        {/* Image overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="p-2 md:p-3 lg:p-4">
                        {/* Product Code */}
                        <div className="text-xs md:text-sm font-medium text-blue-600 mb-1">
                          {product.code}
                        </div>
                        
                        {/* Brand */}
                        <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">
                          {product.brand}
                        </div>
                        
                        {/* Price */}
                        <div className={`text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                          ₹ {product.price.toFixed(2)}
                        </div>
                        
                        {/* Description */}
                        <div className={`text-xs md:text-sm mb-2 md:mb-3 line-clamp-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {product.description}
                        </div>
                        
                        {/* Add to Cart Button */}
                        <button className="w-full bg-[#0288D1] hover:bg-[#0277BD] text-white py-1.5 md:py-2 lg:py-3 px-2 md:px-3 lg:px-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-1 md:space-x-2 text-xs md:text-sm lg:text-base">
                          <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className={`text-center py-6 md:py-8 lg:py-12 px-2 md:px-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <p className="text-xs md:text-sm lg:text-base">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Store;