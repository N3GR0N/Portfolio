import React from 'react';
import { GraduationCap, BookOpen, Globe2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Education: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="education" className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#090a10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t('education.sectionBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('education.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Degree Card */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0e101a] p-6 sm:p-8 hover:border-indigo-500/30 transition-all shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                      UNLP · 4to AÑO
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white pt-1">
                    {t('education.degree')}
                  </h3>
                  <p className="text-sm font-medium text-indigo-300">
                    {t('education.institution')} — {t('education.faculty')}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-indigo-400 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {t('education.description')}
              </p>

              {/* Core Academic Foundations */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                  {language === 'es' ? 'Áreas Académicas Clave:' : 'Core Academic Pillars:'}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">▹</span>
                    <span>Sistemas Distribuidos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">▹</span>
                    <span>Sistemas Operativos &amp; Concurrencia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">▹</span>
                    <span>Bases de Datos &amp; Modelado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">▹</span>
                    <span>Ingeniería de Software &amp; Testing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{t('education.period')}</span>
              <span className="text-emerald-400 font-medium">{t('education.status')}</span>
            </div>
          </div>

          {/* Languages & Proficiency Card */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0e101a] p-6 sm:p-8 hover:border-indigo-500/30 transition-all shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-sky-400">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {t('education.languagesTitle')}
                </h3>
              </div>

              {/* Spanish */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-sm">
                    {t('education.languages.es.name')}
                  </span>
                  <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {t('education.languages.es.level')}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {language === 'es' ? 'Lengua materna, comunicación fluida.' : 'Native speaker, native proficiency.'}
                </p>
              </div>

              {/* English */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-sm">
                    {t('education.languages.en.name')}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    C1 ADVANCED
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t('education.languages.en.level')}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Full Professional Working Proficiency</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
              💡 {language === 'es' ? 'Capacidad para redactar especificaciones técnicas y coordinar equipos multiculturales en inglés.' : 'Capable of writing RFC technical specs and collaborating across global distributed engineering teams.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
