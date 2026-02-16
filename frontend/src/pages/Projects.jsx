import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { useProjects } from '../hooks/useProjects';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import ProjectCard from '../components/features/projects/ProjectCard';
import ProjectFilters from '../components/features/projects/ProjectFilters';
import Loading from '../components/common/Loading';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { data: projects, isLoading, error } = useProjects();
  const { targetRef, hasIntersected } = useIntersectionObserver();

  useEffect(() => {
    if (!projects) return;

    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project =>
          project.category?.toLowerCase() === filter.toLowerCase() ||
          project.techStack?.some(tech => tech.toLowerCase().includes(filter.toLowerCase()))
        )
      );
    }
  }, [filter, projects]);

  const categories = ['Web App', 'E-commerce', 'API', 'IA'];

  if (isLoading) return <Loading />;

  // Clean empty states handled gracefully
  if (error) {
    console.error("Project load error", error);
    // Note: useProjects has fallback, so error is rare but handled
  }

  const displayProjects = filteredProjects || [];

  return (
    <>
      <SEOHead
        title="Mes Projets | Portfolio"
        description="Découvrez mes projets de développement web : applications Django, FastAPI, React, e-commerce et plateformes éducatives."
        keywords={['projets', 'portfolio', 'django', 'fastapi', 'react', 'e-commerce', 'applications web']}
      />

      <div className="min-h-screen bg-bg-dark pt-0">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-accent-purple/5 blur-[100px]" />

          <div className="container-custom relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 tracking-tight">
              Mes <span className="text-primary-500">Projets</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Une sélection de réalisations techniques démontrant mon expertise en développement Full Stack.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="container-custom pb-8">
          <ProjectFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            categories={categories}
          />
        </section>

        {/* Projects Grid */}
        <section ref={targetRef} className="pb-24 container-custom">
          {displayProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  delay={index * 100}
                  hasIntersected={hasIntersected}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-bg-card border border-border-default rounded-2xl">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Aucun projet trouvé
              </h3>
              <p className="text-text-secondary mb-8">
                Essayez un autre filtre ou consultez tous les projets.
              </p>
              <button
                onClick={() => setFilter('all')}
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-bg-elevated border-t border-white/5">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Un projet en tête ?
            </h2>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Discutons de vos besoins et transformons vos idées en réalité numérique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-glow"
              >
                🚀 Démarrer un projet
              </Link>
              <a
                href="mailto:soulemaneyeo99@gmail.com"
                className="px-8 py-4 bg-transparent border border-white/10 hover:bg-white/5 text-text-primary rounded-full font-bold transition-colors"
              >
                📧 Me contacter par email
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
