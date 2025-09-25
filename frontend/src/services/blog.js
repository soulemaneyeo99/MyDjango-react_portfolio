
// ========== frontend/src/services/blog.js ==========
import api from './api';

export const blogService = {
  // Récupérer tous les articles
  getPosts: async (params = {}) => {
    const response = await api.get('/blog/posts/', { params });
    return response.data;
  },

  // Récupérer un article par slug
  getPost: async (slug) => {
    const response = await api.get(`/blog/posts/${slug}/`);
    return response.data;
  },

  // Récupérer les articles en vedette
  getFeaturedPosts: async () => {
    const response = await api.get('/blog/featured/');
    return response.data;
  },

  // Récupérer les catégories de blog
  getBlogCategories: async () => {
    const response = await api.get('/blog/categories/');
    return response.data;
  },

  // Récupérer les tags
  getTags: async () => {
    const response = await api.get('/blog/tags/');
    return response.data;
  },

  // Ajouter un commentaire
  addComment: async (slug, commentData) => {
    const response = await api.post(`/blog/posts/${slug}/comments/`, commentData);
    return response.data;
  },
};
