import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const ExperienceTimeline: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    {
      role: t('experience.items.0.role'),
      entity: t('experience.items.0.entity'),
      detail: t('experience.items.0.detail'),
      period: t('experience.items.0.period'),
      description: t('experience.items.0.description'),
      tags: ['Python', 'OOP', 'Git Workflows', 'Clean Architecture', 'Pedagogy'],
    },
    {
      role: t('experience.items.1.role'),
      entity: t('experience.items.1.entity'),
      detail: t('experience.items.1.detail'),
      period: t('experience.items.1.period'),
      description: t('experience.items.1.description'),
      tags: ['Workstation Assembly', 'Linux / Windows OS', 'Hardware Diagnostics', 'Networking'],
    },
    {
      role: t('experience.items.2.role'),
      entity: t('experience.items.2.entity'),
      detail: t('experience.items.2.detail'),
      period: t('experience.items.2.period'),
      description: t('experience.items.2.description'),
      tags: ['POS Infrastructure', 'Stock Systems', '99% Uptime', 'Incident Automation', 'MTTR < 15m'],
    },
  ];

  return (
    <section id="experience" className="bg-obsidian text-paper border-b border-white/20">
      <div className="max-w-[1078px] mx-auto px-6 sm:px-10 py-24 sm:py-32">
        {/* Section Header with Whisper Authority */}
        <div className="pb-16 border-b border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <span className="text-[12px] font-mono tracking-widest text-felt-gray uppercase">
              {t('experience.sectionNumber')} // TRAJECTORY & TEACHING
            </span>
            <span className="text-[11px] font-mono tracking-widest text-felt-gray uppercase">
              ACADEMIC & INDUSTRY PRACTICE
            </span>
          </div>

          <h2 className="mt-6 text-[38px] sm:text-[60px] md:text-[76px] font-light tracking-[-0.03em] leading-[0.98] text-paper">
            {t('experience.sectionTitle')}
          </h2>

          <p className="mt-6 max-w-[680px] text-[16px] sm:text-[18px] text-paper/70 font-light leading-relaxed">
            {t('experience.sectionSubtitle')}
          </p>
        </div>

        {/* Editorial Trajectory Ledger */}
        <div className="divide-y divide-white/20">
          {items.map((item, idx) => (
            <article key={idx} className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Period & Index (4 cols) */}
              <div className="md:col-span-4 space-y-2">
                <div className="text-[11px] font-mono text-felt-gray uppercase tracking-widest">
                  0{idx + 1} // {item.period}
                </div>
                <div className="text-[13px] font-mono text-paper/90 uppercase tracking-wider">
                  {item.detail}
                </div>
              </div>

              {/* Right Column: Role, Entity, Description & Pill Tags (8 cols) */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <h3 className="text-[24px] sm:text-[32px] font-light tracking-tight text-paper">
                    {item.role}
                  </h3>
                  <div className="mt-1 text-[13px] font-mono text-felt-gray uppercase tracking-widest">
                    {item.entity}
                  </div>
                </div>

                <p className="text-[15px] sm:text-[16px] text-paper/80 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Tags - Strict 75px binary pill */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-felt-gray border border-white/20 pill-btn hover:text-paper hover:border-white/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
