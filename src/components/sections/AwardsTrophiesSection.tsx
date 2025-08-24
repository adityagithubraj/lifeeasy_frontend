import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const AwardsTrophiesSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const awards = [
    {
      id: 1,
      title: 'awards.excellence.title',
      description: 'awards.excellence.description',
      year: '2024',
      icon: '🏆'
    },
    {
      id: 2,
      title: 'awards.innovation.title',
      description: 'awards.innovation.description',
      year: '2023',
      icon: '💡'
    },
    {
      id: 3,
      title: 'awards.quality.title',
      description: 'awards.quality.description',
      year: '2023',
      icon: '⭐'
    },
    {
      id: 4,
      title: 'awards.service.title',
      description: 'awards.service.description',
      year: '2022',
      icon: '🎯'
    },
    {
      id: 5,
      title: 'awards.growth.title',
      description: 'awards.growth.description',
      year: '2022',
      icon: '📈'
    },
    {
      id: 6,
      title: 'awards.leadership.title',
      description: 'awards.leadership.description',
      year: '2021',
      icon: '👑'
    }
  ];

  return (
    <section className={`py-20 relative overflow-hidden ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {t('awards.title') || 'Awards and Trophies'}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('awards.subtitle') || 'Recognizing excellence and innovation in electronic solutions'}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mt-6"></div>
        </motion.div>

        {/* Awards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {awards.map((award) => (
            <motion.div
              key={award.id}
              variants={itemVariants}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20'
                  : 'bg-white border-gray-200 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20'
              }`}
            >
              {/* Award Icon */}
              <div className="text-4xl mb-4 text-center">
                {award.icon}
              </div>

              {/* Award Content */}
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {t(award.title) || 'Award Title'}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t(award.description) || 'Award description goes here'}
                </p>
                
                {/* Year Badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  theme === 'dark'
                    ? 'bg-amber-500 text-black'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {award.year}
                </div>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] ${
                theme === 'dark' ? 'border-t-amber-500' : 'border-t-amber-400'
              } rounded-bl-lg`}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${
                theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
              }`}>
                25+
              </div>
              <div className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('awards.stats.awards') || 'Awards Won'}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${
                theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
              }`}>
                10+
              </div>
              <div className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('awards.stats.years') || 'Years of Excellence'}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${
                theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
              }`}>
                100%
              </div>
              <div className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('awards.stats.commitment') || 'Commitment to Quality'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsTrophiesSection; 