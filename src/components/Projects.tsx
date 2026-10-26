import React, { useState } from 'react';
import { Sparkles, Orbit, Server, Database, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './GithubIcon';
import type { Project } from '../types';

interface ProjectsProps {
  onOpenSandbox: (projectId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenSandbox }) => {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'astronomy' | 'distributed' | 'backend'>('all');

  const projectsData: Project[] = [
    {
      id: 'aetherscope',
      title: t('projects.items.aetherscope.title'),
      subtitle: t('projects.items.aetherscope.subtitle'),
      category: 'astronomy',
      categoryLabel: t('projects.items.aetherscope.categoryLabel'),
      description: t('projects.items.aetherscope.description'),
      stack: ['Next.js', 'TypeScript', 'MapLibre GL', 'Tailwind CSS', 'NASA DONKI API', 'PostgreSQL'],
      badges: ['Next.js', 'TypeScript', 'MapLibre GL', 'Astronomy', 'NASA API'],
      highlights: t('projects.items.aetherscope.highlights') as string[],
      githubUrl: 'https://github.com/N3GRON',
      demoUrl: '#',
      featured: true,
      metrics: t('projects.items.aetherscope.metrics') as { label: string; value: string }[],
      interactiveType: 'sky-map',
    },
    {
      id: 'rescuesync',
      title: t('projects.items.rescuesync.title'),
      subtitle: t('projects.items.rescuesync.subtitle'),
      category: 'distributed',
      categoryLabel: t('projects.items.rescuesync.categoryLabel'),
      description: t('projects.items.rescuesync.description'),
      stack: ['Java Spring Boot', 'PostgreSQL', 'Docker', 'Bonita BPM', 'REST API', 'Angular'],
      badges: ['Java Spring Boot', 'PostgreSQL', 'Docker', 'Bonita BPM', 'REST API'],
      highlights: t('projects.items.rescuesync.highlights') as string[],
      githubUrl: 'https://github.com/N3GRON',
      demoUrl: '#',
      featured: true,
      metrics: t('projects.items.rescuesync.metrics') as { label: string; value: string }[],
      interactiveType: 'process-orchestrator',
    },
    {
      id: 'alquilando',
      title: t('projects.items.alquilando.title'),
      subtitle: t('projects.items.alquilando.subtitle'),
      category: 'backend',
      categoryLabel: t('projects.items.alquilando.categoryLabel'),
      description: t('projects.items.alquilando.description'),
      stack: ['Python', 'Django', 'Flask', 'PostgreSQL', 'Docker', 'Linux', 'SQL'],
      badges: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Linux'],
      highlights: t('projects.items.alquilando.highlights') as string[],
      githubUrl: 'https://github.com/N3GRON',
      demoUrl: '#',
      featured: false,
      metrics: t('projects.items.alquilando.metrics') as { label: string; value: string }[],
      interactiveType: 'api-bench',
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  // Spotlight card mouse tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('projects.sectionBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t('projects.title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121422] border border-white/10 text-xs font-mono overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('projects.filterAll')}
            </button>
            <button
              onClick={() => setActiveFilter('astronomy')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeFilter === 'astronomy'
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('projects.filterAstronomy')}
            </button>
            <button
              onClick={() => setActiveFilter('distributed')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeFilter === 'distributed'
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('projects.filterDistributed')}
            </button>
            <button
              onClick={() => setActiveFilter('backend')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeFilter === 'backend'
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('projects.filterBackend')}
            </button>
          </div>
        </div>

        {/* Projects Showcase Cards */}
        <div className="grid grid-cols-1 gap-8">
          {filteredProjects.map((project) => {
            const isFlagship = project.id === 'aetherscope';

            return (
              <div
                key={project.id}
                onMouseMove={handleMouseMove}
                className="group relative rounded-3xl border border-white/10 bg-[#0c0d16] p-6 sm:p-8 hover:border-indigo-500/40 transition-all duration-300 shadow-xl overflow-hidden"
                style={{
                  background:
                    'radial-gradient(600px circle at var(--mouse-x, 200px) var(--mouse-y, 200px), rgba(99, 102, 241, 0.08), transparent 40%), #0c0d16',
                }}
              >
                {/* Subtle top indicator */}
                {isFlagship && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500/20 via-sky-500/10 to-transparent px-6 py-2 rounded-bl-2xl border-l border-b border-indigo-500/30">
                    <span className="text-[11px] font-mono text-indigo-300 flex items-center gap-1.5 font-semibold">
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      {language === 'es' ? 'PROYECTO INSIGNIA' : 'FLAGSHIP SYSTEM'}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Info, description, highlights */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Category pill */}
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-[#161828] text-indigo-300 border border-indigo-500/20">
                        {project.categoryLabel}
                      </span>
                      {project.metrics && (
                        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                          • {project.metrics[0].value}
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-1.5">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-400 font-mono">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architectural Highlights */}
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                        {t('projects.highlightsLabel')}:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-indigo-400 mt-0.5">•</span>
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges / Chips */}
                    <div className="pt-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold mb-2">
                        {t('projects.technologiesLabel')}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.badges.map((badge) => (
                          <span
                            key={badge}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-slate-300 border border-white/5 hover:border-indigo-500/30 hover:text-white transition-colors"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                      {/* Interactive Sandbox Button */}
                      <button
                        onClick={() => onOpenSandbox(project.id)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-mono font-medium shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{t('projects.interactivePreview')}</span>
                      </button>

                      {/* GitHub Link */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#141624] hover:bg-[#1a1d30] border border-white/10 hover:border-white/20 text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t('projects.viewCode')}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup / Architecture Telemetry Card */}
                  <div className="lg:col-span-5 w-full h-full flex flex-col justify-between">
                    <div className="rounded-2xl bg-[#090a10] border border-white/10 p-5 space-y-4 font-mono text-xs shadow-inner">
                      {/* Simulated Card Header */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2 text-indigo-400">
                          {project.id === 'aetherscope' ? (
                            <Orbit className="w-4 h-4 text-sky-400" />
                          ) : project.id === 'rescuesync' ? (
                            <Server className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <Database className="w-4 h-4 text-emerald-400" />
                          )}
                          <span className="font-semibold text-slate-200">
                            {project.id === 'aetherscope'
                              ? 'aetherscope-v2.core'
                              : project.id === 'rescuesync'
                              ? 'rescuesync-dssd.cluster'
                              : 'alquilando-orm.engine'}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          ONLINE
                        </span>
                      </div>

                      {/* Interactive Visual Graphic Mockup */}
                      <div
                        onClick={() => onOpenSandbox(project.id)}
                        className="cursor-pointer group/screen relative h-44 rounded-xl bg-gradient-to-b from-[#10121d] to-[#07080d] border border-white/5 overflow-hidden flex flex-col items-center justify-center p-4 transition-all hover:border-indigo-500/40"
                      >
                        <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

                        {project.id === 'aetherscope' && (
                          <div className="text-center space-y-2 z-10">
                            <div className="w-16 h-16 mx-auto rounded-full border border-sky-400/40 flex items-center justify-center bg-sky-500/10 group-hover/screen:scale-110 transition-transform">
                              <Orbit className="w-8 h-8 text-sky-400 animate-pulse" />
                            </div>
                            <span className="text-[11px] text-slate-300 font-mono block">
                              MapLibre GL &amp; NASA DONKI
                            </span>
                            <span className="text-[10px] text-indigo-400 flex items-center justify-center gap-1">
                              <Play className="w-2.5 h-2.5 fill-current" />
                              {language === 'es' ? 'Clic para probar simulador' : 'Click to launch simulator'}
                            </span>
                          </div>
                        )}

                        {project.id === 'rescuesync' && (
                          <div className="text-center space-y-2 z-10">
                            <div className="w-16 h-16 mx-auto rounded-full border border-indigo-400/40 flex items-center justify-center bg-indigo-500/10 group-hover/screen:scale-110 transition-transform">
                              <Server className="w-8 h-8 text-indigo-400" />
                            </div>
                            <span className="text-[11px] text-slate-300 font-mono block">
                              Bonita BPM &amp; Java Microservices
                            </span>
                            <span className="text-[10px] text-indigo-400 flex items-center justify-center gap-1">
                              <Play className="w-2.5 h-2.5 fill-current" />
                              {language === 'es' ? 'Clic para probar orquestador' : 'Click to launch orchestrator'}
                            </span>
                          </div>
                        )}

                        {project.id === 'alquilando' && (
                          <div className="text-center space-y-2 z-10">
                            <div className="w-16 h-16 mx-auto rounded-full border border-emerald-400/40 flex items-center justify-center bg-emerald-500/10 group-hover/screen:scale-110 transition-transform">
                              <Database className="w-8 h-8 text-emerald-400" />
                            </div>
                            <span className="text-[11px] text-slate-300 font-mono block">
                              PostgreSQL &amp; Concurrency Control
                            </span>
                            <span className="text-[10px] text-indigo-400 flex items-center justify-center gap-1">
                              <Play className="w-2.5 h-2.5 fill-current" />
                              {language === 'es' ? 'Clic para benchmarking' : 'Click to test query benchmark'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Performance Telemetry Strip */}
                      {project.metrics && (
                        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/5">
                          {project.metrics.map((m, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-black/40 text-center">
                              <span className="text-[9px] text-slate-500 uppercase tracking-wider block">
                                {m.label}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-200 block mt-0.5">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
