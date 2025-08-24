import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  image: string;
  icon: React.ReactNode;
}

const BannerCarousel = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      title: 'MLM Software Solutions',
      subtitle: 'Network Marketing Excellence',
      description: 'Transform your network marketing business with our comprehensive MLM software platform. Manage downlines, track commissions, and scale your business efficiently.',
      cta: 'Get Started Today',
      image: '/logo.jpeg',
      icon: <Users className="h-8 w-8 text-blue-500" />
    },
    {
      id: 2,
      title: 'Commission Tracking',
      subtitle: 'Automated Payment System',
      description: 'Streamline your commission calculations with our advanced tracking system. Real-time updates, automated payouts, and comprehensive reporting.',
      cta: 'Learn More',
      image: '/logo.jpeg',
      icon: <TrendingUp className="h-8 w-8 text-green-500" />
    },
    {
      id: 3,
      title: 'Downline Management',
      subtitle: 'Team Performance Analytics',
      description: 'Monitor and optimize your team performance with detailed analytics, performance metrics, and growth insights.',
      cta: 'Explore Features',
      image: '/logo.jpeg',
      icon: <Shield className="h-8 w-8 text-purple-500" />
    },
    {
      id: 4,
      title: 'Business Automation',
      subtitle: 'Streamlined Operations',
      description: 'Automate repetitive tasks, manage inventory, and optimize your business processes for maximum efficiency.',
      cta: 'Start Automating',
      image: '/logo.jpeg',
      icon: <Zap className="h-8 w-8 text-yellow-500" />
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, bannerSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 mlm-banner-overlay" />

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
        <div className="relative">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                  {/* Left Column - Content */}
                  <div className="text-center lg:text-left space-y-4 md:space-y-6 lg:space-y-8 px-4 md:px-8 lg:px-12">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="space-y-3 md:space-y-4"
                    >
                      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                        <span className="mlm-gradient-text">{bannerSlides[currentSlide].title}</span>
                      </h1>
                      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-blue-200">
                        {bannerSlides[currentSlide].subtitle}
                      </h2>
                      <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        {bannerSlides[currentSlide].description}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <button className="mlm-button-glow px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        {bannerSlides[currentSlide].cta}
                      </button>
                    </motion.div>
                  </div>

                  {/* Right Column - Visual */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col items-center justify-center space-y-4 md:space-y-6"
                  >
                    <div className="mlm-logo-container relative">
                      <img 
                        src={bannerSlides[currentSlide].image} 
                        alt="MLM Software Logo"
                        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                      />
                      <div className="absolute -top-2 -right-2 mlm-icon-glow">
                        {bannerSlides[currentSlide].icon}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                        Innovation Hub
                      </p>
                      <p className="text-sm md:text-base text-blue-200">
                        Powered by Lifeeasy
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <Play className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel; 