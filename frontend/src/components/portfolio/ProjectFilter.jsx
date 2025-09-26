// ========== src/components/portfolio/ProjectFilter.jsx ==========
import React from 'react';
import { Filter, Search } from 'lucide-react';

const ProjectFilter = ({ 
  categories = [], 
  technologies = [], 
  selectedCategory, 
  selectedTechnology, 
  searchTerm,
  onCategoryChange, 
  onTechnologyChange, 
  onSearchChange,
  onReset 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filtrer les projets
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Catégories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Catégorie
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id || category.name} value={category.slug || category.name}>
                {category.name} {category.project_count && `(${category.project_count})`}
              </option>
            ))}
          </select>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Technologie
          </label>
          <select
            value={selectedTechnology}
            onChange={(e) => onTechnologyChange(e.target.value)}
            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Toutes les technologies</option>
            {technologies.map((tech) => (
              <option key={tech.id || tech.name} value={tech.name}>
                {tech.name} {tech.project_count && `(${tech.project_count})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bouton Reset */}
      {(selectedCategory || selectedTechnology || searchTerm) && (
        <div className="mt-4 text-center">
          <button
            onClick={onReset}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};
   
export default ProjectFilter