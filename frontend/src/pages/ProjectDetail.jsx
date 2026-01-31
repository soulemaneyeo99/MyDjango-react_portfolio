// ========== frontend/src/pages/ProjectDetail.jsx ==========
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Loading from '../components/common/Loading';
import { portfolioService } from '../services/portfolio';
import { formatDate, getImageUrl } from '../utils/helpers';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await portfolioService.getProject(slug);
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.response?.status === 404 ? 'Projet non trouvé' : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="large" text="Chargement du projet..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Ce projet n'existe pas ou a été supprimé.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              ← Retour
            </button>
            <Link
              to="/projects"
              className="bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-colors"
            >
              Voir tous les projets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!project) return null;

  const allImages = [
    { image: project.featured_image, caption: 'Image principale' },
    ...(project.images || [])
  ];

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        image={getImageUrl(project.featured_image)}
        keywords={[project.title, ...(project.technologies?.map(t => t.name) || [])]}
      />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm mb-8">
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Accueil
                </Link>
                <span className="text-gray-400">/</span>
                <Link to="/projects" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Projets
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 dark:text-white font-medium">{project.title}</span>
              </nav>

              <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  {project.description}
                </p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                  {project.category && (
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full">
                      {project.category.name}
                    </span>
                  )}
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full">
                    {formatDate(project.created_at)}
                  </span>
                  {project.view_count > 0 && (
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full">
                      {project.view_count} vues
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  {project.demo_url && project.demo_url !== '#' && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-4 rounded-full hover:from-primary-600 hover:to-primary-800 transition-all duration-300 font-semibold shadow-colored transform hover:scale-105 inline-flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Voir la démo</span>
                    </a>
                  )}
                  {project.source_url && project.source_url !== '#' && (
                    <a
                      href={project.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 transition-all duration-300 font-semibold inline-flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>Voir le code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Image Gallery */}
                  {allImages.length > 0 && (
                    <div className="mb-12">
                      <div className="relative mb-6">
                        <img
                          src={getImageUrl(allImages[currentImageIndex]?.image)}
                          alt={allImages[currentImageIndex]?.caption || project.title}
                          className="w-full h-96 object-cover rounded-xl shadow-large"
                        />
                        {allImages.length > 1 && (
                          <>
                            <button
                              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % allImages.length)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                      
                      {allImages.length > 1 && (
                        <div className="flex space-x-2 overflow-x-auto">
                          {allImages.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                index === currentImageIndex
                                  ? 'border-primary-500'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
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
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Description détaillée
                      </h2>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: project.detailed_description.replace(/\n/g, '<br>') }} />
                      </div>
                    </div>
                  )}

                  {/* Features/Fonctionnalités */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Fonctionnalités principales
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Interface utilisateur moderne et responsive',
                        'Architecture backend robuste et scalable',
                        'Authentification et sécurité',
                        'Gestion des données optimisée',
                        'API REST complète',
                        'Tests automatisés',
                        'Documentation technique',
                        'Déploiement automatisé'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    {/* Technologies utilisées */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Technologies utilisées
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                            style={{
                              backgroundColor: `${tech.color}20`,
                              color: tech.color,
                              border: `1px solid ${tech.color}40`
                            }}
                          >
                            {tech.icon && (
                              <img src={getImageUrl(tech.icon)} alt={tech.name} className="w-4 h-4" />
                            )}
                            <span>{tech.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Informations du projet */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Informations du projet
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de création</dt>
                          <dd className="text-gray-900 dark:text-white">{formatDate(project.created_at)}</dd>
                        </div>
                        {project.category && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Catégorie</dt>
                            <dd className="text-gray-900 dark:text-white">{project.category.name}</dd>
                          </div>
                        )}
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Statut</dt>
                          <dd className="text-gray-900 dark:text-white capitalize">{project.status === 'published' ? 'Publié' : project.status}</dd>
                        </div>
                        {project.view_count > 0 && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Vues</dt>
                            <dd className="text-gray-900 dark:text-white">{project.view_count}</dd>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Liens utiles */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Liens du projet
                      </h3>
                      <div className="space-y-3">
                        {project.demo_url && project.demo_url !== '#' && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Voir la démo en direct</span>
                          </a>
                        )}
                        {project.source_url && project.source_url !== '#' && (
                          <a
                            href={project.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span>Code source sur GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-purple-900 rounded-xl p-6 text-center">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Projet similaire en tête ?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Discutons ensemble de vos besoins et créons quelque chose d'exceptionnel !
                      </p>
                      <Link
                        to="/contact"
                        className="bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-colors inline-block"
                      >
                        💬 Me contacter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation vers autres projets */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Découvrir d'autres projets
              </h2>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/projects"
                  className="bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-colors"
                >
                  ← Tous les projets
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
                >
                  Démarrer un projet →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectDetail;