import React, { useState } from 'react';
import { ArrowDown, Download, MapPin, Sparkles, Compass, ChevronRight, RotateCcw, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv }) => {
  const { language, t } = useLanguage();
  const [activeHudTab, setActiveHudTab] = useState<'telemetry' | 'shell'>('telemetry');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; res: string }>>([
    {
      cmd: 'node --status',
      res: language === 'es'
        ? '✓ UNLP Informática (4to año) | Backend & Fullstack | Open to Engineering Roles'
        : '✓ UNLP Computer Science (4th year) | Backend & Fullstack | Open to Engineering Roles',
    },
    {
      cmd: 'aetherscope --survey-stream',
      res: 'JWST + Hubble + Chandra HiPS tile pipelines connected. WebGL2 engine ready.',
    },
  ]);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return;

    let response = '';
    switch (trimmed) {
      case 'help':
        response = language === 'es'
          ? 'Comandos disponibles: info, stack, contact, aetherscope, unlp, clear'
          : 'Available commands: info, stack, contact, aetherscope, unlp, clear';
        break;
      case 'info':
        response = 'Juan Pedro Suñer — Backend / Fullstack Developer & Information Systems Engineering Student at UNLP. Focus on high-throughput backend, distributed systems, and multi-spectral deep-space data.';
        break;
      case 'stack':
        response = 'TypeScript, Python, Java, PostgreSQL, Supabase, Next.js, Spring Boot, WebGL2, Rust/WASM, Docker.';
        break;
      case 'contact':
        response = 'Email: sunerjuan240@gmail.com | WhatsApp: +54 9 2281 301944 | GitHub: github.com/N3GRON';
        break;
      case 'aetherscope':
        response = 'AetherScope: Deep space 360° multi-wavelength explorer (JWST, Hubble, Chandra, Gaia, AllWISE, DSS2) with live deployment.';
        break;
      case 'unlp':
        response = 'Universidad Nacional de La Plata — Facultad de Informática. 4to año de Ingeniería en Sistemas. Colaborador Académico en Seminario de Lenguajes (Python).';
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        response = language === 'es'
          ? `Comando no reconocido: "${trimmed}". Escribe "help".`
          : `Unrecognized command: "${trimmed}". Type "help".`;
    }

    setHistory((prev) => [...prev, { cmd: trimmed, res: response }]);
    setInputVal('');
  };

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] pt-28 sm:pt-36 pb-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Background warm bronze glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 shadow-bronze-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-[11px] font-mono font-medium text-amber-300 tracking-wide">
                {t('hero.status')}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-stone-400 font-semibold">
                {t('hero.greeting')}
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-stone-100 leading-[1.05]">
                Juan Pedro <br />
                <span className="text-gradient-bronze">
                  Suñer
                </span>
              </h1>
              <div className="pt-1 flex items-center gap-2 flex-wrap">
                <span className="text-base sm:text-xl font-bold text-stone-200">
                  {t('hero.role')}
                </span>
                <span className="text-stone-600 hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm font-mono text-amber-300/90 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  UNLP (4to año)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl font-sans">
              {t('hero.description')}
            </p>

            {/* Quick Meta Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-stone-400">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>La Plata, Argentina</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800">
                <Compass className="w-3.5 h-3.5 text-amber-300" />
                <span>Deep Space &amp; Backend</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>English C1 Advanced</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-bronze-600 to-amber-700 hover:from-amber-500 hover:to-bronze-500 text-stone-950 font-bold text-xs sm:text-sm shadow-bronze-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <span>{t('hero.ctaProjects')}</span>
                <ChevronRight className="w-4 h-4 text-stone-950" />
              </a>

              <button
                onClick={onOpenCv}
                className="px-5 py-3 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700/70 hover:border-amber-500/40 text-stone-200 hover:text-white font-medium text-xs sm:text-sm font-mono transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{t('hero.ctaCv')}</span>
              </button>

              <a
                href="#contact"
                className="px-4 py-3 rounded-xl hover:bg-stone-800/40 text-stone-400 hover:text-amber-200 font-mono text-xs transition-colors"
              >
                {t('hero.ctaContact')} →
              </a>
            </div>
          </div>

          {/* Right Column: Observational Telemetry & Engineering Console */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl glass-panel p-5 border border-stone-800/90 shadow-2xl space-y-4 font-mono text-xs">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-stone-700" />
                  <div className="w-3 h-3 rounded-full bg-amber-600/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-stone-400 text-[11px] ml-2 font-mono">
                    observatory-node: unlp-sys
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-stone-950/80 p-0.5 rounded-lg border border-stone-800 text-[11px]">
                  <button
                    onClick={() => setActiveHudTab('telemetry')}
                    className={`px-2.5 py-0.5 rounded ${
                      activeHudTab === 'telemetry'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Telemetry
                  </button>
                  <button
                    onClick={() => setActiveHudTab('shell')}
                    className={`px-2.5 py-0.5 rounded ${
                      activeHudTab === 'shell'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Terminal
                  </button>
                </div>
              </div>

              {/* Tab 1: System Telemetry */}
              {activeHudTab === 'telemetry' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                    <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        Academic Status
                      </span>
                      <span className="text-stone-200 font-semibold block">UNLP Informática</span>
                      <span className="text-[10px] text-amber-400">4to año cursando</span>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        English Proficiency
                      </span>
                      <span className="text-stone-200 font-semibold block">C1 Advanced</span>
                      <span className="text-[10px] text-emerald-400">Full Professional</span>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        Flagship Engine
                      </span>
                      <span className="text-amber-300 font-semibold block">AetherScope</span>
                      <span className="text-[10px] text-stone-400">Rust / WASM + WebGL2</span>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        Backend &amp; DB
                      </span>
                      <span className="text-stone-200 font-semibold block">Postgres + Spring</span>
                      <span className="text-[10px] text-stone-400">Docker + Django</span>
                    </div>
                  </div>

                  {/* Observational Telemetry Strip */}
                  <div className="p-3 rounded-xl bg-black/50 border border-stone-800/80 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-stone-400 border-b border-stone-800/70 pb-1 text-[10px]">
                      <span>MULTI-SPECTRAL ASTRONOMICAL SURVEYS</span>
                      <span className="text-emerald-400 font-semibold">ONLINE</span>
                    </div>
                    <div className="flex justify-between text-stone-300 pt-0.5">
                      <span className="text-stone-500">Missions:</span>
                      <span className="text-amber-300">JWST · Hubble · Chandra · Gaia · DSS2</span>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span className="text-stone-500">Pipeline:</span>
                      <span className="text-stone-300">HiPS Hierarchical Progressive Tiles (CDS)</span>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span className="text-stone-500">Teaching:</span>
                      <span className="text-stone-300">Seminario Python &amp; Proyecto Software UNLP</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Terminal Shell */}
              {activeHudTab === 'shell' && (
                <div className="space-y-3 font-mono text-xs animate-fade-in">
                  <div className="flex items-center justify-between text-[10px] text-stone-500 border-b border-stone-800 pb-1">
                    <span>Type: "help", "info", "stack", "aetherscope", "clear"</span>
                    <button
                      onClick={() => setHistory([])}
                      className="hover:text-stone-300 flex items-center gap-1"
                      title="Clear console"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="max-h-44 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {history.map((h, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="text-amber-400 flex items-center gap-1.5">
                          <span className="text-stone-600">$</span>
                          <span>{h.cmd}</span>
                        </div>
                        <div className="text-[11px] text-stone-300 pl-3 leading-relaxed">
                          {h.res}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleRunCommand} className="flex items-center gap-2 pt-2 border-t border-stone-800">
                    <span className="text-amber-500 font-bold">$</span>
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Type command..."
                      className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-stone-100 placeholder:text-stone-600"
                    />
                    <button
                      type="submit"
                      className="p-1 rounded bg-amber-600/30 hover:bg-amber-600 text-amber-200 transition-colors"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex justify-center">
          <a
            href="#projects"
            className="flex flex-col items-center gap-1 text-stone-500 hover:text-amber-300 transition-colors font-mono text-[11px]"
          >
            <span>EXPLORE WORK</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
