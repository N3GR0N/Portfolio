import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './GithubIcon';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181818] text-felt-gray border-t border-white/10 text-[11px] font-mono select-none">
      <div className="max-w-[1078px] mx-auto px-6 sm:px-10 py-12 sm:py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Wordmark & Year */}
          <div className="space-y-1">
            <div className="text-paper text-[13px] tracking-tight font-normal">
              JUAN PEDRO SUÑER
            </div>
            <div className="text-felt-gray">
              © 2026 · {t('footer.tagline')}
            </div>
          </div>

          {/* Center: GitHub Link */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/N3GR0N"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-felt-gray hover:text-paper transition-colors uppercase tracking-wider"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GITHUB // N3GR0N</span>
            </a>
          </div>

          {/* Action: Back to Top */}
          <button
            onClick={scrollToTop}
            className="text-felt-gray hover:text-paper uppercase tracking-widest transition-colors flex items-center gap-1.5"
          >
            <span>{t('footer.backToTop')}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
