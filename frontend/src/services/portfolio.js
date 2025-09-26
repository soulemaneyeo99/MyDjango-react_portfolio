// ========== src/services/portfolio.js (Corrigé) ==========
import api from './api';

export const portfolioService = {
  // Récupérer tous les projets
  getProjects: async (params = {}) => {
    try {
      const response = await api.get('/portfolio/projects/', { params });
      return response.data.results || response.data; // Support pagination
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Récupérer un projet par slug
  getProject: async (slug) => {
    try {
      const response = await api.get(`/portfolio/projects/${slug}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  // Récupérer les projets en vedette
  getFeaturedProjects: async () => {
    try {
      const response = await api.get('/portfolio/projects/featured/');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      // Fallback vers les données locales si l'API échoue
      return [];
    }
  },

  // Récupérer les catégories
  getCategories: async () => {
    try {
      const response = await api.get('/portfolio/categories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Récupérer les technologies
  getTechnologies: async () => {
    try {
      const response = await api.get('/portfolio/technologies/');
      return response.data;
    } catch (error) {
      console.error('Error fetching technologies:', error);
      return [];
    }
  },
};

export default portfolioService