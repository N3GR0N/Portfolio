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

      // Section spy
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
          ? 'bg-[#090a0f]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Personal Monogram */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
        >
          <div className="relative w-9 h-9 rounded-xl bg-[#121422] border border-white/10 group-hover:border-indigo-500/50 flex items-center justify-center transition-all duration-300 shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono font-bold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-sky-400">
              JP
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-slate-200 tracking-tight leading-none group-hover:text-white transition-colors">
              Juan Pedro Suñer
            </span>
            <span className="text-[10px] font-mono text-slate-400 leading-none mt-1">
              Backend &amp; Fullstack
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#10121d]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.07] shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Lang Switcher & CV CTA */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher Pill */}
          <button
            onClick={toggleLanguage}
            title={t('nav.switchLang')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-[#121422]/80 hover:bg-[#1a1c2e] hover:border-indigo-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-semibold">{language.toUpperCase()}</span>
            <span className="text-[10px] text-slate-500">| {language === 'es' ? 'EN' : 'ES'}</span>
          </button>

          {/* CV Button */}
          <button
            onClick={onOpenCv}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-medium shadow-md shadow-indigo-600/20 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('nav.cv')}</span>
          </button>

          {/* GitHub quick link */}
          <a
            href="https://github.com/N3GRON"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-white/10 bg-[#121422]/80 hover:bg-[#1a1c2e] text-slate-400 hover:text-white transition-colors"
            title="GitHub: N3GRON"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-white/10 bg-[#121422]/80 text-slate-300 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#0e101a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-2 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
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
