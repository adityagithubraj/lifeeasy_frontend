import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const VisionMissionSection = () => {
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
            {t('about.vision.mission.title') || 'Vision & Mission'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto"></div>
        </motion.div>

        {/* Main Content - Image Left, Text Right */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center"
        >
          {/* Left Side - Image */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              <img
                src="https://www.rabyte.com/web/image/4638-d7105336/vision-and-mission-background.png"
                alt="Vision and Mission"
                className="max-w-full h-auto object-contain"
              />
              {/* Optional overlay for better text readability */}
              <div className={`absolute inset-0 ${
                theme === 'dark' ? 'bg-black/20' : 'bg-white/10'
              }`}></div>
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-12"
          >
            {/* Vision Section */}
            <div className="space-y-6">
              {/* Vision Header with Decorative Lines */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-0.5 ${
                    theme === 'dark' ? 'bg-teal-400' : 'bg-teal-500'
                  } rounded-full`}></div>
                  <div className={`w-8 h-0.5 ${
                    theme === 'dark' ? 'bg-teal-400' : 'bg-teal-500'
                  } rounded-full`}></div>
                </div>
                <h3 className={`text-3xl font-bold ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {t('about.vision.title') || 'Vision'}
                </h3>
              </div>
              
              <p className={`text-lg leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('about.vision.description') || 'To be recognized as a Global leader providing world-class Electronic Solutions services to its customers while creating value for all stakeholders.'}
              </p>
            </div>

            {/* Mission Section */}
            <div className="space-y-6">
              {/* Mission Header with Decorative Lines */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-0.5 ${
                    theme === 'dark' ? 'bg-teal-400' : 'bg-teal-500'
                  } rounded-full`}></div>
                  <div className={`w-8 h-0.5 ${
                    theme === 'dark' ? 'bg-teal-400' : 'bg-teal-500'
                  } rounded-full`}></div>
                </div>
                <h3 className={`text-3xl font-bold ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {t('about.mission.title') || 'Mission'}
                </h3>
              </div>
              
              <p className={`text-lg leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('about.mission.description') || 'To provide our customers comprehensive value-added services for Electronic Solutions giving them a competitive advantage in time to market, technology, flexibility, and total cost. Relentlessly connect our business partners to new revenue-generating opportunities and convert these into business by bringing together the innovative technologies and capabilities to deliver solutions in the marketplace for sustainable long-term growth. Leverage our outstanding management and employee teams to build an Organisation with true long-term value.'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMissionSection; 