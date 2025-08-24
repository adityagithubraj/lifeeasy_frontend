import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Car, Smartphone, Factory, Cloud, Target, Compass } from 'lucide-react';

const About = () => {
  const { theme } = useTheme();

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

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Leading Innovation Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Leading Innovation
            </h1>
            <p className={`text-lg md:text-xl mb-4 max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              We aim to provide a full-stack supply chain management solution for both our customers and suppliers.
            </p>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Ranked one of the largest electronic components distributors in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className={`py-16 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Vision & Mission
            </h2>
            <div className="w-24 h-0.5 bg-teal-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Graphic - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <img 
                  src="https://www.rabyte.com/web/image/4638-d7105336/vision-and-mission-background.png"
                  alt="Vision and Mission Background"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Text Content - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              {/* Our Vision */}
              <div className="text-left">
                <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Our Vision
                </h3>
                <div className="flex space-x-2 mb-4">
                  <div className="w-8 h-0.5 bg-teal-500"></div>
                  <div className="w-8 h-0.5 bg-teal-500"></div>
                </div>
                <p className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  To be recognized as a Global leader providing world-class Electronic Solutions services to its customers while creating value for all stakeholders.
                </p>
              </div>

              {/* Our Mission */}
              <div className="text-left">
                <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Our Mission
                </h3>
                <div className="flex space-x-2 mb-4">
                  <div className="w-8 h-0.5 bg-teal-500"></div>
                  <div className="w-8 h-0.5 bg-teal-500"></div>
                </div>
                <p className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  To provide our customers comprehensive value-added services for Electronic Solutions giving them a competitive advantage in time to market, technology, flexibility, and total cost. Relentlessly connect our business partners to new revenue-generating opportunities and convert these into business by bringing together the innovative technologies and capabilities to deliver solutions in the marketplace for sustainable long-term growth. Leverage our outstanding management and employee teams to build an Organisation with true long-term value.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            {/* Section Header with Teal Lines */}
            <div className="flex items-center justify-center mb-12">
              <div className="w-16 h-0.5 bg-teal-500 mr-4"></div>
              <h2 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
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
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center shadow-lg`}>
                    <industry.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <p className={`text-sm md:text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
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

export default About;