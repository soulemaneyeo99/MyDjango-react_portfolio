# 🎯 PROMPT COMPLET DE REFACTORING PORTFOLIO PROFESSIONNEL

## 🎨 VISION & IDENTITÉ

### Objectif Principal
Créer un portfolio **ultra-professionnel** qui reflète l'expertise d'un développeur Full-Stack senior, avec :
- Une identité visuelle **cohérente et mémorable**
- Une expérience utilisateur **fluide et intuitive**
- Un code **propre, maintenable et performant**
- Une présentation **technique mais accessible**

### Persona Cible
**Qui regarde ce portfolio ?**
1. Recruteurs tech (30%) - Cherchent compétences, projets, professionnalisme
2. Clients potentiels (40%) - Veulent voir capacités, réalisations concrètes
3. Autres développeurs (20%) - Évaluent qualité code, stack technique
4. Communauté (10%) - Intéressés par le blog, partages

### Positionnement
"**Architecte de solutions digitales** - Je transforme des idées en produits robustes et scalables avec Python, Django, React et IA"

---

## 🎨 DESIGN SYSTEM UNIFIÉ

### 1. PALETTE DE COULEURS (Dark Professional)

```javascript
// src/styles/design-tokens.js
export const DESIGN_TOKENS = {
  colors: {
    // Primaires
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      500: '#3B82F6',  // Bleu principal
      600: '#2563EB',
      700: '#1D4ED8',
      900: '#1E3A8A',
    },
    
    // Backgrounds
    bg: {
      dark: '#0A0A0A',     // Background principal dark
      darker: '#050505',   // Sections alternées
      card: '#151515',     // Cards/conteneurs
      elevated: '#1A1A1A', // Elements surélevés
    },
    
    // Texte
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
      muted: '#71717A',
      inverse: '#0A0A0A',
    },
    
    // Accents
    accent: {
      purple: '#8B5CF6',
      green: '#10B981',
      orange: '#F59E0B',
      red: '#EF4444',
    },
    
    // Bordures
    border: {
      subtle: 'rgba(255, 255, 255, 0.05)',
      default: 'rgba(255, 255, 255, 0.1)',
      strong: 'rgba(255, 255, 255, 0.2)',
    },
  },
  
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      display: ['Cal Sans', 'Inter', 'sans-serif'], // Pour titres impactants
    },
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
  },
  
  spacing: {
    section: '6rem',     // Espacement entre sections
    container: '1.5rem', // Padding container mobile
    element: '1rem',     // Espacement éléments
  },
  
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)', // Pour effets spéciaux
  },
  
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};
```

### 2. COMPOSANTS ATOMIQUES

```jsx
// src/components/ui/Button.jsx
import { DESIGN_TOKENS } from '@/styles/design-tokens';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  loading,
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'border border-white/10 hover:border-primary-500 text-white',
    ghost: 'hover:bg-white/5 text-text-secondary hover:text-text-primary',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg font-medium
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
      `}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {icon && !loading && icon}
      {children}
    </button>
  );
};

// src/components/ui/Card.jsx
const Card = ({ 
  children, 
  hover = false, 
  glowOnHover = false,
  className = '' 
}) => (
  <div className={`
    bg-bg-card border border-border-default rounded-xl p-6
    ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg' : ''}
    ${glowOnHover ? 'hover:shadow-glow hover:border-primary-500/50' : ''}
    ${className}
  `}>
    {children}
  </div>
);

// src/components/ui/Badge.jsx
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-white/5 text-text-secondary',
    primary: 'bg-primary-500/10 text-primary-500 border border-primary-500/20',
    success: 'bg-accent-green/10 text-accent-green border border-accent-green/20',
    tech: 'bg-bg-elevated text-text-secondary border border-border-default',
  };
  
  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full
      text-xs font-medium
      ${variants[variant]}
    `}>
      {children}
    </span>
  );
};
```

---

