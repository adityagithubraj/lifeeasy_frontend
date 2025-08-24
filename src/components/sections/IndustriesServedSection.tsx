import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface Industry {
  icon: string;
  label: string;
  key: string;
}

const IndustriesServedSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const industries: Industry[] = [
    { icon: '🚗', label: 'Automotive', key: 'industries.automotive' },
    { icon: '📱', label: 'Mobile', key: 'industries.mobile' },
    { icon: '🏭', label: 'Industrial', key: 'industries.industrial' },
    { icon: '☁️', label: 'IOT', key: 'industries.iot' },
    { icon: '🚑', label: 'Medical', key: 'industries.medical' },
    { icon: '📞', label: 'Telecom', key: 'industries.telecom' },
    { icon: '🎯', label: 'Defense', key: 'industries.defense' },
    { icon: '💡', label: 'LED Lighting', key: 'industries.led' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className={`py-16 relative ${
      theme === 'dark' 
        ? 'bg-black text-gray-100' 
        : 'bg-white text-gray-900'
    }`}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className={`text-lg mb-4 max-w-4xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t('about.description.full')}
          </p>
          <p className={`text-xl font-bold mb-6 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {t('about.ranking')}
          </p>
        </motion.div>

        {/* Separator Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto mb-8"
        />

        {/* Industries Served Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className={`text-4xl lg:text-5xl font-bold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {t('about.industries.title')}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>
          </div>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.key}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="relative mb-4">
                <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-gray-600/25 group-hover:shadow-gray-600/40' 
                    : 'bg-gradient-to-br from-blue-500 to-orange-500'
                }`}>
                  {industry.icon}
                </div>
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
                    : 'bg-gradient-to-br from-blue-500 to-orange-500'
                }`}></div>
              </div>
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-300 group-hover:text-gray-100' 
                  : 'text-gray-800 group-hover:text-gray-900'
              }`}>
                {t(industry.key) || industry.label}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesServedSection; 