import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';
import esJson from '../locales/es.json';
import enJson from '../locales/en.json';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string) => any;
  translations: typeof esJson;
}

const translationsMap = {
  es: esJson,
  en: enJson,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('jp_portfolio_lang') as Language;
      if (saved === 'es' || saved === 'en') return saved;
      // Default to Spanish (or browser language)
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('es')) return 'es';
      return 'es'; // default as per prompt
    } catch {
      return 'es';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jp_portfolio_lang', language);
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const t = (path: string): any => {
    const keys = path.split('.');
    let current: any = translationsMap[language];
    for (const key of keys) {
      if (current === undefined || current === null) return path;
      current = current[key];
    }
    return current !== undefined ? current : path;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        translations: translationsMap[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
