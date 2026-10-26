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
    <footer className="relative py-12 border-t border-white/[0.08] bg-[#07080d] text-xs font-mono text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#121422] border border-white/10 flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400 text-xs">
              JP
            </div>
            <div>
              <span className="font-semibold text-slate-200 block text-xs">
                Juan Pedro Suñer
              </span>
              <span className="text-[10px] text-slate-500">
                Backend / Fullstack Developer · UNLP
              </span>
            </div>
          </div>

          {/* Precision quote */}
          <div className="text-center text-slate-400 text-[11px] max-w-md">
            <span>{t('footer.tagline')}</span>
          </div>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/N3GRON"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:sunerjuan240@gmail.com"
              className="text-slate-400 hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              title={t('footer.backToTop')}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-wider">{t('footer.backToTop')}</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Juan Pedro Suñer. {t('footer.allRightsReserved')}
          </div>
          <div className="flex items-center gap-1">
            <span>Built with React 19, TypeScript &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
