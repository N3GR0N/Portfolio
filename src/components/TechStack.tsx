import React, { useState } from 'react';
import { Search, Code2, Layout, Database, Terminal, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TechItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'tools' | 'ai';
  level?: string;
  featured?: boolean;
}

export const TechStack: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const techItems: TechItem[] = [
    // Languages
    { name: 'TypeScript', category: 'languages', level: 'Primary', featured: true },
    { name: 'JavaScript (ES6+)', category: 'languages', level: 'Advanced', featured: true },
    { name: 'Python', category: 'languages', level: 'Primary / Academic', featured: true },
    { name: 'Java', category: 'languages', level: 'Advanced / Spring', featured: true },
    { name: 'SQL (PostgreSQL/MySQL)', category: 'languages', level: 'Advanced', featured: true },
    { name: 'C', category: 'languages', level: 'Academic / Systems' },
    { name: 'Bash / Shell', category: 'languages', level: 'Scripting' },

    // Frontend & UI
    { name: 'React (v19)', category: 'frontend', level: 'Primary', featured: true },
    { name: 'Next.js (App Router)', category: 'frontend', level: 'Primary', featured: true },
    { name: 'Tailwind CSS', category: 'frontend', level: 'Advanced', featured: true },
    { name: 'MapLibre GL', category: 'frontend', level: 'Geospatial & Sky', featured: true },
    { name: 'Vue.js', category: 'frontend', level: 'Component-based' },
    { name: 'Angular', category: 'frontend', level: 'Enterprise' },
    { name: 'HTML5 & Canvas API', category: 'frontend', level: 'Visual Rendering' },

    // Backend & DB
    { name: 'Spring Boot (Java)', category: 'backend', level: 'Microservices', featured: true },
    { name: 'Django', category: 'backend', level: 'Fullstack / ORM', featured: true },
    { name: 'Flask', category: 'backend', level: 'Modular APIs', featured: true },
    { name: 'PostgreSQL', category: 'backend', level: 'ACID / Indexing', featured: true },
    { name: 'Docker & Docker Compose', category: 'backend', level: 'Containers', featured: true },
    { name: 'REST APIs & WebSockets', category: 'backend', level: 'Architecture', featured: true },
    { name: 'MySQL', category: 'backend', level: 'Relational' },
    { name: 'JWT & RBAC Security', category: 'backend', level: 'Auth' },

    // Tools & DevOps
    { name: 'Git & GitHub Flow', category: 'tools', level: 'Branching & PRs', featured: true },
    { name: 'Linux / Debian / Ubuntu', category: 'tools', level: 'Primary OS', featured: true },
    { name: 'WSL2', category: 'tools', level: 'Dev Environment' },
    { name: 'Vite', category: 'tools', level: 'Fast Bundling', featured: true },
    { name: 'Bonita BPM Engine', category: 'tools', level: 'Process Modeling' },
    { name: 'VS Code & IntelliJ IDEA', category: 'tools', level: 'IDEs' },
    { name: 'Agile (Scrum)', category: 'tools', level: 'Methodology' },

    // AI & Quality
    { name: 'GitHub Copilot', category: 'ai', level: 'Pair Programming', featured: true },
    { name: 'OpenCode & AI Workflows', category: 'ai', level: 'Automation', featured: true },
    { name: 'Prompt Engineering', category: 'ai', level: 'Code Generation', featured: true },
    { name: 'Code Auditing & Review', category: 'ai', level: 'Clean Code', featured: true },
    { name: 'Unit Testing & Quality Control', category: 'ai', level: 'Reliability', featured: true },
  ];

  const filteredTech = techItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    {
      id: 'languages',
      title: t('stack.categories.languages'),
      icon: <Code2 className="w-4 h-4 text-indigo-400" />,
      items: filteredTech.filter((i) => i.category === 'languages'),
    },
    {
      id: 'frontend',
      title: t('stack.categories.frontend'),
      icon: <Layout className="w-4 h-4 text-sky-400" />,
      items: filteredTech.filter((i) => i.category === 'frontend'),
    },
    {
      id: 'backend',
      title: t('stack.categories.backend'),
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      items: filteredTech.filter((i) => i.category === 'backend'),
    },
    {
      id: 'tools',
      title: t('stack.categories.tools'),
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      items: filteredTech.filter((i) => i.category === 'tools'),
    },
    {
      id: 'ai',
      title: t('stack.categories.ai'),
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      items: filteredTech.filter((i) => i.category === 'ai'),
    },
  ];

  return (
    <section id="stack" className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#090a10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
              <Cpu className="w-3.5 h-3.5" />
              <span>{t('stack.sectionBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t('stack.title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              {t('stack.subtitle')}
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('stack.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121422] border border-white/10 focus:border-indigo-500/50 outline-none text-xs text-white placeholder:text-slate-500 font-mono transition-colors shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
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
                className="rounded-2xl border border-white/10 bg-[#0e101a] p-6 hover:border-indigo-500/30 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/5">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      {cat.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className={`group/item flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                          item.featured
                            ? 'bg-indigo-600/10 text-indigo-200 border border-indigo-500/30 hover:border-indigo-500/60'
                            : 'bg-white/[0.02] text-slate-300 border border-white/5 hover:border-white/15'
                        }`}
                      >
                        <span className="font-medium text-[11px]">{item.name}</span>
                        {item.level && (
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider group-hover/item:text-indigo-300 transition-colors">
                            {item.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{cat.items.length} {language === 'es' ? 'tecnologías' : 'technologies'}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
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
