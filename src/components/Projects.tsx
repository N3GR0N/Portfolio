import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const Projects: React.FC = () => {
  const { t } = useLanguage();

  // AetherScope interactive telemetry state
  const [activeBand, setActiveBand] = useState<'ir' | 'opt' | 'xray'>('ir');
  const [activeTarget, setActiveTarget] = useState<'carina' | 'crab' | 'cassiopeia'>('carina');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulated celestial telemetry rendering on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.015;
      const w = (canvas.width = canvas.parentElement?.clientWidth || 540);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 280);

      // Deep space monochromatic void
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw subtle orbital coordinate reticles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy);
      ctx.lineTo(cx + 130, cy);
      ctx.moveTo(cx, cy - 130);
      ctx.lineTo(cx, cy + 130);
      ctx.stroke();

      // Spectral emission simulation
      const count = activeBand === 'ir' ? 90 : activeBand === 'opt' ? 140 : 60;
      for (let i = 0; i < count; i++) {
        const seed = i * 1.618;
        const radius = ((seed * 37) % 110) + Math.sin(time + seed) * 8;
        const angle = seed * 3.14 + time * (i % 2 === 0 ? 0.2 : -0.15);
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius * 0.75;

        const alpha = ((Math.sin(time * 2 + i) + 1) / 2) * 0.6 + 0.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        const dotSize = (i % 3 === 0) ? 1.8 : 1.0;
        ctx.fillRect(px, py, dotSize, dotSize);
      }

      // Center core star
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(cx - 2, cy - 2, 4, 4);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeBand, activeTarget]);

  const targetCoords = {
    carina: { ra: '10h 45m 08.5s', dec: '-59° 52′ 04″', dist: '7,500 ly', type: 'Emission Nebula (JWST NIRCam)' },
    crab: { ra: '05h 34m 31.9s', dec: '+22° 00′ 52″', dist: '6,500 ly', type: 'Supernova Remnant (Chandra/Hubble)' },
    cassiopeia: { ra: '23h 23m 27.9s', dec: '+58° 48′ 42″', dist: '11,000 ly', type: 'Core Collapse Remnant (Multi-band)' },
  };

  return (
    <section id="projects" className="bg-paper text-obsidian border-b border-black">
      {/* Editorial Container Max 1078px */}
      <div className="max-w-[1078px] mx-auto px-6 sm:px-10 py-24 sm:py-32">
        {/* Section Header with Whisper Authority */}
        <div className="pb-16 border-b border-black">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <span className="text-[12px] font-mono tracking-widest text-felt-gray uppercase">
              {t('projects.sectionNumber')} // ARCHIVE
            </span>
            <span className="text-[11px] font-mono tracking-widest text-felt-gray uppercase">
              CURATED SOFTWARE SYSTEMS
            </span>
          </div>

          <h2 className="mt-6 text-[38px] sm:text-[60px] md:text-[76px] font-light tracking-[-0.03em] leading-[0.98] text-obsidian">
            {t('projects.sectionTitle')}
          </h2>

          <p className="mt-6 max-w-[680px] text-[16px] sm:text-[18px] text-inkstone font-light leading-relaxed">
            {t('projects.sectionSubtitle')}
          </p>
        </div>

        {/* ========================================================
            PROJECT 01: AETHERSCOPE (FLAGSHIP - WITH LIVE DEMO & REPO)
            ======================================================== */}
        <article className="py-20 border-b border-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Specs & Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Meta Tagline */}
                <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-felt-gray uppercase">
                  <span className="inline-block w-2 h-2 bg-obsidian sharp-edge" />
                  <span>01.1 // {t('projects.items.aetherscope.category')}</span>
                  <span>·</span>
                  <span>{t('projects.items.aetherscope.year')}</span>
                </div>

                {/* Flagship Notice */}
                <div className="mt-3 text-[10px] font-mono tracking-widest text-obsidian bg-neutral-100 border border-black/20 px-2.5 py-1 inline-block uppercase">
                  {t('projects.flagshipNotice')}
                </div>

                {/* Project Title */}
                <h3 className="mt-4 text-[34px] sm:text-[46px] font-light tracking-tight text-obsidian">
                  {t('projects.items.aetherscope.title')}
                </h3>

                {/* Description */}
                <p className="mt-6 text-[15px] sm:text-[16px] text-inkstone leading-relaxed font-light">
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
                      className="px-3.5 py-1 text-[11px] font-mono text-obsidian border border-black/30 pill-btn bg-white hover:border-black transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Strict 75px Binary Capsule */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {/* Live Demo Button (ONLY FOR AETHERSCOPE) */}
                <a
                  href="https://aetherscope.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest bg-obsidian text-paper border border-obsidian pill-btn hover:bg-paper hover:text-obsidian transition-all duration-500"
                >
                  <span>{t('projects.viewDemo')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* GitHub Button */}
                <a
                  href="https://github.com/N3GRON/AetherScope"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-obsidian border border-black pill-btn hover:bg-obsidian hover:text-paper transition-all duration-500"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{t('projects.viewCode')}</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Telemetry Mockup Shell (5 Cols - Strict 0px Sharp-Edge) */}
            <div className="lg:col-span-5 bg-obsidian text-paper border border-black sharp-edge p-5 flex flex-col justify-between">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/20 text-[10px] font-mono tracking-widest text-felt-gray uppercase">
                <span>SPECTRAL TELEMETRY // WEBGL2</span>
                <span className="text-paper flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-paper rounded-full animate-ping" />
                  LIVE CANVAS
                </span>
              </div>

              {/* Target Selector */}
              <div className="pt-3 pb-2 flex gap-1.5 overflow-x-auto text-[10px] font-mono">
                {(['carina', 'crab', 'cassiopeia'] as const).map((tgt) => (
                  <button
                    key={tgt}
                    onClick={() => setActiveTarget(tgt)}
                    className={`px-2.5 py-1 uppercase tracking-wider pill-btn border transition-all ${
                      activeTarget === tgt
                        ? 'border-white bg-white text-obsidian font-semibold'
                        : 'border-white/20 text-felt-gray hover:text-paper hover:border-white/50'
                    }`}
                  >
                    {tgt}
                  </button>
                ))}
              </div>

              {/* Canvas Visualizer */}
              <div className="relative w-full h-[220px] bg-black border border-white/10 sharp-edge my-3 overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] font-mono text-felt-gray bg-black/70 px-2 py-1 backdrop-blur-sm">
                  <span>RA: {targetCoords[activeTarget].ra}</span>
                  <span>DEC: {targetCoords[activeTarget].dec}</span>
                </div>
              </div>

              {/* Wavelength Mode Switcher */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-felt-gray uppercase">BAND:</span>
                <div className="flex gap-1.5">
                  {(['ir', 'opt', 'xray'] as const).map((band) => (
                    <button
                      key={band}
                      onClick={() => setActiveBand(band)}
                      className={`px-2.5 py-0.5 uppercase tracking-wider pill-btn border text-[9px] ${
                        activeBand === band
                          ? 'border-white bg-white text-obsidian'
                          : 'border-white/20 text-felt-gray hover:text-paper'
                      }`}
                    >
                      {band === 'ir' ? 'NIRCam' : band === 'opt' ? 'Optical' : 'X-Ray'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ========================================================
            PROJECT 02: RESCUESYNC / DSSD (STRICTLY GITHUB ONLY - NO LIVE DEMO)
            ======================================================== */}
        <article className="py-20 border-b border-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Specs & Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-felt-gray uppercase">
                  <span className="inline-block w-2 h-2 bg-obsidian sharp-edge" />
                  <span>01.2 // {t('projects.items.rescuesync.category')}</span>
                  <span>·</span>
                  <span>{t('projects.items.rescuesync.year')}</span>
                </div>

                <h3 className="mt-4 text-[34px] sm:text-[46px] font-light tracking-tight text-obsidian">
                  {t('projects.items.rescuesync.title')}
                </h3>

                <p className="mt-6 text-[15px] sm:text-[16px] text-inkstone leading-relaxed font-light">
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
                      className="px-3.5 py-1 text-[11px] font-mono text-obsidian border border-black/30 pill-btn bg-white hover:border-black transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: STRICTLY GITHUB ONLY - NO LIVE DEMO BUTTON */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://github.com/N3GRON"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-obsidian border border-black pill-btn hover:bg-obsidian hover:text-paper transition-all duration-500"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{t('projects.viewCode')}</span>
                </a>
              </div>
            </div>

            {/* Right Architecture Topology Mockup (5 Cols - Strict 0px Sharp-Edge) */}
            <div className="lg:col-span-5 bg-neutral-900 text-paper border border-black sharp-edge p-5 font-mono text-[11px]">
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
                  <span className="inline-block w-2 h-2 bg-obsidian sharp-edge" />
                  <span>01.3 // {t('projects.items.alquilando.category')}</span>
                  <span>·</span>
                  <span>{t('projects.items.alquilando.year')}</span>
                </div>

                <h3 className="mt-4 text-[34px] sm:text-[46px] font-light tracking-tight text-obsidian">
                  {t('projects.items.alquilando.title')}
                </h3>

                <p className="mt-6 text-[15px] sm:text-[16px] text-inkstone leading-relaxed font-light">
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
                      className="px-3.5 py-1 text-[11px] font-mono text-obsidian border border-black/30 pill-btn bg-white hover:border-black transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: STRICTLY GITHUB ONLY - NO LIVE DEMO BUTTON */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://github.com/N3GRON"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-obsidian border border-black pill-btn hover:bg-obsidian hover:text-paper transition-all duration-500"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{t('projects.viewCode')}</span>
                </a>
              </div>
            </div>

            {/* Right Relational Schema & Query Mockup (5 Cols - Strict 0px Sharp-Edge) */}
            <div className="lg:col-span-5 bg-neutral-900 text-paper border border-black sharp-edge p-5 font-mono text-[11px]">
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
    </section>
  );
};
