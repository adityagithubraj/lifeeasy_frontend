import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const GlobalDistributorSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-background' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-8"
        >
          <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
            {t('distributor.main.title')}
          </h1>
          <h2 className={`text-2xl lg:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
            {t('distributor.subtitle')}
          </h2>
        </motion.div>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mb-12"
        >
          <p className={`text-lg leading-relaxed mb-4 ${theme === 'dark' ? 'text-muted-foreground' : 'text-gray-700'}`}>
            {t('distributor.description.para1')}
          </p>
          <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-muted-foreground' : 'text-gray-700'}`}>
            {t('distributor.description.para2')}
          </p>
        </motion.div>

        {/* Popular Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl lg:text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
            {t('distributor.categories.title')}
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {/* Microcontrollers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="group cursor-pointer"
          >
            <div className={`${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105`}>
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
                {t('distributor.category.microcontrollers')}
              </h3>
            </div>
          </motion.div>

          {/* Memories */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="group cursor-pointer"
          >
            <div className={`${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105`}>
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
                {t('distributor.category.memories')}
              </h3>
            </div>
          </motion.div>

          {/* Mosfets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="group cursor-pointer"
          >
            <div className={`${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105`}>
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
                {t('distributor.category.mosfets')}
              </h3>
            </div>
          </motion.div>

          {/* Discretes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="group cursor-pointer"
          >
            <div className={`${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105`}>
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
                {t('distributor.category.discretes')}
              </h3>
            </div>
          </motion.div>

          {/* Resistors */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="group cursor-pointer"
          >
            <div className={`${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105`}>
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
                {t('distributor.category.resistors')}
              </h3>
            </div>
          </motion.div>

          {/* Power Management */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="group cursor-pointer"
          >
            <div className={`${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105`}>
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
                {t('distributor.category.power.management')}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalDistributorSection; 