## 🏗️ ARCHITECTURE FRONTEND REFACTORÉE

### 1. STRUCTURE DE DOSSIERS OPTIMISÉE

```
src/
├── components/
│   ├── ui/                    # Composants atomiques
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Input.jsx
│   │   └── index.js
│   │
│   ├── layout/                # Layout components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Container.jsx
│   │   └── Section.jsx
│   │
│   ├── features/              # Feature-specific components
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectGrid.jsx
│   │   │   ├── ProjectFilters.jsx
│   │   │   └── VideoPlayer.jsx
│   │   │
│   │   ├── blog/
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogGrid.jsx
│   │   │   └── BlogFilters.jsx
│   │   │
│   │   └── home/
│   │       ├── Hero.jsx
│   │       ├── Skills.jsx
│   │       ├── FeaturedProjects.jsx
│   │       └── CTA.jsx
│   │
│   └── common/
│       ├── ErrorBoundary.jsx
│       ├── Loading.jsx
│       ├── SEO.jsx
│       └── Image.jsx          # Optimized image component
│
├── hooks/
│   ├── useApi.js
│   ├── useIntersectionObserver.js
│   ├── useMediaQuery.js
│   └── useTheme.js
│
├── lib/
│   ├── api/
│   │   ├── client.js          # Axios instance configuré
│   │   ├── projects.js
│   │   ├── blog.js
│   │   └── index.js
│   │
│   ├── utils/
│   │   ├── cn.js              # Class names utility
│   │   ├── format.js          # Date, text formatters
│   │   └── image.js           # Image optimization
│   │
│   └── constants/
│       ├── config.js          # App config
│       ├── routes.js          # Routes constants
│       └── content.js         # Static content
│
├── styles/
│   ├── design-tokens.js       # Design system tokens
│   ├── globals.css            # Global styles (minimaliste)
│   └── animations.css         # Animations réutilisables
│
├── store/                     # State management (si besoin)
│   ├── useAppStore.js         # Zustand store
│   └── slices/
│
└── pages/
    ├── Home.jsx
    ├── About.jsx
    ├── Projects.jsx
    ├── ProjectDetail.jsx
    ├── Blog.jsx
    ├── BlogPost.jsx
    └── Contact.jsx
```

### 2. GESTION D'ÉTAT SIMPLIFIÉE

```javascript
// src/lib/api/client.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour logs
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// src/lib/api/projects.js
import { apiClient } from './client';

// Cache simple en mémoire
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const projectsApi = {
  async getAll(params = {}) {
    const cacheKey = `projects-${JSON.stringify(params)}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    
    const { data } = await apiClient.get('/portfolio/projects/', { params });
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  },
  
  async getOne(slug) {
    const cacheKey = `project-${slug}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    
    const { data } = await apiClient.get(`/portfolio/projects/${slug}/`);
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  },
  
  async getFeatured() {
    const cacheKey = 'featured-projects';
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    
    const { data } = await apiClient.get('/portfolio/projects/featured/');
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  },
};

// src/hooks/useProjects.js
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api/projects';

export const useProjects = (params) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProject = (slug) => {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectsApi.getOne(slug),
    enabled: !!slug,
  });
};
```

### 3. COMPOSANT IMAGE OPTIMISÉ

```jsx
// src/components/common/Image.jsx
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

const Image = ({ 
  src, 
  alt, 
  className,
  fallback = '/images/placeholder.jpg',
  aspectRatio = 'auto',
  loading = 'lazy',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  };
  
  return (
    <div className={cn('relative overflow-hidden', aspectRatios[aspectRatio])}>
      {isLoading && (
        <div className="absolute inset-0 bg-bg-card animate-pulse" />
      )}
      
      <img
        src={hasError ? fallback : src}
        alt={alt}
        loading={loading}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
};

export default Image;
```

---

## 🎭 EXPÉRIENCE UTILISATEUR COHÉRENTE

### 1. NAVIGATION UNIFIÉE

```jsx
// src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Projets', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'À propos', href: '/about' },
];

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-bg-dark/80 backdrop-blur-xl border-b border-border-subtle py-4' 
        : 'bg-transparent py-6'
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110">
            SY
          </div>
          <span className="hidden md:block text-text-primary font-semibold">
            Souleymane Yeo
          </span>
        </Link>
        
        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'text-sm font-medium transition-colors',
                location.pathname === item.href
                  ? 'text-primary-500'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {item.name}
            </Link>
          ))}
          
          <Button variant="primary" size="sm" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
        >
          <MenuIcon />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu />}
    </header>
  );
};
```

### 2. ANIMATIONS COHÉRENTES

```css
/* src/styles/animations.css */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-slide-in {
  animation: slide-in-left 0.6s ease-out forwards;
}

.animate-glow {
  animation: glow-pulse 2s ease-in-out infinite;
}

/* Stagger delay utility */
.stagger-1 { animation-delay: 100ms; }
.stagger-2 { animation-delay: 200ms; }
.stagger-3 { animation-delay: 300ms; }
.stagger-4 { animation-delay: 400ms; }
```

```jsx
// Usage dans les composants
const FeaturedProjects = () => {
  const { ref, inView } = useIntersectionObserver();
  
  return (
    <section ref={ref} className="py-24">
      {projects.map((project, i) => (
        <div
          key={project.id}
          className={cn(
            'opacity-0',
            inView && `animate-fade-in stagger-${i + 1}`
          )}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </section>
  );
};
```

---

## 📱 RESPONSIVE DESIGN PARFAIT

### 1. BREAKPOINTS STANDARDISÉS

```javascript
// src/lib/constants/breakpoints.js
export const BREAKPOINTS = {
  sm: 640,   // Mobile landscape
  md: 768,   // Tablet
  lg: 1024,  // Desktop
  xl: 1280,  // Large desktop
  '2xl': 1536, // Extra large
};

// Hook personnalisé
export const useMediaQuery = (breakpoint) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
    const media = window.matchMedia(query);
    
    const updateMatch = () => setMatches(media.matches);
    updateMatch();
    
    media.addEventListener('change', updateMatch);
    return () => media.removeEventListener('change', updateMatch);
  }, [breakpoint]);
  
  return matches;
};
```

### 2. COMPOSANTS RESPONSIVES

```jsx
// Exemple : Hero responsive
const Hero = () => {
  const isDesktop = useMediaQuery('lg');
  
  return (
    <section className="min-h-screen flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
            Full-Stack Developer
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary">
            Je crée des applications web robustes et scalables
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">Voir mes projets</Button>
            <Button variant="secondary" size="lg">Me contacter</Button>
          </div>
        </div>
        
        {/* Image - Desktop only */}
        {isDesktop && (
          <div className="relative">
            <Image
              src="/images/hero.jpg"
              alt="Souleymane Yeo"
              aspectRatio="square"
              className="rounded-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};
```

---

## ⚡ PERFORMANCE & OPTIMISATION

### 1. CODE SPLITTING INTELLIGENT

```javascript
// src/App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header, Footer } from '@/components/layout';
import { Loading } from '@/components/common';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="min-h-screen bg-bg-dark text-text-primary">
        <Header />
        
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        
        <Footer />
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);
```

### 2. OPTIMISATION BUNDLE

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }), // Analyse du bundle
  ],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query': ['@tanstack/react-query'],
          'ui': ['framer-motion', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
```

---

## 🔐 SÉCURITÉ & BONNES PRATIQUES

### 1. VARIABLES D'ENVIRONNEMENT

```bash
# .env.example
VITE_API_URL=http://localhost:8000/api
VITE_SITE_URL=http://localhost:5173
VITE_GTM_ID=
VITE_SENTRY_DSN=
```

```javascript
// src/lib/constants/config.js
export const CONFIG = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL,
    timeout: 10000,
  },
  
  site: {
    url: import.meta.env.VITE_SITE_URL,
    name: 'Souleymane Yeo - Portfolio',
    description: 'Full-Stack Developer spécialisé en Python, Django, React',
  },
  
  analytics: {
    gtmId: import.meta.env.VITE_GTM_ID,
  },
  
  sentry: {
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
  },
};
```

### 2. VALIDATION & SANITIZATION

```javascript
// src/lib/utils/validation.js
export const validators = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  phone: (phone) => {
    const regex = /^\+?[\d\s-()]+$/;
    return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },
  
  required: (value) => {
    return value?.toString().trim().length > 0;
  },
  
  minLength: (value, min) => {
    return value?.toString().length >= min;
  },
};

