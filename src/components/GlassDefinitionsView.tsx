import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Sparkles, Orbit, Server, Database, ShieldCheck } from 'lucide-react';

interface GlassDefinitionsViewProps {
  onBack: () => void;
}

export const GlassDefinitionsView: React.FC<GlassDefinitionsViewProps> = ({ onBack }) => {
  const { language } = useLanguage();

  const terms = [
    {
      term: language === 'es' ? 'Sistemas Distribuidos & Concurrencia' : 'Distributed Systems & Concurrency',
      desc:
        language === 'es'
          ? 'Microservicios desacoplados con control de concurrencia pesimista en PostgreSQL y modelado transaccional para garantizar consistencia estricta en la asignación de recursos.'
          : 'Decoupled microservice architectures with pessimistic concurrency locking in PostgreSQL and transactional modeling ensuring ACID consistency across shared states.',
      icon: <Server className="w-4 h-4 text-amber-400" />,
    },
    {
      term: language === 'es' ? 'Observabilidad Multi-espectral' : 'Multi-Spectral Observability',
      desc:
        language === 'es'
          ? 'Renderizado en tiempo real en WebGL2 y Rust/WASM integrando datos de telescopios espaciales (JWST, Hubble, Chandra) sobre infraestructura de teselas HiPS sin latencia.'
          : 'Real-time 360° rendering in WebGL2 and Rust/WASM streaming astronomical surveys (JWST, Hubble, Chandra) across hierarchical progressive HiPS tile pipelines.',
      icon: <Orbit className="w-4 h-4 text-amber-400" />,
    },
    {
      term: language === 'es' ? 'Orquestación de Procesos BPM' : 'BPM Process Orchestration',
      desc:
        language === 'es'
          ? 'Modelado y articulación de flujos de contingencia con Bonita BPM REST API, validación de credenciales y seguridad multi-tenant basada en tokens JWT.'
          : 'Modeling and dispatch of complex incident contingency workflows using Bonita BPM REST API, credential validation, and multi-tenant JWT security.',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    },
    {
      term: language === 'es' ? 'Modelado Relacional & Rendimiento' : 'Relational Modeling & Query Performance',
      desc:
        language === 'es'
          ? 'Esquemas relacionales optimizados con índices compuestos para consultas en sub-milisegundos, asegurando integridad referencial absoluta.'
          : 'Optimized relational schemas with composite indexing delivering sub-millisecond query execution and zero overbooking collisions.',
      icon: <Database className="w-4 h-4 text-amber-400" />,
    },
    {
      term: language === 'es' ? 'Desarrollo Impulsado por IA & Calidad' : 'AI-Driven Development & Code Quality',
      desc:
        language === 'es'
          ? 'Aceleración del ciclo de vida del software mediante prompts técnicos y asistentes de IA, auditados rigurosamente con testing unitario y tipado estricto en TypeScript.'
          : 'Software lifecycle acceleration through technical prompt engineering and AI assistants, backed by strict TypeScript typing, code audits, and clean software architecture.',
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
    },
  ];

  return (
    <div className="relative py-20 px-6 sm:px-12 max-w-4xl mx-auto space-y-12 font-sans animate-fade-in text-stone-300">
      {/* Back Sliver Action */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-800/80">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-stone-800 hover:border-amber-500/50 text-amber-300 hover:text-white transition-all text-xs font-mono group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>{language === 'es' ? '← Volver al Cristal Ensamblado' : '← Back to Assembled Glass'}</span>
        </button>

        <span className="text-xs font-mono text-stone-500">
          JUAN PEDRO SUÑER // 5 PRINCIPLES
        </span>
      </div>

      {/* Main Title */}
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
          {language === 'es'
            ? 'Arquitectura de software, en cinco principios.'
            : 'Real-time engineering, in five terms.'}
        </h2>
        <p className="text-xs sm:text-sm font-mono text-stone-400">
          {language === 'es'
            ? 'Los fundamentos técnicos que articulan cada sistema que diseño y construyo.'
            : 'The architectural foundations powering every system I design and build.'}
        </p>
      </div>

      {/* Five Terms List */}
      <div className="space-y-8 font-sans">
        {terms.map((item, idx) => (
          <div key={idx} className="space-y-2 p-5 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/30 transition-all">
            <div className="flex items-center gap-2.5">
              {item.icon}
              <h3 className="text-base sm:text-lg font-bold text-stone-100 font-mono">
                {item.term}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans pl-6">
              — {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
