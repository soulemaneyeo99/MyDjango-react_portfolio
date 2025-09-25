// ========== frontend/src/pages/Projects.jsx ==========
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { FEATURED_PROJECTS, PROJECT_CATEGORIES } from '../utils/constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(FEATURED_PROJECTS);
  const { targetRef, hasIntersected } = useIntersectionObserver();

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(FEATURED_PROJECTS);
    } else {
      setFilteredProjects(
        FEATURED_PROJECTS.filter(project => 
          project.category.toLowerCase() === filter.toLowerCase() ||
          project.techStack.some(tech => tech.toLowerCase().includes(filter.toLowerCase()))
        )
      );
    }
  }, [filter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complété': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'En développement': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'En ligne': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <>
      <SEOHead
        title="Mes Projets"
        description="Découvrez mes projets de développement web : applications Django, FastAPI, React, e-commerce et plateformes éducatives. Portfolio de Souleymane Yeo."
        keywords={['projets', 'portfolio', 'django', 'fastapi', 'react', 'e-commerce', 'applications web']}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Mes{' '}
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Projets
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Découvrez mes réalisations techniques et mes contributions au monde du développement web
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-primary-500 text-white shadow-colored'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                Tous les projets
              </button>
              
              {['Web App', 'E-commerce', 'API', 'IA'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-primary-500 text-white shadow-colored'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section ref={targetRef} className="pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  delay={index * 100}
                  hasIntersected={hasIntersected}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Aucun projet trouvé
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Essayez un autre filtre ou consultez tous les projets
                </p>
                <button
                  onClick={() => setFilter('all')}
                  className="bg-primary-500 text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors"
                >
                  Voir tous les projets
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Un projet en tête ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discutons de votre idée et créons ensemble quelque chose d'extraordinaire !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Démarrer un projet
              </Link>
              <a
                href="mailto:soulemaneyeo99@gmail.com"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
              >
                📧 Discuter par email
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Project Card Component
const ProjectCard = ({ project, delay, hasIntersected }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Complété': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'En développement': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'En ligne': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden group transform hover:scale-105 ${
        hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/3b82f6/ffffff?text=${encodeURIComponent(project.title)}`;
          }}
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Demo</span>
              </a>
            )}
            {project.sourceUrl && project.sourceUrl !== '#' && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Code</span>
              </a>
            )}
          </div>
          
          <Link
            to={`/projects/${project.id}`}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm font-medium flex items-center space-x-1"
          >
            <span>Détails</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
