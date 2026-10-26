import React from 'react';
import { GraduationCap, BookOpen, Globe2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Education: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="education" className="relative py-28 sm:py-36 border-t border-stone-800/60 bg-[#0e0d0c]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze-950/60 border border-bronze-700/50 text-amber-300 text-xs font-mono font-medium">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('education.sectionBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
            {t('education.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Degree Card */}
          <div className="lg:col-span-7 rounded-3xl glass-panel p-6 sm:p-8 border border-stone-800/80 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">
                      UNLP · 4to AÑO
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-stone-100 pt-1">
                    {t('education.degree')}
                  </h3>
                  <p className="text-sm font-medium text-amber-300/90 font-mono">
                    {t('education.institution')} — {t('education.faculty')}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-amber-400 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed font-sans">
                {t('education.description')}
              </p>

              {/* Core Academic Foundations */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                  {language === 'es' ? 'Fundamentos Académicos Nucleares:' : 'Core Computer Science Pillars:'}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-300">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">◈</span>
                    <span>Sistemas Distribuidos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">◈</span>
                    <span>Sistemas Operativos &amp; Concurrencia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">◈</span>
                    <span>Bases de Datos &amp; Optimización SQL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">◈</span>
                    <span>Ingeniería de Software &amp; Testing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800/60 flex items-center justify-between text-xs font-mono text-stone-400">
              <span>{t('education.period')}</span>
              <span className="text-emerald-400 font-medium">{t('education.status')}</span>
            </div>
          </div>

          {/* Languages & Proficiency Card */}
          <div className="lg:col-span-5 rounded-3xl glass-panel p-6 sm:p-8 border border-stone-800/80 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-800/70">
                <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-amber-400">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-100 font-mono">
                  {t('education.languagesTitle')}
                </h3>
              </div>

              {/* Spanish */}
              <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-100 text-sm">
                    {t('education.languages.es.name')}
                  </span>
                  <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                    {t('education.languages.es.level')}
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-sans">
                  {language === 'es' ? 'Lengua materna, comunicación profesional fluida.' : 'Native speaker, native proficiency.'}
                </p>
              </div>

              {/* English */}
              <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-100 text-sm">
                    {t('education.languages.en.name')}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30 font-bold">
                    C1 ADVANCED
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {t('education.languages.en.level')}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Full Professional Working Proficiency</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-bronze-950/40 border border-bronze-700/40 text-[11px] font-mono text-amber-300/90 leading-relaxed">
              💡 {language === 'es' ? 'Fluidez técnica para redacción de especificaciones de arquitectura y coordinación de equipos de software multiculturales.' : 'Fluent technical communication for drafting RFC specs and coordinating across distributed engineering teams.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
