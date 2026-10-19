export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: "task-management",
    title: "Task Management System",
    description: "A collaborative task management system to improve team productivity, status tracking, and workflow efficiency.",
    image: "/images/project-taskmgmt.jpg",
    technologies: ["React", "PostgreSQL", "Tailwind", "JS", "Node.js"],
    liveUrl: "https://monk-tasker-hy77m3mam-shelby17.vercel.app",
    githubUrl: "https://github.com/MohamedAflal-01/Monk-Tasker"
  },
  {
    id: "gym-fee-calculation",
    title: "Automated Gym Fee Calculation System",
    description: "Automated system for calculating gym membership fees based on membership tiers and customer details, with automated fee calculation and payment record management.",
    image: "/images/project-kickblast-gym.jpg",
    technologies: ["C#", ".NET", "SQL", "MCP"],
    // No public live deployment — desktop application
    githubUrl: "https://github.com/MohamedAflal-01/Automated-Gym-Fee-Calculation-System"
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Clothing Platform",
    description: "A full-stack e-commerce web application with responsive UI, cart workflows, and secure payment integration.",
    image: "/images/project-velvet-vogue.jpg",
    technologies: ["PHP", "HTML", "CSS", "JS", "MySQL", "Bootstrap", "Rest API", "Socket"],
    // No public live deployment URL — source on GitHub
    githubUrl: "https://github.com/MohamedAflal-01/Velvet-Vogue"
  },
  {
    id: "restaurant-order-system",
    title: "Restaurant Order Management System",
    description: "Database-driven restaurant POS and order management system for handling customer orders, live table queues, menu management, and automated bill calculations.",
    image: "/images/project-foodhub.jpg",
    technologies: ["C#", ".NET", "SQL"],
    // No public live deployment — desktop application
    githubUrl: "https://github.com/MohamedAflal-01/Restaurant-Order-Management-System"
  },
   {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "A futuristic and responsive developer portfolio website with terminal aesthetics and 3D interactive elements.",
    image: "/images/Neon Full-Stack Portfolio Launch Screen.png",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "JS"],
    // Live URL to be added after deployment
    githubUrl: "https://github.com/MohamedAflal-01/Portfolio"
  },
  {
    id: "plant-delivery-system",
    title: "E-commerce Plant Delivery System",
    description: "A web-based plant delivery and inventory management system for handling product listings, stock tracking, billing, and order processing using WordPress and MySQL.",
    image: "/images/project-plant-delivery.jpg",
    technologies: ["Wordpress", "MySQL"],
    liveUrl: "https://www.mohamedaflal.unaux.com",
    githubUrl: "https://github.com/MohamedAflal-01"
  }
];

