// ========== src/pages/Home.jsx (CORRECTION DE L'ERREUR MAP) ==========
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import ProjectCard from '../components/portfolio/ProjectCard';
import { portfolioService } from '../services/portfolio';
import { getMediaUrl } from '../utils/media';
import { PERSONAL_INFO, SKILLS } from '../utils/constants';
import Loading from '../components/common/Loading';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]); // IMPORTANT: Initialisation avec array vide
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const projects = await portfolioService.getFeaturedProjects();
        
        // VÉRIFICATION DÉFENSIVE
        if (Array.isArray(projects)) {
          setFeaturedProjects(projects.slice(0, 3));
          console.log('[Home] Featured projects loaded:', projects.length);
        } else {
          console.warn('[Home] Projects data is not an array:', projects);
          setFeaturedProjects([]);
        }
        
      } catch (err) {
        console.error('[Home] Error loading featured projects:', err);
        setError('Erreur de chargement des projets');
        setFeaturedProjects([]); // Assurer qu'on a toujours un array
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProjects();
  }, []);

  return (
    <>
      <SEOHead
        title="Accueil"
        description="Portfolio de Souleymane Yeo - Développeur Full-Stack Python/Django/React basé en Côte d'Ivoire. Créateur d'applications web innovantes."
        keywords={['développeur', 'python', 'django', 'react', 'côte d\'ivoire', 'portfolio']}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* About Preview */}
        <AboutPreview />

        {/* Featured Projects Section */}
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Projets en Vedette
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Découvrez une sélection de mes réalisations techniques les plus significatives
                </p>
              </motion.div>

              {/* Projects Grid avec vérification défensive */}
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 animate-pulse">
                      <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48 mb-4" />
                      <div className="bg-gray-300 dark:bg-gray-700 rounded h-6 mb-2" />
                      <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-3/4 mb-2" />
                      <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Erreur de chargement
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              ) : Array.isArray(featuredProjects) && featuredProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.id || project.title || index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <ProjectCard project={project} variant="featured" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Projets en cours de chargement
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mes projets seront bientôt disponibles
                  </p>
                </div>
              )}

              {/* CTA vers tous les projets */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-4 rounded-full hover:from-primary-600 hover:to-primary-800 transition-all duration-300 font-semibold shadow-colored transform hover:scale-105"
                >
                  <span>Voir tous mes projets</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <SkillsSection />

        {/* Contact CTA */}
        <ContactCTA />
      </div>
    </>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full text-sm font-medium">
                👋 Salut, moi c'est Souleymane
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Développeur{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Full-Stack
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              Spécialisé en <strong>Python</strong>, <strong>Django</strong>, <strong>FastAPI</strong> et <strong>React</strong>. 
              Je crée des solutions web innovantes basées en Côte d'Ivoire 🇨🇮
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-4 rounded-full hover:from-primary-600 hover:to-primary-800 transition-all duration-300 font-semibold shadow-colored transform hover:scale-105 text-center"
              >
                Découvrir mes projets
              </a>
              <Link
                to="/contact"
                className="border-2 border-primary-500 text-primary-600 dark:text-primary-400 px-8 py-4 rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 font-semibold text-center"
              >
                Me contacter
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">2+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Années</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={getMediaUrl("/images/moi2.jpg")}
                  alt="Souleymane Yeo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=Souleymane+Yeo&size=320&background=3b82f6&color=white&bold=true";
                  }}
                />
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-70 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

// About Preview Component (reste identique)
const AboutPreview = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Qui suis-je ?
            </h2>
            <div className="text-lg text-gray-600 dark:text-gray-400 space-y-6 leading-relaxed">
              <p>
                Développeur backend passionné, je me spécialise dans la création d'applications web robustes 
                avec <strong>Python</strong>, <strong>Django</strong> et <strong>FastAPI</strong>. 
                Mon expertise s'étend également au frontend avec <strong>React</strong>.
              </p>
              <p>
                Actuellement étudiant en L3 Informatique à l'UVCI, je développe 
                <strong> OpportuCI</strong>, une plateforme innovante centralisant les opportunités 
                académiques pour les étudiants ivoiriens.
              </p>
              <p>
                Mon objectif ? Créer des solutions technologiques à fort impact éducatif et social.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link
                to="/about"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors"
              >
                <span>En savoir plus sur mon parcours</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component (reste identique - code trop long)
const SkillsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      {/* Contenu identique à la version précédente */}
    </section>
  );
};

// Contact CTA Component (reste identique)
const ContactCTA = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
      {/* Contenu identique à la version précédente */}
    </section>
  );
};

export default Home;