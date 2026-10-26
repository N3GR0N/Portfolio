import React, { useState } from 'react';
import { X, Play, RotateCcw, Database, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectInteractiveModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectInteractiveModal: React.FC<ProjectInteractiveModalProps> = ({
  projectId,
  onClose,
}) => {
  const { language } = useLanguage();

  // State for AetherScope / FlareField simulator
  const [selectedEvent, setSelectedEvent] = useState<'x-flare' | 'cme' | 'geomagnetic'>('x-flare');
  const [kpIndex, setKpIndex] = useState(6.7);
  const [isScanningSky, setIsScanningSky] = useState(false);

  // State for RescueSync BPM Orchestrator
  const [bpmStep, setBpmStep] = useState<number>(2);

  // State for Alquilando / Backend APIs
  const [simulatedQuerySpeed, setSimulatedQuerySpeed] = useState<number>(2.4);

  if (!projectId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0d15] border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121422]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              {projectId === 'aetherscope' ? (
                <Compass className="w-5 h-5" />
              ) : projectId === 'rescuesync' ? (
                <Layers className="w-5 h-5" />
              ) : (
                <Database className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {language === 'es' ? 'Simulador Interactivo' : 'Live Interactive Sandbox'}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                {projectId === 'aetherscope'
                  ? 'AetherScope & FlareField — Space Weather & Sky Map'
                  : projectId === 'rescuesync'
                  ? 'RescueSync — Distributed BPM Process Orchestrator'
                  : 'Alquilando — High-Performance Concurrency & SQL Benchmark'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300 custom-scrollbar">
          {/* PROJECT 1: AETHERSCOPE / FLAREFIELD */}
          {projectId === 'aetherscope' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-start gap-3">
                <Compass className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">
                    {language === 'es'
                      ? 'Simulador de Telemetría Solar & Renderizado Celeste'
                      : 'Solar Telemetry Simulator & Celestial Rendering Sandbox'}
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    {language === 'es'
                      ? 'Explora cómo AetherScope procesa en tiempo real las tormentas solares de NASA DONKI / NOAA y calcula las coordenadas de declinación y ascensión recta.'
                      : 'Explore how AetherScope ingests live solar events from NASA DONKI and NOAA APIs, plotting stellar catalog coordinates with MapLibre GL.'}
                  </p>
                </div>
              </div>

              {/* Interactive Sky Canvas Mockup */}
              <div className="relative h-64 sm:h-72 w-full rounded-xl bg-[#07080d] border border-white/10 overflow-hidden flex flex-col justify-between p-4">
                {/* Simulated Sky Grid */}
                <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

                {/* Coordinate Overlay */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-400">RA: 18h 36m 56s</span>
                    <span className="text-sky-400">DEC: +38° 47′ 01″</span>
                    <span className="text-amber-400">EPOCH: J2000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
                      GPS/GLONASS: MONITORING
                    </span>
                  </div>
                </div>

                {/* Celestial Visualization Visual Center */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-ping opacity-25" />
                    <div className="absolute inset-2 rounded-full border border-sky-500/40 animate-pulse" />
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/30 via-rose-500/20 to-indigo-600/30 backdrop-blur-sm border border-amber-400/50 flex flex-col items-center justify-center text-center p-2">
                      <span className="text-[10px] font-mono text-amber-300 font-bold uppercase">
                        {selectedEvent}
                      </span>
                      <span className="text-xs font-bold text-white">Kp {kpIndex}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-2">
                    {isScanningSky
                      ? (language === 'es' ? 'Escaneando coordenadas celestes...' : 'Recalculating sky coordinates...')
                      : (language === 'es' ? 'Simulación de campo magnético activa' : 'Active magnetic field simulation')}
                  </span>
                </div>

                {/* Bottom stats */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Drone Advisory:</span>
                    <span className={kpIndex >= 6 ? 'text-rose-400 font-semibold' : 'text-emerald-400'}>
                      {kpIndex >= 6
                        ? (language === 'es' ? 'ALERTA: Desviación GPS Esperada' : 'ALERT: Severe GPS Drift Expected')
                        : (language === 'es' ? 'CONDICIÓN NORMAL' : 'NORMAL CONDITIONS')}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsScanningSky(true);
                      setTimeout(() => setIsScanningSky(false), 900);
                    }}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-mono text-[11px]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === 'es' ? 'Recargar Sensor' : 'Refresh Sensor'}</span>
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#11131e] border border-white/5 space-y-3">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    {language === 'es' ? 'Tipo de Evento Solar (DONKI)' : 'Solar Event Type (DONKI)'}
                  </label>
                  <div className="flex gap-2">
                    {(['x-flare', 'cme', 'geomagnetic'] as const).map((evt) => (
                      <button
                        key={evt}
                        onClick={() => {
                          setSelectedEvent(evt);
                          setKpIndex(evt === 'x-flare' ? 7.3 : evt === 'cme' ? 8.1 : 4.5);
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono capitalize transition-all ${
                          selectedEvent === evt
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {evt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#11131e] border border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400 uppercase tracking-wider">Kp Index Gauge</span>
                    <span className="text-amber-400 font-bold">{kpIndex} / 9.0</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    step="0.1"
                    value={kpIndex}
                    onChange={(e) => setKpIndex(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>1 (Calm)</span>
                    <span>5 (Storm)</span>
                    <span>9 (Extreme)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT 2: RESCUESYNC / DSSD */}
          {projectId === 'rescuesync' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 flex items-start gap-3">
                <Layers className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">
                    {language === 'es'
                      ? 'Orquestador de Procesos BPM y Concurrencia de Recursos'
                      : 'BPM Process Orchestrator & Distributed Resource Locking'}
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    {language === 'es'
                      ? 'Simulación del flujo de trabajo modelado con Bonita BPM REST API, control de concurrencia pesimista en PostgreSQL y validación de tokens JWT multi-rol.'
                      : 'Simulate workflow orchestration modeled with Bonita BPM REST API, pessimistic concurrency control in PostgreSQL, and multi-role JWT tokens.'}
                  </p>
                </div>
              </div>

              {/* BPM Workflow Progression */}
              <div className="p-5 rounded-xl bg-[#090a12] border border-white/10 space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex justify-between items-center">
                  <span>{language === 'es' ? 'Flujo de Ejecución BPM' : 'BPM Pipeline State'}</span>
                  <span className="text-indigo-400 font-semibold">Instance #DSSD-8941</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  {[
                    { step: 1, title: 'Alerta Catástrofe', en: 'Disaster Trigger' },
                    { step: 2, title: 'Validación ONGs', en: 'NGO Credential Check' },
                    { step: 3, title: 'Bloqueo Concurrente', en: 'Pessimistic Lock' },
                    { step: 4, title: 'Despliegue Recursos', en: 'Resource Dispatch' },
                  ].map((node) => {
                    const isDone = bpmStep > node.step;
                    const isCurrent = bpmStep === node.step;
                    return (
                      <div
                        key={node.step}
                        onClick={() => setBpmStep(node.step)}
                        className={`cursor-pointer p-3 rounded-xl border text-xs font-mono transition-all ${
                          isCurrent
                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                            : isDone
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                            : 'bg-white/[0.02] border-white/5 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px]">Paso {node.step}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-600" />
                          )}
                        </div>
                        <div className="font-semibold text-[11px]">
                          {language === 'es' ? node.title : node.en}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* State Detail */}
                <div className="p-3 bg-black/50 rounded-xl border border-white/5 font-mono text-xs space-y-2">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Transaction State:</span>
                    <span className="text-emerald-400 font-semibold">ACID COMMITTED</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Resource Mutex Lock:</span>
                    <span className="text-indigo-300">
                      ACQUIRED (Postgres SELECT FOR UPDATE)
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Security Context:</span>
                    <span className="text-sky-300">Role: EMERGENCY_DISPATCHER (JWT Validated)</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setBpmStep((prev) => (prev < 4 ? prev + 1 : 1))}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Avanzar Paso BPM' : 'Advance BPM Step'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT 3: ALQUILANDO & BACKEND TOOLS */}
          {projectId === 'alquilando' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
                <Database className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">
                    {language === 'es'
                      ? 'Simulador de Concurrencia de Reservas & Benchmarking SQL'
                      : 'Fleet Reservation Concurrency & SQL Benchmark Simulator'}
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    {language === 'es'
                      ? 'Demostración de la lógica de negocio para evitar overbooking con índices en PostgreSQL y aislamiento transaccional.'
                      : 'Interactive demonstration of fleet availability validation preventing double bookings with PostgreSQL composite indexing.'}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#090a12] border border-white/10 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>POSTGRESQL QUERY EXECUTION PLAN:</span>
                  <span className="text-emerald-400 font-bold">{simulatedQuerySpeed} ms</span>
                </div>

                <div className="p-3 bg-black/60 rounded-xl border border-white/5 text-[11px] text-slate-300 space-y-1.5">
                  <div className="text-indigo-300">
                    EXPLAIN ANALYZE SELECT * FROM vehicle_reservations
                  </div>
                  <div className="text-slate-400">
                    WHERE vehicle_id = 42 AND status = 'CONFIRMED'
                  </div>
                  <div className="text-slate-400">
                    AND tstzrange(pickup_date, dropoff_date) &amp;&amp; tstzrange('2026-11-01', '2026-11-05');
                  </div>
                  <div className="text-emerald-400 pt-1 border-t border-white/5">
                    → Index Scan using idx_vehicle_booking_range on vehicle_reservations (cost=0.15..8.17 rows=1)
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">Overbooking Guard:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                      PASSED (Zero Collision)
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSimulatedQuerySpeed(parseFloat((Math.random() * 1.5 + 1.2).toFixed(2)));
                    }}
                    className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-slate-300 hover:text-white flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Run Query Bench</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#121422] flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            {language === 'es' ? 'Arquitectura verificada' : 'Verified architecture'}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-colors"
          >
            {language === 'es' ? 'Cerrar Sandbox' : 'Close Sandbox'}
          </button>
        </div>
      </div>
    </div>
  );
};
