import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Landmark, BookOpen } from 'lucide-react';
import type { EducationItem as EducationItemType } from '../data/education';

interface EducationItemProps {
  item: EducationItemType;
  index: number;
  isLast: boolean;
}

export const EducationItem: React.FC<EducationItemProps> = ({ item, index, isLast }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'graduation-cap':
        return <GraduationCap className="w-5 h-5 text-white" />;
      case 'landmark':
        return <Landmark className="w-5 h-5 text-white" />;
      case 'book-open':
        return <BookOpen className="w-5 h-5 text-white" />;
      default:
        return <GraduationCap className="w-5 h-5 text-white" />;
    }
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isEven ? -35 : 35,
        scale: 0.97
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative flex items-start group will-change-transform"
    >
      {/* Left Date / Period */}
      <div className="w-28 sm:w-40 pt-1 text-right pr-6 sm:pr-10 shrink-0">
        <span className="font-mono text-xs sm:text-sm font-semibold text-silver-300 group-hover:text-white transition-colors">
          {item.period}
        </span>
      </div>

      {/* Center Timeline Node & Connecting Line */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Circle Node with scroll entry pulse */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.18 + 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          className="w-4 h-4 rounded-full bg-[#050505] border-2 border-white/70 group-hover:border-white group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.9)] transition-all duration-300 z-10 my-1.5 relative"
        >
          {/* Subtle glowing halo */}
          <div className="absolute -inset-1 rounded-full bg-white/20 blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Vertical Line */}
        {!isLast && (
          <div className="w-[1.5px] bg-gradient-to-b from-white/30 via-white/15 to-white/5 h-full absolute top-5 bottom-0 group-hover:from-white/50 group-hover:to-white/20 transition-colors" />
        )}
      </div>

      {/* Right Education Details */}
      <div className="pl-6 sm:pl-10 pb-12 flex-1">
        <div className="glass-card p-6 rounded-2xl border border-white/10 group-hover:border-white/35 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(255,255,255,0.08)]">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-silver-100 transition-colors">
                {item.degree}
              </h3>
              <p className="text-silver-300 text-sm font-medium mt-0.5">
                {item.institution}
                {item.stream && <span className="text-silver-400"> — {item.stream}</span>}
                {item.location && <span className="text-silver-400">, {item.location}</span>}
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15 group-hover:border-white/40 group-hover:scale-105 transition-all duration-300">
              {getIcon(item.icon)}
            </div>
          </div>
          <p className="text-silver-400 text-sm mt-3 leading-relaxed font-light">
            "{item.description}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};
