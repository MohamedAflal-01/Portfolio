import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight, ShieldAlert, X } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { indecentWords, containsIndecentWords } from '../data/indecentWords';

// Lazy-load Crystal: Three.js for the contact section only fetched when this
// section scrolls into view (whileInView animation triggers the mount).
const Crystal = lazy(() =>
  import('./3d/Crystal').then((m) => ({ default: m.Crystal }))
);
// canvas-confetti is only needed on successful form submission — ~50 KB saved
// from the initial bundle by deferring it to a dynamic import at call time.

// Inline SVGs for brand icons
const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
);

export const Contact: React.FC = () => {
  // Variable name called "indecent words"
  const indecent_words = indecentWords;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSentData, setLastSentData] = useState({ name: '', email: '', message: '' });
  const [showIndecentModal, setShowIndecentModal] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message or project details';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for indecent words across form inputs using the "indecent words" variable
    const hasIndecentInMessage = containsIndecentWords(formData.message, indecent_words);
    const hasIndecentInName = containsIndecentWords(formData.name, indecent_words);
    const hasIndecentInEmail = containsIndecentWords(formData.email, indecent_words);

    if (hasIndecentInMessage || hasIndecentInName || hasIndecentInEmail) {
      setShowIndecentModal(true);
      setErrors({
        message: 'please remove the indecent words',
        ...(hasIndecentInName ? { name: 'please remove the indecent words' } : {})
      });
      setSubmitError('please remove the indecent words');
      return; // The message won't send
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/rafaideenmuhammadaflalmuhammed@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        setIsSubmitted(true);
        setLastSentData({ ...formData });
        setFormData({ name: '', email: '', message: '' });

        // Dynamically import confetti only when a submission actually succeeds
        // so the ~50 KB canvas-confetti module stays out of the initial bundle.
        import('canvas-confetti').then(({ default: confetti }) => {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ffffff', '#cccccc', '#999999', '#e5e5ea'],
          });
        });
      } else {
        throw new Error(result.message || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setSubmitError(
        err.message || 'An error occurred while sending your message. You can also reach out directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto section-border">
      <SectionHeading number="05." label="CONTACT" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading & Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col space-y-6"
        >
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Let's Build Something <br />
              <span className="text-silver-300">Great Together</span>
            </h2>
            <p className="text-silver-400 text-sm sm:text-base leading-relaxed font-light max-w-lg">
              I'm always open to new opportunities, collaborations and interesting projects.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="font-mono text-xs text-silver-300 tracking-wider uppercase block">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                  if (submitError) setSubmitError(null);
                  setShowIndecentModal(false);
                }}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border ${
                  errors.name ? 'border-red-500/70 focus:border-red-500' : 'border-white/15 focus:border-white/60'
                } text-white placeholder:text-silver-500 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 backdrop-blur-md transition-all`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs flex items-center gap-1 mt-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="font-mono text-xs text-silver-300 tracking-wider uppercase block">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                  if (submitError) setSubmitError(null);
                  setShowIndecentModal(false);
                }}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border ${
                  errors.email ? 'border-red-500/70 focus:border-red-500' : 'border-white/15 focus:border-white/60'
                } text-white placeholder:text-silver-500 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 backdrop-blur-md transition-all`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs flex items-center gap-1 mt-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Description / Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="font-mono text-xs text-silver-300 tracking-wider uppercase block">
                Description
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                  if (submitError) setSubmitError(null);
                  setShowIndecentModal(false);
                }}
                placeholder="Tell me about your project or message..."
                className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border ${
                  errors.message ? 'border-red-500/70 focus:border-red-500' : 'border-white/15 focus:border-white/60'
                } text-white placeholder:text-silver-500 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 backdrop-blur-md transition-all resize-none`}
              />
              {errors.message && (
                <p className="text-red-400 text-xs flex items-center gap-1 mt-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submit Button & Direct Mail Option */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px] px-8 py-4 rounded-xl bg-gradient-to-r from-white via-silver-200 to-silver-300 text-black font-semibold text-sm tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:brightness-105 active:scale-95 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <a
                href={`mailto:rafaideenmuhammadaflalmuhammed@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formData.name || 'Visitor')}&body=${encodeURIComponent(formData.message || 'Hello Mohammed, I would like to discuss a project.')}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 text-silver-300 hover:text-white font-mono text-xs tracking-wider transition-all duration-300"
                title="Send directly using your email app (Gmail, Outlook, Apple Mail)"
              >
                <Mail className="w-4 h-4 text-silver-400" />
                <span>Direct Email</span>
              </a>
            </div>

            {/* Success Message Banner */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-xl bg-white/[0.06] border border-white/25 flex flex-col gap-3 text-white mt-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">
                        Message transmitted successfully!
                      </p>
                      <p className="text-xs text-silver-300 leading-relaxed">
                        Your message has been dispatched to <strong className="text-white font-medium">rafaideenmuhammadaflalmuhammed@gmail.com</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-silver-400">
                    <span>Need instant confirmation directly from your personal mail client?</span>
                    <a
                      href={`mailto:rafaideenmuhammadaflalmuhammed@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(lastSentData.name || 'Visitor')}&body=${encodeURIComponent(lastSentData.message)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/20 transition-colors shrink-0"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Email App / Gmail</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message Banner */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-200 mt-4"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{submitError}</p>
                    <a
                      href={`mailto:rafaideenmuhammadaflalmuhammed@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formData.name || 'Visitor')}&body=${encodeURIComponent(formData.message)}`}
                      className="inline-flex items-center gap-1 text-white underline underline-offset-2 hover:text-silver-200 font-mono text-xs pt-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send directly via email app</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Right Column: 3D Crystal & Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center space-y-8"
        >
          {/* 3D Crystal Object */}
          <div className="w-full h-[280px] sm:h-[320px] relative flex items-center justify-center">
            <Suspense fallback={<div className="w-full h-[280px] sm:h-[320px]" />}>
              <Crystal className="w-full h-full" />
            </Suspense>
          </div>

          {/* Contact Details List */}
          <div className="w-full space-y-3.5 max-w-md">
            {/* Email */}
            <a
              href="mailto:rafaideenmuhammadaflalmuhammed@gmail.com"
              className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl glass-card border border-white/10 hover:border-white/30 text-silver-300 hover:text-white transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-silver-300 group-hover:text-white group-hover:border-white/25 group-hover:bg-white/[0.08] transition-all duration-300 shrink-0">
                <Mail className="w-[18px] h-[18px]" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <span className="font-mono text-[10px] text-silver-500 uppercase tracking-widest leading-none mb-1 block">
                  Email
                </span>
                <span className="text-xs sm:text-sm font-medium text-white group-hover:text-silver-100 transition-colors truncate block">
                  rafaideenmuhammadaflalmuhammed@gmail.com
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-silver-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-1" />
            </a>

            {/* Location */}
            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl glass-card border border-white/10 text-silver-300">
              <div className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-silver-300 shrink-0">
                <MapPin className="w-[18px] h-[18px]" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <span className="font-mono text-[10px] text-silver-500 uppercase tracking-widest leading-none mb-1 block">
                  Location
                </span>
                <span className="text-xs sm:text-sm font-medium text-white truncate block">
                  Kalmunai, Sri Lanka
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] shrink-0 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>GMT+5:30</span>
              </div>
            </div>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/mohamedaflal01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl glass-card border border-white/10 hover:border-white/30 text-silver-300 hover:text-white transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-silver-300 group-hover:text-white group-hover:border-white/25 group-hover:bg-white/[0.08] transition-all duration-300 shrink-0">
                <LinkedinIcon className="w-[18px] h-[18px]" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <span className="font-mono text-[10px] text-silver-500 uppercase tracking-widest leading-none mb-1 block">
                  LinkedIn
                </span>
                <span className="text-xs sm:text-sm font-medium text-white group-hover:text-silver-100 transition-colors truncate block">
                  linkedin.com/in/mohamedaflal01
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-silver-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-1" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/MohamedAflal-01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl glass-card border border-white/10 hover:border-white/30 text-silver-300 hover:text-white transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-silver-300 group-hover:text-white group-hover:border-white/25 group-hover:bg-white/[0.08] transition-all duration-300 shrink-0">
                <GithubIcon className="w-[18px] h-[18px]" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <span className="font-mono text-[10px] text-silver-500 uppercase tracking-widest leading-none mb-1 block">
                  GitHub
                </span>
                <span className="text-xs sm:text-sm font-medium text-white group-hover:text-silver-100 transition-colors truncate block">
                  github.com/MohamedAflal-01
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-silver-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-1" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Indecent Words Pop-up Modal */}
      <AnimatePresence>
        {showIndecentModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="indecent-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowIndecentModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#0c0c10] border border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.25)] text-center space-y-5"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowIndecentModal(false)}
                aria-label="Close alert"
                className="absolute top-4 right-4 p-1.5 rounded-lg text-silver-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Warning Icon Badge */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <ShieldAlert className="w-8 h-8" />
              </div>

              {/* Alert Content */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest text-red-400 font-semibold">
                  [ System Alert ]
                </div>
                <h3
                  id="indecent-modal-title"
                  className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                >
                  please remove the indecent words
                </h3>
                <p className="text-sm text-silver-300 leading-relaxed pt-1">
                  Your message contains inappropriate language that violates content guidelines. Please remove the offensive words to send your message.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowIndecentModal(false);
                    const messageEl = document.getElementById('message');
                    if (messageEl) messageEl.focus();
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  Edit Message
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
