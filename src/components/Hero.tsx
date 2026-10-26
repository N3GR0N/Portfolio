import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowDown, FileText } from 'lucide-react';

interface HeroProps {
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv }) => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-obsidian text-paper flex flex-col justify-between pt-[96px] pb-8 sm:pb-12 px-6 sm:px-10 overflow-hidden select-none"
    >
      {/* Chromatic Exception: Iridescent liquid atmosphere strictly behind text */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="w-[320px] sm:w-[600px] lg:w-[840px] h-[280px] sm:h-[420px] rounded-full iridescent-liquid"
          style={{
            transform: 'translateY(-5%) scale(1.15)',
          }}
        />
      </div>

      {/* Hero Content Shell */}
      <div className="relative z-10 max-w-[1078px] w-full mx-auto flex-1 flex flex-col justify-between">
        {/* Top Eyebrow Metadata */}
        <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono tracking-widest text-felt-gray uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-paper rounded-full animate-pulse" />
            <span>{t('hero.eyebrow')}</span>
          </div>
          <div className="tracking-widest">
            34° 55′ S, 57° 57′ W // LA PLATA, AR
          </div>
        </div>

        {/* Central Monopo Saigon Display Headline */}
        <div className="my-auto py-12 sm:py-16">
          <h1 className="text-[44px] xs:text-[54px] sm:text-[80px] md:text-[104px] lg:text-[124px] font-light tracking-[-0.04em] leading-[0.92] text-paper">
            JUAN PEDRO
            <br />
            SUÑER
          </h1>

          {/* Subhead with Whisper Authority */}
          <p className="mt-8 sm:mt-10 max-w-[680px] text-[16px] sm:text-[19px] md:text-[21px] text-paper/80 font-light leading-relaxed">
            {t('hero.subheadline')}
          </p>

          {/* Ghost Pills Action Bar (Strict 75px binary radius) */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 text-[11px] sm:text-[12px] font-mono uppercase tracking-widest text-paper border border-white pill-btn hover:bg-paper hover:text-obsidian transition-all duration-500"
            >
              <span>{t('hero.ctaProjects')}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenCv}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 text-[11px] sm:text-[12px] font-mono uppercase tracking-widest text-paper/80 border border-white/30 pill-btn hover:border-paper hover:text-paper hover:bg-white/10 transition-all duration-500"
            >
              <FileText className="w-3.5 h-3.5 text-felt-gray" />
              <span>{t('hero.ctaCv')}</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Rotating circular SVG badge & System telemetry */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          {/* Rotating Typography Badge */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <svg
                className="w-full h-full animate-spin-slow text-felt-gray"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="circlePathHero"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[7.6px] font-mono uppercase tracking-[0.24em] fill-current">
                  <textPath href="#circlePathHero" startOffset="0%">
                    {t('hero.rotatingBadge')}
                  </textPath>
                </text>
              </svg>
              <span className="absolute w-2 h-2 bg-paper rounded-full" />
            </div>

            <div className="text-[11px] font-mono text-felt-gray uppercase leading-relaxed">
              <div>ESTUDIANTE LIC. SISTEMAS (UNLP)</div>
              <div>DISTRIBUTED ARCHITECTURES & WEBGL</div>
            </div>
          </div>

          {/* Right Status */}
          <div className="text-[11px] font-mono text-felt-gray uppercase tracking-widest text-left sm:text-right">
            <div>STATUS: READY FOR DISPATCH</div>
            <div className="text-paper/60">AUTONOMOUS & TEAM COLLABORATION</div>
          </div>
        </div>
      </div>
    </section>
  );
};
