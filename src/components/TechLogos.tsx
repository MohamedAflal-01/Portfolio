import React from 'react';

export interface TechIconConfig {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  size: number;
  x: number;
  y: number;
  floatDelay: number;
  floatDuration: number;
}

export const LEFT_ICONS: TechIconConfig[] = [
  { id: 'nodejs', name: 'Node.js', color: '#5FA04E', glowColor: 'rgba(95,160,78,0.7)', size: 62, x: -36, y: -32, floatDelay: 0, floatDuration: 4.2 },
  { id: 'js', name: 'JavaScript', color: '#F7DF1E', glowColor: 'rgba(247,223,30,0.7)', size: 54, x: -20, y: -30, floatDelay: 0.4, floatDuration: 4.8 },
  { id: 'cube', name: '3D WebGL', color: '#CBD5E1', glowColor: 'rgba(203,213,225,0.6)', size: 48, x: -28, y: -17, floatDelay: 0.8, floatDuration: 5.2 },
  { id: 'cpp', name: 'C++', color: '#00599C', glowColor: 'rgba(0,140,255,0.8)', size: 64, x: -39, y: -11, floatDelay: 0.2, floatDuration: 4.5 },
  { id: 'react', name: 'React', color: '#61DAFB', glowColor: 'rgba(97,218,251,0.85)', size: 64, x: -27, y: -1, floatDelay: 0.6, floatDuration: 4.0 },
  { id: 'flutter', name: 'Flutter', color: '#42A5F5', glowColor: 'rgba(66,165,245,0.7)', size: 54, x: -17, y: -11, floatDelay: 1.0, floatDuration: 5.0 },
  { id: 'java', name: 'Java', color: '#EA2D2E', glowColor: 'rgba(234,45,46,0.7)', size: 56, x: -37, y: 7, floatDelay: 0.3, floatDuration: 4.6 },
  { id: 'python', name: 'Python', color: '#FFD438', glowColor: 'rgba(255,212,56,0.7)', size: 58, x: -20, y: 13, floatDelay: 0.7, floatDuration: 4.4 },
  { id: 'php', name: 'PHP', color: '#777BB4', glowColor: 'rgba(139,144,212,0.7)', size: 58, x: -38, y: 22, floatDelay: 0.5, floatDuration: 4.9 },
  { id: 'mysql', name: 'MySQL', color: '#00758F', glowColor: 'rgba(0,180,216,0.75)', size: 58, x: -33, y: 35, floatDelay: 0.9, floatDuration: 4.7 },
  { id: 'sqlserver', name: 'SQL Server', color: '#CC292B', glowColor: 'rgba(232,56,60,0.7)', size: 50, x: -22, y: 34, floatDelay: 1.1, floatDuration: 5.1 },
];

export const RIGHT_ICONS: TechIconConfig[] = [
  { id: 'html5', name: 'HTML5', color: '#E34F26', glowColor: 'rgba(227,79,38,0.75)', size: 60, x: 20, y: -29, floatDelay: 0.2, floatDuration: 4.4 },
  { id: 'css3', name: 'CSS3', color: '#1572B6', glowColor: 'rgba(21,114,182,0.75)', size: 60, x: 31, y: -27, floatDelay: 0.6, floatDuration: 4.8 },
  { id: 'github', name: 'GitHub', color: '#FFFFFF', glowColor: 'rgba(255,255,255,0.6)', size: 58, x: 41, y: -24, floatDelay: 0.1, floatDuration: 5.0 },
  { id: 'figma', name: 'Figma', color: '#F24E1E', glowColor: 'rgba(242,78,30,0.7)', size: 54, x: 23, y: -10, floatDelay: 0.8, floatDuration: 4.3 },
  { id: 'blender', name: 'Blender', color: '#F5792A', glowColor: 'rgba(245,121,42,0.8)', size: 62, x: 36, y: -6, floatDelay: 0.4, floatDuration: 4.7 },
  { id: 'tailwind', name: 'Tailwind CSS', color: '#06B6D4', glowColor: 'rgba(6,182,212,0.85)', size: 64, x: 42, y: 11, floatDelay: 0.7, floatDuration: 4.5 },
  { id: 'csharp', name: 'C#', color: '#A855F7', glowColor: 'rgba(168,85,247,0.8)', size: 62, x: 27, y: 20, floatDelay: 0.3, floatDuration: 4.6 },
  { id: 'database', name: 'Database', color: '#38BDF8', glowColor: 'rgba(56,189,248,0.85)', size: 56, x: 38, y: 31, floatDelay: 0.9, floatDuration: 5.2 },
];

