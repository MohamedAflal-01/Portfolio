import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, ChevronDown, Volume2, Square, Play } from 'lucide-react';

const ROLES = [
  'SOFTWARE ENGINEER',
  'RESEARCHER',
  'FULL-STACK DEVELOPER',
  'FRONT-END DEVELOPER',
  'BACK-END DEVELOPER',
  'QA ENGINEER',
];

/* ─── Cinematic HUD-style Intro Video Player ─── */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  const tenths = Math.floor((seconds % 1) * 10).toString();
  return `${mins}:${secs}.${tenths}`;
};

interface IntroVideoPlayerProps {
  hasEntered?: boolean;
}

const IntroVideoPlayer: React.FC<IntroVideoPlayerProps> = ({ hasEntered = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  // Play video from beginning with audio when entering the web
  const startPlaybackWithSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;
    video.volume = 1;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Autoplay with sound blocked, trying muted first:', err);
          video.muted = true;
          video.play()
            .then(() => setIsPlaying(true))
            .catch((e) => console.error('Muted autoplay failed:', e));

          // Unmute on the first interaction anywhere
          const unlockAudio = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
          };
          window.addEventListener('click', unlockAudio, { once: true });
          window.addEventListener('touchstart', unlockAudio, { once: true });
          window.addEventListener('keydown', unlockAudio, { once: true });
        });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    // Trigger video playback immediately when user enters via "ENTER SYSTEM"
    const handleEnterEvent = () => {
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        startPlaybackWithSound();
      }
    };
    window.addEventListener('app:enter-system', handleEnterEvent);

    if (hasEntered) {
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        startPlaybackWithSound();
      }
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      window.removeEventListener('app:enter-system', handleEnterEvent);
    };
  }, [hasEntered, startPlaybackWithSound]);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar) return;
    const rect = bar.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = fraction * video.duration;
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full h-full max-w-[520px] flex flex-col rounded-2xl overflow-hidden bg-[#111113] border border-white/[0.08] shadow-[0_8px_60px_rgba(0,0,0,0.8)]">

      {/* ─── Top Header Bar ─── */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 uppercase shrink-0 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <span className="text-white/25">┌</span>
          <span>SYS.INTRO // 01</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>PORT.LIVE</span>
          <span className="text-white/25">┐</span>
        </div>
      </div>

      {/* ─── Title Bar: Recording dot + Name + Audio Indicator ─── */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Recording indicator dot */}
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase">
            MOHAMED AFLAL <span className="text-white/40 font-normal">//</span> INTRO
          </span>
        </div>

        {/* Audio ON Indicator (always on) */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/[0.07] border border-white/[0.12]">
          <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
          {/* Animated waveform bars */}
          <div className="flex items-end gap-[2px] h-3">
            {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
              <div
                key={i}
                className="w-[2px] rounded-full bg-white animate-pulse"
                style={{ height: `${h * 12}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider text-white uppercase">
            AUDIO ON
          </span>
        </div>
      </div>

      {/* ─── Video Viewport ─── */}
      <div className="relative flex-1 mx-2 sm:mx-3 mb-0 overflow-hidden rounded-md sm:rounded-lg bg-black min-h-0">
        <video
          ref={videoRef}
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          src="/intro-video.mp4"
        />
      </div>

      {/* ─── Bottom Control Bar ─── */}
      <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 shrink-0">
        {/* Stop / Play Button */}
        <button
          onClick={togglePlayPause}
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.12] hover:border-white/[0.2] transition-all duration-200 cursor-pointer group"
          aria-label={isPlaying ? 'Stop video' : 'Play video'}
        >
          {isPlaying ? (
            <Square className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white" />
          ) : (
            <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white" />
          )}
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider text-white/70 group-hover:text-white uppercase transition-colors">
            {isPlaying ? 'STOP' : 'PLAY'}
          </span>
        </button>

        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="flex-1 h-1.5 sm:h-2 bg-white/[0.08] rounded-full cursor-pointer relative overflow-hidden group"
          onClick={handleProgressClick}
        >
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/60 to-white/80 rounded-full transition-[width] duration-100 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Hover scrub indicator */}
          <div className="absolute inset-0 bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
        </div>

        {/* Timestamp */}
        <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider tabular-nums whitespace-nowrap shrink-0">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

interface HeroProps {
  hasEntered?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ hasEntered = true }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Lightweight scroll parallax — GPU-only properties (no rotateX to avoid repaint)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  useEffect(() => {
    const currentFullText = ROLES[currentRoleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 75);
      } else {
        // Paused after fully typed
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting backward
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 40);
      } else {
        // Move to next role
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Grid: Left typography + Right 3D Cube — scroll exit parallax (GPU-only) */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-10 py-8 will-change-transform"
      >
        {/* Left Column: Heading & Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start space-y-6"
        >
          {/* Animated Typing Label */}
          <div className="font-mono text-xs md:text-sm tracking-[0.25em] text-silver-300 uppercase flex items-center gap-2 h-7">
            <span className="text-white/60 font-bold">//</span>
            <span className="text-white font-semibold">{displayText}</span>
            <span className="inline-block w-2 h-4 bg-white animate-pulse" />
          </div>

          {/* Main Hero Name — single H1 for correct page heading hierarchy */}
          <div className="space-y-1">
            <h1 className="leading-none">
              <span className="block text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white/90 uppercase">
                MOHAMED
              </span>
              <span className="block text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-metallic uppercase leading-none">
                AFLAL
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="font-mono text-xs sm:text-sm md:text-base tracking-[0.25em] text-silver-300 font-semibold uppercase">
            BUILDING IDEAS INTO REALITY
          </p>

          {/* Description */}
          <p className="text-silver-400 text-base md:text-lg max-w-xl leading-relaxed font-normal">
            Passionate developer who loves creating modern web applications, solving problems and learning new technologies.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="btn-primary group"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/cv.pdf"
              download="Mohammed_Aflal_CV.pdf"
              className="btn-secondary group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 h-[360px] sm:h-[450px] lg:h-[500px] flex items-center justify-center relative"
        >
          <IntroVideoPlayer hasEntered={hasEntered} />
        </motion.div>
      </motion.div>

      {/* Upgraded Futuristic Scroll Down Indicator */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Scroll down to About section"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="w-full flex flex-col items-center justify-center pt-4 z-10 cursor-pointer group select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg"
        onClick={handleScrollDown}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleScrollDown();
          }
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* Cyber capsule with dynamic light beam */}
          <div className="w-6 h-10 rounded-full border border-white/25 bg-white/[0.02] backdrop-blur-sm flex items-start justify-center p-1 group-hover:border-white/70 group-hover:bg-white/[0.08] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300">
            <motion.div
              animate={{
                y: [0, 14, 0],
                opacity: [1, 0.4, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut'
              }}
              className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-white to-silver-400 shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            />
          </div>

          {/* Animated Chevrons */}
          <div className="flex flex-col items-center -mt-1 text-silver-400 group-hover:text-white transition-colors">
            <motion.div
              animate={{ y: [0, 3, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
            >
              <ChevronDown className="w-3.5 h-3.5 -mb-2" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 3, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </div>

        <span className="font-mono text-[10px] tracking-[0.3em] text-silver-400 uppercase mt-1 group-hover:text-white transition-colors">
          Scroll Down
        </span>
      </motion.div>
    </section>
  );
};
