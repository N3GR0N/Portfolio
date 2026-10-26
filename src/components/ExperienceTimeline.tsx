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
      period: t('experience.items.academic.period'),
      location: t('experience.items.academic.location'),
      bullets: t('experience.items.academic.bullets') as string[],
      metrics: t('experience.items.academic.metrics') as { label: string; value: string }[],
      tags: t('experience.items.academic.tags') as string[],
      icon: <GraduationCap className="w-4 h-4 text-indigo-400" />,
      badgeColor: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
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
      icon: <Wrench className="w-4 h-4 text-sky-400" />,
      badgeColor: 'border-sky-500/30 text-sky-300 bg-sky-500/10',
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
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
      isCurrent: false,
    },
  ];

  return (
    <section id="experience" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('experience.sectionBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('experience.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-2.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-indigo-500 before:via-sky-500 before:to-emerald-500/40">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Node Point */}
              <div className="absolute -left-[30px] sm:-left-[42px] top-1.5 w-6 h-6 rounded-full bg-[#090a0f] border-2 border-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-125 transition-transform">
                <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:bg-sky-400 transition-colors" />
              </div>

              {/* Card Container */}
              <div className="rounded-2xl border border-white/10 bg-[#0e101a] p-6 sm:p-8 hover:border-indigo-500/30 transition-all duration-300 shadow-xl space-y-5">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {language === 'es' ? 'ACTUAL' : 'CURRENT'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-indigo-300 mt-1">
                      {exp.institution}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-indigo-400 font-bold mt-1 text-xs">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Metrics Pill Grid */}
                {exp.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {exp.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono"
                      >
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5 block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-slate-400 border border-white/5"
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
