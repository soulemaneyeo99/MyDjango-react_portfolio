// ========== frontend/src/pages/ProjectDetail.jsx ==========
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Loading from '../components/common/Loading';
import { useProject } from '../hooks/useProjects';
import VideoPlayer from '../components/projects/VideoPlayer';
import { formatDate } from '../utils/helpers';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  // Using React Query hook
  const { data: project, isLoading, error } = useProject(slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper for image URL
  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return path;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-dark">
        <Loading size="large" text="Chargement du projet..." />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-dark">
        <div className="text-center p-8 bg-bg-card rounded-xl border border-border-default">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            {error?.message || 'Projet non trouvé'}
          </h1>
          <p className="text-text-secondary mb-8">
            Ce projet n'existe pas ou a été supprimé.
          </p>
          <div className="space-x-4">
            <Button onClick={() => navigate(-1)} variant="ghost">
              ← Retour
            </Button>
            <Link to="/projects">
              <Button variant="primary">
                Voir tous les projets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allImages = [
    { image: project.featured_image, caption: 'Image principale' },
    ...(project.images || [])
  ];

  return (
    <>
      <SEOHead
        title={`${project.title} | Portfolio`}
        description={project.description}
        image={getImageUrl(project.featured_image)}
        keywords={[project.title, ...(project.technologies?.map(t => t.name) || [])]}
      />

      <div className="min-h-screen bg-bg-dark">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[100px]" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm mb-8 font-mono">
                <Link to="/" className="text-text-secondary hover:text-primary-500 transition-colors">
                  HOME
                </Link>
                <span className="text-text-muted">/</span>
                <Link to="/projects" className="text-text-secondary hover:text-primary-500 transition-colors">
                  PROJECTS
                </Link>
                <span className="text-text-muted">/</span>
                <span className="text-primary-500 truncate max-w-[200px]">{project.title.toUpperCase()}</span>
              </nav>

              <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text-primary mb-6 tracking-tight">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-8 font-light">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                  {project.category && (
                    <Badge variant="primary" className="text-sm px-4 py-1.5">
                      {project.category.name || project.category}
                    </Badge>
                  )}
                  <Badge variant="default" className="text-sm px-4 py-1.5">
                    {formatDate(project.created_at)}
                  </Badge>
                  {project.view_count > 0 && (
                    <Badge variant="purple" className="text-sm px-4 py-1.5">
                      {project.view_count} Vues
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  {project.demo_url && project.demo_url !== '#' && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all transform rounded-full bg-primary-500 hover:bg-primary-600 hover:scale-105 shadow-glow"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      LIVE DEMO
                    </a>
                  )}
                  {project.source_url && project.source_url !== '#' && (
                    <a
                      href={project.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-bold transition-all border rounded-full text-text-secondary border-white/10 hover:bg-white/5 hover:text-white"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      VIEW CODE
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-20 lg:py-24">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Video Demo Section */}
                  {(project.demo_video_url || project.demo_video_file) && project.video_type !== 'none' && (
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center space-x-3">
                        <span className="text-primary-500">▶</span>
                        <span>Démonstration Vidéo</span>
                      </h2>
                      <VideoPlayer
                        videoUrl={project.demo_video_url}
                        videoFile={project.demo_video_file}
                        videoType={project.video_type}
                        customThumbnail={project.video_thumbnail}
                        title={project.title}
                      />
                    </div>
                  )}

                  {/* Image Gallery */}
                  {allImages.length > 0 && allImages[0].image && (
                    <div className="mb-16">
                      <div className="relative mb-6 group">
                        <img
                          src={getImageUrl(allImages[currentImageIndex]?.image)}
                          alt={allImages[currentImageIndex]?.caption || project.title}
                          className="w-full h-auto max-h-[500px] object-cover rounded-xl border border-white/5 shadow-2xl"
                        />
                        {allImages.length > 1 && (
                          <>
                            <button
                              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-primary-500 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                            >
                              ←
                            </button>
                            <button
                              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % allImages.length)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-primary-500 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                            >
                              →
                            </button>
                          </>
                        )}
                      </div>

                      {allImages.length > 1 && (
                        <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
                          {allImages.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                ? 'border-primary-500 ring-2 ring-primary-500/20'
                                : 'border-white/5 hover:border-white/20 opacity-60 hover:opacity-100'
                                }`}
                            >
                              <img
                                src={getImageUrl(img.image)}
                                alt={img.caption || `Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description détaillée */}
                  {project.detailed_description && (
                    <div className="mb-16">
                      <h2 className="text-2xl font-bold text-text-primary mb-6 border-l-4 border-primary-500 pl-4">
                        À propos du projet
                      </h2>
                      <div className="prose prose-lg prose-invert max-w-none text-text-secondary">
                        <div dangerouslySetInnerHTML={{ __html: project.detailed_description.replace(/\n/g, '<br>') }} />
                      </div>
                    </div>
                  )}

                  {/* Features/Fonctionnalités */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-text-primary mb-6 border-l-4 border-primary-500 pl-4">
                      Fonctionnalités clés
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Placeholder features if logic is missing from backend response for now, assuming array */}
                      {(project.features || [
                        'Interface utilisateur moderne et responsive',
                        'Architecture backend robuste et scalable',
                        'Authentification et sécurité optimisées',
                        'Gestion des données performante',
                        'API RESTful complète'
                      ]).map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-bg-card rounded-lg border border-border-default hover:border-primary-500/30 transition-colors">
                          <svg className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-28 space-y-8">
                    {/* Technologies utilisées */}
                    <div className="bg-bg-card border border-border-default rounded-xl p-6 shadow-soft">
                      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm flex items-center">
                        <span className="w-1 h-4 bg-primary-500 mr-2 rounded-full"></span>
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack ? (
                          project.techStack.map((tech, index) => (
                            <Badge key={index} variant="tech">
                              {tech}
                            </Badge>
                          ))
                        ) : (
                          // Fallback if data structure differs
                          project.technologies?.map((tech, index) => (
                            <Badge key={index} variant="tech">
                              {tech.name || tech}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Informations du projet */}
                    <div className="bg-bg-card border border-border-default rounded-xl p-6 shadow-soft">
                      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm flex items-center">
                        <span className="w-1 h-4 bg-primary-500 mr-2 rounded-full"></span>
                        Infos Projet
                      </h3>
                      <div className="space-y-4 text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-3">
                          <span className="text-text-muted">Date</span>
                          <span className="text-text-primary text-right">{formatDate(project.created_at)}</span>
                        </div>
                        {project.category && (
                          <div className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-text-muted">Catégorie</span>
                            <span className="text-text-primary text-right">{project.category.name || project.category}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-b border-white/5 pb-3">
                          <span className="text-text-muted">Statut</span>
                          <span className="text-primary-400 text-right font-medium capitalize">
                            {project.status === 'published' ? 'Publié' : project.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Sidebar */}
                    <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-6 text-center">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Intéressé par ce projet ?
                      </h3>
                      <p className="text-text-secondary text-sm mb-4">
                        Je peux réaliser une solution similaire pour vos besoins.
                      </p>
                      <Link to="/contact">
                        <Button variant="primary" className="w-full">
                          Me contacter
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation vers autres projets */}
        <section className="py-20 border-t border-white/5">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Continuer l'exploration
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/projects">
                <Button variant="ghost" className="border border-white/10">
                  ← Tous les projets
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="primary">
                  Démarrer un projet →
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectDetail;