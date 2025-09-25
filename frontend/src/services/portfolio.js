
// ========== frontend/src/services/portfolio.js ==========
import api from './api';

export const portfolioService = {
  // Récupérer tous les projets
  getProjects: async (params = {}) => {
    const response = await api.get('/portfolio/projects/', { params });
    return response.data;
  },

  // Récupérer un projet par slug
  getProject: async (slug) => {
    const response = await api.get(`/portfolio/projects/${slug}/`);
    return response.data;
  },

  // Récupérer les projets en vedette
  getFeaturedProjects: async () => {
    const response = await api.get('/portfolio/projects/featured/');
    return response.data;
  },

  // Récupérer les catégories
  getCategories: async () => {
    const response = await api.get('/portfolio/categories/');
    return response.data;
  },

  // Récupérer les technologies
  getTechnologies: async () => {
    const response = await api.get('/portfolio/technologies/');
    return response.data;
  },
};
