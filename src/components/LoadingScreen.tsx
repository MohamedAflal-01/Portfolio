import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Sparkles, Terminal } from 'lucide-react';
import { LEFT_ICONS, RIGHT_ICONS, TechIconSvg } from './TechLogos';

interface LoadingScreenProps {
  onEnter: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  color: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [statusText, setStatusText] = useState('INITIALIZING AFLAL.SYS');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasTriggeredEnter = useRef(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const prefersReducedMotion = useMemo(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  }, []);

  const triggerEnter = useCallback(() => {
    if (hasTriggeredEnter.current) return;
    hasTriggeredEnter.current = true;
    setIsLaunching(true);

    // Synchronously dispatch custom event so hero video starts with sound
    window.dispatchEvent(new CustomEvent('app:enter-system'));

    setTimeout(() => {
      onEnter();
    }, 650);
  }, [onEnter]);

  // Smooth Loading Progress Simulation
  useEffect(() => {
    const isHoldMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('hold');
    let current = 0;
    const intervalTime = prefersReducedMotion ? 20 : 35;
    const increment = prefersReducedMotion ? 2.5 : 1.15;

    const timer = setInterval(() => {
      if (isHoldMode && current >= 75) {
        setProgress(75);
        setStatusText('SYNCING NEURAL GRAPHICS & MODULES');
        return;
      }

      current = Math.min(100, current + increment + Math.random() * 0.75);
      const rounded = Math.floor(current);
      setProgress(rounded);

      if (rounded >= 95) {
        setStatusText('SYSTEM READY // ACCESS GRANTED');
        setIsReady(true);
      } else if (rounded >= 70) {
        setStatusText('SYNCING NEURAL GRAPHICS & MODULES');
      } else if (rounded >= 45) {
        setStatusText('COMPILING FULL-STACK ARCHITECTURE');
      } else if (rounded >= 20) {
        setStatusText('ESTABLISHING SECURE SESSION');
      }

      if (current >= 100) {
        clearInterval(timer);
        setIsReady(true);
        setTimeout(() => {
          triggerEnter();
        }, 900);
      }
    }, intervalTime);

    const fallback = isHoldMode ? null : setTimeout(() => {
      triggerEnter();
    }, 7000);

    return () => {
      clearInterval(timer);
      if (fallback) clearTimeout(fallback);
    };
  }, [prefersReducedMotion, triggerEnter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Enter', 'Space'].includes(e.code)) {
        e.preventDefault();
        triggerEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerEnter]);

