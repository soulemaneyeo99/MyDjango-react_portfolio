// ========== src/components/portfolio/ProjectCard.jsx (Ultra-Moderne) ==========
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Eye, Calendar, TrendingUp } from 'lucide-react';
import { getMediaUrl, formatDate } from '../../utils/helpers';

const ProjectCard = ({ project, index, variant = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      'En développement': 'bg-yellow-500/20 text-yellow-800 border-yellow-500/30',
      'En ligne': 'bg-green-500/20 text-green-800 border-green-500/30',
      'Complété': 'bg-blue-500/20 text-blue-800 border-blue-500/30',
      'Archivé': 'bg-gray-500/20 text-gray-800 border-gray-500/30'
    };
    return colors[status] || colors['Complété'];
  };

  if (variant === 'featured') {
    return (
      <div
        className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 hover:-rotate-1`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animationDelay: `${index * 150}ms`
        }}
      >
        {/* Image avec overlay gradient */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={getMediaUrl(project.featured_image || project.image)}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/600x400/3b82f6/ffffff?text=${encodeURIComponent(project.title)}`;
            }}
          />
          
          {/* Overlay gradient animé */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-60'
          }`} />

          {/* Badge de statut */}
          <div className="absolute top-4 right-4 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Badge featured */}
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                <span>⭐</span>
                <span>Featured</span>
              </span>
            </div>
          )}

          {/* Actions overlay */}
          <div className={`absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {project.demo_url && project.demo_url !== '#' && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
            
            <Link
              to={`/projects/${project.slug || project.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Eye size={16} />
              <span>Détails</span>
            </Link>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium border border-blue-200/50 dark:border-blue-800/50 transform transition-all duration-300 hover:scale-110"
              >
                {typeof tech === 'object' ? tech.name : tech}
              </span>
            ))}
            {project.techStack?.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Métadonnées */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye size={12} />
                <span>{project.view_count || 0} vues</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{formatDate(project.created_at)}</span>
              </div>
            </div>
            
            {project.source_url && project.source_url !== '#' && (
              <a
                href={project.source_url}
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

        {/* Effet de brillance au survol */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" />
      </div>
    );
  }

  // Version compacte par défaut
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-102">
      <div className="relative h-48 overflow-hidden">
        <img
          src={getMediaUrl(project.featured_image || project.image)}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/3b82f6/ffffff?text=${encodeURIComponent(project.title)}`;
          }}
        />
        
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack?.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs"
            >
              {typeof tech === 'object' ? tech.name : tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {project.demo_url && project.demo_url !== '#' && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <ExternalLink size={14} />
                <span>Demo</span>
              </a>
            )}
            {project.source_url && project.source_url !== '#' && (
              <a
                href={project.source_url}
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
            to={`/projects/${project.slug || project.id}`}
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

export default ProjectCard