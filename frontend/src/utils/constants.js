// ========== frontend/src/utils/constants.js (CORRECTION BASÉE SUR VOS VRAIS FICHIERS) ==========

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
  profileImage: '/images/moi2.jpg', // EXISTE dans votre dossier
  heroBackground: '/images/hero-bg.jpg', // EXISTE dans votre dossier
  social: {
    github: 'https://github.com/soulemaneyeo99/',
    linkedin: 'https://www.linkedin.com/in/souleymane-yeo-422ba42b0/',
    whatsapp: 'https://wa.me/message/CBUAR25YW54XL1',
    facebook: '#',
  },
};

// Projets avec VOS VRAIS noms de fichiers
export const FEATURED_PROJECTS = [
  {
    id: 'opportunci',
    title: 'OpportuCI',
    description: 'Plateforme intelligente centralisant les opportunités académiques pour les étudiants ivoiriens.',
    techStack: ['Django', 'FastAPI', 'React', 'PostgreSQL', 'IA', 'Tailwind CSS'],
    status: 'En développement',
    category: 'Plateforme Éducative',
    image: '/images/OpotuCI.png', // EXISTE ✓
    images: [
      { image: '/images/OpotuCI.png', caption: 'Interface principale' },
      { image: '/images/OpotuCI (2).png', caption: 'Dashboard utilisateur' } // EXISTE ✓
    ],
    demoUrl: '#',
    sourceUrl: 'https://github.com/soulemaneyeo99/OpportuCI',
    featured: true,
    view_count: 0,
    created_at: '2025-01-01',
  },
  {
    id: 'ecommerce-django',
    title: 'E-commerce Django Professionnel',
    description: 'Plateforme de vente en ligne complète avec système d\'administration avancé.',
    techStack: ['Django', 'Bootstrap', 'JavaScript', 'SQLite', 'CSS3'],
    status: 'En ligne',
    category: 'E-commerce',
    image: '/images/portfolio/e-comerceclienDjango.jpg', // Vérifiez ce fichier
    images: [
      { image: '/images/portfolio/e-comerceclienDjango.jpg', caption: 'Interface client' },
      { image: '/images/fashionStoreashborard.jpeg', caption: 'Dashboard admin' }, // EXISTE ✓
      { image: '/images/fashionStorelogin.jpeg', caption: 'Page de connexion' } // EXISTE ✓
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
    description: 'Application e-commerce moderne avec API FastAPI haute performance.',
    techStack: ['FastAPI', 'React', 'Tailwind CSS', 'PostgreSQL', 'JWT', 'Vite'],
    status: 'Complété',
    category: 'E-commerce',
    image: '/images/Fastapiecommerce.jpeg', // EXISTE ✓
    images: [
      { image: '/images/Fastapiecommerce.jpeg', caption: 'Interface principale' }
    ],
    demoUrl: '#',
    sourceUrl: 'https://github.com/soulemaneyeo99/fastapi-ecommerce',
    featured: true,
    view_count: 156,
    created_at: '2024-09-20',
  },
  {
    id: 'react-todo',
    title: 'Application Todo React Avancée',
    description: 'Application de gestion de tâches avec React, démontrant la maîtrise des hooks.',
    techStack: ['React', 'Context API', 'Tailwind CSS', 'Local Storage', 'Hooks'],
    status: 'Complété',
    category: 'Application Web',
    image: '/images/react_todo.jpeg', // EXISTE ✓
    images: [
      { image: '/images/react_todo.jpeg', caption: 'Interface principale' }
    ],
    demoUrl: '#',
    sourceUrl: 'https://github.com/soulemaneyeo99/react-todo',
    featured: false,
    view_count: 89,
    created_at: '2024-03-10',
  },
  {
    id: 'fashion-store',
    title: 'Fashion Store - Boutique Mode',
    description: 'Boutique en ligne spécialisée dans la mode avec interface élégante.',
    techStack: ['Django', 'Bootstrap', 'JavaScript', 'CSS3', 'SQLite'],
    status: 'Complété',
    category: 'E-commerce',
    image: '/images/fashionStoreashborard.jpeg', // EXISTE ✓
    images: [
      { image: '/images/fashionStoreashborard.jpeg', caption: 'Dashboard admin' },
      { image: '/images/fashionStorelogin.jpeg', caption: 'Page de connexion' } // EXISTE ✓
    ],
    demoUrl: '#',
    sourceUrl: 'https://github.com/soulemaneyeo99/fashion-store',
    featured: false,
    view_count: 67,
    created_at: '2024-01-15',
  }
];

// ========== frontend/src/utils/helpers.js (FONCTION CORRIGÉE) ==========

export const getMediaUrl = (imagePath) => {
  // Debug en console pour voir ce qui est passé
  console.log('getMediaUrl called with:', imagePath);
  
  if (!imagePath) {
    console.log('No image path, using placeholder');
    return '/images/placeholder.jpg';
  }
  
  if (imagePath.startsWith('http')) {
    console.log('Full URL, returning as is');
    return imagePath;
  }
  
  if (imagePath.startsWith('/images/')) {
    console.log('Local image path, returning as is');
    return imagePath;
  }
  
  if (imagePath.startsWith('/')) {
    console.log('Root path, returning as is');
    return imagePath;
  }
  
  // Pour les images venant de l'API
  const mediaBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL || 'https://mydjango-react_portfolio.railway.app/media';
  const finalUrl = `${mediaBaseUrl}/${imagePath}`;
  console.log('API image, final URL:', finalUrl);
  return finalUrl;
};

// ========== Composant de test des images ==========
// frontend/src/components/debug/ImageDebug.jsx

import React from 'react';

const ImageDebug = () => {
  const testImages = [
    '/images/moi2.jpg',
    '/images/OpotuCI.png',
    '/images/Fastapiecommerce.jpeg',
    '/images/react_todo.jpeg',
    '/images/fashionStoreashborard.jpeg'
  ];

  return (
    <div className="fixed top-4 right-4 bg-white p-4 shadow-lg rounded-lg z-50 max-w-xs">
      <h3 className="font-bold mb-2">Test Images</h3>
      {testImages.map((src, index) => (
        <div key={index} className="mb-2">
          <p className="text-xs text-gray-600">{src}</p>
          <img 
            src={src} 
            alt={`Test ${index}`}
            className="w-16 h-16 object-cover border"
            onLoad={() => console.log(`✅ Image loaded: ${src}`)}
            onError={() => console.log(`❌ Image failed: ${src}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageDebug;

// ========== Actions à faire MAINTENANT ==========

/*
1. VÉRIFIEZ ces fichiers existent dans public/images/ :
   - moi2.jpg ✓ (confirmé)
   - OpotuCI.png ✓ (confirmé)  
   - Fastapiecommerce.jpeg ✓ (confirmé)
   - react_todo.jpeg ✓ (confirmé)
   - fashionStoreashborard.jpeg ✓ (confirmé)

2. VÉRIFIEZ le dossier portfolio/ :
   ls public/images/portfolio/

3. AJOUTEZ le composant debug temporairement dans App.jsx :
   import ImageDebug from './components/debug/ImageDebug';
   // Dans le return, ajoutez : <ImageDebug />

4. REBUILD et redéployez :
   npm run build
   
5. VÉRIFIEZ dans la console du navigateur les logs de getMediaUrl
*/