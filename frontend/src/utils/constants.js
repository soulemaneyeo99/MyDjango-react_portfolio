// ========== frontend/src/utils/constants.js ==========
// URLs de base
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || 'http://localhost:8000/media';

// Informations personnelles de Souleymane
export const PERSONAL_INFO = {
  name: 'Souleymane Yeo',
  title: 'Développeur Full-Stack',
  subtitle: 'Python • Django • FastAPI • React • IA',
  bio: `Salut, moi c'est Souleymane Yeo, développeur backend passionné, basé en Côte d'Ivoire 🇨🇮. 
        Je travaille principalement avec Python 🐍, Django et FastAPI, des outils puissants avec lesquels 
        je construis des architectures solides, maintenables et orientées performance.`,
  location: 'Abidjan, Côte d\'Ivoire',
  email: 'soulemaneyeo99@gmail.com',
  phone: '+225 0595344814',
  phone2: '+225 0700896230',
  university: 'Université Virtuelle de Côte d\'Ivoire (UVCI)',
  degree: 'Licence en Informatique - Spécialité DAS',
  social: {
    github: 'https://github.com/soulemaneyeo99/',
    linkedin: 'https://www.linkedin.com/in/souleymane-yeo-422ba42b0/',
    whatsapp: 'https://wa.me/message/CBUAR25YW54XL1',
    facebook: '#',
  },
};

// Navigation items - AJOUT MANQUANT
export const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', href: '#home', icon: '🏠' },
  { id: 'about', label: 'À propos', href: '#about', icon: '👨‍💻' },
  { id: 'skills', label: 'Compétences', href: '#skills', icon: '⚡' },
  { id: 'projects', label: 'Projets', href: '#projects', icon: '💼' },
  { id: 'blog', label: 'Blog', href: '#blog', icon: '📝' },
  { id: 'contact', label: 'Contact', href: '#contact', icon: '📧' },
];

// Messages d'animation typing - AJOUT MANQUANT
export const TYPING_MESSAGES = [
  'Full-Stack Developer',
  'Python Developer',
  'Django Expert',
  'FastAPI Specialist', 
  'React Enthusiast',
  'AI Explorer',
  'Problem Solver',
  'Code Artisan',
];

// Compétences techniques
export const SKILLS = {
  backend: [
    { name: 'Python', level: 90, color: '#3776ab' },
    { name: 'Django/DRF', level: 85, color: '#092e20' },
    { name: 'FastAPI', level: 75, color: '#009688' },
    { name: 'PostgreSQL', level: 70, color: '#336791' },
  ],
  frontend: [
    { name: 'JavaScript', level: 70, color: '#f7df1e' },
    { name: 'React', level: 60, color: '#61dafb' },
    { name: 'HTML5/CSS3', level: 80, color: '#e34f26' },
    { name: 'Tailwind CSS', level: 75, color: '#06b6d4' },
  ],
  tools: [
    { name: 'Git/GitHub', level: 80, color: '#f05032' },
    { name: 'Docker', level: 65, color: '#2496ed' },
    { name: 'Linux/WSL', level: 70, color: '#fcc624' },
    { name: 'VS Code', level: 85, color: '#007acc' },
  ],
  data: [
    { name: 'NumPy/Pandas', level: 75, color: '#013243' },
    { name: 'Scikit-learn', level: 65, color: '#f7931e' },
    { name: 'Matplotlib', level: 70, color: '#11557c' },
    { name: 'Machine Learning', level: 65, color: '#ff6b6b' },
  ],
};

// Projets phares - AJOUT MANQUANT
export const FEATURED_PROJECTS = [
  {
    id: 'opportuci',
    title: 'OpportuCI',
    description: 'Plateforme intelligente centralisant les opportunités académiques en Côte d\'Ivoire',
    techStack: ['Django', 'FastAPI', 'React', 'PostgreSQL', 'IA'],
    status: 'En développement',
    category: 'Plateforme Web',
    image: '/images/opportuci.png',
    demoUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'ecommerce-modern',
    title: 'E-commerce React + FastAPI',
    description: 'Application moderne de vente en ligne avec authentification JWT et interface réactive',
    techStack: ['React', 'FastAPI', 'Tailwind', 'Vite', 'PostgreSQL'],
    status: 'Complété',
    category: 'E-commerce',
    image: '/images/ecommerce-react.png',
    demoUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'ecommerce-django',
    title: 'E-commerce Django',
    description: 'Plateforme de vente en ligne complète avec dashboard administrateur',
    techStack: ['Django', 'Bootstrap', 'SQLite', 'JavaScript'],
    status: 'En ligne',
    category: 'E-commerce',
    image: '/images/ecommerce-django.png',
    demoUrl: 'https://commerce99.pythonanywhere.com/',
    sourceUrl: '#',
  },
];

