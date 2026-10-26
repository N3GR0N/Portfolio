import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './GithubIcon';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-14 border-t border-stone-800/80 bg-[#090807] text-xs font-mono text-stone-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center font-bold text-amber-300 text-xs shadow-inner">
              JP
            </div>
            <div>
              <span className="font-bold text-stone-200 block text-xs">
                Juan Pedro Suñer
              </span>
              <span className="text-[10px] text-stone-500">
                Backend &amp; Fullstack Engineer · UNLP
              </span>
            </div>
          </div>

          {/* Precision Tagline */}
          <div className="text-center text-stone-400 text-[11px] max-w-md">
            <span>{t('footer.tagline')}</span>
          </div>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/N3GRON"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-300 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:sunerjuan240@gmail.com"
              className="text-stone-400 hover:text-amber-300 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-all flex items-center gap-1.5"
              title={t('footer.backToTop')}
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] uppercase tracking-wider">{t('footer.backToTop')}</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Juan Pedro Suñer. {t('footer.allRightsReserved')}
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Engineered with React 19, TypeScript &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
