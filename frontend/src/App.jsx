// ========== src/App.jsx (Version Finale Professionnelle) ==========
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import NotificationSystem from './components/common/NotificationSystem';
import Loading from './components/common/Loading'; // Correction : import correct
import ErrorBoundary from './components/common/ErrorBoundary';
import './styles/globals.css';

// Lazy loading optimisé des pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));

// Composant pour le tracking des pages
const PageTracker = ({ children }) => {
  const location = useLocation();
  const { actions } = useApp();

  useEffect(() => {
    // Track page view
    actions.trackPageView(location.pathname);

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title dynamically
    const pathToTitle = {
      '/': 'Accueil - Portfolio Souleymane Yeo',
      '/about': 'À propos - Souleymane Yeo',
      '/projects': 'Projets - Souleymane Yeo',
      '/blog': 'Blog - Souleymane Yeo',
      '/contact': 'Contact - Souleymane Yeo'
    };

    document.title = pathToTitle[location.pathname] || 'Portfolio Souleymane Yeo';
  }, [location, actions]);

  return children;
};

// Composant NotFound professionnel
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
    <div className="text-center px-4 max-w-lg mx-auto">
      <div className="relative mb-8">
        <div className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white text-3xl">🚀</span>
          </div>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Page non trouvée
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        Cette page semble s'être envolée dans l'espace numérique.
        Ne vous inquiétez pas, explorons ensemble d'autres horizons !
      </p>

      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg"
        >
          Retour à l'accueil
        </a>
        <a
          href="/projects"
          className="inline-block border-2 border-blue-500 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 font-semibold"
        >
          Voir mes projets
        </a>
      </div>

      {/* Suggestions de navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Peut-être cherchiez-vous :
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { label: 'Mes projets', href: '/projects' },
            { label: 'À propos', href: '/about' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' }
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Composant Suspense simplifié (remplace SuspenseWrapper)
const SuspenseFallback = ({ children }) => (
  <Suspense fallback={<Loading />}>
    {children}
  </Suspense>
);

// Hook pour l'initialisation de l'application
const useAppInitialization = () => {
  const { actions } = useApp();

  useEffect(() => {
    // Détecter le thème initial
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;

    actions.setTheme(initialTheme);

    // Écouter les changements de thème système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        actions.setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    // Performance: Preload critical resources
    const criticalImages = [
      '/images/moi2.jpg',
      '/images/hero-bg.jpg',
      '/images/OpotuCI.png'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [actions]);
};

// Composant principal de l'application
const AppContent = () => {
  useAppInitialization();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <NotificationSystem />

      <main className="flex-grow pt-16 lg:pt-20">
        <PageTracker>
          <Routes>
            <Route
              path="/"
              element={
                <SuspenseFallback>
                  <Home />
                </SuspenseFallback>
              }
            />
            <Route
              path="/about"
              element={
                <SuspenseFallback>
                  <About />
                </SuspenseFallback>
              }
            />
            <Route
              path="/projects"
              element={
                <SuspenseFallback>
                  <Projects />
                </SuspenseFallback>
              }
            />
            <Route
              path="/projects/:slug"
              element={
                <SuspenseFallback>
                  <ProjectDetail />
                </SuspenseFallback>
              }
            />
            <Route
              path="/blog"
              element={
                <SuspenseFallback>
                  <Blog />
                </SuspenseFallback>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <SuspenseFallback>
                  <BlogPost />
                </SuspenseFallback>
              }
            />
            <Route
              path="/contact"
              element={
                <SuspenseFallback>
                  <Contact />
                </SuspenseFallback>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTracker>
      </main>

      <Footer />
    </div>
  );
};

// Composant App principal avec tous les providers
const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AppProvider>
          <AuthProvider>
            <Router>
              <AppContent />
            </Router>
          </AuthProvider>
        </AppProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;