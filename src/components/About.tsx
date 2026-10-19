import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowUpRight, Check, RotateCw } from 'lucide-react';

export const About: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const quickFacts = [
    { label: 'Based in', value: 'Kalmunai, Sri Lanka' },
    { label: 'Studying', value: 'HND, Software Engineering' },
    { label: 'Batch', value: '2024 — 2028' },
    { label: 'Role', value: 'Full-Stack Developer' },
    { label: 'Focus', value: 'Full stack · AI · Data Science' },
  ];

  const whatIAmItems = [
    {
      title: 'Full Stack Developer',
      subtitle: 'React · Node.js · Modern Backends',
    },
    {
      title: 'Software Engineer & Researcher',
      subtitle: 'Enterprise Apps · Clean Code',
    },
    {
      title: 'Problem Solver',
      subtitle: 'Data Structures · System Design',
    },
    {
      title: 'AI & Web Builder',
      subtitle: 'APIs · Automation · Cloud',
    },
    {
      title: 'Department Top Performer',
      subtitle: 'HND Computing · Continuous Learner',
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-28 lg:py-36 bg-[#050505] text-[#e5e5ea] overflow-hidden selection:bg-white selection:text-black border-t border-white/[0.08]"
    >
      {/* Background ambient lighting and subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-white/[0.05] via-transparent to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* ================= LEFT COLUMN: INTRO & BIO ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between pt-2"
          >
            <div>
              {/* Section Tag: 01 — ABOUT */}
              <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-silver-400 uppercase mb-6 sm:mb-8">
                <span className="font-semibold text-white">01</span>
                <span className="w-8 h-[1px] bg-white/20" />
                <span>ABOUT</span>
              </div>

              {/* Main Heading: Hi, I'm Mohamed. */}
              <h2 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-sans font-bold tracking-tight text-white leading-[1.08] mb-6 sm:mb-8">
                Hi, I'm{' '}
                <span className="font-serif italic font-normal text-white tracking-normal">
                  Mohamed Aflal.
                </span>
              </h2>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-silver-300 text-[15px] sm:text-base leading-relaxed max-w-xl font-light">
                <p>
                  Motivated Full Stack Developer skilled in building scalable applications with React, Node.js, and modern backend technologies. Strong in API development, system design, and problem solving.
                </p>
                <p className="text-silver-400">
                  I work across frontend, backend, AI, APIs, databases, and creative web development.
                </p>
              </div>

              {/* Action Buttons: Résumé ↓ , GitHub ↗ , LinkedIn ↗ */}
              <div className="flex flex-wrap items-center gap-3 pt-8 sm:pt-10">
                {/* Resume Download Pill Button (White on dark) */}
                <a
                  href="/cv.pdf"
                  download="Mohammed_Aflal_CV.pdf"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-silver-200 text-black text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.18)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  <span>Resume</span>
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>

                {/* GitHub Pill Button (Dark Glass) */}
                <a
                  href="https://github.com/MohamedAflal-01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 hover:border-white/30 text-sm font-medium tracking-wide backdrop-blur-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-400" />
                </a>

                {/* LinkedIn Pill Button (Dark Glass) */}
                <a
                  href="https://linkedin.com/in/mohamedaflal01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 hover:border-white/30 text-sm font-medium tracking-wide backdrop-blur-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-400" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ================= CENTER COLUMN: HANGING LANYARD ID BADGE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 35, rotateZ: 2 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-center justify-center relative my-4 lg:my-0"
          >
            {/* Lanyard hanging assembly */}
            <div className="flex flex-col items-center z-10 select-none pointer-events-none">
              {/* Lanyard Strap from top ceiling */}
              <div className="w-7 h-16 sm:h-20 bg-[#16171E] border-x border-white/10 rounded-b-sm shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex justify-between px-1 relative overflow-hidden">
                {/* Lanyard subtle stitch line */}
                <div className="w-[1px] h-full bg-white/20" />
                <div className="w-[1px] h-full bg-white/20" />
              </div>

              {/* Metallic Clasp / Swivel Clip */}
              <div className="relative -mt-1 flex flex-col items-center">
                {/* Silver Metal Bracket */}
                <div className="w-9 h-3.5 rounded-sm bg-gradient-to-r from-silver-400 via-white to-silver-300 border border-black/30 shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
                {/* Silver Swivel Ring */}
                <div className="w-4 h-4 -mt-1 rounded-full border-2 border-silver-400 bg-transparent" />
                {/* Clip Tongue inserted into card slot */}
                <div className="w-5 h-2 -mt-1 rounded-t-sm bg-gradient-to-b from-silver-300 to-silver-500 shadow-inner" />
              </div>
            </div>

            {/* 3D Flip Card Container */}
            <div
              className="relative w-[280px] sm:w-[315px] h-[435px] sm:h-[465px] -mt-2 cursor-pointer select-none group perspective-1000"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Animated Swiveling & Flipping Card */}
              <motion.div
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                  rotateZ: isFlipped ? 1.5 : -1.5,
                }}
                whileHover={{ scale: 1.02, rotateZ: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="w-full h-full relative preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* ──────────────── FRONT OF ID BADGE ──────────────── */}
                <div
                  className="absolute inset-0 w-full h-full rounded-[22px] bg-white border border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.08)] flex flex-col overflow-hidden backface-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  {/* Top Slot Hole for Lanyard Clip */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-[#E5E2D9] border border-black/15 shadow-inner z-20" />

                  {/* Top Dark Header Bar */}
                  <div className="bg-[#14151C] text-white pt-6 pb-3 px-4 rounded-t-[20px] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2.5">
                      {/* Monogram Circle MA */}
                      <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-[10px] tracking-wider text-white">
                        MA
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] font-bold tracking-widest text-white leading-tight uppercase">
                          DEVELOPER ID
                        </span>
                        <span className="font-mono text-[8.5px] text-white/50 tracking-wider">
                          Portfolio · 2026
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo in Frame */}
                  <div className="flex-1 px-5 pt-3 pb-2 flex flex-col items-center justify-center">
                    <div className="w-full max-w-[200px] aspect-[4/4.6] rounded-xl overflow-hidden border border-black/10 bg-[#f4f2ea] shadow-sm relative group-hover:shadow transition-shadow">
                      <img
                        src="/images/aflal-portrait.webp"
                        alt="Mohamed Aflal - Full Stack Developer ID"
                        className="w-full h-full object-cover object-top filter contrast-[1.05]"
                      />
                      {/* Subtle glossy vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Developer Name & Role */}
                    <div className="text-center mt-3 mb-1">
                      <h3 className="font-bold text-[15px] sm:text-base tracking-wider text-[#141414] uppercase leading-tight">
                        MOHAMED AFLAL
                      </h3>
                      <p className="font-mono text-[11px] text-[#78756E] tracking-wide mt-0.5 font-medium">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>

                  {/* Badge Meta Grid: ID NO | DEPT | PASS TILL */}
                  <div className="border-t border-[#EAE7DF] px-4 py-2 bg-[#FAF8F3] grid grid-cols-3 gap-1 text-center shrink-0">
                    <div>
                      <div className="font-mono text-[8px] text-[#9A9790] uppercase tracking-wider">
                        ID NO.
                      </div>
                      <div className="font-mono text-[10.5px] font-bold text-[#1F1E1B]">
                        Dev-9999 
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[8px] text-[#9A9790] uppercase tracking-wider">
                        DEPT
                      </div>
                      <div className="font-mono text-[10px] font-bold text-[#1F1E1B] truncate px-0.5">
                        IT Department.
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[8px] text-[#9A9790] uppercase tracking-wider">
                        PASS TILL
                      </div>
                      <div className="font-mono text-[10.5px] font-bold text-[#1F1E1B]">
                        2028
                      </div>
                    </div>
                  </div>

                  {/* Barcode and Hologram Footer */}
                  <div className="px-5 py-2.5 bg-white border-t border-[#F0EDE5] flex items-center justify-between shrink-0">
                    {/* SVG Barcode */}
                    <div className="flex items-center gap-[2.5px] h-6 opacity-85">
                      {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1].map((w, i) => (
                        <div
                          key={i}
                          className="h-full bg-[#1A1A1A] rounded-[0.5px]"
                          style={{ width: `${w}px` }}
                        />
                      ))}
                    </div>

                    {/* Shiny Metallic Hologram Chip */}
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-200 via-rose-300 to-cyan-300 border border-white shadow-sm flex items-center justify-center opacity-90">
                      <div className="w-3.5 h-3.5 rounded-full border border-white/60 bg-white/20" />
                    </div>
                  </div>
                </div>

                {/* ──────────────── BACK OF ID BADGE ──────────────── */}
                <div
                  className="absolute inset-0 w-full h-full rounded-[22px] bg-[#FCFBF9] border border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.08)] p-5 flex flex-col justify-between overflow-hidden backface-hidden [transform:rotateY(180deg)]"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {/* Top Slot Hole for Lanyard Clip */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-[#E5E2D9] border border-black/15 shadow-inner z-20" />

                  {/* Header: What I am */}
                  <div className="pt-4 pb-2 border-b border-[#ECE9E0]">
                    <h3 className="font-serif italic text-2xl sm:text-[1.65rem] font-bold text-[#111111] tracking-tight">
                      What I am
                    </h3>
                  </div>

                  {/* Checklist of Traits */}
                  <div className="space-y-3 sm:space-y-3.5 py-2">
                    {whatIAmItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        {/* Dark circular check badge */}
                        <div className="w-4 h-4 rounded-full bg-[#18181A] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12px] sm:text-[13px] font-bold text-[#141414] leading-tight">
                            {item.title}
                          </span>
                          <span className="text-[10px] sm:text-[10.5px] text-[#7A7770] font-mono leading-tight mt-0.5">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom: Signature & Contact Note */}
                  <div className="pt-2 border-t border-[#ECE9E0] flex flex-col">
                    <div className="font-serif italic text-2xl text-[#181818] tracking-wide select-none leading-none">
                      Mohamed Aflal
                    </div>
                    <div className="mt-2 text-[9px] font-mono text-[#8C8982] tracking-wider uppercase leading-tight">
                      IF YOU'D LIKE TO SAY HELLO:
                      <div className="text-[#1A1A1A] font-semibold lowercase tracking-normal">
                        rafaideenmuhammadaflalmuhammed@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Click to flip interactive hint */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/10 text-silver-400 hover:text-white border border-white/10 text-[11px] font-mono tracking-wider transition-colors cursor-pointer"
            >
              <RotateCw className="w-3 h-3 text-silver-400" />
              <span>{isFlipped ? 'VIEW ID FRONT' : 'CLICK TO FLIP'}</span>
            </button>
          </motion.div>

          {/* ================= RIGHT COLUMN: QUICK FACTS & QUOTE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col justify-between pt-2"
          >
            <div>
              {/* Header: QUICK FACTS */}
              <div className="font-mono text-xs tracking-[0.25em] text-silver-400 uppercase mb-6 sm:mb-8">
                QUICK FACTS
              </div>

              {/* Spec Sheet Rows with hairline borders */}
              <div className="divide-y divide-white/10 border-y border-white/10">
                {quickFacts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="py-3 sm:py-3.5 flex items-baseline justify-between text-xs sm:text-[13px] gap-2"
                  >
                    <span className="text-silver-400 font-normal shrink-0">
                      {fact.label}
                    </span>
                    <span className="text-white font-semibold text-right truncate">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Serif Italic Quote at Bottom */}
            <div className="mt-12 sm:mt-16 pt-4">
              <blockquote className="font-serif italic text-2xl sm:text-[1.75rem] text-white/95 font-normal leading-[1.25] tracking-tight">
                “I Don’t Follow the Future. I Build My Way Into It.”
              </blockquote>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
