import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './GithubIcon';

interface NavbarProps {
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCv }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'stack', 'experience', 'education', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'projects', label: t('nav.projects') },
    { id: 'stack', label: t('nav.stack') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'education', label: t('nav.education') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0e0d0c]/85 backdrop-blur-xl border-b border-stone-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 group-hover:border-amber-500/50 flex items-center justify-center transition-all duration-300 shadow-inner overflow-hidden">
            <span className="font-mono font-bold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-amber-200 to-amber-500">
              JP
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-stone-100 tracking-tight leading-none group-hover:text-amber-200 transition-colors">
              Juan Pedro Suñer
            </span>
            <span className="text-[10px] font-mono text-stone-400 leading-none mt-1">
              Backend &amp; Fullstack
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-800/80 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/40'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Lang Switcher, CV Button & GitHub */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher Pill */}
          <button
            onClick={toggleLanguage}
            title={t('nav.switchLang')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-800 bg-stone-900/80 hover:bg-stone-800 hover:border-amber-500/40 text-xs font-mono text-stone-300 hover:text-white transition-all shadow-sm focus:outline-none"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300">{language.toUpperCase()}</span>
            <span className="text-[10px] text-stone-500">| {language === 'es' ? 'EN' : 'ES'}</span>
          </button>

          {/* CV Button */}
          <button
            onClick={onOpenCv}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 via-bronze-600 to-amber-700 hover:from-amber-500 hover:to-bronze-500 text-stone-950 font-bold text-xs shadow-bronze-sm border border-amber-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('nav.cv')}</span>
          </button>

          {/* GitHub Icon */}
          <a
            href="https://github.com/N3GRON"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-stone-800 bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-amber-300 transition-colors"
            title="GitHub: N3GRON"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-stone-800 bg-stone-900/80 text-stone-300 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl glass-panel shadow-2xl flex flex-col gap-2 animate-fade-in border border-stone-800">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-stone-300 hover:text-amber-200 hover:bg-stone-800/40 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 border-t border-stone-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-600 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-bronze-sm"
            >
              <FileText className="w-4 h-4" />
              <span>{t('nav.downloadCv')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
