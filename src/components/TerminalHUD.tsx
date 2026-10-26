import React, { useState } from 'react';
import { Terminal, ShieldCheck, Sparkles, Check, Send, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TerminalHUD: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'shell' | 'telemetry' | 'system'>('telemetry');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; res: string; isError?: boolean }>>([
    {
      cmd: 'juanpedro --status',
      res: language === 'es'
        ? '✓ Estudiante 4to año UNLP | Desarrollador Backend & Fullstack | Open to work'
        : '✓ 4th-year UNLP Student | Backend & Fullstack Developer | Open to work',
    },
    {
      cmd: 'ping api.aetherscope.space',
      res: '64 bytes from aetherscope: icmp_seq=1 ttl=58 time=11.4 ms (NASA DONKI / NOAA live stream connected)',
    },
  ]);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return;

    let response = '';
    let isError = false;

    switch (trimmed) {
      case 'help':
        response = language === 'es'
          ? 'Comandos: info, stack, contact, projects, clear, ping, unlp, astronomy'
          : 'Commands: info, stack, contact, projects, clear, ping, unlp, astronomy';
        break;
      case 'info':
        response = t('terminal.infoOutput');
        break;
      case 'stack':
        response = t('terminal.stackOutput');
        break;
      case 'contact':
        response = t('terminal.contactOutput');
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'ping':
        response = 'PONG: latency 8.2ms. All cluster nodes operational.';
        break;
      case 'unlp':
        response = language === 'es'
          ? 'Universidad Nacional de La Plata - Facultad de Informática. Ingeniería / Licenciatura en Sistemas (4to año). Ayudante de Cátedra.'
          : 'National University of La Plata - Faculty of Informatics. Systems Engineering (4th year). Academic Teaching Assistant.';
        break;
      case 'projects':
      case 'astronomy':
        response = 'Featured: [AetherScope / FlareField] (MapLibre + NASA API), [RescueSync / DSSD] (Java + BPM), [Alquilando] (Django + SQL).';
        break;
      default:
        response = language === 'es'
          ? `Comando no reconocido: "${trimmed}". Escribe "help" para ver los comandos.`
          : `Unrecognized command: "${trimmed}". Type "help" to view available commands.`;
        isError = true;
    }

    setHistory((prev) => [...prev, { cmd: trimmed, res: response, isError }]);
    setInputVal('');
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0c0d14]/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/30 group">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#121420]/80 border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 group-hover:bg-emerald-500 transition-colors" />
          <div className="ml-2 flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>jp-suner@unlp-node:~</span>
          </div>
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-2.5 py-1 rounded transition-all ${
              activeTab === 'telemetry'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Telemetry
          </button>
          <button
            onClick={() => setActiveTab('shell')}
            className={`px-2.5 py-1 rounded transition-all ${
              activeTab === 'shell'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terminal
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-2.5 py-1 rounded transition-all ${
              activeTab === 'system'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Architecture
          </button>
        </div>
      </div>

      {/* Tab 1: Live Telemetry */}
      {activeTab === 'telemetry' && (
        <div className="p-5 font-mono text-xs space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">
                {language === 'es' ? 'Rendimiento API' : 'API Latency'}
              </span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                11.4 ms
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Cached via Redis</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">
                {language === 'es' ? 'Integridad Tipos' : 'Type Safety'}
              </span>
              <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                100% Strict
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">TypeScript / tsc</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">
                {language === 'es' ? 'Disponibilidad' : 'Uptime Track'}
              </span>
              <div className="flex items-center gap-1.5 text-sky-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                99.9%
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Farmacia & Systems</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">
                {language === 'es' ? 'Inglés Técnico' : 'English Level'}
              </span>
              <div className="flex items-center gap-1.5 text-purple-400 font-semibold text-sm">
                <Check className="w-4 h-4" />
                C1 Advanced
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Professional</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-white/5 pb-1">
              <span>ACTIVE CLUSTER TELEMETRY</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                HEALTH: OK
              </span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Node:</span>
              <span className="text-slate-200">UNLP Informática — 4th Year Systems</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Stack Primary:</span>
              <span className="text-indigo-300">TypeScript · Python · Java · PostgreSQL · Docker</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Data Streaming:</span>
              <span className="text-sky-300">NASA DONKI / NOAA Real-Time Space Weather</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Terminal Shell */}
      {activeTab === 'shell' && (
        <div className="p-4 font-mono text-xs">
          <div className="text-slate-500 text-[11px] mb-3 pb-2 border-b border-white/5 flex items-center justify-between">
            <span>{t('terminal.help')}</span>
            <button
              onClick={() => setHistory([])}
              className="text-slate-500 hover:text-slate-300 flex items-center gap-1"
              title="Clear terminal"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
            {history.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-400">
                  <span className="text-slate-500">$</span>
                  <span>{item.cmd}</span>
                </div>
                <div
                  className={`pl-4 text-[11px] leading-relaxed ${
                    item.isError ? 'text-rose-400' : 'text-slate-300'
                  }`}
                >
                  {item.res}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleRunCommand} className="mt-3 flex items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-emerald-400 font-semibold">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={language === 'es' ? 'Escribe "help" o "info"...' : 'Type "help" or "info"...'}
              className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600 font-mono text-xs"
            />
            <button
              type="submit"
              className="p-1 rounded bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-300 transition-colors"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Architecture Diagram */}
      {activeTab === 'system' && (
        <div className="p-5 font-mono text-xs text-slate-300 space-y-3">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
            {language === 'es' ? 'Diagrama de Arquitectura Típica' : 'Typical Engineering Architecture'}
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-indigo-400">
              <span>[Client Tier]</span>
              <span className="text-slate-500">Next.js / React 19 / MapLibre GL</span>
            </div>
            <div className="text-center text-slate-600">↓ REST / WebSocket Streaming</div>
            <div className="flex items-center justify-between text-[11px] text-sky-400">
              <span>[Backend Services]</span>
              <span className="text-slate-500">Java Spring Boot · Python (Flask/Django)</span>
            </div>
            <div className="text-center text-slate-600">↓ Concurrency Lock & ACID Pool</div>
            <div className="flex items-center justify-between text-[11px] text-emerald-400">
              <span>[Data & Orchestration]</span>
              <span className="text-slate-500">PostgreSQL (Indexed) · Bonita BPM · Docker</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