export const TechIconSvg: React.FC<{ id: string; size: number }> = ({ id, size }) => {
  switch (id) {
    case 'nodejs':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M16 2L3 9.5V22.5L16 30L29 22.5V9.5L16 2Z" fill="#182A16" stroke="#5FA04E" strokeWidth="2" />
          <path d="M16 5.5L6 11.2V20.8L16 26.5L26 20.8V11.2L16 5.5Z" fill="#5FA04E" fillOpacity="0.25" />
          <path d="M16 9.5L21.5 12.6V18.8L16 21.9L10.5 18.8V12.6L16 9.5Z" fill="#83CD29" />
          <text x="16" y="27" textAnchor="middle" fill="#83CD29" fontSize="5.5" fontFamily="monospace" fontWeight="bold">node</text>
        </svg>
      );
    case 'js':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <rect width="32" height="32" rx="6" fill="#F7DF1E" />
          <path d="M9 19.5C9 23 11 24.5 14 24.5C16.8 24.5 18.2 23.2 18.2 20.5V13H15.5V20.3C15.5 21.7 14.8 22.3 13.8 22.3C12.7 22.3 12 21.7 12 20.3L9 19.5Z" fill="#000" />
          <path d="M19.5 22.5C20.5 23.8 22.2 24.5 24.2 24.5C27 24.5 28.8 23 28.8 20.6C28.8 18.2 27.2 17.2 24.8 16.2L24 15.8C22.6 15.2 22 14.6 22 13.8C22 12.8 22.9 12.1 24.2 12.1C25.3 12.1 26.2 12.6 27 13.7L29 11.8C27.7 10.3 26 9.8 24.2 9.8C21.6 9.8 19.7 11.3 19.7 13.7C19.7 16 21.2 17 23.3 17.9L24.1 18.3C25.7 19 26.4 19.6 26.4 20.6C26.4 21.8 25.3 22.5 24 22.5C22.5 22.5 21.3 21.7 20.5 20.2L19.5 22.5Z" fill="#000" />
        </svg>
      );
    case 'cube':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M16 2L28 8.5V21.5L16 28L4 21.5V8.5L16 2Z" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M16 2L28 8.5L16 15L4 8.5L16 2Z" fill="#F1F5F9" />
          <path d="M4 8.5L16 15V28L4 21.5V8.5Z" fill="#94A3B8" />
          <path d="M28 8.5L16 15V28L28 21.5V8.5Z" fill="#CBD5E1" />
        </svg>
      );
    case 'cpp':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M16 2L29 9.5V24.5L16 32L3 24.5V9.5L16 2Z" fill="#00599C" stroke="#38BDF8" strokeWidth="1.5" />
          <path d="M16 4.5L26.5 10.8V22.2L16 28.5L5.5 22.2V10.8L16 4.5Z" fill="#004482" />
          <path d="M16 11C13.2 11 11 13.2 11 16C11 18.8 13.2 21 16 21C17.5 21 18.8 20.3 19.7 19.3L18 17.8C17.5 18.4 16.8 18.8 16 18.8C14.5 18.8 13.2 17.5 13.2 16C13.2 14.5 14.5 13.2 16 13.2C16.8 13.2 17.5 13.6 18 14.2L19.7 12.7C18.8 11.7 17.5 11 16 11Z" fill="#FFF" />
          <path d="M21 15H23V13H24V15H26V16H24V18H23V16H21V15Z" fill="#38BDF8" />
          <path d="M25 15H27V13H28V15H30V16H28V18H27V16H25V15Z" fill="#38BDF8" />
        </svg>
      );
    case 'react':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-lg">
          <ellipse cx="16" cy="16" rx="13.5" ry="5.2" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(0 16 16)" />
          <ellipse cx="16" cy="16" rx="13.5" ry="5.2" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="13.5" ry="5.2" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(120 16 16)" />
          <circle cx="16" cy="16" r="3" fill="#61DAFB" />
        </svg>
      );
    case 'flutter':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M18.5 2L5 15.5L9.5 20L26 3.5H18.5V2Z" fill="#42A5F5" />
          <path d="M18.5 16.5L10.5 24.5L15 29L26 18H18.5V16.5Z" fill="#0D47A1" />
          <path d="M12.5 23L16.2 19.3L19.8 23L16.2 26.6L12.5 23Z" fill="#01579B" />
        </svg>
      );
    case 'java':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M13 4C13 4 11 7.5 15 8.5C19 9.5 18 12.5 18 12.5C18 12.5 21 10.5 17 7.5C13 4.5 13 4 13 4Z" fill="#EA2D2E" />
          <path d="M16 2C16 2 15 5.5 18 6.5C21 7.5 20 10.5 20 10.5C20 10.5 23 8.5 19 5.5C15 2.5 16 2 16 2Z" fill="#EA2D2E" />
          <path d="M8 16C8 16 7 20.5 14 20.5C21 20.5 23 16 23 16H8Z" fill="#5382A1" />
          <path d="M22 16C24.5 16 25.5 17.5 25.5 18.5C25.5 19.8 23.5 20.5 21 20.5" stroke="#5382A1" strokeWidth="1.8" />
          <ellipse cx="15" cy="23.5" rx="10" ry="2" fill="#5382A1" fillOpacity="0.4" />
          <text x="15" y="29" textAnchor="middle" fill="#EA2D2E" fontSize="6" fontWeight="bold">Java</text>
        </svg>
      );
    case 'python':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M15.5 3C10.5 3 11 5.2 11 5.2V7.5H16V9H8.5C8.5 9 6 8.7 6 13.5C6 18.3 8.2 18 8.2 18H10V15.5C10 12.5 12.5 12.5 12.5 12.5H17.5C20.2 12.5 20.5 10.5 20.5 10.5V5.5C20.5 5.5 20.8 3 15.5 3ZM13.2 5C13.9 5 14.5 5.6 14.5 6.2C14.5 6.9 13.9 7.5 13.2 7.5C12.6 7.5 12 6.9 12 6.2C12 5.6 12.6 5 13.2 5Z" fill="#3776AB" />
          <path d="M16.5 29C21.5 29 21 26.8 21 26.8V24.5H16V23H23.5C23.5 23 26 23.3 26 18.5C26 13.7 23.8 14 23.8 14H22V16.5C22 19.5 19.5 19.5 19.5 19.5H14.5C11.8 19.5 11.5 21.5 11.5 21.5V26.5C11.5 26.5 11.2 29 16.5 29ZM18.8 27C18.1 27 17.5 26.4 17.5 25.8C17.5 25.1 18.1 24.5 18.8 24.5C19.4 24.5 20 25.1 20 25.8C20 26.4 19.4 27 18.8 27Z" fill="#FFD438" />
        </svg>
      );
    case 'php':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <ellipse cx="16" cy="16" rx="15" ry="10.5" fill="#777BB4" stroke="#A5B4FC" strokeWidth="1.2" />
          <text x="16" y="20.5" textAnchor="middle" fill="#FFF" fontSize="12" fontFamily="sans-serif" fontWeight="900" fontStyle="italic">php</text>
        </svg>
      );
    case 'mysql':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M23 5C17.5 5 12 9.5 12 15C12 19.5 14.5 22.5 18 23.5C13.5 22.5 10 19 10 15C10 8.5 16.5 4 23 5Z" fill="#00B4D8" />
          <path d="M25 9C21.5 7 16 9 16 14.5C16 19 19 23 26 24C20.5 23 18 19 18 15C18 11.5 21.5 9 25 9Z" fill="#0077B6" />
          <text x="16" y="30" textAnchor="middle" fill="#F29111" fontSize="7" fontFamily="monospace" fontWeight="bold">MySQL</text>
        </svg>
      );
    case 'sqlserver':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M6 8L16 3.5L26 8L16 12.5L6 8Z" fill="#EF4444" />
          <path d="M6 8V20.5L16 25V12.5L6 8Z" fill="#B91C1C" />
          <path d="M26 8V20.5L16 25V12.5L26 8Z" fill="#DC2626" />
          <path d="M10 16L16 18.5L22 16L16 13.5L10 16Z" fill="#FFF" fillOpacity="0.45" />
        </svg>
      );
    case 'html5':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M6 3L8.5 27L16 29.5L23.5 27L26 3H6Z" fill="#E34F26" />
          <path d="M16 5.5V27.2L21.8 25.2L23.8 5.5H16Z" fill="#EF652A" />
          <path d="M10.5 9H21.5L21.2 12.5H11L11.5 16H20.8L20.2 22.5L16 23.8L11.8 22.5L11.6 19.5H9.2L9.6 24.2L16 26L22.4 24.2L23.3 14L23.5 7H8.5L10.5 9Z" fill="#FFF" />
        </svg>
      );
    case 'css3':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M6 3L8.5 27L16 29.5L23.5 27L26 3H6Z" fill="#1572B6" />
          <path d="M16 5.5V27.2L21.8 25.2L23.8 5.5H16Z" fill="#33A9DC" />
          <path d="M10.5 9H21.5L21.2 12.5H11L11.5 16H20.8L20.2 22.5L16 23.8L11.8 22.5L11.6 19.5H9.2L9.6 24.2L16 26L22.4 24.2L23.3 14L23.5 7H8.5L10.5 9Z" fill="#FFF" />
        </svg>
      );
    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <circle cx="16" cy="16" r="15" fill="#181717" stroke="#FFF" strokeWidth="1.2" />
          <path fillRule="evenodd" clipRule="evenodd" d="M16 6C10.48 6 6 10.48 6 16.02C6 20.44 8.87 24.2 12.84 25.52C13.34 25.61 13.52 25.3 13.52 25.04C13.52 24.8 13.51 24.17 13.51 23.34C10.72 23.94 10.14 22 10.14 22C9.68 20.84 9.03 20.53 9.03 20.53C8.12 19.91 9.1 19.92 9.1 19.92C10.1 20 10.63 20.95 10.63 20.95C11.52 22.48 12.98 22.04 13.55 21.78C13.64 21.13 13.9 20.7 14.19 20.44C11.97 20.19 9.63 19.33 9.63 15.5C9.63 14.4 10.02 13.51 10.67 12.81C10.56 12.56 10.22 11.54 10.77 10.16C10.77 10.16 11.61 9.89 13.52 11.19C14.32 10.97 15.17 10.86 16.02 10.86C16.87 10.86 17.72 10.97 18.52 11.19C20.43 9.89 21.27 10.16 21.27 10.16C21.82 11.54 21.48 12.56 21.37 12.81C22.02 13.51 22.41 14.4 22.41 15.5C22.41 19.34 20.07 20.18 17.84 20.43C18.2 20.74 18.52 21.35 18.52 22.29C18.52 23.63 18.51 24.71 18.51 25.04C18.51 25.31 18.69 25.62 19.2 25.52C23.16 24.19 26.03 20.44 26.03 16.02C26.03 10.48 21.52 6 16 6Z" fill="#FFF" />
        </svg>
      );
    case 'figma':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M11 5C8.5 5 6.5 7 6.5 9.5C6.5 12 8.5 14 11 14H16V5H11Z" fill="#F24E1E" />
          <path d="M21 5H16V14H21C23.5 14 25.5 12 25.5 9.5C25.5 7 23.5 5 21 5Z" fill="#FF7262" />
          <path d="M16 14H11C8.5 14 6.5 16 6.5 18.5C6.5 21 8.5 23 11 23H16V14Z" fill="#A259FF" />
          <path d="M16 14H21C23.5 14 25.5 16 25.5 18.5C25.5 21 23.5 23 21 23C23.5 23 25.5 21 25.5 18.5C25.5 16 23.5 14 21 14Z" fill="#1ABCFE" />
          <circle cx="21" cy="18.5" r="4.5" fill="#1ABCFE" />
          <path d="M6.5 27.5C6.5 30 8.5 32 11 32C13.5 32 15.5 30 15.5 27.5V23H11C8.5 23 6.5 25 6.5 27.5Z" fill="#0ACF83" />
        </svg>
      );
    case 'blender':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <ellipse cx="16" cy="16" rx="14.5" ry="14.5" fill="#F5792A" />
          <circle cx="16" cy="16" r="6.5" fill="#FFF" />
          <circle cx="16" cy="16" r="3.8" fill="#265787" />
          <path d="M16 1.5L19.5 9.5L12.5 9.5L16 1.5Z" fill="#FFF" />
          <path d="M30.5 14L22 17L22 12.5L30.5 14Z" fill="#FFF" />
          <path d="M5.5 24.5L14 18L10.5 14.5L5.5 24.5Z" fill="#FFF" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M8.5 11C9.5 7 12.5 5 17.5 5C23.5 5 24.5 10 27.5 11C29.5 11.7 31 11 32 9.5C31 13.5 28 15.5 23 15.5C17 15.5 16 10.5 13 9.5C11 8.8 9.5 9.5 8.5 11ZM0 20C1 16 4 14 9 14C15 14 16 19 19 20C21 20.7 22.5 20 23.5 18.5C22.5 22.5 19.5 24.5 14.5 24.5C8.5 24.5 7.5 19.5 4.5 18.5C2.5 17.8 1 18.5 0 20Z" fill="#06B6D4" />
        </svg>
      );
    case 'csharp':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          <path d="M16 2L29 9.5V24.5L16 32L3 24.5V9.5L16 2Z" fill="#9B4993" stroke="#C084FC" strokeWidth="1.5" />
          <path d="M16 5L26 11V23L16 29L6 23V11L16 5Z" fill="#68217A" />
          <path d="M14.5 11C11.5 11 9.5 13 9.5 16C9.5 19 11.5 21 14.5 21C16 21 17.2 20.4 18 19.5L16.5 18C16 18.5 15.3 19 14.5 19C12.8 19 11.5 17.7 11.5 16C11.5 14.3 12.8 13 14.5 13C15.3 13 16 13.5 16.5 14L18 12.5C17.2 11.6 16 11 14.5 11Z" fill="#FFF" />
          <text x="22" y="19.5" fill="#FFF" fontSize="10.5" fontWeight="bold">#</text>
        </svg>
      );
    case 'database':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-lg">
          <ellipse cx="16" cy="6.5" rx="11" ry="3.8" fill="#38BDF8" />
          <path d="M5 6.5V13C5 15.1 9.9 16.8 16 16.8C22.1 16.8 27 15.1 27 13V6.5" fill="#0284C7" />
          <ellipse cx="16" cy="13" rx="11" ry="3.8" fill="#38BDF8" fillOpacity="0.85" />
          <path d="M5 13V19.5C5 21.6 9.9 23.3 16 23.3C22.1 23.3 27 21.6 27 19.5V13" fill="#0284C7" />
          <ellipse cx="16" cy="19.5" rx="11" ry="3.8" fill="#38BDF8" fillOpacity="0.85" />
          <path d="M5 19.5V26C5 28.1 9.9 29.8 16 29.8C22.1 29.8 27 28.1 27 26V19.5" fill="#0369A1" />
          <ellipse cx="16" cy="26" rx="11" ry="3.8" fill="#38BDF8" />
        </svg>
      );
    default:
      return null;
  }
};
