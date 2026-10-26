import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Education: React.FC = () => {
  const { t } = useLanguage();

  const corePillars = [
    { code: 'CS-401', name: 'Sistemas Distribuidos & Concurrencia' },
    { code: 'CS-302', name: 'Bases de Datos Relacionales & SQL' },
    { code: 'CS-204', name: 'Algoritmos, Complejidad & Estructuras de Datos' },
    { code: 'CS-305', name: 'Sistemas Operativos & Redes de Datos' },
    { code: 'CS-408', name: 'Ingeniería de Software & Testing' },
    { code: 'CS-201', name: 'Arquitectura de Computadoras & Assembler' },
  ];

  return (
    <section id="education" className="bg-obsidian text-paper border-b border-white/20">
      <div className="max-w-[1078px] mx-auto px-6 sm:px-10 py-24 sm:py-32">
        {/* Section Header with Whisper Authority */}
        <div className="pb-16 border-b border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <span className="text-[12px] font-mono tracking-widest text-felt-gray uppercase">
              {t('education.sectionNumber')} // ACADEMIA
            </span>
            <span className="text-[11px] font-mono tracking-widest text-felt-gray uppercase">
              DEGREE & COMPETENCIES
            </span>
          </div>

          <h2 className="mt-6 text-[38px] sm:text-[60px] md:text-[76px] font-light tracking-[-0.03em] leading-[0.98] text-paper">
            {t('education.sectionTitle')}
          </h2>
        </div>

        {/* Degree & Languages Grid */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Degree Block (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-felt-gray uppercase">
                <span className="inline-block w-2 h-2 bg-paper sharp-edge" />
                <span>UNLP // 4TO AÑO EN CURSO</span>
                <span>·</span>
                <span>{t('education.period')}</span>
              </div>

              <h3 className="text-[30px] sm:text-[42px] font-light tracking-tight text-paper leading-tight">
                {t('education.degree')}
              </h3>

              <div className="text-[14px] font-mono text-paper/80 uppercase tracking-wide">
                {t('education.institution')}
              </div>
            </div>

            <p className="text-[16px] text-paper/70 font-light leading-relaxed">
              {t('education.focus')}
            </p>

            {/* Core Academic Foundations Pills */}
            <div className="space-y-3 pt-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-felt-gray">
                ÁREAS DE ESPECIALIZACIÓN ACADÉMICA:
              </div>
              <div className="flex flex-wrap gap-2">
                {corePillars.map((pillar) => (
                  <span
                    key={pillar.code}
                    className="px-3.5 py-1 text-[11px] font-mono text-paper/90 border border-white/20 pill-btn bg-white/5 hover:border-white/50 transition-colors"
                  >
                    <span className="text-felt-gray mr-1.5">{pillar.code}</span>
                    {pillar.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Languages & Certification Box (5 Cols - Strict 0px Sharp-Edge) */}
          <div className="lg:col-span-5 bg-neutral-950 text-paper border border-white/20 sharp-edge p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/20 text-[10px] font-mono tracking-widest text-felt-gray uppercase">
              <span>LINGUISTIC PROFICIENCY</span>
              <span className="text-paper">CEFR CERTIFIED</span>
            </div>

            <div className="space-y-5">
              {/* Spanish */}
              <div className="pb-4 border-b border-white/10 space-y-1">
                <div className="flex items-center justify-between text-[14px] font-light text-paper">
                  <span>Español / Spanish</span>
                  <span className="text-[11px] font-mono text-felt-gray uppercase">Nativo</span>
                </div>
                <div className="text-[12px] font-mono text-felt-gray">
                  Lengua materna · Comunicación técnica e interpersonal nativa
                </div>
              </div>

              {/* English */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[14px] font-light text-paper">
                  <span>English / Inglés</span>
                  <span className="text-[11px] font-mono text-felt-gray uppercase">
                    C1 Advanced
                  </span>
                </div>
                <div className="text-[12px] font-mono text-felt-gray leading-relaxed">
                  Plena competencia profesional, fluidez en documentación científica, redacción de RFCs y debates de arquitectura internacional.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-felt-gray uppercase flex justify-between">
              <span>GLOBAL WORKPLACE READY</span>
              <span>REMOTE / ASYNC FLUENCY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
