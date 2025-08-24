import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingCart, Menu, X } from 'lucide-react';
import ProfileSidebar from './ProfileSidebar';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  console.log('Navbar rendering');

  const navItems = [
    { key: 'nav.home', href: '/', label: 'Home' },
    { key: 'nav.about', href: '/about', label: 'About Us' },
    { key: 'nav.solutions', href: '/solutions', label: 'Solutions' },
    { key: 'nav.store', href: '/store', label: 'Store' },
    { key: 'nav.blog', href: '/blog', label: 'Blog' },
    // { key: 'nav.blog.manage', href: '/blog/manage', label: 'Blog Management' },
    { key: 'nav.contact', href: '/contact', label: 'Contact Us' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border navbar-container"
      >
        <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 md:space-x-4 group" onClick={closeMobileMenu}>
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mlm-navbar-logo">
                <img
                  src="/logo.jpeg"
                  alt="Lifeeasy Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#F57C00]/20 to-[#FF9800]/20 rounded-full blur-lg group-hover:from-[#F57C00]/30 group-hover:to-[#FF9800]/30 transition-all duration-300" />
            </div>
            <span className="text-xl md:text-2xl font-bold mlm-navbar-brand">
              lifeeasy.in
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 md:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-foreground/80 hover:text-foreground transition-all duration-300 hover:bg-primary/10 relative group text-sm md:text-base"
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-neon group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />

            {/* Profile Icon */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 md:p-2.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300 relative group"
              aria-label="Profile"
            >
              <User className="h-5 w-5 md:h-6 md:w-6" />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-neon group-hover:w-full transition-all duration-300" />
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="p-2 md:p-2.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300 relative group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              {/* Cart Badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                0
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-neon group-hover:w-full transition-all duration-300" />
            </Link>

            {/* CTA Button */}
            <Button variant="default" className="btn-hero text-sm md:text-base px-4 md:px-6 py-2 md:py-2.5">
              Contact Us
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart Icon */}
            <Link
              to="/cart"
              className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {/* Cart Badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                0
              </div>
            </Link>

            {/* Mobile Profile Icon */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={closeMobileMenu}
                        className="block px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-300"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Contact Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                    className="pt-4"
                  >
                    <Button
                      variant="default"
                      className="btn-hero w-full text-base px-4 py-3"
                      onClick={closeMobileMenu}
                    >
                      Contact Us
                    </Button>
                  </motion.div>
                  
                  {/* Mobile Theme Toggle */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (navItems.length + 1) * 0.1 }}
                    className="pt-2"
                  >
                    <div className="flex justify-center">
                      <ThemeToggle />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Profile Sidebar */}
      <ProfileSidebar 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
};

export default Navbar;