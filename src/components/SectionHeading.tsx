import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  label: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  center?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  label,
  title,
  subtitle,
  tagline,
  center = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full mb-12 ${center ? 'text-center' : ''}`}
    >
      <div className={`flex items-center gap-3 ${center ? 'justify-center' : 'justify-between'} mb-3`}>
        <div className="font-mono text-xs md:text-sm tracking-[0.2em] text-silver-400 uppercase flex items-center gap-2">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block w-5 h-[1.5px] bg-gradient-to-r from-white to-silver-400 origin-left shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
          <span className="text-white font-bold">{number}</span>
          <span className="text-silver-300 font-medium">{label}</span>
        </div>
        {tagline && (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mono text-xs tracking-widest text-silver-500 uppercase hidden sm:inline-block"
          >
            {tagline}
          </motion.span>
        )}
      </div>

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3"
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className={`text-silver-400 text-sm md:text-base max-w-2xl ${center ? 'mx-auto' : ''} leading-relaxed`}
        >
          "{subtitle}"
        </motion.p>
      )}
    </motion.div>
  );
};
