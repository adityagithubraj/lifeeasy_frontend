import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  hoverEffect?: boolean;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  hoverEffect = true,
  ...props 
}) => {
  const { theme } = useTheme();

  const baseClasses = "rounded-lg border transition-all duration-300";
  
  const variantClasses = {
    default: "bg-card border-border shadow-sm",
    glass: "glass-card",
    elevated: "bg-card border-border shadow-lg"
  };

  const hoverClasses = hoverEffect ? "hover:shadow-glow-primary hover:border-primary/50" : "";

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ThemeCard; 