import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Maximize2 } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const Projects: React.FC = () => {
  const { t } = useLanguage();

  // AetherScope screenshot showcase state
  const [activeView, setActiveView] = useState<'pillars' | 'navigator'>('pillars');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const aetherViews = {
    pillars: {
      src: '/images/aetherscope-pillars.png',
      title: 'PILARES DE LA CREACIÓN / M16',
      subtitle: 'Análisis Físico-Químico, 85% H-Alfa, Régimen Térmico & Slider Espectral',
      badge: 'JWST + DSS2 + HUBBLE',
    },
    navigator: {
      src: '/images/aetherscope-navigator.jpg',
      title: 'DEEP SPACE SPECTRAL NAVIGATOR',
      subtitle: 'Navegación 360° en WebGL2 / Aladin Lite (Rust WASM) & Retícula J2000.0',
      badge: 'RA: 18h 18m | DEC: -13° 48′',
    },
  };

  return (
    <section id="projects" className="bg-obsidian text-paper border-b border-white/20">
      {/* Editorial Container Max 1078px */}
      <div className="max-w-[1078px] mx-auto px-6 sm:px-10 py-24 sm:py-32">
        {/* Section Header with Whisper Authority */}
        <div className="pb-16 border-b border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <span className="text-[12px] font-mono tracking-widest text-felt-gray uppercase">
              {t('projects.sectionNumber')} // ARCHIVE
            </span>
            <span className="text-[11px] font-mono tracking-widest text-felt-gray uppercase">
              CURATED SOFTWARE SYSTEMS
            </span>
          </div>

          <h2 className="mt-6 text-[38px] sm:text-[60px] md:text-[76px] font-light tracking-[-0.03em] leading-[0.98] text-paper">
            {t('projects.sectionTitle')}
          </h2>

          <p className="mt-6 max-w-[680px] text-[16px] sm:text-[18px] text-paper/70 font-light leading-relaxed">
            {t('projects.sectionSubtitle')}
          </p>
        </div>

        {/* ========================================================
            PROJECT 01: AETHERSCOPE (FLAGSHIP - WITH LIVE DEMO & REPO)
            ======================================================== */}
        <article className="py-20 border-b border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Specs & Content (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Meta Tagline */}
                <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-felt-gray uppercase">
                  <span className="inline-block w-2 h-2 bg-paper sharp-edge" />
                  <span>01.1 // {t('projects.items.aetherscope.category')}</span>
                  <span>·</span>
                  <span>{t('projects.items.aetherscope.year')}</span>
                </div>

                {/* Flagship Notice */}
                <div className="mt-3 text-[10px] font-mono tracking-widest text-paper bg-white/10 border border-white/20 px-2.5 py-1 inline-block uppercase">
                  {t('projects.flagshipNotice')}
                </div>

                {/* Project Title */}
                <h3 className="mt-4 text-[34px] sm:text-[46px] font-light tracking-tight text-paper">
                  {t('projects.items.aetherscope.title')}
                </h3>

                {/* Description */}
                <p className="mt-6 text-[15px] sm:text-[16px] text-paper/80 leading-relaxed font-light">
                  {t('projects.items.aetherscope.description')}
                </p>

                {/* Tech Tags - Strict 75px binary pill */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    'Next.js',
                    'TypeScript',
                    'WebGL2',
                    'Rust / WASM',
                    'Supabase',
                    'NASA HiPS APIs',
                    'Aladin Lite',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1 text-[11px] font-mono text-paper/90 border border-white/20 pill-btn bg-white/5 hover:border-white/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Strict 75px Binary Capsule with Guaranteed High Contrast */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {/* Live Demo Button (ONLY FOR AETHERSCOPE) */}
                <a
                  href="https://aether-scope-two.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#000000';
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest border border-white pill-btn transition-all duration-300 font-semibold"
                >
                  <span>{t('projects.viewDemo')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* GitHub Button */}
                <a
                  href="https://github.com/N3GR0N/AetherScope/tree/0.1.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-paper border border-white/30 pill-btn hover:border-paper hover:bg-white/10 transition-all duration-500"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{t('projects.viewCode')}</span>
                </a>
              </div>
            </div>

            {/* Right Authentic Screenshot Showcase Shell (6 Cols - Strict 0px Sharp-Edge) */}
            <div className="lg:col-span-6 bg-neutral-950 text-paper border border-white/20 sharp-edge p-5 flex flex-col justify-between">
              {/* Header & View Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/20 gap-3 text-[10px] font-mono tracking-widest uppercase">
                <span className="text-felt-gray">AETHERSCOPE // REAL PLATFORM CAPTURE</span>
                <span className="text-paper flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-paper rounded-full animate-pulse" />
                  ACTIVE DEPLOY
                </span>
              </div>

              {/* View Switcher Tabs (Strict High Contrast) */}
              <div className="pt-3 pb-2 flex gap-2 text-[10px] font-mono">
                <button
                  onClick={() => setActiveView('pillars')}
                  className={`px-3 py-1 uppercase tracking-wider pill-btn border transition-all ${
                    activeView === 'pillars'
                      ? 'border-white bg-white/20 text-paper font-semibold'
                      : 'border-white/20 text-felt-gray hover:text-paper hover:border-white/50'
                  }`}
                >
                  {activeView === 'pillars' ? '● ' : ''}01 // Pilares de la Creación (M16)
                </button>

                <button
                  onClick={() => setActiveView('navigator')}
                  className={`px-3 py-1 uppercase tracking-wider pill-btn border transition-all ${
                    activeView === 'navigator'
                      ? 'border-white bg-white/20 text-paper font-semibold'
                      : 'border-white/20 text-felt-gray hover:text-paper hover:border-white/50'
                  }`}
                >
                  {activeView === 'navigator' ? '● ' : ''}02 // Deep Space Navigator
                </button>
              </div>

              {/* Main Screenshot Shell with Hover Zoom Trigger */}
              <div
                onClick={() => setIsZoomOpen(true)}
                className="relative w-full aspect-[16/10] bg-black border border-white/15 sharp-edge my-3 overflow-hidden cursor-pointer group"
                title="Click para ampliar captura en alta resolución"
              >
                <img
                  src={aetherViews[activeView].src}
                  alt={aetherViews[activeView].title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />

                {/* Subtle Hover Action Pill */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-1.5 pill-btn bg-black/80 text-paper border border-white/40 text-[11px] font-mono uppercase tracking-widest flex items-center gap-2">
                    <Maximize2 className="w-3 h-3" />
                    <span>Ampliar captura</span>
                  </span>
                </div>

                {/* Bottom Overlay Metadata */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] font-mono text-paper/90 bg-black/80 px-2.5 py-1.5 backdrop-blur-sm border border-white/10">
                  <span className="font-semibold">{aetherViews[activeView].title}</span>
                  <span className="text-felt-gray">{aetherViews[activeView].badge}</span>
                </div>
              </div>

              {/* Astrometric Caption */}
              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-felt-gray flex justify-between">
                <span>{aetherViews[activeView].subtitle}</span>
              </div>
            </div>
          </div>
        </article>

        {/* ========================================================
            PROJECT 02: RESCUESYNC / DSSD (STRICTLY GITHUB ONLY - NO LIVE DEMO)
            ======================================================== */}
        <article className="py-20 border-b border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Specs & Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-felt-gray uppercase">
                  <span className="inline-block w-2 h-2 bg-paper sharp-edge" />
                  <span>01.2 // {t('projects.items.rescuesync.category')}</span>
                  <span>·</span>
                  <span>{t('projects.items.rescuesync.year')}</span>
                </div>

                <h3 className="mt-4 text-[34px] sm:text-[46px] font-light tracking-tight text-paper">
                  {t('projects.items.rescuesync.title')}
                </h3>

                <p className="mt-6 text-[15px] sm:text-[16px] text-paper/80 leading-relaxed font-light">
                  {t('projects.items.rescuesync.description')}
                </p>

                {/* Tech Tags - Strict 75px binary pill */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    'Java Spring Boot',
                    'Angular',
                    'PostgreSQL',
                    'Bonita BPM REST API',
                    'Docker',
                    'JWT RBAC',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1 text-[11px] font-mono text-paper/90 border border-white/20 pill-btn bg-white/5 hover:border-white/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: STRICTLY GITHUB ONLY - NO LIVE DEMO BUTTON */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://github.com/N3GR0N"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-paper border border-white/30 pill-btn hover:border-paper hover:bg-white/10 transition-all duration-500"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{t('projects.viewCode')}</span>
                </a>
              </div>
            </div>

            {/* Right Architecture Topology Mockup (5 Cols - Strict 0px Sharp-Edge) */}
            <div className="lg:col-span-5 bg-neutral-950 text-paper border border-white/20 sharp-edge p-5 font-mono text-[11px]">
              <div className="flex items-center justify-between pb-3 border-b border-white/20 text-[10px] tracking-widest text-felt-gray uppercase">
                <span>DISTRIBUTED ARCHITECTURE TOPOLOGY</span>
                <span className="text-paper">BPM CLUSTER</span>
              </div>

              <div className="py-4 space-y-3">
                <div className="p-3 bg-black border border-white/10 sharp-edge">
                  <div className="text-felt-gray text-[9px] uppercase">GATEWAY & AUTH LAYER</div>
                  <div className="text-paper mt-1">SPRING SECURITY · JWT RBAC VALIDATION</div>
                  <div className="text-felt-gray text-[10px] mt-0.5">ROLES: [ADMIN, NGO_DISPATCHER, BRIGADE]</div>
                </div>

                <div className="p-3 bg-black border border-white/10 sharp-edge">
                  <div className="text-felt-gray text-[9px] uppercase">ORCHESTRATION ENGINE</div>
                  <div className="text-paper mt-1">BONITA BPM REST API CONNECTOR</div>
                  <div className="text-felt-gray text-[10px] mt-0.5">ASYNCHRONOUS WORKFLOW DISPATCH</div>
                </div>

                <div className="p-3 bg-black border border-white/10 sharp-edge">
                  <div className="text-felt-gray text-[9px] uppercase">PERSISTENCE & CONTAINERIZATION</div>
                  <div className="text-paper mt-1">POSTGRESQL 15 + DOCKER COMPOSE</div>
                  <div className="text-felt-gray text-[10px] mt-0.5">ISOLATION LEVEL: READ COMMITTED</div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/20 text-[10px] text-felt-gray flex justify-between uppercase">
                <span>CONCURRENCY: OPTIMISTIC</span>
                <span>STATUS: VERIFIED ARCHITECTURE</span>
              </div>
            </div>
          </div>
        </article>

        {/* ========================================================
            PROJECT 03: ALQUILANDO (STRICTLY GITHUB ONLY - NO LIVE DEMO)
            ======================================================== */}
        <article className="pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Specs & Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-felt-gray uppercase">
                  <span className="inline-block w-2 h-2 bg-paper sharp-edge" />
                  <span>01.3 // {t('projects.items.alquilando.category')}</span>
                  <span>·</span>
                  <span>{t('projects.items.alquilando.year')}</span>
                </div>

                <h3 className="mt-4 text-[34px] sm:text-[46px] font-light tracking-tight text-paper">
                  {t('projects.items.alquilando.title')}
                </h3>

                <p className="mt-6 text-[15px] sm:text-[16px] text-paper/80 leading-relaxed font-light">
                  {t('projects.items.alquilando.description')}
                </p>

                {/* Tech Tags - Strict 75px binary pill */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    'Django',
                    'Python',
                    'PostgreSQL',
                    'Relational Integrity',
                    'SQL Concurrency',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1 text-[11px] font-mono text-paper/90 border border-white/20 pill-btn bg-white/5 hover:border-white/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: STRICTLY GITHUB ONLY - NO LIVE DEMO BUTTON */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://github.com/N3GR0N"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-paper border border-white/30 pill-btn hover:border-paper hover:bg-white/10 transition-all duration-500"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{t('projects.viewCode')}</span>
                </a>
              </div>
            </div>

            {/* Right Relational Schema & Query Mockup (5 Cols - Strict 0px Sharp-Edge) */}
            <div className="lg:col-span-5 bg-neutral-950 text-paper border border-white/20 sharp-edge p-5 font-mono text-[11px]">
              <div className="flex items-center justify-between pb-3 border-b border-white/20 text-[10px] tracking-widest text-felt-gray uppercase">
                <span>TRANSACTIONAL SCHEMA CONTROL</span>
                <span className="text-paper">POSTGRES ENGINE</span>
              </div>

              <div className="py-4 space-y-2.5">
                <div className="p-3 bg-black border border-white/10 sharp-edge">
                  <div className="text-felt-gray text-[9px] uppercase">ISOLATION CONTROL & LOCKS</div>
                  <pre className="text-paper text-[10px] mt-1 overflow-x-auto">
{`BEGIN;
SELECT * FROM vehicle_fleet
  WHERE id = $1 AND status = 'AVAILABLE'
  FOR UPDATE;
UPDATE vehicle_fleet SET status = 'RESERVED';
COMMIT;`}
                  </pre>
                </div>

                <div className="p-3 bg-black border border-white/10 sharp-edge">
                  <div className="text-felt-gray text-[9px] uppercase">CONSTRAINTS & INTEGRITY</div>
                  <div className="text-paper text-[10px] mt-1">FOREIGN KEY (customer_id) REFERENCES users(id)</div>
                  <div className="text-felt-gray text-[10px]">CHECK (end_date &gt; start_date)</div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/20 text-[10px] text-felt-gray flex justify-between uppercase">
                <span>ATOMICITY: ACID COMPLIANT</span>
                <span>STATUS: STABLE</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Fullscreen High-Res Image Modal for AetherScope */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-5xl w-full border border-white/20 sharp-edge bg-black overflow-hidden p-2">
            <img
              src={aetherViews[activeView].src}
              alt={aetherViews[activeView].title}
              className="w-full h-auto max-h-[85vh] object-contain mx-auto"
            />
            <div className="p-3 flex justify-between items-center text-[11px] font-mono text-felt-gray border-t border-white/10 mt-2">
              <span className="text-paper">{aetherViews[activeView].title}</span>
              <span>CLICK EN CUALQUIER LUGAR PARA CERRAR [ESC]</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
