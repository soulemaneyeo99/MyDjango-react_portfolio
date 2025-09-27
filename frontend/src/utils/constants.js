// ========== src/utils/constants.js (Mis à jour avec vos images) ==========
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
  profileImage: '/images/moi2.jpg', // Votre vraie photo
  heroBackground: '/images/hero-bg.jpg',
  social: {
    github: 'https://github.com/soulemaneyeo99/',
    linkedin: 'https://www.linkedin.com/in/souleymane-yeo-422ba42b0/',
    whatsapp: 'https://wa.me/message/CBUAR25YW54XL1',
    facebook: '#',
  },
};

// Projets phares avec vos vraies images
export const FEATURED_PROJECTS = [
  {
    id: 'opportunci',
    title: 'OpportuCI',
    description: 'Plateforme intelligente centralisant les opportunités académiques pour les étudiants ivoiriens. Une solution complète avec IA pour recommandations personnalisées.',
    detailed_description: `OpportuCI est ma création la plus ambitieuse : une plateforme révolutionnaire qui centralise toutes les opportunités éducatives en Côte d'Ivoire. 

    🎯 **Problème résolu** : Les étudiants perdent des opportunités par manque d'information centralisée.
    
    🚀 **Ma solution** : Une plateforme intelligente avec IA qui recommande personnellement les meilleures opportunités selon le profil de chaque étudiant.
    
    ⚙️ **Architecture technique** :
    - Backend robuste en Django REST Framework
    - Intelligence artificielle pour les recommandations
    - Interface React moderne et responsive
    - Base de données PostgreSQL optimisée
    
    📊 **Fonctionnalités clés** :
    - Système de recommandations IA
    - Notifications en temps réel
    - Profils étudiants personnalisés
    - Dashboard administrateur complet`,
    techStack: ['Django', 'FastAPI', 'React', 'PostgreSQL', 'IA', 'Tailwind CSS'],
    status: 'En développement',
    category: 'Plateforme Éducative',
    image: '/images/OpotuCI.png',
    images: [
      { image: '/images/OpotuCI.png', caption: 'Interface principale' },
      { image: '/images/OpotuCI (2).png', caption: 'Dashboard utilisateur' }
    ],
    demoUrl: '#', // Remplacez par votre URL de démo quand disponible
    sourceUrl: 'https://github.com/soulemaneyeo99/OpportuCI',
    featured: true,
    view_count: 0,
    created_at: '2025-01-01',
  },
  {
    id: 'ecommerce-django',
    title: 'E-commerce Django Professionnel',
    description: 'Plateforme de vente en ligne complète avec système d\'administration avancé, gestion des commandes et interface utilisateur moderne.',
    detailed_description: `Une plateforme e-commerce complète développée avec Django, démontrant ma maîtrise du développement web full-stack.

    🛒 **Fonctionnalités E-commerce** :
    - Catalogue produits avec catégories
    - Panier et système de commandes
    - Gestion des stocks en temps réel
    - Système de paiement intégré
    
    👨‍💼 **Interface Administrateur** :
    - Dashboard complet avec statistiques
    - Gestion des produits et catégories
    - Suivi des commandes et clients
    - Rapports de vente détaillés
    
    🔐 **Sécurité & Performance** :
    - Authentification Django robuste
    - Protection CSRF et XSS
    - Optimisation des requêtes DB
    - Cache intelligent`,
    techStack: ['Django', 'Bootstrap', 'JavaScript', 'SQLite', 'CSS3'],
    status: 'En ligne',
    category: 'E-commerce',
    image: '/images/portfolio/e-comerceclienDjango.jpg',
    images: [
      { image: '/images/portfolio/e-comerceclienDjango.jpg', caption: 'Interface client' },
      { image: '/images/fashionStoreashborard.jpeg', caption: 'Dashboard admin' },
      { image: '/images/portfolio/e-comercelogin.jpg', caption: 'Page de connexion' },
      { image: '/images/portfolio/ecomercemmande.jpg', caption: 'Gestion des commandes' },
      { image: '/images/portfolio/ecomerceregister.jpg', caption: 'Inscription' }
    ],
    demoUrl: 'https://commerce99.pythonanywhere.com/',
    sourceUrl: 'https://github.com/soulemaneyeo99/ecommerce-django',
    featured: true,
    view_count: 245,
    created_at: '2024-06-15',
  },
  {
    id: 'ecommerce-fastapi',
    title: 'E-commerce Modern FastAPI + React',
    description: 'Application e-commerce moderne avec API FastAPI haute performance et interface React responsive, démonstration de l\'architecture microservices.',
    detailed_description: `Une architecture moderne e-commerce séparant complètement le backend (FastAPI) du frontend (React), illustrant les meilleures pratiques actuelles.

    ⚡ **Performance FastAPI** :
    - API ultra-rapide avec validation automatique
    - Documentation Swagger auto-générée
    - Authentification JWT stateless
    - Architecture asynchrone
    
    ⚛️ **Interface React Moderne** :
    - Components réutilisables
    - State management avec Context API
    - Interface responsive Tailwind CSS
    - Lazy loading et optimisations
    
    🔄 **Architecture Microservices** :
    - API REST complètement découplée
    - Communication via requêtes HTTP
    - Déploiement indépendant possible
    - Scalabilité horizontale`,
    techStack: ['FastAPI', 'React', 'Tailwind CSS', 'PostgreSQL', 'JWT', 'Vite'],
    status: 'Complété',
    category: 'E-commerce',
    image: '/images/Fastapiecommerce.jpeg',
    images: [
      { image: '/images/Fastapiecommerce.jpeg', caption: 'Interface principale' }
    ],
    demoUrl: '#', // Ajoutez votre URL de démo
    sourceUrl: 'https://github.com/soulemaneyeo99/fastapi-ecommerce',
    featured: true,
    view_count: 156,
    created_at: '2024-09-20',
  },
  {
    id: 'react-todo',
    title: 'Application Todo React Avancée',
    description: 'Application de gestion de tâches avec React, démontrant la maîtrise des hooks, du state management et des bonnes pratiques frontend.',
    detailed_description: `Une application Todo sophistiquée qui va bien au-delà des tutoriels basiques, intégrant des fonctionnalités avancées et les meilleures pratiques React.

    🎨 **Interface Utilisateur Avancée** :
    - Design moderne avec animations fluides
    - Drag & drop pour réorganiser les tâches
    - Filtres et recherche en temps réel
    - Mode sombre/clair
    
    ⚛️ **React Moderne** :
    - Hooks personnalisés pour la logique métier
    - Context API pour le state global
    - Components fonctionnels optimisés
    - Error boundaries et gestion d'erreurs
    
    🔧 **Fonctionnalités Avancées** :
    - Catégories et tags pour les tâches
    - Dates d'échéance et rappels
    - Statistiques et rapports
    - Sauvegarde locale automatique`,
    techStack: ['React', 'Context API', 'Tailwind CSS', 'Local Storage', 'Hooks'],
    status: 'Complété',
    category: 'Application Web',
    image: '/images/react_todo.jpeg',
    images: [
      { image: '/images/react_todo.jpeg', caption: 'Interface principale' }
    ],
    demoUrl: '#', // Ajoutez votre URL de démo
    sourceUrl: 'https://github.com/soulemaneyeo99/react-todo',
    featured: false,
    view_count: 89,
    created_at: '2024-03-10',
  },
  {
    id: 'fashion-store',
    title: 'Fashion Store - Boutique Mode',
    description: 'Boutique en ligne spécialisée dans la mode avec interface élégante, système de recommandations et expérience utilisateur optimisée.',
    detailed_description: `Un projet e-commerce spécialisé dans la mode, mettant l'accent sur l'expérience utilisateur et le design visuel attractif.

    👗 **Spécialisé Mode** :
    - Catalogue organisé par catégories mode
    - Filtres avancés (taille, couleur, marque)
    - Zoom haute qualité sur les produits
    - Recommandations basées sur les goûts
    
    🎨 **Design & UX** :
    - Interface élégante et moderne
    - Navigation intuitive
    - Processus d'achat simplifié
    - Responsive design parfait
    
    🛒 **Fonctionnalités E-commerce** :
    - Gestion du panier avancée
    - Wishlist et favoris
    - Système de reviews et notes
    - Intégration réseaux sociaux`,
    techStack: ['Django', 'Bootstrap', 'JavaScript', 'CSS3', 'SQLite'],
    status: 'Complété',
    category: 'E-commerce',
    image: '/images/fashionStoreashborard.jpeg',
    images: [
      { image: '/images/fashionStoreashborard.jpeg', caption: 'Dashboard admin' },
      { image: '/images/fashionStorelogin.jpeg', caption: 'Page de connexion' }
    ],
    demoUrl: '#', // Ajoutez votre URL de démo
    sourceUrl: 'https://github.com/soulemaneyeo99/fashion-store',
    featured: false,
    view_count: 67,
    created_at: '2024-01-15',
  }
];

