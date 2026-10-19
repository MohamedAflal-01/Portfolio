import React from 'react';
import { SectionHeading } from './SectionHeading';
import { EducationItem } from './EducationItem';
import { educationData } from '../data/education';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-7xl mx-auto section-border">
      <SectionHeading
        number="04."
        label="EDUCATION"
        title="My Education"
        subtitle="A journey of learning, growth and continuous development."
        center={true}
      />

      <div className="max-w-4xl mx-auto mt-12">
        {educationData.map((item, index) => (
          <EducationItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === educationData.length - 1}
          />
        ))}
      </div>
    </section>
  );
};
