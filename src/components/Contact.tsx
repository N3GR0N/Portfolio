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
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#38bdf8', '#10b981'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#a855f7', '#38bdf8'],
      });
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      {/* Subtle ambient light */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <Mail className="w-3.5 h-3.5" />
            <span>{t('contact.sectionBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Quick Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick Copy Email Banner */}
            <div className="rounded-2xl border border-white/10 bg-[#0e101a] p-6 hover:border-indigo-500/40 transition-all shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {t('contact.emailLabel')}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Fast Response
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-2">
                <span className="font-mono text-xs sm:text-sm text-white select-all truncate">
                  {email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all shrink-0 border border-indigo-500/30"
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

            {/* Channels List */}
            <div className="rounded-2xl border border-white/10 bg-[#0e101a] p-6 space-y-4 shadow-xl text-xs font-mono">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block pb-2 border-b border-white/5">
                {t('contact.directChannels')}
              </span>

              {/* GitHub */}
              <a
                href="https://github.com/N3GRON"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-indigo-400" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">GITHUB</span>
                    <span className="text-slate-200 group-hover:text-white font-semibold">
                      github.com/N3GRON
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* Phone / WhatsApp */}
              <a
                href="https://wa.me/5492281301944"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">{t('contact.phoneLabel')}</span>
                    <span className="text-slate-200 group-hover:text-white font-semibold">
                      +54 9 2281 301944
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <div>
                  <span className="text-slate-400 block text-[10px]">{t('contact.locationLabel')}</span>
                  <span className="text-slate-200 font-semibold">La Plata, Buenos Aires, Argentina</span>
                </div>
              </div>

              {/* CV Download CTA */}
              <button
                onClick={onOpenCv}
                className="w-full py-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:text-white font-medium flex items-center justify-center gap-2 transition-all mt-2"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>{t('contact.resumeDownloadAction')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0e101a] p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">
              {language === 'es' ? 'Enviar un mensaje directo' : 'Send a direct inquiry'}
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              {language === 'es'
                ? 'Completa los campos a continuación para iniciar una conversación profesional.'
                : 'Fill in the details below to start a technical conversation.'}
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  {t('contact.form.success')}
                </h4>
                <p className="text-xs text-slate-300">
                  {language === 'es'
                    ? 'También puedes enviarme un correo directo a sunerjuan240@gmail.com'
                    : 'You can also reach me directly at sunerjuan240@gmail.com'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121422] border border-white/10 focus:border-indigo-500/60 outline-none text-xs text-white placeholder:text-slate-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="nombre@empresa.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121422] border border-white/10 focus:border-indigo-500/60 outline-none text-xs text-white placeholder:text-slate-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder={
                      language === 'es'
                        ? 'Oportunidad laboral / Proyecto de software / Consulta técnica'
                        : 'Job Opportunity / Engineering Project / Technical Inquiry'
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121422] border border-white/10 focus:border-indigo-500/60 outline-none text-xs text-white placeholder:text-slate-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={
                      language === 'es'
                        ? 'Cuéntame sobre los requerimientos, el stack o la visión del proyecto...'
                        : 'Tell me about the engineering requirements, timeline, or architecture...'
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121422] border border-white/10 focus:border-indigo-500/60 outline-none text-xs text-white placeholder:text-slate-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-600/25 border border-indigo-400/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
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
