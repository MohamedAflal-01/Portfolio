export interface Skill {
  name: string;
  category: string;
  level: string;
  description: string;
  iconType: string;
}

export const skillsData: Skill[] = [
  {
    name: "C#",
    category: "Languages & OOP",
    level: "Proficient",
    description: "Object-oriented programming, .NET ecosystems, LINQ, backend systems",
    iconType: "csharp"
  },
  {
    name: "ASP.NET",
    category: "Backend Framework",
    level: "Proficient",
    description: "Web APIs, ASP.NET Core, MVC architecture, Entity Framework",
    iconType: "aspnet"
  },
  {
    name: "Java",
    category: "Backend / Core",
    level: "Proficient",
    description: "Object-oriented programming, Spring Boot, enterprise architecture",
    iconType: "java"
  },
  {
    name: "Python",
    category: "Languages & Scripting",
    level: "Proficient",
    description: "Data structures, algorithms, automation, backend APIs",
    iconType: "python"
  },
  {
    name: "PHP",
    category: "Backend & Web",
    level: "Advanced",
    description: "Server-side scripting, OOP PHP, MVC architecture, modern backend systems",
    iconType: "php"
  },
  {
    name: "JavaScript",
    category: "Frontend / Full Stack",
    level: "Advanced",
    description: "ES6+, asynchronous programming, DOM, modern web architecture",
    iconType: "javascript"
  },
  {
    name: "React",
    category: "Frontend Framework",
    level: "Advanced",
    description: "Component architecture, hooks, state management, SPA development",
    iconType: "react"
  },
  {
    name: "Node.js",
    category: "Backend Runtime",
    level: "Proficient",
    description: "RESTful APIs, Express, server-side development, NPM ecosystem",
    iconType: "nodejs"
  },
  {
    name: "REST API",
    category: "Web Architecture",
    level: "Expert",
    description: "API design, HTTP methods, CRUD, authentication, JSON endpoints",
    iconType: "restapi"
  },
  {
    name: "SQL",
    category: "Database & Querying",
    level: "Advanced",
    description: "Relational queries, complex joins, indexing, procedures, optimization",
    iconType: "sql"
  },
  {
    name: "PostgreSQL",
    category: "Relational Database",
    level: "Proficient",
    description: "Complex queries, indexing, relations, schema design, ACID transactions",
    iconType: "postgresql"
  },
  {
    name: "MySQL",
    category: "Relational Database",
    level: "Proficient",
    description: "Relational database design, indexing, complex SQL queries, optimization",
    iconType: "mysql"
  },
  {
    name: "HTML5",
    category: "Web Fundamentals",
    level: "Expert",
    description: "Semantic HTML5, accessibility (a11y), SEO architecture",
    iconType: "html"
  },
  {
    name: "CSS3",
    category: "Styling & Design",
    level: "Advanced",
    description: "Modern CSS3, responsive design, Flexbox/Grid, Tailwind CSS",
    iconType: "css"
  },
  {
    name: "Git",
    category: "Version Control",
    level: "Advanced",
    description: "Branching workflows, collaborative development, GitHub",
    iconType: "git"
  },
  {
    name: "Figma",
    category: "UI/UX & Prototyping",
    level: "Proficient",
    description: "Wireframing, UI/UX design systems, component libraries, prototyping",
    iconType: "figma"
  }
];
