import React from 'react';
import { Briefcase, GraduationCap, Wrench, Shield, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ExperienceTimeline: React.FC = () => {
  const { language, t } = useLanguage();

  const experiences = [
    {
      id: 'academic',
      role: t('experience.items.academic.role'),
      institution: t('experience.items.academic.institution'),
      department: t('experience.items.academic.department'),
      period: t('experience.items.academic.period'),
      location: t('experience.items.academic.location'),
      bullets: t('experience.items.academic.bullets') as string[],
      metrics: t('experience.items.academic.metrics') as { label: string; value: string }[],
      tags: t('experience.items.academic.tags') as string[],
      icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
      isCurrent: true,
    },
    {
      id: 'freelance',
      role: t('experience.items.freelance.role'),
      institution: t('experience.items.freelance.institution'),
      period: t('experience.items.freelance.period'),
      location: t('experience.items.freelance.location'),
      bullets: t('experience.items.freelance.bullets') as string[],
      metrics: t('experience.items.freelance.metrics') as { label: string; value: string }[],
      tags: t('experience.items.freelance.tags') as string[],
      icon: <Wrench className="w-4 h-4 text-amber-400" />,
      isCurrent: true,
    },
    {
      id: 'pharmacy',
      role: t('experience.items.pharmacy.role'),
      institution: t('experience.items.pharmacy.institution'),
      period: t('experience.items.pharmacy.period'),
      location: t('experience.items.pharmacy.location'),
      bullets: t('experience.items.pharmacy.bullets') as string[],
      metrics: t('experience.items.pharmacy.metrics') as { label: string; value: string }[],
      tags: t('experience.items.pharmacy.tags') as string[],
      icon: <Shield className="w-4 h-4 text-amber-400" />,
      isCurrent: false,
    },
  ];

  return (
    <section id="experience" className="relative py-28 sm:py-36 border-t border-stone-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze-950/60 border border-bronze-700/50 text-amber-300 text-xs font-mono font-medium">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('experience.sectionBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
            {t('experience.title')}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-sans">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Vertical Timeline with warm bronze track */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-2.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-amber-500 before:via-bronze-700 before:to-stone-800">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Node */}
              <div className="absolute -left-[30px] sm:-left-[42px] top-1.5 w-6 h-6 rounded-full bg-[#0b0b0c] border-2 border-amber-500 flex items-center justify-center shadow-bronze-sm group-hover:scale-125 transition-transform">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>

              {/* Card Container */}
              <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 shadow-xl space-y-5">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/70 pb-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-100 tracking-tight">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          {language === 'es' ? 'ACTUAL' : 'CURRENT'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-amber-300/90 mt-1 font-mono">
                      {exp.institution} {exp.department && `— ${exp.department}`}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-stone-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold mt-1 text-xs">◈</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Metrics Grid */}
                {exp.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {exp.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 font-mono"
                      >
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-amber-300/90 mt-0.5 block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-800/60">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-stone-900/80 text-stone-400 border border-stone-800/90"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