// Types de projets
export const PROJECT_CATEGORIES = [
  { id: 'web', name: 'Applications Web', color: '#3b82f6' },
  { id: 'api', name: 'APIs & Microservices', color: '#10b981' },
  { id: 'ai', name: 'IA & Machine Learning', color: '#8b5cf6' },
  { id: 'mobile', name: 'Applications Mobile', color: '#f59e0b' },
  { id: 'data', name: 'Data Science', color: '#ef4444' },
];

// Certifications - AJOUT MANQUANT
export const CERTIFICATIONS = [
  {
    title: 'Introduction à la Data Science',
    issuer: 'Formation Certifiée',
    date: '04 Mars 2025',
    description: 'Formation complète couvrant l\'IA, la Data Science, la visualisation et les bases du machine learning',
    certificateUrl: '/certificates/data-science.pdf',
    badge: '🔬',
  },
  {
    title: 'Entrepreneuriat Numérique & Leadership',
    issuer: 'DigiFemme Program',
    date: '2024',
    description: 'Formation sur la création de projets numériques, l\'innovation et la gestion d\'équipe',
    certificateUrl: '/certificates/digifemme.pdf',
    badge: '🚀',
  },
];

// Routes de l'application
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:slug',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  CONTACT: '/contact',
};

// Formation et expérience
export const EDUCATION = [
  {
    degree: 'Licence en Informatique',
    school: 'Université Virtuelle de Côte d\'Ivoire (UVCI)',
    location: 'Cocody, Abidjan',
    period: 'Depuis 2023 (en cours)',
    specialty: 'Développement d\'Application et e-Service (DAS)',
    description: 'Formation en informatique avec accent sur le développement web, la programmation orientée objet, et les bases de données.',
    current: true
  },
  {
    degree: 'Apprentissage Autodidacte',
    school: 'Formations en ligne et projets personnels',
    period: 'Depuis 2023 (continu)',
    description: 'Apprentissage approfondi de Django, FastAPI, JavaScript, React, Git, GitHub, et bases du Machine Learning.',
    skills: ['Django', 'FastAPI', 'React', 'Machine Learning', 'Git']
  }
];

export const EXPERIENCE = [
  {
    title: 'Développeur Python / Django Freelance',
    period: '2023 - Présent',
    location: 'Abidjan, Côte d\'Ivoire (à distance)',
    type: 'Freelance',
    tasks: [
      'Développement d\'applications web avec Django, FastAPI et PostgreSQL',
      'Intégration d\'APIs, systèmes d\'authentification, et gestion de base de données',
      'Création de solutions automatisées pour besoins métiers (facturation, notifications, scrapping)'
    ]
  },
  {
    title: 'Fondateur du projet OpportuCI',
    period: 'Depuis 2025 (en cours)',
    location: 'Projet personnel',
    type: 'Entrepreneur',
    tasks: [
      'Conception et développement d\'une plateforme éducative pour opportunités académiques en Côte d\'Ivoire',
      'Stack : Django, FastAPI, React, IA. En cours de réalisation',
      'Gestion complète : base de données, backend, frontend et architecture globale'
    ]
  }
];

// Configuration des couleurs du thème
export const THEME = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  }
};

// Messages et textes
export const MESSAGES = {
  contact: {
    title: 'Une collaboration ? Une question ? Une idée ? Ou juste un coucou ?',
    subtitle: 'N\'hésitez pas à me laisser un petit message sympa ! Je réponds toujours avec enthousiasme…',
    success: 'Message envoyé avec succès ! Merci pour votre confiance.',
    loading: 'Envoi en cours...'
  },
  about: {
    intro: 'Salut, moi c\'est Souleymane Yeo, développeur backend passionné, basé en Côte d\'Ivoire. Je travaille principalement avec Python, Django et FastAPI.',
    passion: 'Je m\'intéresse particulièrement à l\'intelligence artificielle, au machine learning et aux LLMs (modèles de langage), avec un fort intérêt pour les LMS.',
    goal: 'Mon objectif : créer des solutions tech à fort impact éducatif.',
    current: 'En ce moment, je développe OpportuCI, une plateforme professionnelle dédiée aux étudiants ivoiriens.',
    future: 'Côté frontend, je suis en pleine montée en compétences avec React. L\'idée ? Devenir un véritable développeur full-stack.'
  }
};

// App configuration
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Souleymane Yeo - Portfolio',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Développeur Full-Stack passionné spécialisé en Python, Django, FastAPI et React. Basé en Côte d\'Ivoire.',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  author: 'Souleymane Yeo',
  keywords: ['développeur', 'python', 'django', 'fastapi', 'react', 'côte d\'ivoire', 'full-stack'],
};

export default {
  API_BASE_URL,
  MEDIA_BASE_URL,
  PERSONAL_INFO,
  NAV_ITEMS,
  TYPING_MESSAGES,
  SKILLS,
  FEATURED_PROJECTS,
  PROJECT_CATEGORIES,
  CERTIFICATIONS,
  ROUTES,
  EDUCATION,
  EXPERIENCE,
  THEME,
  MESSAGES,
  APP_CONFIG,
};