// Technologies avec couleurs cohérentes
export const SKILLS = {
  backend: [
    { name: 'Python', level: 90, color: '#3776ab' },
    { name: 'Django/DRF', level: 85, color: '#092e20' },
    { name: 'FastAPI', level: 75, color: '#009688' },
    { name: 'PostgreSQL', level: 70, color: '#336791' },
    { name: 'SQLite', level: 80, color: '#003b57' },
  ],
  frontend: [
    { name: 'JavaScript', level: 75, color: '#f7df1e' },
    { name: 'React', level: 70, color: '#61dafb' },
    { name: 'HTML5/CSS3', level: 85, color: '#e34f26' },
    { name: 'Tailwind CSS', level: 80, color: '#06b6d4' },
    { name: 'Bootstrap', level: 75, color: '#7952b3' },
  ],
  tools: [
    { name: 'Git/GitHub', level: 85, color: '#f05032' },
    { name: 'Docker', level: 65, color: '#2496ed' },
    { name: 'Linux/WSL', level: 75, color: '#fcc624' },
    { name: 'VS Code', level: 90, color: '#007acc' },
    { name: 'Postman', level: 80, color: '#ff6c37' },
  ],
  data: [
    { name: 'NumPy/Pandas', level: 75, color: '#013243' },
    { name: 'Scikit-learn', level: 70, color: '#f7931e' },
    { name: 'Matplotlib', level: 70, color: '#11557c' },
    { name: 'Machine Learning', level: 68, color: '#ff6b6b' },
  ],
};

// Messages d'animation typing plus spécifiques
export const TYPING_MESSAGES = [
  'Développeur Full-Stack',
  'Expert Python/Django',
  'Spécialiste FastAPI', 
  'Développeur React',
  'Passionné d\'IA',
  'Créateur d\'OpportuCI',
  'Problem Solver',
  'Architecte Backend',
];

// Navigation mise à jour
export const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', href: '/', icon: '🏠' },
  { id: 'about', label: 'À propos', href: '/about', icon: '👨‍💻' },
  { id: 'projects', label: 'Projets', href: '/projects', icon: '💼' },
  { id: 'blog', label: 'Blog', href: '/blog', icon: '📝' },
  { id: 'contact', label: 'Contact', href: '/contact', icon: '📧' },
];

export const PROJECT_CATEGORIES = [
  { id: 'web', name: 'Applications Web', color: '#3b82f6' },
  { id: 'api', name: 'APIs & Microservices', color: '#10b981' },
  { id: 'ai', name: 'IA & Machine Learning', color: '#8b5cf6' },
  { id: 'mobile', name: 'Applications Mobile', color: '#f59e0b' },
  { id: 'data', name: 'Data Science', color: '#ef4444' },
];