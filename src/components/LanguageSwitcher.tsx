'use client';

import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useState } from 'react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    console.log('Language changing to:', langCode);
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onMouseDown={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-[#1d1d1f] hover:text-gray-600 transition-colors rounded-lg border border-transparent hover:border-gray-200"
        type="button"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 py-1 min-w-[140px]"
          style={{ zIndex: 50000 }}
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              onMouseDown={(e) => {
                e.preventDefault();
                console.log('Clicked:', lang.code);
                handleLanguageChange(lang.code);
              }}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                language === lang.code ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto text-blue-500">✓</span>
              )}
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0"
          style={{ zIndex: 49999 }}
          onMouseDown={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}