// ========== frontend/src/App.jsx (CORRIGÉ) ==========
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loading from './components/common/Loading';
import './styles/globals.css';

// Lazy loading des pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header />
            
            <main className="flex-grow pt-16 md:pt-20">
              <Suspense 
                fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <Loading size="large" text="Chargement de la page..." />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

// 404 Component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
    <div className="text-center px-4">
      <div className="text-6xl md:text-8xl mb-6">404</div>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        Page non trouvée
      </h1>
      <p className="text-gray-500 dark:text-gray-500 mb-8 max-w-md mx-auto">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <a
        href="/"
        className="inline-block bg-gradient-to-r from-primary-500 to-primary-700 text-white px-6 py-3 rounded-full hover:from-primary-600 hover:to-primary-800 transition-all duration-300 font-medium"
      >
        Retour à l'accueil
      </a>
    </div>
  </div>
);

export default App;
