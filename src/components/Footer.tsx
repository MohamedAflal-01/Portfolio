import React, { useEffect, useState } from 'react';
import { ArrowUp, Mail, Terminal, Wifi } from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6H9.2V10.9H6.46M7.83 6.25a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.65 1.65 0 0 0-1.66-1.66z" />
  </svg>
);

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'CONTACT', href: '#contact' },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const [clock, setClock] = useState('');
  const [uptime, setUptime] = useState(0);
  const startTime = React.useRef(Date.now());

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setClock(`${h}:${m}:${s}`);
      setUptime(Math.floor((Date.now() - startTime.current) / 1000));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#050505] mt-12 select-none overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
          zIndex: 0,
        }}
      />

      {/* Top glowing border */}
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3b82f6]/60 to-transparent" />
        <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-[#3b82f6]/40 to-transparent" />
      </div>

      {/* System label bar */}
      <div className="relative z-10 flex items-center gap-3 px-6 md:px-12 py-2 border-b border-white/[0.06] bg-white/[0.015]">
        <Terminal className="w-3 h-3 text-[#3b82f6]" />
        <span className="font-mono text-[10px] text-[#3b82f6] tracking-[0.2em] uppercase">
          AFLAL.SYS v1.0.0
        </span>
        <div className="flex-1" />
        <Wifi className="w-3 h-3 text-white/20" />
        <span className="font-mono text-[10px] text-white/25 tracking-widest">{clock}</span>
      </div>

      {/* Main footer body */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

        {/* Column 1 - Brand */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-2xl font-black tracking-[0.15em] text-white">AFLAL</span>
              <span className="font-mono text-[10px] text-[#3b82f6]/80 tracking-widest">SHELBY</span>
            </div>
            <p className="font-mono text-[11px] text-white/35 tracking-wider leading-relaxed max-w-xs">
              Full-Stack Web Developer crafting high-performance, scalable digital experiences with clean architecture and futuristic precision.
            </p>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] text-emerald-400/80 tracking-widest">SYSTEM ONLINE</span>
            <span className="font-mono text-[10px] text-white/20 tracking-widest ml-auto">UP: {uptime}s</span>
          </div>

          {/* Decorative grid corner */}
          <div
            className="mt-2 w-20 h-10 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
          />
        </div>

        {/* Column 2 - Navigation */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] text-[#3b82f6]/60 tracking-[0.25em]">$_</span>
            <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">NAVIGATION</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1.5 font-mono text-[11px] text-white/40 hover:text-white tracking-widest transition-colors duration-200"
              >
                <span className="text-[#3b82f6]/40 group-hover:text-[#3b82f6] transition-colors">&gt;</span>
                {link.label}
              </a>
            ))}
          </div>

          {/* Horizontal rule decoration */}
          <div className="mt-4 h-px bg-gradient-to-r from-[#3b82f6]/20 via-white/10 to-transparent" />
          <p className="font-mono text-[10px] text-white/20 tracking-wider">
            © {year} Mohammed Aflal. All rights reserved.
          </p>
        </div>

        {/* Column 3 - Connect */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] text-[#3b82f6]/60 tracking-[0.25em]">$_</span>
            <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">CONNECT</span>
          </div>

          <div className="flex flex-col gap-2">
            {/* GitHub */}
            <a
              href="https://github.com/MohamedAflal-01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mohammed Aflal on GitHub"
              className="group flex items-center gap-3 p-2.5 rounded border border-white/[0.06] bg-white/[0.02] hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/[0.04] transition-all duration-200"
            >
              <span className="w-7 h-7 rounded flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-white/50 group-hover:text-white group-hover:border-[#3b82f6]/40 transition-all">
                <GithubIcon className="w-3.5 h-3.5" />
              </span>
              <div>
                <div className="font-mono text-[10px] text-white/60 group-hover:text-white tracking-widest transition-colors">GITHUB</div>
                <div className="font-mono text-[9px] text-white/25 tracking-wider">MohamedAflal-01</div>
              </div>
              <span className="ml-auto font-mono text-[10px] text-white/15 group-hover:text-[#3b82f6]/60 transition-colors">&gt;</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/mohamedaflal01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mohammed Aflal on LinkedIn"
              className="group flex items-center gap-3 p-2.5 rounded border border-white/[0.06] bg-white/[0.02] hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/[0.04] transition-all duration-200"
            >
              <span className="w-7 h-7 rounded flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-white/50 group-hover:text-white group-hover:border-[#3b82f6]/40 transition-all">
                <LinkedinIcon className="w-3.5 h-3.5" />
              </span>
              <div>
                <div className="font-mono text-[10px] text-white/60 group-hover:text-white tracking-widest transition-colors">LINKEDIN</div>
                <div className="font-mono text-[9px] text-white/25 tracking-wider">mohamedaflal01</div>
              </div>
              <span className="ml-auto font-mono text-[10px] text-white/15 group-hover:text-[#3b82f6]/60 transition-colors">&gt;</span>
            </a>

            {/* Email */}
            <a
              href="mailto:rafaideenmuhammadaflalmuhammed@gmail.com"
              aria-label="Email Mohammed Aflal"
              className="group flex items-center gap-3 p-2.5 rounded border border-white/[0.06] bg-white/[0.02] hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/[0.04] transition-all duration-200"
            >
              <span className="w-7 h-7 rounded flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-white/50 group-hover:text-white group-hover:border-[#3b82f6]/40 transition-all">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-white/60 group-hover:text-white tracking-widest transition-colors">EMAIL</div>
                <div className="font-mono text-[9px] text-white/25 tracking-wider truncate max-w-[160px]">rafaideen...@gmail.com</div>
              </div>
              <span className="ml-auto font-mono text-[10px] text-white/15 group-hover:text-[#3b82f6]/60 transition-colors">&gt;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between">
          <span className="font-mono text-[10px] text-white/20 tracking-widest">
            BUILT WITH <span className="text-[#3b82f6]/50">REACT + TYPESCRIPT + VITE</span>
          </span>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/15 tracking-widest italic">
              &ldquo;Code Today. A Better Tomorrow.&rdquo;
            </span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            id="footer-back-to-top"
            className="group flex items-center gap-2 px-3 py-1.5 rounded border border-white/[0.08] bg-white/[0.03] hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/[0.06] transition-all duration-200 cursor-pointer"
          >
            <ArrowUp className="w-3 h-3 text-white/40 group-hover:text-[#3b82f6] transition-colors" />
            <span className="font-mono text-[10px] text-white/40 group-hover:text-[#3b82f6] tracking-widest transition-colors">BACK TO TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
