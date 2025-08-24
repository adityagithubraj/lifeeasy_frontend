import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
// import ChipScene from '@/components/3d/ChipScene';
import { Particles } from '@/components/effects/Particles';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  console.log('HeroSection rendering', { language, t: typeof t });

  const getTypingSequence = () => {
    switch (language) {
      case 'ko':
        return [
          '미래의 컴퓨팅',
          2000,
          '혁신적인 반도체',
          2000,
          '차세대 기술',
          2000,
        ];
      case 'zh':
        return [
          '计算的未来',
          2000,
          '革命性半导体',
          2000,
          '下一代技术',
          2000,
        ];
      default:
        return [
          'Future of Compute',
          2000,
          'Revolutionary Semiconductors',
          2000,
          'Next-Gen Technology',
          2000,
        ];
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 circuit-lines opacity-30" />
      
      {/* Floating Orbs */}
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-3" />
      
      {/* Particles */}
      <Particles />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Content - Single Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          {/* Main Headline */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl lg:text-7xl font-bold leading-tight"
            >
              <TypeAnimation
                sequence={getTypingSequence()}
                wrapper="span"
                speed={50}
                className="bg-gradient-neon bg-clip-text text-transparent neon-text"
                repeat={Infinity}
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              {t('hero.subtitle')}
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="btn-hero group"
            >
              {t('hero.cta.primary')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-glass group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('hero.cta.secondary')}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50 max-w-2xl mx-auto"
          >
            {[
              { value: '50+', label: 'Patents' },
              { value: '10M+', label: 'Transistors' },
              { value: '99.9%', label: 'Reliability' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;