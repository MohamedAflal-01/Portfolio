import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll progress bar at top of page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Listen for the entry transition trigger to immediately activate Hero video playback
  useEffect(() => {
    const handleEnterStart = () => setHasEntered(true);
    window.addEventListener('app:enter-system', handleEnterStart);
    return () => window.removeEventListener('app:enter-system', handleEnterStart);
  }, []);

  // Lock body scroll while intro is visible, and release when entering
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  const handleEnterSystem = () => {
    setHasEntered(true);
    setShowIntro(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Handle active section on scroll
  useEffect(() => {
    if (showIntro) return;

    const sections = ['hero', 'about', 'projects', 'skills', 'education', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showIntro]);

  return (
    <div className="relative bg-[#050505] text-[#e5e5ea] min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      {/* Scroll Progress Bar */}
      {!showIntro && (
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-silver-400 via-white to-silver-200 origin-left z-50 scroll-progress-glow"
        />
      )}

      {/* Loading Intro Terminal Screen */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <LoadingScreen onEnter={handleEnterSystem} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col min-h-screen"
      >
        <Navbar activeSection={activeSection} />
        
        <main id="main-content" aria-label="Portfolio content" className="flex-1 w-full">
          <Hero hasEntered={hasEntered} />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>

        <Footer />
      </motion.div>
    </div>
  );
};

export default App;
