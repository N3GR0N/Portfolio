import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './GithubIcon';
import { Copy, Check, ArrowUpRight, FileText } from 'lucide-react';

interface ContactProps {
  onOpenCv: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenCv }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = 'sunerjuan240@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSent(false);
    }, 4000);
  };

  return (
    <section id="contact" className="bg-obsidian text-paper border-b border-white/20">
      <div className="max-w-[1078px] mx-auto px-6 sm:px-10 py-24 sm:py-32">
        {/* Section Header with Whisper Authority */}
        <div className="pb-16 border-b border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <span className="text-[12px] font-mono tracking-widest text-felt-gray uppercase">
              {t('contact.sectionNumber')} // DISPATCH & INQUIRY
            </span>
            <span className="text-[11px] font-mono tracking-widest text-felt-gray uppercase">
              OPEN FOR ENGINEERING ROLES
            </span>
          </div>

          <h2 className="mt-6 text-[38px] sm:text-[60px] md:text-[76px] font-light tracking-[-0.03em] leading-[0.98] text-paper">
            {t('contact.sectionTitle')}
          </h2>

          <p className="mt-6 max-w-[680px] text-[16px] sm:text-[18px] text-paper/70 font-light leading-relaxed">
            {t('contact.sectionSubtitle')}
          </p>
        </div>

        {/* Content Grid: Direct Details + Transmission Form */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 font-mono text-[12px]">
            {/* Primary Email */}
            <div className="p-6 border border-white/20 sharp-edge bg-neutral-950 space-y-3">
              <div className="text-[10px] tracking-widest text-felt-gray uppercase">
                {t('contact.emailLabel')}
              </div>
              <div className="text-[16px] font-sans font-light text-paper select-all break-all">
                {email}
              </div>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] uppercase tracking-wider text-paper border border-white/30 pill-btn hover:border-paper hover:bg-paper hover:text-obsidian transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{t('contact.emailCopied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t('contact.copyAction')}</span>
                  </>
                )}
              </button>
            </div>

            {/* GitHub & Location */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-felt-gray uppercase">{t('contact.githubLabel')}</span>
                <a
                  href="https://github.com/N3GR0N"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper hover:underline flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>github.com/N3GR0N</span>
                  <ArrowUpRight className="w-3 h-3 text-felt-gray" />
                </a>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-felt-gray uppercase">WHATSAPP / TEL</span>
                <span className="text-paper font-mono">+54 9 2281 301944</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-felt-gray uppercase">{t('contact.locationLabel')}</span>
                <span className="text-paper/80">{t('contact.locationVal')}</span>
              </div>
            </div>

            {/* Quick CV Download Trigger */}
            <div className="pt-4">
              <button
                onClick={onOpenCv}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 text-[11px] uppercase tracking-widest text-paper border border-white/30 pill-btn hover:border-paper hover:bg-white/10 transition-all"
              >
                <FileText className="w-4 h-4 text-felt-gray" />
                <span>DESCARGAR / VER CURRÍCULUM VITAE (PDF)</span>
              </button>
            </div>
          </div>

          {/* Editorial Transmission Form (7 Cols - Strict 0px Sharp-Edge) */}
          <div className="lg:col-span-7 bg-neutral-950 border border-white/20 sharp-edge p-6 sm:p-10">
            <div className="pb-6 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-felt-gray uppercase">
              <span>DISPATCH TELEGRAM FORM</span>
              <span>DIRECT ENCRYPTED PIPELINE</span>
            </div>

            {formSent ? (
              <div className="py-16 text-center space-y-3 font-mono">
                <div className="w-10 h-10 border border-white mx-auto flex items-center justify-center pill-btn">
                  <Check className="w-5 h-5 text-paper" />
                </div>
                <div className="text-[14px] text-paper uppercase tracking-wider">
                  MENSAJE REGISTRADO EXITOSAMENTE
                </div>
                <div className="text-[11px] text-felt-gray">
                  Respuesta técnica garantizada dentro de 24 horas.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-felt-gray">
                    NOMBRE O ENTIDAD / SENDER NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/20 sharp-edge text-paper text-[14px] font-sans focus:outline-none focus:border-paper transition-colors"
                    placeholder="e.g. Jane Doe / Engineering Lead"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-felt-gray">
                    CORREO ELECTRÓNICO / CONTACT EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/20 sharp-edge text-paper text-[14px] font-sans focus:outline-none focus:border-paper transition-colors"
                    placeholder="name@organization.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-felt-gray">
                    MENSAJE O CONSULTA TÉCNICA / INQUIRY DETAILS
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/20 sharp-edge text-paper text-[14px] font-sans focus:outline-none focus:border-paper transition-colors resize-none"
                    placeholder="Describe el rol, proyecto o motivo de contacto..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-[11px] font-mono uppercase tracking-widest bg-paper text-obsidian border border-paper pill-btn hover:bg-transparent hover:text-paper transition-all duration-500 font-semibold"
                >
                  ENVIAR MENSAJE DIRECTO
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
