import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cpu, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: t('nav.about'), href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'News', href: '/news' },
        { label: 'Press', href: '/press' },
      ]
    },
    {
      title: 'Products',
      links: [
        { label: t('nav.solutions'), href: '/solutions' },
        { label: t('nav.store'), href: '/store' },
        { label: 'Documentation', href: '/docs' },
        { label: 'Support', href: '/support' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: t('nav.blog'), href: '/blog' },
        { label: 'Research', href: '/research' },
        { label: 'Downloads', href: '/downloads' },
        { label: 'Community', href: '/community' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/codifyventures', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/codifyventures', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/codifyventures', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@codifyventures.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-gradient-dark border-t border-border/50">
      <div className="absolute inset-0 circuit-lines opacity-5" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Cpu className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                Lifeeasy
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Pioneering the future of computational technology with revolutionary semiconductor solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                    >
                      {link.label}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 Lifeeasy. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookies" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;