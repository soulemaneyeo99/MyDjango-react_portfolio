// ========== src/services/portfolio.js (VERSION PRO) ==========
import api from './api';
import { FEATURED_PROJECTS } from '../utils/constants';

class PortfolioService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Méthode pour vérifier le cache
  _getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log(`[Portfolio Service] Cache hit for ${key}`);
      return cached.data;
    }
    return null;
  }

  // Méthode pour mettre en cache
  _setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Récupérer tous les projets avec fallback
  async getProjects(params = {}) {
    const cacheKey = `projects_${JSON.stringify(params)}`;
    const cached = this._getCachedData(cacheKey);
    if (cached) return cached;

    try {
      console.log('[Portfolio Service] Fetching projects from API...');
      const response = await api.get('/portfolio/projects/', { params });
      
      const projects = response.data.results || response.data || [];
      console.log(`[Portfolio Service] API returned ${projects.length} projects`);
      
      this._setCachedData(cacheKey, projects);
      return projects;
      
    } catch (error) {
      console.error('[Portfolio Service] API failed, using fallback data:', error);
      
      // Fallback vers les données locales
      const fallbackProjects = this._filterProjects(FEATURED_PROJECTS, params);
      console.log(`[Portfolio Service] Using ${fallbackProjects.length} fallback projects`);
      
      return fallbackProjects;
    }
  }

  // Filtrage local pour les données de fallback
  _filterProjects(projects, params) {
    let filtered = [...projects];
    
    if (params.category) {
      filtered = filtered.filter(p => 
        p.category?.toLowerCase() === params.category.toLowerCase()
      );
    }
    
    if (params.technology) {
      filtered = filtered.filter(p =>
        p.techStack?.some(tech => 
          tech.toLowerCase().includes(params.technology.toLowerCase())
        )
      );
    }
    
    if (params.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  }

  // Récupérer un projet par slug/ID
  async getProject(identifier) {
    const cacheKey = `project_${identifier}`;
    const cached = this._getCachedData(cacheKey);
    if (cached) return cached;

    try {
      console.log(`[Portfolio Service] Fetching project ${identifier} from API...`);
      const response = await api.get(`/portfolio/projects/${identifier}/`);
      
      const project = response.data;
      console.log(`[Portfolio Service] Found project: ${project.title}`);
      
      this._setCachedData(cacheKey, project);
      return project;
      
    } catch (error) {
      console.error(`[Portfolio Service] API failed for project ${identifier}:`, error);
      
      // Fallback vers les données locales
      const fallbackProject = FEATURED_PROJECTS.find(p => 
        p.id == identifier || 
        p.slug === identifier ||
        p.title.toLowerCase().replace(/\s+/g, '-') === identifier
      );
      
      if (fallbackProject) {
        console.log(`[Portfolio Service] Using fallback project: ${fallbackProject.title}`);
        return fallbackProject;
      }
      
      throw new Error(`Project ${identifier} not found`);
    }
  }

  // Récupérer les projets en vedette
  async getFeaturedProjects() {
    const cacheKey = 'featured_projects';
    const cached = this._getCachedData(cacheKey);
    if (cached) return cached;

    try {
      console.log('[Portfolio Service] Fetching featured projects from API...');
      const response = await api.get('/portfolio/projects/featured/');
      
      const projects = response.data || [];
      console.log(`[Portfolio Service] API returned ${projects.length} featured projects`);
      
      this._setCachedData(cacheKey, projects);
      return projects;
      
    } catch (error) {
      console.error('[Portfolio Service] Featured projects API failed:', error);
      
      // Fallback vers les projets marqués comme featured
      const featuredProjects = FEATURED_PROJECTS.filter(p => p.featured !== false);
      console.log(`[Portfolio Service] Using ${featuredProjects.length} fallback featured projects`);
      
      return featuredProjects;
    }
  }

  // Récupérer les catégories
  async getCategories() {
    const cacheKey = 'categories';
    const cached = this._getCachedData(cacheKey);
    if (cached) return cached;

    try {
      console.log('[Portfolio Service] Fetching categories from API...');
      const response = await api.get('/portfolio/categories/');
      
      const categories = response.data || [];
      this._setCachedData(cacheKey, categories);
      return categories;
      
    } catch (error) {
      console.error('[Portfolio Service] Categories API failed:', error);
      
      // Fallback vers les catégories extraites des projets
      const categories = [...new Set(FEATURED_PROJECTS.map(p => p.category))].map(name => ({
        id: name,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        project_count: FEATURED_PROJECTS.filter(p => p.category === name).length
      }));
      
      return categories;
    }
  }

  // Récupérer les technologies
  async getTechnologies() {
    const cacheKey = 'technologies';
    const cached = this._getCachedData(cacheKey);
    if (cached) return cached;

    try {
      console.log('[Portfolio Service] Fetching technologies from API...');
      const response = await api.get('/portfolio/technologies/');
      
      const technologies = response.data || [];
      this._setCachedData(cacheKey, technologies);
      return technologies;
      
    } catch (error) {
      console.error('[Portfolio Service] Technologies API failed:', error);
      
      // Fallback vers les technologies extraites des projets
      const allTechs = FEATURED_PROJECTS.flatMap(p => p.techStack || []);
      const uniqueTechs = [...new Set(allTechs)].map(name => ({
        id: name,
        name,
        color: '#3b82f6',
        project_count: FEATURED_PROJECTS.filter(p => 
          p.techStack?.includes(name)
        ).length
      }));
      
      return uniqueTechs;
    }
  }

  // Vider le cache
  clearCache() {
    this.cache.clear();
    console.log('[Portfolio Service] Cache cleared');
  }

  // Méthode pour forcer le refresh
  async refreshData() {
    this.clearCache();
    console.log('[Portfolio Service] Refreshing all data...');
    
    // Pré-charger les données principales
    await Promise.allSettled([
      this.getProjects(),
      this.getFeaturedProjects(),
      this.getCategories(),
      this.getTechnologies()
    ]);
    
    console.log('[Portfolio Service] Data refresh completed');
  }
}

// Instance singleton
const portfolioService = new PortfolioService();

export { portfolioService };
export default portfolioService;