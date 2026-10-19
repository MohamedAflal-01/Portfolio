import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

const GithubIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  // Determine the primary action link and its label
  const primaryUrl = project.liveUrl || project.githubUrl || '#';
  const hasLiveUrl = Boolean(project.liveUrl);

  return (
    // article: each project card is a self-contained piece of content
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="glass-card rounded-xl overflow-hidden flex flex-col justify-between group h-full border border-white/10 hover:border-white/30 will-change-transform transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
    >
      {/* Top Image Preview with compact aspect ratio */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0f] border-b border-white/10">
        <img
          src={project.image.replace(/\.jpg$/, '.webp')}
          alt={`${project.title} project interface`}
          width={800}
          height={450}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 pointer-events-none" />

        {/* Top-Right External Link — only shown when a real live URL exists */}
        {hasLiveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live site`}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 hover:border-white/50 transition-all duration-300 shadow-sm group-hover:scale-105"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Compact Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3.5">
        <div className="space-y-2.5">
          {/* Project Title — h3 within article, correct heading hierarchy */}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-silver-100 transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Technology Pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-silver-300 border border-white/10 group-hover:border-white/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-silver-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Bottom Action Link — shows "View Project" for live URL, "View on GitHub" otherwise */}
        <div className="pt-2.5 border-t border-white/5">
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={hasLiveUrl ? `View ${project.title} live project` : `View ${project.title} on GitHub`}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-semibold text-silver-300 hover:text-white group/btn transition-colors"
          >
            {hasLiveUrl ? (
              <>
                <span>View Project</span>
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </>
            ) : (
              <>
                <GithubIcon className="w-3 h-3" />
                <span>View on GitHub</span>
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </a>
        </div>
      </div>
    </motion.article>
  );
};
