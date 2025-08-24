import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface Brand {
  id: number;
  name: string;
  displayName: string;
  logo: string;
  color: string;
  isImage?: boolean;
}

const TopBrandsSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const brands: Brand[] = [
    {
      id: 1,
      name: 'diotec',
      displayName: 'Diotec',
      logo: 'Diotec',
      color: 'from-red-500 to-red-600',
      isImage: false
    },
    {
      id: 2,
      name: 'enfalion',
      displayName: 'Enfalion',
      logo: 'ENFALION®',
      color: 'from-gray-500 to-gray-600',
      isImage: false
    },
    {
      id: 3,
      name: 'everlight',
      displayName: 'Everlight',
      logo: 'EVERLIGHT®',
      color: 'from-blue-500 to-blue-600',
      isImage: false
    },
    {
      id: 4,
      name: 'edison',
      displayName: 'Edison',
      logo: 'EDISON',
      color: 'from-blue-500 to-blue-600',
      isImage: false
    },
    {
      id: 5,
      name: 'fagor',
      displayName: 'Fagor',
      logo: 'FAGOR',
      color: 'from-red-500 to-red-600',
      isImage: false
    },
    {
      id: 6,
      name: 'rabyte.logo1',
      displayName: 'Rabyte',
      logo: 'https://www.rabyte.com/web/image/product.brand.ept/119/logo',
      color: 'from-gray-500 to-gray-600',
      isImage: true
    },
    {
      id: 7,
      name: 'rabyte.logo2',
      displayName: 'Rabyte',
      logo: 'https://www.rabyte.com/web/image/product.brand.ept/124/logo',
      color: 'from-gray-500 to-gray-600',
      isImage: true
    },
    {
      id: 8,
      name: 'rabyte.logo3',
      displayName: 'Rabyte',
      logo: 'https://www.rabyte.com/web/image/product.brand.ept/137/logo',
      color: 'from-gray-500 to-gray-600',
      isImage: true
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, brands.length - 6));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, brands.length - 6)) % Math.max(1, brands.length - 6));
  };

  const visibleBrands = brands.slice(currentIndex, currentIndex + 6);

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-background' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-0.5 bg-teal-400 mr-4"></div>
            <h2 className={`text-3xl lg:text-4xl font-bold ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
              Top Brands
            </h2>
            <div className="w-16 h-0.5 bg-teal-400 ml-4"></div>
          </div>
        </motion.div>

        {/* Brands Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full ${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border shadow-lg hover:shadow-xl transition-all duration-300 group`}
            aria-label="Previous brands"
          >
            <ChevronLeft className={`h-6 w-6 ${theme === 'dark' ? 'text-foreground' : 'text-gray-600'} group-hover:text-blue-600 transition-colors`} />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full ${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border shadow-lg hover:shadow-xl transition-all duration-300 group`}
            aria-label="Next brands"
          >
            <ChevronRight className={`h-6 w-6 ${theme === 'dark' ? 'text-foreground' : 'text-gray-600'} group-hover:text-blue-600 transition-colors`} />
          </button>

          {/* Brands Grid */}
          <div className="grid grid-cols-6 gap-4 px-12">
            {visibleBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className={`${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border rounded-lg p-4 text-center hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105`}>
                  {/* Brand Logo */}
                  <div className="relative mb-3">
                    {brand.isImage ? (
                      <div className={`w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center p-2 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
                        brand.name.includes('rabyte') ? 'ring-2 ring-blue-200 hover:ring-blue-400' : ''
                      }`}>
                        <img 
                          src={brand.logo} 
                          alt={brand.displayName} 
                          className="w-full h-full object-contain" 
                          onError={(e) => {
                            // Fallback to text if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold text-lg';
                            fallback.textContent = brand.displayName.substring(0, 2).toUpperCase();
                            target.parentNode?.appendChild(fallback);
                          }}
                        />
                        {/* Special indicator for Rabyte logos */}
                        {brand.name.includes('rabyte') && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">★</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${brand.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                        {brand.logo}
                      </div>
                    )}
                  </div>
                  
                  {/* Brand Name */}
                  <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'} group-hover:text-blue-600 transition-colors duration-300`}>
                    {brand.displayName}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TopBrandsSection; 