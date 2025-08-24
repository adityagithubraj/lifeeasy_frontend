import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  showBackground?: boolean;
  showParticles?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ 
  children, 
  className = "", 
  showBackground = true,
  showParticles = false 
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen pt-20 ${className}`}
    >
      {/* Theme-aware background */}
      {showBackground && (
        <>
          <div className="absolute inset-0 circuit-lines opacity-10" />
          <div className="floating-orb floating-orb-1" />
          <div className="floating-orb floating-orb-2" />
          <div className="floating-orb floating-orb-3" />
        </>
      )}

      {/* Theme-aware content wrapper */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Theme-aware gradient overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          theme === 'dark' 
            ? 'bg-gradient-dark opacity-30' 
            : 'bg-gradient-light opacity-20'
        }`} 
      />
    </motion.div>
  );
};

export default PageWrapper; 