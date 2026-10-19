import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { projectsData } from '../data/projects';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto section-border">
      {/* Section Header */}
      <SectionHeading
        number="02."
        label="PROJECTS"
        tagline="/ SELECTED WORK"
        title="Featured Projects"
        subtitle="A collection of projects that showcase my skills and passion for development."
        center={true}
      />

      {/* Projects Grid with 3D perspective */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};
