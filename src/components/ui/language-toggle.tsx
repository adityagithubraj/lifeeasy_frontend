import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { ChevronDown, Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string; key: string }[] = [
    { code: 'en', label: 'English', key: 'language.english' },
    { code: 'ko', label: '한국어', key: 'language.korean' },
    { code: 'zh', label: '中文', key: 'language.chinese' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 btn-glass">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.label}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="glass-card border-glass-border min-w-[120px]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer hover:bg-primary/10 ${
              language === lang.code ? 'bg-primary/20 text-primary' : ''
            }`}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}