export const sanitize = {
  html: (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },
  
  url: (url) => {
    try {
      new URL(url);
      return url;
    } catch {
      return null;
    }
  },
};
```

---

## 📈 SEO & ACCESSIBILITÉ

### 1. SEO COMPONENT AMÉLIORÉ

```jsx
// src/components/common/SEO.jsx
import { Helmet } from 'react-helmet-async';
import { CONFIG } from '@/lib/constants/config';

const SEO = ({
  title,
  description,
  image = '/images/og-default.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags = [],
}) => {
  const fullTitle = title 
    ? `${title} | ${CONFIG.site.name}`
    : CONFIG.site.name;
    
  const fullUrl = url || CONFIG.site.url;
  const fullImage = image.startsWith('http') 
    ? image 
    : `${CONFIG.site.url}${image}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || CONFIG.site.description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || CONFIG.site.description} />
      <meta property="og:image" content={fullImage} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || CONFIG.site.description} />
      <meta property="twitter:image" content={fullImage} />
      
      {/* Additional */}
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="French" />
    </Helmet>
  );
};
```

### 2. ACCESSIBILITÉ (A11Y)

```jsx
// Exemples de bonnes pratiques
const AccessibleButton = ({ children, ...props }) => (
  <button
    type="button"
    aria-label={typeof children === 'string' ? children : undefined}
    className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg-dark"
    {...props}
  >
    {children}
  </button>
);

const AccessibleImage = ({ src, alt, ...props }) => (
  <img
    src={src}
    alt={alt} // TOUJOURS descriptif, jamais vide
    loading="lazy"
    {...props}
  />
);

// Navigation accessible
const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded"
  >
    Aller au contenu principal
  </a>
);
```

---

## 🎨 PAGES REFACTORISÉES

### Page d'Accueil (Home.jsx)

```jsx
// src/pages/Home.jsx
import { SEO } from '@/components/common';
import {
  Hero,
  Skills,
  FeaturedProjects,
  Experience,
  Testimonials,
  CTA,
} from '@/components/features/home';

const Home = () => {
  return (
    <>
      <SEO
        title="Accueil"
        description="Développeur Full-Stack Python/Django/React basé en Côte d'Ivoire"
      />
      
      <main id="main-content">
        <Hero />
        <Skills />
        <FeaturedProjects />
        <Experience />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
};

export default Home;
```

### Hero Section Modernisée

```jsx
// src/components/features/home/Hero.jsx
import { Button } from '@/components/ui';
import { Image } from '@/components/common';
import { useTypewriter } from '@/hooks/useTypewriter';

const roles = [
  'Full-Stack Developer',
  'Python Expert',
  'React Specialist',
  'Django Architect',
];

const Hero = () => {
  const { text, isTyping } = useTypewriter(roles, 100, 2000);
  
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-purple/5" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-primary-500 font-medium">
                Disponible pour nouveaux projets
              </span>
            </div>
            
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Bonjour, je suis{' '}
              <span className="bg-gradient-to-r from-primary-500 to-accent-purple bg-clip-text text-transparent">
                Souleymane
              </span>
            </h1>
            
            {/* Typewriter */}
            <div className="flex items-center gap-2 text-2xl md:text-3xl text-text-secondary">
              <span>{text}</span>
              <span className={cn(
                'inline-block w-0.5 h-8 bg-primary-500',
                isTyping ? 'opacity-100' : 'animate-pulse'
              )} />
            </div>
            
            {/* Description */}
            <p className="text-lg text-text-secondary max-w-xl">
              Je transforme des idées en applications web robustes et scalables
              avec Python, Django, React et l'IA.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#projects">Voir mes projets</a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="/contact">Me contacter</a>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border-subtle">
              {[
                { value: '15+', label: 'Projets complétés' },
                { value: '3+', label: 'Ans d\'expérience' },
                { value: '10+', label: 'Technologies' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-primary-500">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <div className="hidden lg:block relative">
            <div className="relative z-10">
              <Image
                src="/images/profile.jpg"
                alt="Souleymane Yeo"
                aspectRatio="square"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-primary-500/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-purple/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

---

## 📦 DÉPLOIEMENT & PRODUCTION

### 1. Configuration Production

```javascript
// vite.config.js (production)
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  return {
    plugins: [react()],
    
    build: {
      sourcemap: !isProd,
      minify: isProd ? 'esbuild' : false,
      
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            query: ['@tanstack/react-query'],
          },
        },
      },
    },
    
    define: {
      'import.meta.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString()),
    },
  };
});
```

### 2. CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## ✅ CHECKLIST DE MIGRATION

### Phase 1 : Fondations (Semaine 1)
- [ ] Créer le Design System complet
- [ ] Mettre en place les composants UI atomiques
- [ ] Configurer React Query
- [ ] Optimiser la structure de dossiers
- [ ] Implémenter le nouveau Header/Footer

### Phase 2 : Pages Core (Semaine 2)
- [ ] Refactoriser Home.jsx
- [ ] Refactoriser Projects.jsx
- [ ] Refactoriser About.jsx
- [ ] Améliorer Contact.jsx
- [ ] Implémenter SEO complet

### Phase 3 : Features Avancées (Semaine 3)
- [ ] Blog fonctionnel (connexion API)
- [ ] Système de filtres projets
- [ ] Animations et micro-interactions
- [ ] Optimisation images (WebP, lazy)
- [ ] Tests unitaires critiques

### Phase 4 : Polish & Deploy (Semaine 4)
- [ ] Audit Lighthouse (score 90+)
- [ ] Audit A11y (WCAG AA)
- [ ] Tests E2E (Playwright)
- [ ] Documentation complète
- [ ] Déploiement production

---

## 🎯 RÉSULTAT ATTENDU

**Un portfolio qui :**
✅ Reflète votre expertise technique (code propre, architecture solide)
✅ Se distingue visuellement (design moderne et cohérent)
✅ Offre une UX exceptionnelle (rapide, fluide, intuitive)
✅ Est accessible à tous (A11Y, SEO)
✅ Convertit les visiteurs en opportunités

**Métriques cibles :**
- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Lighthouse SEO: 100
- Bundle size: <150KB (gzipped)
- First Contentful Paint: <1s
- Time to Interactive: <2s

---

## 📚 RESSOURCES & INSPIRATIONS

### Design Inspiration
- https://www.awwwards.com/ (portfolios primés)
- https://dribbble.com/search/developer-portfolio
- https://www.lapa.ninja/

### Composants UI
- https://ui.shadcn.com/ (excellente base)
- https://www.radix-ui.com/ (primitives accessibles)
- https://headlessui.com/ (composants Tailwind)

### Performance
- https://web.dev/vitals/ (Core Web Vitals)
- https://bundlephobia.com/ (analyse bundles)

---

**Prêt à transformer ce portfolio en chef-d'œuvre technique ?** 🚀