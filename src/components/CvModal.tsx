import React, { useState, useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<'es' | 'en'>(language);

  useEffect(() => {
    if (isOpen) {
      setSelectedLang(language);
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

  const pdfUrl = selectedLang === 'es' ? '/CV_Espanol.pdf' : '/CV_English.pdf';
  const downloadFileName =
    selectedLang === 'es' ? 'Juan_Pedro_Suner_CV_Espanol.pdf' : 'Juan_Pedro_Suner_CV_English.pdf';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
    >
      {/* Editorial Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sharp-Edge Monopo Saigon Modal Shell (0px) */}
      <div className="relative w-full max-w-4xl h-[90vh] bg-obsidian text-paper border border-white/20 sharp-edge flex flex-col z-10 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-paper sharp-edge" />
            <span className="text-[12px] font-mono tracking-widest text-paper uppercase">
              CURRÍCULUM VITAE // ATS & SOURCER VERIFIED
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-felt-gray hover:text-paper transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls & Language Switcher (Strict 75px Pills) */}
        <div className="px-6 py-3.5 bg-neutral-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          {/* Version Pills */}
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <button
              onClick={() => setSelectedLang('es')}
              className={`px-4 py-1.5 pill-btn border transition-all uppercase tracking-wider ${
                selectedLang === 'es'
                  ? 'border-white bg-white text-obsidian font-semibold'
                  : 'border-white/20 text-felt-gray hover:text-paper hover:border-white/40'
              }`}
            >
              Versión Español (PDF)
            </button>

            <button
              onClick={() => setSelectedLang('en')}
              className={`px-4 py-1.5 pill-btn border transition-all uppercase tracking-wider ${
                selectedLang === 'en'
                  ? 'border-white bg-white text-obsidian font-semibold'
                  : 'border-white/20 text-felt-gray hover:text-paper hover:border-white/40'
              }`}
            >
              English Version (PDF)
            </button>
          </div>

          {/* Download & External Open */}
          <div className="flex items-center gap-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-felt-gray hover:text-paper transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir pestaña</span>
            </a>

            <a
              href={pdfUrl}
              download={downloadFileName}
              className="inline-flex items-center gap-2 px-5 py-1.5 text-[11px] font-mono uppercase tracking-widest bg-paper text-obsidian border border-paper pill-btn hover:bg-transparent hover:text-paper transition-all font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </a>
          </div>
        </div>

        {/* PDF Viewer Canvas (Sharp-Edge) */}
        <div className="flex-1 bg-neutral-900 overflow-hidden relative">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            title={`CV Juan Pedro Suñer (${selectedLang})`}
            className="w-full h-full border-none sharp-edge bg-white"
          />
        </div>

        {/* Bottom Bar Info */}
        <div className="px-6 py-2.5 bg-black border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-felt-gray uppercase">
          <span>DOCUMENT IDENTIFIER: {selectedLang === 'es' ? 'CV-ES-2026' : 'CV-EN-2026'}</span>
          <span>FORMAT: PDF / PRINT READY</span>
        </div>
      </div>
    </div>
  );
};