  // Subtle Mouse Parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 12;
    setParallaxOffset({ x, y });
  }, [prefersReducedMotion]);

  // Digital Particle Sparks Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#168BFF', '#36D9FF', '#FFFFFF', '#65B4FF', '#A3E5FF'];
    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.15,
      opacity: Math.random() * 0.5 + 0.2,
      maxOpacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.pulseSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
        ctx.shadowBlur = p.size * 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: isLaunching ? 0 : 1,
        scale: isLaunching ? 1.05 : 1,
      }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black text-[#F5F8FF] overflow-hidden select-none"
      style={{ height: '100dvh', backgroundColor: '#000000' }}
    >
      {/* ── Background Particle Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-75"
      />

      {/* ── Top Atmospheric Electric Blue Glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[360px] bg-gradient-to-b from-[#168BFF]/25 via-[#36D9FF]/8 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* ── Top HUD Status Bar ── */}
      <header className="w-full max-w-7xl mx-auto px-6 pt-5 pb-2 flex items-center justify-between text-xs font-mono tracking-widest text-[#8A9FB8] shrink-0 z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#168BFF] animate-ping" />
          <span className="text-white font-bold tracking-wider">AFLAL.Shelby</span>
          <span className="text-[#4E6682]">//</span>
          <span className="text-[#36D9FF]">PORTFOLIO_V1.0.0</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#7A93AF]">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#36D9FF]" />
            <span>CORE: ACTIVE</span>
          </span>
          <span className="text-[#364960]">•</span>
          <span className="flex items-center gap-1.5 text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-[#168BFF]" />
            <span>FULL-STACK ARCHITECTURE</span>
          </span>
        </div>

        {/* Skip / Enter Action Button */}
        <button
          onClick={triggerEnter}
          className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#168BFF]/40 hover:border-[#36D9FF] bg-[#168BFF]/10 hover:bg-[#168BFF]/25 text-[#36D9FF] hover:text-white transition-all text-[11px] font-semibold tracking-wider cursor-pointer shadow-[0_0_15px_rgba(22,139,255,0.2)]"
          aria-label="Skip to main portfolio"
        >
          <span>{isReady ? 'ENTER' : 'SKIP INTRO'}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      {/* ── Main Center Stage: Live Layers (Rings + Portrait + Floating Logos) ── */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center min-h-0 z-20 px-2 sm:px-6">
        
        {/* Dynamic Parallax Container */}
        <motion.div
          animate={{
            x: parallaxOffset.x,
            y: parallaxOffset.y,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="relative w-full h-full max-h-[82vh] flex items-center justify-center"
        >
          {/* ================= LAYER 1: GLOWING ELLIPTICAL ENERGY RINGS & LIGHT TRAILS ================= */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* SVG Glowing Elliptical Curves matching reference */}
            <svg
              className="w-full h-full max-w-[1240px] max-h-[660px] overflow-visible"
              viewBox="0 0 1000 550"
              fill="none"
            >
              <defs>
                <linearGradient id="ringGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#168BFF" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#36D9FF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#C6D0DC" stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="trailLeft" x1="0%" y1="100%" x2="50%" y2="40%">
                  <stop offset="0%" stopColor="#36D9FF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#168BFF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="trailRight" x1="100%" y1="0%" x2="50%" y2="60%">
                  <stop offset="0%" stopColor="#36D9FF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#168BFF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </linearGradient>

                <filter id="laserGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur1" />
                  <feGaussianBlur stdDeviation="3" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Large Outer Ellipse */}
              <ellipse
                cx="500"
                cy="270"
                rx="470"
                ry="235"
                stroke="url(#ringGlow)"
                strokeWidth="2"
                strokeDasharray="10 6"
                opacity="0.55"
                filter="url(#laserGlow)"
              />

              {/* Sweeping Curved Light Trail — Left to Bottom Center */}
              <path
                d="M 10 440 C 180 430, 260 480, 500 485 C 740 480, 820 430, 990 440"
                stroke="url(#trailLeft)"
                strokeWidth="4"
                fill="none"
                filter="url(#laserGlow)"
              />
              <path
                d="M 0 380 C 140 370, 200 470, 480 480"
                stroke="#36D9FF"
                strokeWidth="2.5"
                fill="none"
                opacity="0.9"
                filter="url(#laserGlow)"
              />

              {/* Sweeping Curved Light Trail — Top Right Wrapping Behind */}
              <path
                d="M 990 120 C 850 40, 680 10, 500 20 C 320 30, 180 80, 40 140"
                stroke="url(#trailRight)"
                strokeWidth="3.5"
                fill="none"
                filter="url(#laserGlow)"
              />
              <path
                d="M 960 170 C 880 70, 720 30, 500 40"
                stroke="#65B4FF"
                strokeWidth="1.8"
                fill="none"
                opacity="0.8"
                filter="url(#laserGlow)"
              />

              {/* Inner Orbiting Energy Oval */}
              <ellipse
                cx="500"
                cy="255"
                rx="380"
                ry="205"
                stroke="#168BFF"
                strokeWidth="1.5"
                opacity="0.45"
                transform="rotate(-5 500 255)"
              />
            </svg>

            {/* Glowing Core Radial Flares */}
            <div className="absolute w-[480px] h-[480px] rounded-full bg-gradient-radial from-[#168BFF]/35 via-[#36D9FF]/12 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute w-[720px] h-[300px] rounded-[50%] bg-[#36D9FF]/15 blur-3xl pointer-events-none transform -rotate-6" />
          </div>

          {/* ================= LAYER 2: FLOATING TECH LOGOS (LEFT SIDE) ================= */}
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            {LEFT_ICONS.map((icon) => (
              <motion.div
                key={icon.id}
                animate={{
                  y: [-6, 6, -6],
                  rotateZ: [-2.5, 2.5, -2.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: icon.floatDuration,
                  delay: icon.floatDelay,
                  ease: 'easeInOut',
                }}
                className="absolute flex items-center justify-center pointer-events-auto group cursor-default transition-transform hover:scale-115"
                style={{
                  left: `calc(50% + ${icon.x}%)`,
                  top: `calc(46% + ${icon.y}%)`,
                  transform: 'translate(-50%, -50%)',
                  filter: `drop-shadow(0 0 16px ${icon.glowColor}) drop-shadow(0 0 30px ${icon.glowColor})`,
                }}
              >
                <TechIconSvg id={icon.id} size={icon.size} />
              </motion.div>
            ))}
          </div>

          {/* ================= LAYER 3: FLOATING TECH LOGOS (RIGHT SIDE) ================= */}
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            {RIGHT_ICONS.map((icon) => (
              <motion.div
                key={icon.id}
                animate={{
                  y: [6, -6, 6],
                  rotateZ: [2.5, -2.5, 2.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: icon.floatDuration,
                  delay: icon.floatDelay,
                  ease: 'easeInOut',
                }}
                className="absolute flex items-center justify-center pointer-events-auto group cursor-default transition-transform hover:scale-115"
                style={{
                  left: `calc(50% + ${icon.x}%)`,
                  top: `calc(46% + ${icon.y}%)`,
                  transform: 'translate(-50%, -50%)',
                  filter: `drop-shadow(0 0 16px ${icon.glowColor}) drop-shadow(0 0 30px ${icon.glowColor})`,
                }}
              >
                <TechIconSvg id={icon.id} size={icon.size} />
              </motion.div>
            ))}
          </div>

          {/* ================= LAYER 4: CENTERED PROFESSIONAL PORTRAIT ================= */}
          <div className="relative z-20 flex flex-col items-center justify-end h-full max-h-[76vh] pointer-events-none">
            {/* Blue Rim Glow behind portrait silhouette */}
            <div className="absolute bottom-8 w-[340px] sm:w-[440px] h-[500px] rounded-full bg-gradient-radial from-[#168BFF]/45 via-[#36D9FF]/20 to-transparent blur-3xl -z-10" />

            {/* Mohamed Aflal Portrait */}
            <div className="relative h-full flex items-end">
              <img
                src="/images/aflal-cutout.webp"
                alt="Mohamed Aflal - Software Developer"
                className="h-full w-auto max-h-[68vh] sm:max-h-[72vh] object-contain object-bottom filter contrast-[1.06] brightness-[1.02] drop-shadow-[0_0_35px_rgba(22,139,255,0.45)]"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>

          {/* ================= LAYER 5: REFLECTIVE DARK FLOOR & FOREGROUND LIGHT BEAM ================= */}
          <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-25 flex flex-col items-center justify-end">
            {/* Reflective floor horizontal blue shimmer */}
            <div className="w-[85%] max-w-[850px] h-20 bg-[radial-gradient(ellipse_at_50%_100%,rgba(22,139,255,0.3)_0%,rgba(54,217,255,0.12)_45%,transparent_70%)] blur-lg" />
            {/* Crisp floor light line */}
            <div className="w-[65%] max-w-[660px] h-[2px] bg-gradient-to-r from-transparent via-[#36D9FF] to-transparent shadow-[0_0_15px_#36D9FF]" />
          </div>

        </motion.div>
      </main>

      {/* ── Bottom Section: Animated Futuristic Loading Bar & Status Readout ── */}
      <footer className="w-full max-w-4xl mx-auto px-6 pb-6 sm:pb-8 flex flex-col items-center justify-center shrink-0 z-30">
        
        {/* Status Line: Status Text (Left) + Percentage (Right) */}
        <div className="w-full max-w-[460px] sm:max-w-[540px] flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest uppercase mb-2 px-1">
          <div className="flex items-center gap-2 text-[#8FB0D3]">
            <Terminal className="w-3.5 h-3.5 text-[#36D9FF]" />
            <span className="truncate">{statusText}</span>
          </div>

          <div className="flex items-center gap-1 font-bold text-white tabular-nums">
            <span className="text-[#36D9FF] text-xs">{progress}</span>
            <span className="text-white/40">%</span>
          </div>
        </div>

        {/* ─── Sleek Horizontal Animated Loading Bar ─── */}
        <div
          className="relative w-full max-w-[460px] sm:max-w-[540px] h-2.5 sm:h-3 rounded-full bg-[#070D18] p-[1.5px] border border-[#274668] shadow-[0_0_25px_rgba(22,139,255,0.6),inset_0_1px_3px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer group"
          onClick={triggerEnter}
          title="Click to enter portfolio"
        >
          {/* Animated Electric Blue Gradient Progress Fill */}
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#0E5CE6] via-[#168BFF] to-[#36D9FF] relative shadow-[0_0_20px_rgba(54,217,255,0.9)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          >
            {/* White-Blue Shimmer Runner Highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-28 animate-shimmer" />

            {/* Glowing Leading Edge Dot */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#36D9FF,0_0_20px_#168BFF]" />
          </motion.div>
        </div>

        {/* ─── Bottom Subtext / Keyboard Hint ─── */}
        <div className="flex items-center justify-center gap-3 mt-3 font-mono text-[9px] sm:text-[10px] tracking-wider text-[#637C98]">
          <span>[ PRESS <kbd className="text-white bg-white/10 px-1.5 py-0.5 rounded text-[8.5px]">ENTER</kbd> OR CLICK TO LAUNCH ]</span>
        </div>
      </footer>
    </motion.div>
  );
};
