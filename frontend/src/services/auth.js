
// ========== frontend/src/services/auth.js ==========
import api from './api';

export const authService = {
  // Connexion
  login: async (credentials) => {
    const response = await api.post('/auth/login/', credentials);
    const { access, refresh } = response.data;
    
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    
    return response.data;
  },

  // Inscription
  register: async (userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },

  // Obtenir le profil utilisateur
  getProfile: async () => {
    const response = await api.get('/auth/profile/');
    return response.data;
  },

  // Mettre à jour le profil
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile/', profileData);
    return response.data;
  },
}