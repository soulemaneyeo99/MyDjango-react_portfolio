// ========== src/components/portfolio/ProjectCard.jsx (VERSION UNIFIÉE) ==========
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Eye, Calendar } from 'lucide-react';
import { getMediaUrl } from '../../utils/media';
import { formatDate } from '../../utils/helpers';

const ProjectCard = ({ project, index = 0, variant = 'default' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Normalisation des données (compatibilité API + constantes locales)
  const normalizedProject = {
    id: project.id || project.slug || index,
    title: project.title,
    slug: project.slug || project.id || project.title?.toLowerCase().replace(/\s+/g, '-'),
    description: project.description,
    detailed_description: project.detailed_description || project.description,
    
    // Images
    featured_image: project.featured_image || project.image,
    
    // URLs
    demo_url: project.demo_url || project.demoUrl || '',
    source_url: project.source_url || project.sourceUrl || '',
    
    // Métadonnées
    status: project.status || 'Complété',
    featured: project.featured !== undefined ? project.featured : false,
    view_count: project.view_count || 0,
    created_at: project.created_at || new Date().toISOString(),
    
    // Technologies (normalisation important)
    technologies: project.technologies || project.techStack?.map(tech => 
      typeof tech === 'string' ? { name: tech, color: '#3b82f6' } : tech
    ) || [],
    
    // Catégorie
    category: project.category?.name || project.category || 'Web App',
  };

  const getStatusColor = (status) => {
    const colors = {
      'En développement': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
      'En ligne': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
      'Complété': 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
      'Archivé': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    };
    return colors[status] || colors['Complété'];
  };

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const imageUrl = imageError 
    ? `https://via.placeholder.com/600x400/3b82f6/ffffff?text=${encodeURIComponent(normalizedProject.title)}`
    : getMediaUrl(normalizedProject.featured_image);

  if (variant === 'featured') {
    return (
      <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={normalizedProject.title}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${getStatusColor(normalizedProject.status)}`}>
              {normalizedProject.status}
            </span>
          </div>
          
          {/* Featured badge */}
          {normalizedProject.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                ⭐ Featured
              </span>
            </div>
          )}
          
          {/* Action buttons overlay */}
          <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            {normalizedProject.demo_url && normalizedProject.demo_url !== '#' && (
              <a
                href={normalizedProject.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                <span>Demo</span>
              </a>
            )}
            
            <Link
              to={`/projects/${normalizedProject.slug}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Eye size={16} />
              <span>Détails</span>
            </Link>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {normalizedProject.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {normalizedProject.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {normalizedProject.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium border border-blue-200/50 dark:border-blue-800/50"
              >
                {tech.name || tech}
              </span>
            ))}
            {normalizedProject.technologies.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                +{normalizedProject.technologies.length - 4}
              </span>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye size={12} />
                <span>{normalizedProject.view_count} vues</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{formatDate(normalizedProject.created_at)}</span>
              </div>
            </div>
            
            {normalizedProject.source_url && normalizedProject.source_url !== '#' && (
              <a
                href={normalizedProject.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Version compacte par défaut
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-102">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={normalizedProject.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(normalizedProject.status)}`}>
            {normalizedProject.status}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
          {normalizedProject.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {normalizedProject.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {normalizedProject.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs"
            >
              {tech.name || tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {normalizedProject.demo_url && normalizedProject.demo_url !== '#' && (
              <a
                href={normalizedProject.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <ExternalLink size={14} />
                <span>Demo</span>
              </a>
            )}
            {normalizedProject.source_url && normalizedProject.source_url !== '#' && (
              <a
                href={normalizedProject.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center space-x-1"
              >
                <Github size={14} />
                <span>Code</span>
              </a>
            )}
          </div>
          
          <Link
            to={`/projects/${normalizedProject.slug}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
          >
            <span>Voir plus</span>
            <Eye size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;