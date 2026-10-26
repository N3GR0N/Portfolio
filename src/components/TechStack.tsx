import React, { useState } from 'react';
import { Search, Cpu, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  TypeScriptIcon,
  PythonIcon,
  JavaIcon,
  PostgreSqlIcon,
  SupabaseIcon,
  NextJsIcon,
  WebGlIcon,
  DockerIcon,
  DjangoIcon,
  SpringBootIcon,
  LinuxIcon,
  GitIcon,
  TerminalIcon,
  AiCopilotIcon,
} from './TechIcons';

interface SkillItem {
  name: string;
  category: 'languages' | 'frameworks' | 'data' | 'tools' | 'ai';
  icon: React.ReactNode;
  level: string;
  featured?: boolean;
}

export const TechStack: React.FC = () => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');

  const skills: SkillItem[] = [
    // Languages
    { name: 'TypeScript', category: 'languages', icon: <TypeScriptIcon />, level: 'Primary / Production', featured: true },
    { name: 'JavaScript (ES6+)', category: 'languages', icon: <TypeScriptIcon />, level: 'Advanced', featured: true },
    { name: 'Python', category: 'languages', icon: <PythonIcon />, level: 'Academic / Cátedra', featured: true },
    { name: 'Java', category: 'languages', icon: <JavaIcon />, level: 'Enterprise / Spring', featured: true },
    { name: 'SQL', category: 'languages', icon: <PostgreSqlIcon />, level: 'Relational & ACID', featured: true },

    // Frameworks & Libraries
    { name: 'Next.js (App Router)', category: 'frameworks', icon: <NextJsIcon />, level: 'Fullstack React', featured: true },
    { name: 'React (v19)', category: 'frameworks', icon: <NextJsIcon />, level: 'Frontend Core', featured: true },
    { name: 'Spring Boot', category: 'frameworks', icon: <SpringBootIcon />, level: 'Microservices', featured: true },
    { name: 'Django', category: 'frameworks', icon: <DjangoIcon />, level: 'Backend ORM', featured: true },
    { name: 'Flask', category: 'frameworks', icon: <PythonIcon />, level: 'Modular APIs' },

    // Data & Modeling
    { name: 'PostgreSQL', category: 'data', icon: <PostgreSqlIcon />, level: 'Indexing & RBAC', featured: true },
    { name: 'Supabase', category: 'data', icon: <SupabaseIcon />, level: 'Cloud Postgres', featured: true },
    { name: 'MySQL', category: 'data', icon: <PostgreSqlIcon />, level: 'Relational DB' },
    { name: 'Modelado Relacional', category: 'data', icon: <PostgreSqlIcon />, level: 'Normalización' },
    { name: 'Optimización de Consultas', category: 'data', icon: <PostgreSqlIcon />, level: 'Query Plans', featured: true },

    // Tools & Environments
    { name: 'WebGL2', category: 'tools', icon: <WebGlIcon />, level: '360° Sky Canvas', featured: true },
    { name: 'Docker', category: 'tools', icon: <DockerIcon />, level: 'Containers & Compose', featured: true },
    { name: 'Linux', category: 'tools', icon: <LinuxIcon />, level: 'Dev & Server OS', featured: true },
    { name: 'Bash / Shell', category: 'tools', icon: <TerminalIcon />, level: 'Scripting' },
    { name: 'Git & GitHub Flow', category: 'tools', icon: <GitIcon />, level: 'Branching & PRs', featured: true },
    { name: 'REST APIs & WebSockets', category: 'tools', icon: <TerminalIcon />, level: 'Contract Design' },
    { name: 'VS Code & IntelliJ IDEA', category: 'tools', icon: <TerminalIcon />, level: 'IDEs' },
    { name: 'Agilismo (Scrum)', category: 'tools', icon: <TerminalIcon />, level: 'Workflows' },

    // AI & Quality
    { name: 'GitHub Copilot', category: 'ai', icon: <AiCopilotIcon />, level: 'Pair Programming', featured: true },
    { name: 'OpenCode & AI Assistants', category: 'ai', icon: <AiCopilotIcon />, level: 'Workflow Acceleration', featured: true },
    { name: 'Prompt Engineering', category: 'ai', icon: <AiCopilotIcon />, level: 'Code Gen & Auditing', featured: true },
    { name: 'Auditoría de Código & Review', category: 'ai', icon: <CheckCircle2 className="w-5 h-5" />, level: 'Clean Architecture', featured: true },
    { name: 'Testing & Control de Calidad', category: 'ai', icon: <CheckCircle2 className="w-5 h-5" />, level: 'Reliability', featured: true },
  ];

  const filteredSkills = skills.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const categories = [
    { id: 'languages', title: t('stack.categories.languages'), items: filteredSkills.filter((s) => s.category === 'languages') },
    { id: 'frameworks', title: t('stack.categories.frameworks'), items: filteredSkills.filter((s) => s.category === 'frameworks') },
    { id: 'data', title: t('stack.categories.data'), items: filteredSkills.filter((s) => s.category === 'data') },
    { id: 'tools', title: t('stack.categories.tools'), items: filteredSkills.filter((s) => s.category === 'tools') },
    { id: 'ai', title: t('stack.categories.ai'), items: filteredSkills.filter((s) => s.category === 'ai') },
  ];

  return (
    <section id="stack" className="relative py-28 sm:py-36 border-t border-stone-800/60 bg-[#0e0d0c]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze-950/60 border border-bronze-700/50 text-amber-300 text-xs font-mono font-medium">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('stack.sectionBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
              {t('stack.title')}
            </h2>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-sans">
              {t('stack.subtitle')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('stack.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-800 focus:border-amber-500/50 outline-none text-xs text-stone-100 placeholder:text-stone-500 font-mono transition-colors shadow-inner"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            if (cat.items.length === 0) return null;

            return (
              <div
                key={cat.id}
                className="rounded-2xl glass-panel p-6 border border-stone-800/80 hover:border-bronze-600/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-mono font-semibold text-amber-300/90 tracking-wide uppercase mb-4 pb-2.5 border-b border-stone-800/80 flex items-center justify-between">
                    <span>{cat.title}</span>
                    <span className="text-[10px] text-stone-500">{cat.items.length}</span>
                  </h3>

                  <div className="space-y-2">
                    {cat.items.map((skill) => (
                      <div
                        key={skill.name}
                        className={`group flex items-center justify-between gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                          skill.featured
                            ? 'bg-stone-900/70 border border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-800/80 text-stone-200 hover:text-white'
                            : 'bg-stone-950/40 border border-stone-900 hover:border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-stone-400 group-hover:text-amber-400 transition-colors shrink-0">
                            {skill.icon}
                          </div>
                          <span className="text-xs font-mono font-medium">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-stone-500 group-hover:text-amber-300/80 transition-colors uppercase tracking-wider">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[10px] font-mono text-stone-500">
                  <span>{language === 'es' ? 'Validado en producción' : 'Production verified'}</span>
                  <span className="text-emerald-400/90 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    ACTIVE
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
