import React from 'react';
import { SectionHeading } from './SectionHeading';
import { SkillItem } from './SkillItem';
import { skillsData } from '../data/skills';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto section-border">
      <SectionHeading
        number="03."
        label="SKILLS"
        title="Technologies I Work With"
        subtitle="Tools and technologies that help bring ideas to life."
        center={true}
      />

      {/* Responsive circular icons grid with 3D perspective */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-y-10 gap-x-6 max-w-6xl mx-auto items-center justify-items-center pt-6">
        {skillsData.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
};
