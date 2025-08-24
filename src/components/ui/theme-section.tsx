import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface ThemeSectionProps {
  children: React.ReactNode;
  className?: string;
  showBackground?: boolean;
  showCircuitLines?: boolean;
  showFloatingOrbs?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  animation?: boolean;
}

const ThemeSection: React.FC<ThemeSectionProps> = ({ 
  children, 
  className,
  showBackground = true,
  showCircuitLines = true,
  showFloatingOrbs = true,
  padding = 'lg',
  animation = true
}) => {
  const { theme } = useTheme();

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32'
  };

  const Wrapper = animation ? motion.section : 'section';

  return (
    <Wrapper
      initial={animation ? { opacity: 0, y: 20 } : undefined}
      whileInView={animation ? { opacity: 1, y: 0 } : undefined}
      transition={animation ? { duration: 0.6 } : undefined}
      viewport={animation ? { once: true } : undefined}
      className={cn(
        'relative',
        paddingClasses[padding],
        className
      )}
    >
      {/* Theme-aware background elements */}
      {showBackground && (
        <>
          {showCircuitLines && (
            <div className="absolute inset-0 circuit-lines opacity-10" />
          )}
          {showFloatingOrbs && (
            <>
              <div className="floating-orb floating-orb-1" />
              <div className="floating-orb floating-orb-2" />
              <div className="floating-orb floating-orb-3" />
            </>
          )}
        </>
      )}

      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Theme-aware gradient overlay */}
      {showBackground && (
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            theme === 'dark' 
              ? 'bg-gradient-dark opacity-20' 
              : 'bg-gradient-light opacity-15'
          }`} 
        />
      )}
    </Wrapper>
  );
};

export default ThemeSection; 