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

// NotFound is now imported
const NotFound = lazy(() => import('./pages/NotFound'));

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
      '/images/profile_original.png',
      '/images/hero-bg.jpg',
      '/images/OpotuCI.png',
      '/logo.jpeg'
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
    <div className="flex flex-col min-h-screen bg-bg-dark text-text-primary transition-colors duration-300">
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
            <Route path="*" element={<SuspenseFallback><NotFound /></SuspenseFallback>} />
          </Routes>
        </PageTracker>
      </main>

      <Footer />
    </div>
  );
};

// ... imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Composant App principal avec tous les providers
const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <AuthProvider>
              <Router>
                <AppContent />
              </Router>
            </AuthProvider>
          </AppProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;