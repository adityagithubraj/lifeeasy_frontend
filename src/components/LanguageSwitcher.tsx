import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, Check } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className="flex items-center space-x-2 min-w-[80px]"
        >
          <span className="text-sm">{lang.flag}</span>
          <span className="text-xs hidden sm:inline">{lang.name}</span>
          {language === lang.code && <Check className="h-3 w-3" />}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 