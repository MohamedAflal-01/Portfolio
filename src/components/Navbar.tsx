import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const isMobile = mobileMenuOpen;
    if (isMobile) {
      setMobileMenuOpen(false);
      // Delay scroll to allow the mobile menu exit animation to complete
      // and the DOM to settle after React re-render
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, '#hero')}
          aria-label="Mohammed Aflal — go to top"
          className="font-sans text-xl md:text-2xl font-black tracking-wider text-white hover:text-silver-200 transition-colors flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 bg-white rounded-full transition-transform group-hover:scale-125 duration-300" />
          <span>MOHAMED AFLAL</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-sm font-medium transition-all duration-300 relative py-1 group ${
                  isActive ? 'text-white' : 'text-silver-400 hover:text-white'
                }`}
              >
                {link.name}
                {isActive ? (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Call To Action */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="group px-5 py-2.5 rounded-full border border-white/30 hover:border-white text-xs font-semibold uppercase tracking-wider text-white bg-white/[0.03] hover:bg-white/10 transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#0a0a0c]/98 backdrop-blur-xl border-b border-white/15 px-6 py-6 overflow-hidden"
          >
            <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`text-base font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-between border-l-2 ${
                      isActive
                        ? 'bg-white/10 text-white font-semibold border-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]'
                        : 'text-silver-400 border-transparent hover:text-white hover:bg-white/[0.06] hover:border-white/50 hover:pl-5 hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.03)]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="w-full py-3 rounded-full bg-white text-black font-semibold text-center text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:bg-silver-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
