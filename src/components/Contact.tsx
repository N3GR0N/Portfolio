import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, FileText, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './GithubIcon';

interface ContactProps {
  onOpenCv: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenCv }) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = 'sunerjuan240@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#d97706', '#fbbf24', '#e7e5e4'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#d97706', '#fbbf24', '#e7e5e4'],
      });
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 border-t border-stone-800/60">
      {/* Warm ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze-950/60 border border-bronze-700/50 text-amber-300 text-xs font-mono font-medium">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('contact.sectionBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-sans">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Quick Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick Copy Email Card */}
            <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-stone-800/80 hover:border-amber-500/40 transition-all shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  {t('contact.emailLabel')}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Fast Response
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center justify-between gap-2">
                <span className="font-mono text-xs sm:text-sm text-stone-100 select-all truncate">
                  {email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-stone-950 transition-all shrink-0 border border-amber-500/30"
                  title={t('contact.copyEmail')}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <p className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('contact.emailCopied')}</span>
                </p>
              )}
            </div>

            {/* Direct Channels */}
            <div className="rounded-3xl glass-panel p-6 sm:p-7 space-y-4 shadow-xl text-xs font-mono border border-stone-800/80">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block pb-2 border-b border-stone-800/80">
                {t('contact.directChannels')}
              </span>

              {/* GitHub */}
              <a
                href="https://github.com/N3GRON"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800/90 hover:border-amber-500/40 hover:bg-stone-900 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-stone-400 block text-[10px]">GITHUB</span>
                    <span className="text-stone-200 group-hover:text-amber-200 font-semibold">
                      github.com/N3GRON
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-amber-300 transition-colors" />
              </a>

              {/* Phone / WhatsApp */}
              <a
                href="https://wa.me/5492281301944"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800/90 hover:border-amber-500/40 hover:bg-stone-900 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-stone-400 block text-[10px]">{t('contact.phoneLabel')}</span>
                    <span className="text-stone-200 group-hover:text-amber-200 font-semibold">
                      +54 9 2281 301944
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-amber-300 transition-colors" />
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800/90">
                <MapPin className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-stone-400 block text-[10px]">{t('contact.locationLabel')}</span>
                  <span className="text-stone-200 font-semibold">La Plata, Buenos Aires, Argentina</span>
                </div>
              </div>

              {/* CV Modal Trigger */}
              <button
                onClick={onOpenCv}
                className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-850 border border-stone-700/70 hover:border-amber-500/40 text-stone-200 hover:text-white font-medium flex items-center justify-center gap-2 transition-all mt-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>{t('contact.resumeDownloadAction')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 rounded-3xl glass-panel p-6 sm:p-8 border border-stone-800/80 shadow-2xl">
            <h3 className="text-xl font-bold text-stone-100 mb-2">
              {language === 'es' ? 'Enviar un mensaje directo' : 'Send a direct inquiry'}
            </h3>
            <p className="text-xs text-stone-400 mb-6 font-mono">
              {language === 'es'
                ? 'Completa los campos para iniciar una conversación profesional y recibir respuesta ágil.'
                : 'Fill in the fields to start a technical conversation and receive a prompt reply.'}
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-stone-950 border border-amber-500/40 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-stone-100">
                  {t('contact.form.success')}
                </h4>
                <p className="text-xs text-stone-400">
                  {language === 'es'
                    ? 'También puedes escribirme a sunerjuan240@gmail.com'
                    : 'You can also reach me at sunerjuan240@gmail.com'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-400">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-800 focus:border-amber-500/60 outline-none text-xs text-stone-100 placeholder:text-stone-600 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-400">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="nombre@empresa.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-800 focus:border-amber-500/60 outline-none text-xs text-stone-100 placeholder:text-stone-600 transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-stone-400">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder={
                      language === 'es'
                        ? 'Oportunidad de ingeniería / Proyecto de software / Consulta técnica'
                        : 'Engineering Opportunity / Software Project / Technical Inquiry'
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-800 focus:border-amber-500/60 outline-none text-xs text-stone-100 placeholder:text-stone-600 transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-stone-400">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={
                      language === 'es'
                        ? 'Cuéntame sobre los requerimientos técnicos, arquitectura o alcance del proyecto...'
                        : 'Tell me about the engineering requirements, architecture, or scope...'
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-800 focus:border-amber-500/60 outline-none text-xs text-stone-100 placeholder:text-stone-600 transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-bronze-600 to-amber-700 hover:from-amber-500 hover:to-bronze-500 text-stone-950 font-bold text-xs sm:text-sm shadow-bronze-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-stone-950" />
                  <span>{isSubmitting ? t('contact.form.sending') : t('contact.form.send')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
