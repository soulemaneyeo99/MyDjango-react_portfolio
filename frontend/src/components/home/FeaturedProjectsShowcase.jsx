import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PROJECTS } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FeaturedProjectsShowcase = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver();
    const [hoveredProject, setHoveredProject] = useState(null);

    const featuredProjects = FEATURED_PROJECTS.filter(p => p.featured);

    return (
        <section ref={targetRef} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-16 transform transition-all duration-1000 ${hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Mes Créations
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Phares</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                        Découvrez mes projets les plus significatifs, de la conception à la réalisation
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                {/* Grille de projets avec effets 3D */}
                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {featuredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group relative transform transition-all duration-700 hover:scale-105 ${hasIntersected
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-20 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                                {/* Image avec effet parallax */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/600x400/3b82f6/ffffff?text=${encodeURIComponent(project.title)}`;
                                        }}
                                    />

                                    {/* Badge de statut flottant */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${project.status === 'En développement'
                                                ? 'bg-yellow-500 text-yellow-900'
                                                : project.status === 'En ligne'
                                                    ? 'bg-green-500 text-green-900'
                                                    : 'bg-blue-500 text-blue-900'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>

                                    {/* Overlay avec boutons d'action */}
                                    <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center space-x-4 z-20 transition-all duration-300 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        {project.demoUrl && project.demoUrl !== '#' && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                <span>Voir en live</span>
                                            </a>
                                        )}
                                        <Link
                                            to={`/projects/${project.id}`}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            <span>Détails</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Contenu du projet */}
                                <div className="p-8">
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Technologies avec animations */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack.slice(0, 4).map((tech, techIndex) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-800/50 transform transition-all duration-300 hover:scale-110"
                                                style={{
                                                    animationDelay: `${techIndex * 100}ms`
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.techStack.length > 4 && (
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                                                +{project.techStack.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Statistiques du projet */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>{project.view_count || 0} vues</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 10h6m-9 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                                </svg>
                                                <span>{project.category}</span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/projects/${project.id}`}
                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center space-x-1 group"
                                        >
                                            <span>Explorer</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA vers tous les projets */}
                <div className="text-center mt-16">
                    <Link
                        to="/projects"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                        <span>Découvrir tous mes projets</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjectsShowcase;
