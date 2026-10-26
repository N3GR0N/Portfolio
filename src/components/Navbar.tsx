import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCv }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[66px] flex items-center transition-all duration-700 ${
        isScrolled
          ? 'bg-obsidian/90 backdrop-blur-md border-b border-white/10 text-paper'
          : 'bg-transparent text-paper'
      }`}
    >
      <div className="max-w-[1078px] w-full mx-auto px-6 flex items-center justify-between">
        {/* Wordmark in 16px Inter */}
        <a
          href="#hero"
          className="text-[15px] sm:text-[16px] font-normal tracking-tight text-paper hover:opacity-70 transition-opacity"
        >
          JUAN PEDRO SUÑER
        </a>

        {/* Center: Language Switcher */}
        <div className="flex items-center gap-2 text-[12px] font-mono tracking-wider">
          <button
            onClick={() => language !== 'es' && toggleLanguage()}
            className={`transition-colors ${
              language === 'es' ? 'text-paper font-semibold' : 'text-felt-gray hover:text-paper'
            }`}
          >
            ES
          </button>
          <span className="text-felt-gray">/</span>
          <button
            onClick={() => language !== 'en' && toggleLanguage()}
            className={`transition-colors ${
              language === 'en' ? 'text-paper font-semibold' : 'text-felt-gray hover:text-paper'
            }`}
          >
            EN
          </button>
        </div>

        {/* Right Nav Links & Ghost Pill */}
        <nav className="flex items-center gap-5 sm:gap-7">
          <a
            href="#projects"
            className="hidden md:inline-block text-[11px] uppercase tracking-widest text-felt-gray hover:text-paper transition-colors"
          >
            {t('nav.projects')}
          </a>
          <a
            href="#experience"
            className="hidden md:inline-block text-[11px] uppercase tracking-widest text-felt-gray hover:text-paper transition-colors"
          >
            {t('nav.experience')}
          </a>
          <button
            onClick={onOpenCv}
            className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-felt-gray hover:text-paper transition-colors"
          >
            {t('nav.cv')}
          </button>
          <a
            href="#contact"
            className="px-4 py-1.5 text-[11px] uppercase tracking-widest text-paper border border-white/30 hover:border-paper pill-btn hover:bg-paper hover:text-obsidian transition-all duration-500"
          >
            {t('nav.contact')}
          </a>
        </nav>
      </div>
    </header>
  );
};
