import React, { useState, useEffect } from 'react';
import { X, Download, ExternalLink, Printer, FileText, Check, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [selectedCvLang, setSelectedCvLang] = useState<'es' | 'en'>(language);
  const [copied, setCopied] = useState(false);

  // Sync selected CV lang with app language when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedCvLang(language);
    }
  }, [isOpen, language]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl =
    selectedCvLang === 'es' ? '/Juan_Pedro_Suner_CV_ES.pdf' : '/Juan_Pedro_Suner_CV_EN.pdf';
  const fileName =
    selectedCvLang === 'es' ? 'Juan_Pedro_Suner_CV_Español.pdf' : 'Juan_Pedro_Suner_CV_English.pdf';

  const handleCopyLink = () => {
    const fullUrl = window.location.origin + pdfUrl;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0f17] border border-white/10 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121420]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Juan Pedro Suñer — Curriculum Vitae</h3>
              <p className="text-xs text-slate-400 font-mono">
                Backend / Fullstack Developer · UNLP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switcher in modal */}
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setSelectedCvLang('es')}
                className={`px-3 py-1 rounded-md transition-all ${
                  selectedCvLang === 'es'
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setSelectedCvLang('en')}
                className={`px-3 py-1 rounded-md transition-all ${
                  selectedCvLang === 'en'
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 bg-black/30 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              {selectedCvLang === 'es'
                ? 'Documento en Español (PDF oficial)'
                : 'English Document (Official PDF)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copiado!' : 'Copiar Link'}</span>
            </button>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir PDF</span>
            </a>

            <a
              href={pdfUrl}
              download={fileName}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </a>
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300 custom-scrollbar">
          {selectedCvLang === 'es' ? (
            /* Spanish CV Content */
            <div className="space-y-6 bg-[#0a0b12] p-6 rounded-xl border border-white/5">
              <div className="border-b border-white/10 pb-4">
                <h1 className="text-2xl font-bold text-white tracking-tight">JUAN PEDRO SUÑER</h1>
                <p className="text-indigo-400 font-mono text-xs mt-1">
                  Desarrollador Backend / Fullstack | Estudiante de Ingeniería en Sistemas (UNLP)
                </p>
                <p className="text-slate-400 text-xs mt-2 font-mono">
                  La Plata, Argentina | +54 9 2281 301944 | sunerjuan240@gmail.com | github.com/N3GRON
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                  Resumen Profesional
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Estudiante de 4to año de Ingeniería en Sistemas especializado en desarrollo backend y arquitecturas escalables con TypeScript, Python, Java y PostgreSQL. Destaco por la integración de herramientas de IA en el ciclo de desarrollo de software para acelerar entregas, aplicando un riguroso control de calidad mediante auditoría de código y pruebas. Aporto valor creando sistemas fiables, optimizados para alto rendimiento e integraciones complejas con APIs externas.
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                  Competencias Clave
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-200">Lenguajes:</span> TypeScript, JavaScript, Python, Java, SQL
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Frameworks:</span> Next.js (App Router), React, Django, Flask, Spring Boot
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Bases de Datos:</span> PostgreSQL, MySQL, Modelado Relacional, Optimización
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">IA & Calidad:</span> Copilot, OpenCode, Prompt Engineering, Code Auditing
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Herramientas:</span> Git, GitHub, Docker, Bash, Linux, VS Code, IntelliJ
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Idiomas:</span> Español (Nativo) | Inglés (C1 Avanzado)
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3 border-b border-white/5 pb-1">
                  Trayectoria Profesional
                </h2>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-200">
                      <span>Colaborador Académico — Facultad de Informática UNLP</span>
                      <span className="font-mono text-indigo-400">2026 – Presente</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mb-1">Seminario de Lenguajes (Python)</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] pl-1">
                      <li>Resolución de consultas técnicas, corrección de trabajos prácticos y pedagogía.</li>
                      <li>Instrucción de cohorte de más de 40 alumnos en lógica, buenas prácticas en Python y Git.</li>
                      <li>Optimización del proceso de corrección y feedback reduciendo tiempos en un 30%.</li>
                      <li>Evaluación técnica de 4 equipos de desarrollo enfocada en código limpio y arquitectura.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-200">
                      <span>Técnico Informático Freelance</span>
                      <span className="font-mono text-indigo-400">2022 – Presente</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] pl-1 mt-1">
                      <li>Soporte técnico, reparación de hardware, actualización de componentes y OS.</li>
                      <li>Diagnóstico y mantenimiento preventivo en PCs y notebooks extendiendo su vida útil.</li>
                      <li>Gestión del ciclo completo de atención a clientes y desarrollo de software en paralelo.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-200">
                      <span>Consultor IT y Soporte de Sistemas — Farmacia Napoli</span>
                      <span className="font-mono text-indigo-400">2019 – 2022</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] pl-1 mt-1">
                      <li>Administración de parque informático con 99% de disponibilidad operativa.</li>
                      <li>Automatización del mantenimiento del software reduciendo downtime un 25%.</li>
                      <li>Migración de terminales y reducción del MTTR a menos de 15 minutos.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                  Proyectos Destacados
                </h2>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="font-semibold text-slate-200">FlareField / AetherScope — App de Alertas de Clima Espacial</div>
                    <p className="text-[11px] text-slate-400 font-mono">Next.js, TypeScript, PostgreSQL, MapLibre GL</p>
                    <p className="text-[11px] text-slate-300 mt-1">Consumo de APIs en tiempo real de NASA (DONKI) y NOAA para eventos geomagnéticos. Renderizado de mapa de alta velocidad con caché estructurado.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">RescueSync / DSSD — Gestión Distribuida de Emergencias</div>
                    <p className="text-[11px] text-slate-400 font-mono">Java Spring Boot, PostgreSQL, Bonita BPM, Docker</p>
                    <p className="text-[11px] text-slate-300 mt-1">Orquestación de procesos de rescate, validación de certificados y asignación concurrente de recursos.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* English CV Content */
            <div className="space-y-6 bg-[#0a0b12] p-6 rounded-xl border border-white/5">
              <div className="border-b border-white/10 pb-4">
                <h1 className="text-2xl font-bold text-white tracking-tight">JUAN PEDRO SUÑER</h1>
                <p className="text-indigo-400 font-mono text-xs mt-1">
                  Backend / Fullstack Developer | Information Systems Engineering Student
                </p>
                <p className="text-slate-400 text-xs mt-2 font-mono">
                  La Plata, Argentina | +54 9 2281 301944 | sunerjuan240@gmail.com | github.com/N3GRON
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                  Professional Summary
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  4th-year Information Systems Engineering student specializing in backend development and scalable architectures using TypeScript, Python, Java, and PostgreSQL. I stand out for integrating AI tools into the software development life cycle to accelerate delivery, applying rigorous quality control through code auditing and testing. I provide value by building reliable systems optimized for high performance and complex integrations with external APIs.
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                  Core Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-200">Languages:</span> TypeScript, JavaScript, Python, Java, SQL
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Frameworks:</span> Next.js (App Router), React, Django, Flask, Spring Boot
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Databases:</span> PostgreSQL, MySQL, Relational Modeling, Optimization
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">AI & Quality:</span> GitHub Copilot, OpenCode, Prompt Engineering, Code Auditing
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Tools:</span> Git, GitHub, Docker, Bash, Linux, VS Code, IntelliJ IDEA
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Languages:</span> Spanish (Native) | English (C1 Advanced)
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3 border-b border-white/5 pb-1">
                  Professional Experience
                </h2>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-200">
                      <span>Academic Collaborator — Facultad de Informática UNLP</span>
                      <span className="font-mono text-indigo-400">2026 – Present</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mb-1">Programming Languages Seminar (Python)</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] pl-1">
                      <li>Assisted professors with technical inquiries, practical assignments, and pedagogical guidance.</li>
                      <li>Mentored over 40 students in programming logic, Python clean paradigms, and Git version control.</li>
                      <li>Standardized grading rubrics, accelerating feedback delivery times by 30%.</li>
                      <li>Conducted architecture and code audits for 4 student development teams (20 students total).</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-200">
                      <span>Freelance IT Technician</span>
                      <span className="font-mono text-indigo-400">2022 – Present</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] pl-1 mt-1">
                      <li>End-user support, hardware diagnostics, component upgrades, and OS optimization.</li>
                      <li>Preventive maintenance on desktop workstations and laptops, extending hardware longevity.</li>
                      <li>Managed end-to-end client service and built fullstack software projects concurrently.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-200">
                      <span>IT Consultant & Systems Support — Farmacia Napoli</span>
                      <span className="font-mono text-indigo-400">2019 – 2022</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] pl-1 mt-1">
                      <li>Administered pharmacy IT infrastructure maintaining 99% operational availability.</li>
                      <li>Automated software maintenance and update pipelines, reducing peak-hour downtime by 25%.</li>
                      <li>Migrated workstations and POS terminals, dropping Mean Time To Repair to under 15 minutes.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                  Featured Projects
                </h2>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="font-semibold text-slate-200">FlareField / AetherScope — Space Weather Alert App</div>
                    <p className="text-[11px] text-slate-400 font-mono">Next.js, TypeScript, PostgreSQL, MapLibre GL</p>
                    <p className="text-[11px] text-slate-300 mt-1">Real-time web application consuming NASA (DONKI) & NOAA APIs with geospatial map rendering and structured caching.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">RescueSync / DSSD — Distributed Disaster Coordination</div>
                    <p className="text-[11px] text-slate-400 font-mono">Java Spring Boot, PostgreSQL, Bonita BPM, Docker</p>
                    <p className="text-[11px] text-slate-300 mt-1">BPM-orchestrated emergency response platform with concurrency controls and RBAC security.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#121420]/90 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            PDF Source: <code className="text-indigo-400">{fileName}</code>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Print</span>
            </button>
            <a
              href={pdfUrl}
              download={fileName}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Descargar PDF Oficial</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
