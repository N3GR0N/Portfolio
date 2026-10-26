import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AetherScopeShowcase } from './AetherScopeShowcase';
import { BentoProjects } from './BentoProjects';

export const Projects: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="relative py-28 sm:py-36 border-t border-stone-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze-950/60 border border-bronze-700/50 text-amber-300 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('projects.sectionBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
            {t('projects.title')}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-sans">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* 1. Flagship Showcase: AetherScope (WITH LIVE DEMO & REPO) */}
        <AetherScopeShowcase />

        {/* 2. Bento Grid for Secondary Systems: RescueSync & Alquilando (STRICTLY GITHUB ONLY) */}
        <BentoProjects />
      </div>
    </section>
  );
};
