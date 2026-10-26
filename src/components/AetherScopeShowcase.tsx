import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Sparkles, Orbit, Compass, Sliders } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './GithubIcon';

export const AetherScopeShowcase: React.FC = () => {
  const { language, t } = useLanguage();

  // Multi-spectral wave sliders (0 to 100)
  const [infrared, setInfrared] = useState(85); // JWST
  const [optical, setOptical] = useState(65);   // Hubble / DSS2
  const [xray, setXray] = useState(40);        // Chandra

  const [activeTarget, setActiveTarget] = useState<'carina' | 'crab' | 'cassiopeia'>('carina');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render simulated multi-wavelength celestial target on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.01;
      const w = (canvas.width = canvas.parentElement?.clientWidth || 600);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 340);

      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // 1. INFRARED LAYER (Warm Bronze, Amber, Deep Red Dust Clouds)
      if (infrared > 5) {
        const irOpacity = (infrared / 100) * 0.75;
        const irGrad = ctx.createRadialGradient(
          cx + Math.cos(time * 0.4) * 20,
          cy + Math.sin(time * 0.3) * 15,
          10,
          cx,
          cy,
          w * 0.45
        );
        irGrad.addColorStop(0, `rgba(217, 119, 6, ${irOpacity * 0.9})`);
        irGrad.addColorStop(0.35, `rgba(180, 83, 9, ${irOpacity * 0.6})`);
        irGrad.addColorStop(0.7, `rgba(120, 53, 15, ${irOpacity * 0.3})`);
        irGrad.addColorStop(1, 'rgba(10, 10, 12, 0)');
        ctx.fillStyle = irGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. OPTICAL LAYER (Ivory, Soft Gold, Dense Starfield)
      if (optical > 5) {
        const optOpacity = (optical / 100) * 0.8;
        const seed = activeTarget === 'carina' ? 42 : activeTarget === 'crab' ? 88 : 120;
        for (let i = 0; i < 90; i++) {
          const pseudoX = ((Math.sin(i * seed) * 10000) % 1 + 1) * 0.5 * w;
          const pseudoY = ((Math.cos(i * seed * 1.5) * 10000) % 1 + 1) * 0.5 * h;
          const starSize = ((i % 5) + 1) * 0.6;
          const twinkle = (Math.sin(time * 2 + i) * 0.3 + 0.7) * optOpacity;

          ctx.beginPath();
          ctx.arc(pseudoX, pseudoY, starSize, 0, Math.PI * 2);
          ctx.fillStyle = i % 7 === 0 ? `rgba(251, 191, 36, ${twinkle})` : `rgba(245, 245, 244, ${twinkle * 0.85})`;
          ctx.fill();
        }
      }

      // 3. X-RAY LAYER (Chandra High-Energy Jet, Filamentary Core)
      if (xray > 5) {
        const xrayOpacity = (xray / 100) * 0.85;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.1);

        const shockGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 90);
        shockGrad.addColorStop(0, `rgba(254, 243, 199, ${xrayOpacity})`);
        shockGrad.addColorStop(0.4, `rgba(245, 158, 11, ${xrayOpacity * 0.7})`);
        shockGrad.addColorStop(0.8, `rgba(217, 119, 6, ${xrayOpacity * 0.3})`);
        shockGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = shockGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 90, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(254, 240, 138, ${xrayOpacity * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-110, -110);
        ctx.lineTo(110, 110);
        ctx.moveTo(110, -110);
        ctx.lineTo(-110, 110);
        ctx.stroke();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [infrared, optical, xray, activeTarget]);

  return (
    <div className="relative rounded-3xl glass-panel p-6 sm:p-8 lg:p-10 border border-stone-800/80 hover:border-bronze-600/40 transition-all duration-500 shadow-2xl overflow-hidden group">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-800/60">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-300">
            {t('projects.flagshipBadge')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
          <span className="px-2 py-0.5 rounded bg-stone-900/80 border border-stone-700/50 text-amber-200/90">
            WebGL2 &amp; Aladin Lite
          </span>
          <span className="px-2 py-0.5 rounded bg-stone-900/80 border border-stone-700/50 text-stone-300">
            Rust / WASM
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        {/* Left Column: Mission Intel, Description & CTAs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-bronze-950/60 border border-bronze-700/40 text-bronze-300 text-xs font-mono">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('projects.items.aetherscope.categoryLabel')}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight leading-tight">
              {t('projects.items.aetherscope.title')}
            </h3>
            <p className="text-sm sm:text-base font-mono text-amber-300/90 font-medium">
              {t('projects.items.aetherscope.subtitle')}
            </p>
          </div>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
            {t('projects.items.aetherscope.description')}
          </p>

          {/* Highlights */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block font-semibold">
              {language === 'es' ? 'Capacidades de Arquitectura:' : 'Architectural Capabilities:'}
            </span>
            <ul className="space-y-2 text-xs text-stone-300">
              {(t('projects.items.aetherscope.highlights') as string[]).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold mt-0.5">◈</span>
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {(t('projects.items.aetherscope.badges') as string[]).map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-stone-900/90 text-stone-300 border border-stone-800 hover:border-amber-500/40 hover:text-amber-200 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Action CTAs: Live Demo + Repository */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-800/60">
            {/* Live Demo Button (ONLY FOR AETHERSCOPE) */}
            <a
              href="https://aetherscope.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-bronze-600 to-amber-700 hover:from-amber-500 hover:to-bronze-500 text-stone-950 font-semibold text-xs sm:text-sm shadow-bronze-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 group/btn"
            >
              <Sparkles className="w-4 h-4 fill-current text-stone-950" />
              <span>{t('projects.viewDemo')}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>

            {/* GitHub Repo Button */}
            <a
              href="https://github.com/N3GRON/AetherScope"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/40 text-stone-200 hover:text-white font-medium text-xs sm:text-sm font-mono transition-all flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4 text-stone-400 group-hover:text-amber-400" />
              <span>{t('projects.viewCode')}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Multi-Spectral Laboratory & Canvas */}
        <div className="lg:col-span-6 w-full space-y-4">
          <div className="rounded-2xl bg-[#0e0e11] border border-stone-800/90 p-5 shadow-2xl space-y-4 font-mono text-xs">
            {/* Console Bar */}
            <div className="flex items-center justify-between border-b border-stone-800/70 pb-3">
              <div className="flex items-center gap-2 text-amber-300">
                <Orbit className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-stone-200">
                  {t('projects.spectralConsole')}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="text-amber-400">HI-RES MULTI-WAVELENGTH</span>
              </div>
            </div>

            {/* Target Selectors */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTarget('carina')}
                className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-mono transition-all ${
                  activeTarget === 'carina'
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                Carina Nebula (JWST)
              </button>
              <button
                onClick={() => setActiveTarget('crab')}
                className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-mono transition-all ${
                  activeTarget === 'crab'
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                Crab Pulsar (Chandra)
              </button>
              <button
                onClick={() => setActiveTarget('cassiopeia')}
                className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-mono transition-all ${
                  activeTarget === 'cassiopeia'
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                Cas A Shockwave
              </button>
            </div>

            {/* Interactive Canvas Viewer / Mockup */}
            <div className="relative h-60 w-full rounded-xl bg-black border border-stone-800/80 overflow-hidden shadow-inner">
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Reticle Overlay */}
              <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] text-stone-400/80">
                  <span>FOV: 0.42° x 0.28°</span>
                  <span className="text-amber-400/90 font-mono">CDS HiPS TILE STREAM</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-400/80">
                  <span>RA: 10h 45m 08s | DEC: -59° 52′ 04″</span>
                  <span className="text-emerald-400">WASM 60 FPS</span>
                </div>
              </div>
            </div>

            {/* Multi-Spectral Sliders */}
            <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-3">
              <div className="text-[11px] text-stone-400 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Channel Mixer</span>
                </span>
                <span className="text-stone-500 text-[10px]">{t('projects.spectralHint')}</span>
              </div>

              {/* Slider 1: Infrared (JWST) */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-amber-400 font-semibold">Infrared (JWST MIRI/NIRCam)</span>
                  <span className="text-stone-400">{infrared}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={infrared}
                  onChange={(e) => setInfrared(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
                />
              </div>

              {/* Slider 2: Optical (Hubble / DSS2) */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-stone-200 font-semibold">Optical (Hubble / DSS2)</span>
                  <span className="text-stone-400">{optical}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={optical}
                  onChange={(e) => setOptical(parseInt(e.target.value))}
                  className="w-full accent-stone-300 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
                />
              </div>

              {/* Slider 3: X-Ray (Chandra) */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-amber-200 font-semibold">X-Ray (Chandra High-Energy)</span>
                  <span className="text-stone-400">{xray}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={xray}
                  onChange={(e) => setXray(parseInt(e.target.value))}
                  className="w-full accent-amber-300 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
                />
              </div>
            </div>

            {/* Chemical Emission Lines Readout */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-800/60 text-center">
              <div className="p-2 rounded-lg bg-black/50 border border-stone-800/70">
                <span className="text-[10px] text-amber-400/80 block">H-α (656.3 nm)</span>
                <span className="text-[11px] font-bold text-stone-200">IONIZED GAS</span>
              </div>
              <div className="p-2 rounded-lg bg-black/50 border border-stone-800/70">
                <span className="text-[10px] text-amber-400/80 block">[O-III] (500.7 nm)</span>
                <span className="text-[11px] font-bold text-stone-200">OXYGEN SHOCK</span>
              </div>
              <div className="p-2 rounded-lg bg-black/50 border border-stone-800/70">
                <span className="text-[10px] text-amber-400/80 block">[S-II] (672.4 nm)</span>
                <span className="text-[11px] font-bold text-stone-200">SULFUR CORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
