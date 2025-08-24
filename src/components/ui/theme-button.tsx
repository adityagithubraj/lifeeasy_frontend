import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './button';
import { ButtonProps } from '@radix-ui/react-slot';

interface ThemeButtonProps extends ButtonProps {
  variant?: 'default' | 'glass' | 'neon' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ 
  variant = 'default',
  size = 'md',
  children, 
  className,
  ...props 
}) => {
  const { theme } = useTheme();

  const baseClasses = "transition-all duration-300 font-medium";
  
  const variantClasses = {
    default: "btn-hero",
    glass: "btn-glass",
    neon: "bg-gradient-neon text-primary-foreground hover:shadow-glow-primary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <Button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ThemeButton; 