import React from 'react';
import { Layers, Database, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './GithubIcon';

export const BentoProjects: React.FC = () => {
  const { language, t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
      {/* CARD 1: RescueSync / DSSD */}
      <div
        onMouseMove={handleMouseMove}
        className="group relative rounded-3xl glass-panel p-6 sm:p-8 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
        style={{
          background:
            'radial-gradient(500px circle at var(--mouse-x, 200px) var(--mouse-y, 200px), rgba(217, 119, 6, 0.07), transparent 40%), rgba(26, 24, 22, 0.65)',
        }}
      >
        <div className="space-y-5">
          {/* Header pill & category */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-stone-900/90 text-amber-300/90 border border-stone-800">
              {t('projects.items.rescuesync.categoryLabel')}
            </span>
            <span className="text-[11px] font-mono text-stone-500">
              BONITA BPM + SPRING BOOT
            </span>
          </div>

          {/* Title & subtitle */}
          <div className="space-y-1.5">
            <h4 className="text-2xl font-bold text-stone-100 group-hover:text-amber-200 transition-colors">
              {t('projects.items.rescuesync.title')}
            </h4>
            <p className="text-xs sm:text-sm font-mono text-stone-400">
              {t('projects.items.rescuesync.subtitle')}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-300 leading-relaxed font-sans">
            {t('projects.items.rescuesync.description')}
          </p>

          {/* Highlights */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block font-semibold">
              {language === 'es' ? 'Aspectos Técnicos Destacados:' : 'Key Engineering Highlights:'}
            </span>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {(t('projects.items.rescuesync.highlights') as string[]).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">◈</span>
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Mockup & Schematic Placeholder Shell */}
          <div className="rounded-2xl bg-[#0d0d10] border border-stone-800/80 p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-stone-800/70 pb-2">
              <span className="text-stone-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>BPM Process State Orchestration</span>
              </span>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                ACID MUTEX
              </span>
            </div>

            {/* Simulated Process Pipeline */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                <span className="text-stone-400 block">Incident Signal</span>
                <span className="text-emerald-400 font-semibold mt-0.5 block">VERIFIED</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-700/40">
                <span className="text-amber-300 block">Resource Lock</span>
                <span className="text-amber-400 font-semibold mt-0.5 block">ACQUIRED</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                <span className="text-stone-400 block">Brigade Dispatch</span>
                <span className="text-stone-200 font-semibold mt-0.5 block">QUEUED</span>
              </div>
            </div>

            <div className="text-[10px] text-stone-500 italic text-center pt-1">
              {t('projects.placeholderHint')}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(t('projects.items.rescuesync.badges') as string[]).map((badge) => (
              <span
                key={badge}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-stone-900/80 text-stone-300 border border-stone-800"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button: STRICTLY ONLY GITHUB REPO (NO LIVE DEMO) */}
        <div className="pt-6 mt-6 border-t border-stone-800/60 flex items-center justify-between">
          <div className="text-[11px] font-mono text-stone-500">
            {language === 'es' ? 'Despliegue distribuido' : 'Distributed cluster'}
          </div>
          <a
            href="#"
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/40 text-stone-200 hover:text-white text-xs font-mono transition-all flex items-center gap-2 group/btn"
          >
            <GithubIcon className="w-3.5 h-3.5 text-stone-400 group-hover/btn:text-amber-400" />
            <span>{t('projects.viewCode')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover/btn:text-stone-200" />
          </a>
        </div>
      </div>

      {/* CARD 2: Alquilando */}
      <div
        onMouseMove={handleMouseMove}
        className="group relative rounded-3xl glass-panel p-6 sm:p-8 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
        style={{
          background:
            'radial-gradient(500px circle at var(--mouse-x, 200px) var(--mouse-y, 200px), rgba(217, 119, 6, 0.07), transparent 40%), rgba(26, 24, 22, 0.65)',
        }}
      >
        <div className="space-y-5">
          {/* Header pill & category */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-stone-900/90 text-amber-300/90 border border-stone-800">
              {t('projects.items.alquilando.categoryLabel')}
            </span>
            <span className="text-[11px] font-mono text-stone-500">
              DJANGO + POSTGRESQL
            </span>
          </div>

          {/* Title & subtitle */}
          <div className="space-y-1.5">
            <h4 className="text-2xl font-bold text-stone-100 group-hover:text-amber-200 transition-colors">
              {t('projects.items.alquilando.title')}
            </h4>
            <p className="text-xs sm:text-sm font-mono text-stone-400">
              {t('projects.items.alquilando.subtitle')}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-300 leading-relaxed font-sans">
            {t('projects.items.alquilando.description')}
          </p>

          {/* Highlights */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block font-semibold">
              {language === 'es' ? 'Aspectos Técnicos Destacados:' : 'Key Engineering Highlights:'}
            </span>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {(t('projects.items.alquilando.highlights') as string[]).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">◈</span>
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Mockup & Schematic Placeholder Shell */}
          <div className="rounded-2xl bg-[#0d0d10] border border-stone-800/80 p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-stone-800/70 pb-2">
              <span className="text-stone-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>PostgreSQL Concurrency &amp; Temporal Index</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                1.8ms EXPLAIN
              </span>
            </div>

            {/* Simulated Query Execution Shell */}
            <div className="p-2.5 rounded-lg bg-black/60 border border-stone-800/80 text-[11px] text-stone-300 space-y-1">
              <div className="text-amber-400">SELECT id, vehicle_id FROM fleet_reservations</div>
              <div className="text-stone-400">WHERE date_range &amp;&amp; '[2026-11-01, 2026-11-05]'</div>
              <div className="text-emerald-400 pt-0.5 border-t border-stone-800/60">
                → Index Scan using idx_fleet_range: 0 overbooking collisions
              </div>
            </div>

            <div className="text-[10px] text-stone-500 italic text-center pt-1">
              {t('projects.placeholderHint')}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(t('projects.items.alquilando.badges') as string[]).map((badge) => (
              <span
                key={badge}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-stone-900/80 text-stone-300 border border-stone-800"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button: STRICTLY ONLY GITHUB REPO (NO LIVE DEMO) */}
        <div className="pt-6 mt-6 border-t border-stone-800/60 flex items-center justify-between">
          <div className="text-[11px] font-mono text-stone-500">
            {language === 'es' ? 'Gestión de flotas y reservas' : 'Fleet & reservation management'}
          </div>
          <a
            href="#"
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/40 text-stone-200 hover:text-white text-xs font-mono transition-all flex items-center gap-2 group/btn"
          >
            <GithubIcon className="w-3.5 h-3.5 text-stone-400 group-hover/btn:text-amber-400" />
            <span>{t('projects.viewCode')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover/btn:text-stone-200" />
          </a>
        </div>
      </div>
    </div>
  );
};
