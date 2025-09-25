// ========== src/components/portfolio/ProjectCard.jsx ==========
import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { getMediaUrl } from '../../utils/helpers'

const ProjectCard = ({ project, index }) => {
  return (
    <div className="card hover-lift group h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={getMediaUrl(project.featured_image) || project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x200/3b82f6/white?text=${encodeURIComponent(project.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        
        {project.status && (
          <div className="absolute top-4 left-4">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              project.status === 'En ligne' 
                ? 'bg-green-100 text-green-800' 
                : project.status === 'En cours'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {project.status}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-1">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={typeof tech === 'object' ? tech.id : tech}
              className="badge badge-primary"
            >
              {typeof tech === 'object' ? tech.name : tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="badge badge-secondary">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3 mt-auto">
          {project.demo_url && project.demo_url !== '#' && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ExternalLink className="mr-1" size={16} />
              Démo
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ExternalLink className="mr-1" size={16} />
              Voir en ligne
            </a>
          )}
          {project.source_url && project.source_url !== '#' && (
            <a
              href={project.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-700 font-medium"
            >
              <Github className="mr-1" size={16} />
              Code
            </a>
          )}
          {project.slug && (
            <Link
              to={`/projects/${project.slug}`}
              className="flex items-center text-gray-600 hover:text-gray-700 font-medium ml-auto"
            >
              <Eye className="mr-1" size={16} />
              Détails
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard