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

  useEffect(() => {
    if (isOpen) {
      setSelectedCvLang(language);
    }
  }, [isOpen, language]);

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

  const pdfUrl = selectedCvLang === 'es' ? '/CV_Espanol.pdf' : '/CV_English.pdf';
  const fileName = selectedCvLang === 'es' ? 'Juan_Pedro_Suner_CV_Espanol.pdf' : 'Juan_Pedro_Suner_CV_English.pdf';

  const handleCopyLink = () => {
    const fullUrl = window.location.origin + pdfUrl;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f0e0d] border border-stone-800 rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#141311]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-mono">
                Juan Pedro Suñer — Curriculum Vitae
              </h3>
              <p className="text-xs text-amber-300/80 font-mono">
                Backend / Fullstack Developer · UNLP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switcher in modal */}
            <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800 text-xs font-mono">
              <button
                onClick={() => setSelectedCvLang('es')}
                className={`px-3 py-1 rounded-md transition-all ${
                  selectedCvLang === 'es'
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setSelectedCvLang('en')}
                className={`px-3 py-1 rounded-md transition-all ${
                  selectedCvLang === 'en'
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 bg-stone-950/80 border-b border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-stone-400">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {selectedCvLang === 'es' ? 'Documento Oficial en Español (PDF)' : 'Official English Document (PDF)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg border border-stone-800 hover:border-amber-500/40 bg-stone-900/60 text-stone-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copiado!' : 'Copiar Link'}</span>
            </button>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-stone-800 hover:border-amber-500/40 bg-stone-900/60 text-stone-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir PDF</span>
            </a>

            <a
              href={pdfUrl}
              download={fileName}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 via-bronze-600 to-amber-700 hover:from-amber-500 hover:to-bronze-500 text-stone-950 font-bold transition-all shadow-bronze-sm flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </a>
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-stone-300 custom-scrollbar">
          {selectedCvLang === 'es' ? (
            /* Spanish CV Content */
            <div className="space-y-6 bg-black/40 p-6 rounded-2xl border border-stone-800/80">
              <div className="border-b border-stone-800 pb-4">
                <h1 className="text-2xl font-bold text-stone-100 tracking-tight">JUAN PEDRO SUÑER</h1>
                <p className="text-amber-400 font-mono text-xs mt-1">
                  Desarrollador Backend / Fullstack | Estudiante de Ingeniería en Sistemas
                </p>
                <p className="text-stone-400 text-xs mt-2 font-mono">
                  La Plata, Argentina | +54 9 2281 301944 | sunerjuan240@gmail.com | github.com/N3GRON
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-2 border-b border-stone-800 pb-1">
                  Resumen Profesional
                </h2>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Estudiante de 4to año de Ingeniería en Sistemas especializado en desarrollo backend y arquitecturas escalables con TypeScript, Python, Java y PostgreSQL. Destaco por la integración de herramientas de IA en el ciclo de desarrollo de software para acelerar entregas, aplicando un riguroso control de calidad mediante auditoría de código y pruebas. Aporto valor creando sistemas fiables, optimizados para alto rendimiento e integraciones complejas con APIs externas.
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-2 border-b border-stone-800 pb-1">
                  Competencias Clave
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="font-semibold text-stone-200">Lenguajes:</span> TypeScript, JavaScript, Python, Java, SQL
                  </div>
                  <div>
                    <span className="font-semibold text-stone-200">Frameworks:</span> Next.js (App Router), React, Django, Flask, Spring Boot
                  </div>
                  <div>
                    <span className="font-semibold text-stone-200">Bases de Datos:</span> PostgreSQL, MySQL, Supabase, Modelado Relacional
                  </div>
                  <div>
                    <span className="font-semibold text-stone-200">Herramientas:</span> Bash, Linux, WebGL2, Docker, VS Code, IntelliJ IDEA
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-3 border-b border-stone-800 pb-1">
                  Trayectoria Profesional
                </h2>
                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <div className="flex justify-between font-semibold text-stone-100 font-mono">
                      <span>Colaborador Académico — Facultad de Informática UNLP</span>
                      <span className="text-amber-400">2026 – Presente</span>
                    </div>
                    <p className="text-stone-400 text-[11px] font-mono mb-1">Seminario de Lenguajes (Python)</p>
                    <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px] pl-1">
                      <li>Resolución de consultas técnicas, corrección de trabajos prácticos y pedagogía.</li>
                      <li>Instrucción de cohorte de más de 40 alumnos en lógica, buenas prácticas en Python y Git.</li>
                      <li>Optimización del proceso de corrección y feedback reduciendo tiempos en un 30%.</li>
                      <li>Evaluación técnica de 4 equipos de desarrollo enfocada en código limpio y arquitectura.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-stone-100 font-mono">
                      <span>Técnico Informático Freelance</span>
                      <span className="text-amber-400">2022 – Presente</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px] pl-1 mt-1">
                      <li>Soporte técnico, reparación de hardware, actualización de componentes y OS.</li>
                      <li>Diagnóstico y mantenimiento preventivo en PCs y notebooks extendiendo su vida útil.</li>
                      <li>Gestión del ciclo completo de atención a clientes y desarrollo de software en paralelo.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-stone-100 font-mono">
                      <span>Consultor IT y Soporte de Sistemas — Farmacia Napoli</span>
                      <span className="text-amber-400">2019 – 2022</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px] pl-1 mt-1">
                      <li>Administración de parque informático con 99% de disponibilidad operativa.</li>
                      <li>Automatización del mantenimiento del software reduciendo downtime un 25%.</li>
                      <li>Migración de terminales y reducción del MTTR a menos de 15 minutos.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-2 border-b border-stone-800 pb-1">
                  Proyectos Destacados
                </h2>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="font-semibold text-stone-100 font-mono">
                      AetherScope — Plataforma de Exploración Espacial y Análisis Espectral
                    </div>
                    <p className="text-[11px] text-amber-400/90 font-mono">
                      Next.js, TypeScript, Rust / WebAssembly (Aladin Lite), WebGL2, Supabase, HiPS
                    </p>
                    <p className="text-[11px] text-stone-300 mt-1 font-sans">
                      Plataforma interactiva para explorar espacio profundo con datos científicos de JWST, Hubble, Chandra, Gaia, AllWISE y DSS2. Visualizador 360° en WebGL2 con mezcla espectral en vivo y laboratorio espectroscópico.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-stone-100 font-mono">
                      Alquilando — Sistema de Gestión de Alquiler de Vehículos
                    </div>
                    <p className="text-[11px] text-stone-400 font-mono">Django, Python, SQL</p>
                    <p className="text-[11px] text-stone-300 mt-1 font-sans">
                      Arquitectura backend y modelo relacional para reserva de flota vehicular con control de disponibilidad, roles y permisos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* English CV Content */
            <div className="space-y-6 bg-black/40 p-6 rounded-2xl border border-stone-800/80">
              <div className="border-b border-stone-800 pb-4">
                <h1 className="text-2xl font-bold text-stone-100 tracking-tight">JUAN PEDRO SUÑER</h1>
                <p className="text-amber-400 font-mono text-xs mt-1">
                  Backend / Fullstack Developer | Information Systems Engineering Student
                </p>
                <p className="text-stone-400 text-xs mt-2 font-mono">
                  La Plata, Argentina | +54 9 2281 301944 | sunerjuan240@gmail.com | github.com/N3GRON
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-2 border-b border-stone-800 pb-1">
                  Professional Summary
                </h2>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  4th-year Information Systems Engineering student specializing in backend development and scalable architectures using TypeScript, Python, Java, and PostgreSQL. I stand out for integrating AI tools into the software development life cycle to accelerate delivery, applying rigorous quality control through code auditing and testing. I provide value by building reliable systems optimized for high performance and complex integrations with external APIs.
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-2 border-b border-stone-800 pb-1">
                  Core Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="font-semibold text-stone-200">Languages:</span> TypeScript, JavaScript, Python, Java, SQL
                  </div>
                  <div>
                    <span className="font-semibold text-stone-200">Frameworks:</span> Next.js (App Router), React, Django, Flask, Spring Boot
                  </div>
                  <div>
                    <span className="font-semibold text-stone-200">Databases:</span> PostgreSQL, MySQL, Supabase, Relational Modeling
                  </div>
                  <div>
                    <span className="font-semibold text-stone-200">Tools:</span> Bash, Linux, WebGL2, Docker, VS Code, IntelliJ IDEA
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-3 border-b border-stone-800 pb-1">
                  Professional Experience
                </h2>
                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <div className="flex justify-between font-semibold text-stone-100 font-mono">
                      <span>Academic Collaborator — Facultad de Informática UNLP</span>
                      <span className="text-amber-400">2026 – Present</span>
                    </div>
                    <p className="text-stone-400 text-[11px] font-mono mb-1">Programming Languages Seminar (Python)</p>
                    <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px] pl-1">
                      <li>Assisted professors with technical inquiries, practical assignments, and pedagogical guidance.</li>
                      <li>Mentored over 40 students in programming logic, Python clean paradigms, and Git version control.</li>
                      <li>Standardized grading rubrics, accelerating feedback delivery times by 30%.</li>
                      <li>Conducted architecture and code audits for 4 student development teams (20 students total).</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-stone-100 font-mono">
                      <span>Freelance IT Technician</span>
                      <span className="text-amber-400">2022 – Present</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px] pl-1 mt-1">
                      <li>End-user support, hardware diagnostics, component upgrades, and OS optimization.</li>
                      <li>Preventive maintenance on desktop workstations and laptops, extending hardware longevity.</li>
                      <li>Managed end-to-end client service and built fullstack software projects concurrently.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-stone-100 font-mono">
                      <span>IT Consultant &amp; Systems Support — Farmacia Napoli</span>
                      <span className="text-amber-400">2019 – 2022</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px] pl-1 mt-1">
                      <li>Administered pharmacy IT infrastructure maintaining 99% operational availability.</li>
                      <li>Automated software maintenance and update pipelines, reducing peak-hour downtime by 25%.</li>
                      <li>Migrated workstations and POS terminals, dropping Mean Time To Repair to under 15 minutes.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-2 border-b border-stone-800 pb-1">
                  Featured Projects
                </h2>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="font-semibold text-stone-100 font-mono">
                      AetherScope — Deep Space Exploration &amp; Spectral Analysis Platform
                    </div>
                    <p className="text-[11px] text-amber-400/90 font-mono">
                      Next.js, TypeScript, Rust / WebAssembly (Aladin Lite), WebGL2, Supabase, HiPS
                    </p>
                    <p className="text-[11px] text-stone-300 mt-1 font-sans">
                      Interactive deep-space exploration platform analyzing multi-spectral survey data from JWST, Hubble, Chandra, Gaia, AllWISE, and DSS2 with 360° WebGL2 sky viewer and spectroscopic lab.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-stone-100 font-mono">
                      Alquilando — Vehicle Rental Management System
                    </div>
                    <p className="text-[11px] text-stone-400 font-mono">Django, Python, SQL</p>
                    <p className="text-[11px] text-stone-300 mt-1 font-sans">
                      Backend architecture and relational database model to simulate a vehicle fleet reservation and rental platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-stone-800 bg-[#141311] flex items-center justify-between">
          <div className="text-xs text-stone-400 font-mono">
            PDF Source: <code className="text-amber-400">{fileName}</code>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Print</span>
            </button>
            <a
              href={pdfUrl}
              download={fileName}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-bronze-600 to-amber-700 hover:from-amber-500 hover:to-bronze-500 text-stone-950 font-bold transition-all text-xs flex items-center gap-1.5 shadow-bronze-sm"
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
