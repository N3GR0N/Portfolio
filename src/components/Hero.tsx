import React from 'react';
import { ArrowDown, Download, MapPin, Sparkles, Code2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TerminalHUD } from './TerminalHUD';

interface HeroProps {
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv }) => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Background radial spotlight accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121422]/90 border border-emerald-500/30 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono font-medium text-emerald-300">
                {t('hero.status')}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-indigo-400 font-semibold">
                {t('hero.greeting')}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Juan Pedro <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-indigo-100">
                  Suñer
                </span>
              </h1>
              <div className="pt-1 flex items-center gap-2 flex-wrap">
                <span className="text-base sm:text-lg font-semibold text-slate-200">
                  {t('hero.role')}
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm font-mono text-indigo-400/90 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                  UNLP (4to año)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {t('hero.description')}
            </p>

            {/* Quick Meta Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>La Plata, Argentina</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5">
                <Code2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Backend &amp; Distributed Systems</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>C1 English</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-600/25 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <span>{t('hero.ctaProjects')}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCv}
                className="px-5 py-3 rounded-xl bg-[#121422] hover:bg-[#191c2f] border border-white/10 hover:border-indigo-500/40 text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>{t('hero.ctaCv')}</span>
              </button>

              <a
                href="#contact"
                className="px-4 py-3 rounded-xl hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 font-mono text-xs transition-colors"
              >
                {t('hero.ctaContact')} →
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Terminal / Telemetry HUD */}
          <div className="lg:col-span-5 w-full">
            <div className="relative">
              {/* Outer ambient glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-sky-500/10 to-purple-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <TerminalHUD />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#projects"
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors font-mono text-[11px]"
          >
            <span>SCROLL</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
