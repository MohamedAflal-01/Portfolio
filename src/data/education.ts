export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location?: string;
  stream?: string;
  description: string;
  icon: "graduation-cap" | "landmark" | "book-open";
}

export const educationData: EducationItem[] = [
  {
    id: "hnd-computing",
    period: "Oct 2025 – Present",
    degree: "HND in Computing (Software Engineering)",
    institution: "Esoft Metro Campus",
    location: "Batticaloa, Eastern Province",
    description: "Currently pursuing a Higher National Diploma in Computing with specialization in Software Engineering, building enterprise solutions in C#, .NET, database management, and system architecture.",
    icon: "graduation-cap"
  },
  {
    id: "dip-IT",
    period: "Jan 2025 – Sep 2025",
    degree: "Diploma in Information Technology",
    institution: "Esoft Metro Campus",
    location: "Batticaloa, Eastern Province",
    description: "Completed Diploma in Information Technology, acquiring core practical knowledge in software development, web applications, databases, and computer systems.",
    icon: "graduation-cap"
  },
  {
    id: "dip-eng",
    period: "2024 – 2025",
    degree: "Diploma in English",
    institution: "Esoft Metro Campus",
    location: "Batticaloa, Eastern Province",
    description: "Strengthened professional communication, technical documentation, presentation, and workplace language capabilities.",
    icon: "graduation-cap"
  },
  {
    id: "al-zahira",
    period: "2022 – 2024",
    degree: "G.C.E. Advanced Level (A/L)",
    institution: "Zahira College Kalmunai",
    stream: "Biological Science",
    description: "Completed secondary education with focused study in scientific principles, analytical problem-solving, and disciplined study habits.",
    icon: "landmark"
  },
  {
    id: "ol-zahira",
    period: "2021 – 2022",
    degree: "G.C.E. Ordinary Level (O/L)",
    institution: "Zahira College",
    description: "Completed G.C.E. Ordinary Level with strong academic foundations.",
    icon: "book-open"
  }
];
