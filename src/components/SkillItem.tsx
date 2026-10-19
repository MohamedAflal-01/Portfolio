import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Skill } from '../data/skills';

interface SkillItemProps {
  skill: Skill;
  index: number;
}

export const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false);

  // Crystal clear, high-contrast monochrome SVG icons designed for maximum visibility
  const renderIcon = (type: string) => {
    switch (type) {
      case 'csharp':
        return (
          <svg className="w-10 h-10 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor">
            {/* Hexagon outline */}
            <polygon points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5" strokeWidth="2" strokeLinejoin="round" fill="rgba(255,255,255,0.08)" />
            {/* C letter */}
            <path d="M15 11.5C13.5 10.5 11 11 9.5 12.8C8 14.8 8 17.2 9.5 19.2C11 21 13.5 21.5 15 20.5" strokeWidth="2.5" strokeLinecap="round" />
            {/* Sharp Hashtag symbol */}
            <path d="M19 12.5L18 19.5M22 12.5L21 19.5M16.5 14.5H23.5M16 17.5H23" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case 'aspnet':
        return (
          <svg className="w-10 h-10 text-white" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.08)" />
            <circle cx="9" cy="19" r="1.5" fill="currentColor" />
            <path d="M13 13V19M13 13L17 19V13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 13H24M20 16H23M20 19H24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );

      case 'java':
        return (
          <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 32 32">
            <path d="M12.5 5.5C12.5 5.5 15.5 8 13.5 11.5C12 14 10.5 15 12 16.5C13.5 17.8 15.2 16.5 16 15C16.8 13.5 16 12 15 10.5C14.2 9.2 14.5 7 17 5.5C15 6.5 14.5 7.8 15 9.2C15.5 10.5 16.5 11.5 16 13C15.5 14.2 14.5 15 13.5 14.5C12.5 14 13.5 12.5 14.2 11.5C15.2 10 14.8 7.5 12.5 5.5Z" />
            <path d="M18.5 7.5C18.5 7.5 21 9.8 19.5 12.5C18.2 14.5 17 15.5 18.2 16.8C19.5 18 21 16.8 21.5 15.2C22 13.8 21.2 12.5 20.5 11.2C19.8 10 20.2 8.2 22 7C20.5 8 20 9.2 20.5 10.5C21 11.8 21.8 12.5 21.2 13.8C20.8 14.8 20 15.2 19.2 14.8C18.5 14.2 19.2 13 20 12C20.8 10.8 20.5 8.8 18.5 7.5Z" />
            <path d="M7 21C11.5 21 21.5 21 25.5 21C26.5 21 27.5 20.5 27.5 19.5C27.5 18.5 26.5 18 25.5 18C23.5 18 21.5 18.2 19.5 18.2C16 18.2 10.5 18 7 19C5.5 19.5 5.5 20.5 7 21Z" />
            <path d="M9 23.5C12 24.2 20 24.2 23 23.5C24.5 23.2 25.5 24 24 24.8C21.5 26 10.5 26 8 24.8C6.5 24 7.5 23.2 9 23.5Z" />
            <path d="M11 27C13.5 27.5 18.5 27.5 21 27C22.2 26.8 22.8 27.4 21.8 28C19.8 29 12.2 29 10.2 28C9.2 27.4 9.8 26.8 11 27Z" />
          </svg>
        );

      case 'python':
        return (
          <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
            <path d="M11.91 2c-4.4 0-4.12 1.9-4.12 1.9l.01 1.97h4.19v.6H6.18S2 5.96 2 10.42c0 4.45 3.65 4.3 3.65 4.3h2.18v-3.07s-.12-3.66 3.6-3.66h6.18s3.5.06 3.5-3.41c0-3.48-3.07-3.58-3.07-3.58H11.91zm-2.03 1.2c.4 0 .73.33.73.73 0 .41-.33.74-.73.74-.41 0-.74-.33-.74-.74 0-.4.33-.73.74-.73zm2.21 20.8c4.4 0 4.12-1.9 4.12-1.9l-.01-1.97h-4.19v-.6h5.81s4.18.51 4.18-3.95c0-4.45-3.65-4.3-3.65-4.3h-2.18v3.07s.12 3.66-3.6 3.66H8.32s-3.5-.06-3.5 3.41c0 3.48 3.07 3.58 3.07 3.58h5.92zm2.03-1.2c-.4 0-.73-.33-.73-.73 0-.41.33-.74.73-.74.41 0 .74.33.74.74 0 .4-.33.73-.74.73z" />
          </svg>
        );

      case 'javascript':
        return (
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" fill="rgba(255,255,255,0.08)" />
            <path d="M8 11V16C8 17.5 7 18 5.5 17.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M12 17C13 17.8 14.5 18 16 17.5C17.5 17 18 16 18 14.8C18 13.5 17 12.8 15 12.2C13 11.6 12 11 12 9.8C12 8.5 13 7.8 15 7.8C16.2 7.8 17.2 8.2 18 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );

      case 'react':
        return (
          <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2.2" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 12 12)" />
          </svg>
        );

      case 'nodejs':
        return (
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 21 7.2 21 16.8 12 22 3 16.8 3 7.2 12 2" fill="rgba(255,255,255,0.08)" />
            <path d="M9 10.5V15.5M15 8.5V13.5C15 15 14 16 12 16C10.5 16 9.5 15.2 9 14" strokeWidth="2" />
          </svg>
        );

      case 'restapi':
        return (
          <svg className="w-10 h-10 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* API Terminal / Brackets */}
            <rect x="3" y="5" width="26" height="22" rx="4" strokeWidth="2" fill="rgba(255,255,255,0.08)" />
            <path d="M8 12L12 16L8 20" strokeWidth="2.2" />
            <path d="M14 20H18" strokeWidth="2.2" />
            {/* Network nodes */}
            <circle cx="23" cy="11" r="1.5" fill="currentColor" />
            <circle cx="23" cy="16" r="1.5" fill="currentColor" />
            <circle cx="23" cy="21" r="1.5" fill="currentColor" />
          </svg>
        );

      case 'postgresql':
        return (
          <svg className="w-10 h-10 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Elephant Head / Slonik */}
            <path d="M16 4C10 4 6 8.5 6 14C6 18.5 8.5 21.5 11 23V28L14.5 25C15 25 15.5 25.2 16 25.2C17 25.2 17.8 25 18.5 24.5L21.5 27V22C24.5 20.5 26 17.5 26 13.5C26 8.5 22 4 16 4Z" fill="rgba(255,255,255,0.08)" />
            {/* Eye */}
            <circle cx="12" cy="12" r="1.2" fill="currentColor" />
            {/* Ear line */}
            <path d="M17 9C19.5 9 21.5 11.5 21.5 14.5C21.5 17 20 19 18 19.5" strokeWidth="1.5" />
            {/* Trunk */}
            <path d="M11 17C9 18 8 20 8 22C8 24 9.5 25 11 25" strokeWidth="1.6" />
          </svg>
        );

      case 'mysql':
        return (
          <svg className="w-10 h-10 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Database cylinders / dolphin form */}
            <ellipse cx="16" cy="7" rx="10" ry="3.5" strokeWidth="2" fill="rgba(255,255,255,0.08)" />
            <path d="M6 7V16C6 18 10.5 19.5 16 19.5C21.5 19.5 26 18 26 16V7" strokeWidth="2" />
            <path d="M6 16V25C6 27 10.5 28.5 16 28.5C21.5 28.5 26 27 26 25V16" strokeWidth="2" />
            {/* Center SQL tick */}
            <path d="M12 16L15 19L20 13" strokeWidth="2" />
          </svg>
        );

      case 'html':
        return (
          <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12 2L3 4.2l1.3 14.5L12 22l7.7-3.3L21 4.2 12 2zm6.2 15.3L12 19.6l-6.2-2.1-1-11.8h14.4l-1 11.6zM7.2 8.5h9.6l-.3 2.8H7.4l.2 2.8h6.7l-.3 3.1-2 .7-2-.7-.1-1.4H8.4l.3 2.9L12 18.2l3.3-1.2.5-5.7H7.1l.1-2.8z" />
          </svg>
        );

      case 'css':
        return (
          <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12 2L3 4.2l1.3 14.5L12 22l7.7-3.3L21 4.2 12 2zm6.2 15.3L12 19.6l-6.2-2.1-1-11.8h14.4l-1 11.6zM7.2 8.5h9.6l-.8 8.5-4 1.4-4-1.4-.2-2.8h1.5l.1 1.4 2.6.9 2.6-.9.4-4.2H7.4l-.2-2.9z" />
          </svg>
        );

      case 'git':
        return (
          <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
            <path d="M21.62 10.95L13.05 2.38a1.5 1.5 0 00-2.12 0l-1.9 1.9 2.68 2.68a1.78 1.78 0 011.65 2.25l2.58 2.58a1.78 1.78 0 012.25 1.65l1.9-1.9a1.5 1.5 0 000-2.12zM6.9 8.6L4.28 11.2a1.5 1.5 0 000 2.12l8.57 8.57a1.5 1.5 0 002.12 0l2.6-2.6-3.7-3.7a1.78 1.78 0 01-2.17-.38l-2.05 2.05a1.78 1.78 0 11-.7-.7l2.05-2.05a1.78 1.78 0 01-.38-2.17L6.9 8.6z" />
          </svg>
        );

      case 'figma':
        return (
          <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
            <path d="M6 6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3z" />
            <path d="M12 3h3a3 3 0 0 1 0 6h-3V3z" />
            <path d="M6 12a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3z" />
            <path d="M6 18a3 3 0 0 1 3-3h3v3a3 3 0 0 1-6 0z" />
          </svg>
        );

      case 'php':
        return (
          <svg className="w-10 h-10 text-white" viewBox="0 0 32 32" fill="none">
            <ellipse cx="16" cy="16" rx="14" ry="10" stroke="currentColor" strokeWidth="1.8" fill="rgba(255,255,255,0.08)" />
            {/* P */}
            <path d="M8 12V20M8 12H11C12.1 12 13 12.7 13 13.7C13 14.7 12.1 15.4 11 15.4H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            {/* H */}
            <path d="M15 12V20M19 12V20M15 16H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            {/* P */}
            <path d="M21 12V20M21 12H24C25.1 12 26 12.7 26 13.7C26 14.7 25.1 15.4 24 15.4H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case 'sql':
        return (
          <svg className="w-10 h-10 text-white" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Cylinders stack */}
            <ellipse cx="16" cy="7.5" rx="10" ry="3.5" strokeWidth="1.8" fill="rgba(255,255,255,0.08)" />
            <path d="M6 7.5V14.5C6 16.5 10.5 18 16 18C21.5 18 26 16.5 26 14.5V7.5" strokeWidth="1.8" />
            <path d="M6 14.5V21.5C6 23.5 10.5 25 16 25C21.5 25 26 23.5 26 21.5V14.5" strokeWidth="1.8" />
            {/* SQL search / query lens */}
            <circle cx="21" cy="21" r="4" strokeWidth="1.8" fill="#050505" />
            <path d="M24 24L27.5 27.5" strokeWidth="2.2" />
          </svg>
        );

      default:
        return (
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center font-mono text-xs font-bold text-white">
            {skill.name.substring(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.75,
        y: 30
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.04,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative flex flex-col items-center group cursor-pointer will-change-transform"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Circular node with high-contrast glowing border */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/[0.04] border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white/15 group-hover:shadow-[0_0_35px_rgba(255,255,255,0.3)]">
        {/* Subtle inner ring */}
        <div className="absolute inset-1.5 rounded-full border border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />
        
        {/* Tech Icon */}
        <div className="transform transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
          {renderIcon(skill.iconType)}
        </div>
      </div>

      {/* Tech Name Label */}
      <span className="font-sans text-xs sm:text-sm font-semibold text-silver-200 group-hover:text-white mt-3 tracking-wide transition-colors text-center">
        {skill.name}
      </span>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-16 z-30 bg-[#121216] border border-white/30 rounded-lg px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.9)] pointer-events-none text-center min-w-[150px]"
          >
            <span className="font-mono text-[10px] text-silver-400 block uppercase tracking-wider">{skill.category}</span>
            <span className="text-xs text-white font-semibold">{skill.level}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
