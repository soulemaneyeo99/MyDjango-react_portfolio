// ========== src/services/api.js (VERSION PRO CORRIGÉE) ==========
import axios from 'axios';

// Configuration dynamique selon l'environnement
const getApiBaseUrl = () => {
  // En production
  if (window.location.hostname === 'portfolio-souleymaneyeo.vercel.app') {
    return 'https://mydjango-reactportfolio-production.up.railway.app/api';
  }
  
  // Variables d'environnement Vite
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Fallback développement local
  return 'http://localhost:8000/api';
};

const API_BASE_URL = getApiBaseUrl();

console.log('[API Config]', {
  baseURL: API_BASE_URL,
  env: import.meta.env.MODE,
  hostname: window.location.hostname
});

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000, // Timeout plus généreux pour Railway
  withCredentials: false, // Pas de cookies pour CORS
});

// Intercepteur pour debug et auth
api.interceptors.request.use(
  (config) => {
    // Log pour debug
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    
    // Token d'auth si disponible
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses et refresh token
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} - ${response.config.url}`);
    return response;
  },
  async (error) => {
    console.error('[API Response Error]', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message
    });

    const originalRequest = error.config;
    
    // Gestion 401 avec refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          console.log('[Auth] Token refreshed successfully');
          return api(originalRequest);
        } catch (refreshError) {
          console.error('[Auth] Refresh token failed', refreshError);
          // Nettoyage et redirection
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

// Export de l'URL pour les médias
export const getMediaBaseUrl = () => {
  if (window.location.hostname === 'portfolio-souleymaneyeo.vercel.app') {
    return 'https://mydjango-reactportfolio-production.up.railway.app';
  }
  
  if (import.meta.env.VITE_MEDIA_BASE_URL) {
    return import.meta.env.VITE_MEDIA_BASE_URL;
  }
  
  return 'http://localhost:8000';
};