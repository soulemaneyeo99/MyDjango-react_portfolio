// ========== src/utils/media.js (VERSION FINALE CORRIGÉE) ==========

/**
 * Configuration centralisée pour les médias
 */

import React from 'react';

const MEDIA_CONFIG = {
  // Base URLs selon l'environnement
  production: {
    static: 'https://portfolio-souleymaneyeo.vercel.app',
    api: 'https://mydjango-reactportfolio-production.up.railway.app'
  },
  development: {
    static: '',
    api: 'http://localhost:8000'
  }
};

/**
 * Détermine l'environnement actuel
 */
const getEnvironment = () => {
  if (typeof window === 'undefined') return 'development';
  
  const hostname = window.location.hostname;
  
  if (hostname === 'portfolio-souleymaneyeo.vercel.app') {
    return 'production';
  }
  
  return 'development';
};

/**
 * Obtient la base URL pour les assets statiques
 */
const getStaticBaseUrl = () => {
  const env = getEnvironment();
  return MEDIA_CONFIG[env].static;
};

/**
 * Obtient la base URL pour l'API
 */
const getApiBaseUrl = () => {
  const env = getEnvironment();
  return MEDIA_CONFIG[env].api;
};

/**
 * Fonction principale pour gérer toutes les URLs de médias
 * @param {string} mediaPath - Chemin du média
 * @param {Object} options - Options
 * @returns {string} URL complète du média
 */
export const getMediaUrl = (mediaPath, options = {}) => {
  console.log('[getMediaUrl] Input:', mediaPath, 'Options:', options);

  // Cas 1: Pas de chemin fourni
  if (!mediaPath || mediaPath === '' || mediaPath === null || mediaPath === undefined) {
    const fallback = options.fallback || createLocalPlaceholder(options.title || 'Image');
    console.log('[getMediaUrl] No path, using fallback:', fallback);
    return fallback;
  }

  // Cas 2: URL complète (http/https/data)
  if (typeof mediaPath === 'string' && (
    mediaPath.startsWith('http://') || 
    mediaPath.startsWith('https://') ||
    mediaPath.startsWith('data:')
  )) {
    console.log('[getMediaUrl] Complete URL:', mediaPath);
    return mediaPath;
  }

  // Cas 3: Chemin local (/images/...)
  if (typeof mediaPath === 'string' && mediaPath.startsWith('/images/')) {
    const staticBaseUrl = getStaticBaseUrl();
    const fullUrl = staticBaseUrl + mediaPath;
    console.log('[getMediaUrl] Local static path:', fullUrl);
    return fullUrl;
  }

  // Cas 4: Chemin relatif (images/...)
  if (typeof mediaPath === 'string' && mediaPath.startsWith('images/')) {
    const staticBaseUrl = getStaticBaseUrl();
    const fullUrl = staticBaseUrl + '/' + mediaPath;
    console.log('[getMediaUrl] Relative static path:', fullUrl);
    return fullUrl;
  }

  // Cas 5: Chemin d'API Django (media/...)
  if (typeof mediaPath === 'string' && (
    mediaPath.startsWith('media/') || 
    mediaPath.startsWith('/media/') ||
    mediaPath.startsWith('projects/') ||
    mediaPath.startsWith('blog/')
  )) {
    const apiBaseUrl = getApiBaseUrl();
    const cleanPath = mediaPath.startsWith('/') ? mediaPath : `/${mediaPath}`;
    const fullUrl = `${apiBaseUrl}${cleanPath}`;
    console.log('[getMediaUrl] API media path:', fullUrl);
    return fullUrl;
  }

  // Cas 6: Fichier direct (nom.jpg)
  if (typeof mediaPath === 'string' && mediaPath.includes('.')) {
    const staticBaseUrl = getStaticBaseUrl();
    const fullUrl = `${staticBaseUrl}/images/${mediaPath}`;
    console.log('[getMediaUrl] Direct file:', fullUrl);
    return fullUrl;
  }

  // Cas 7: Fallback avec placeholder local
  const fallback = options.fallback || createLocalPlaceholder(options.title || mediaPath || 'Image');
  console.log('[getMediaUrl] Using fallback for unrecognized path:', fallback);
  return fallback;
};

/**
 * Crée un placeholder local au lieu d'utiliser via.placeholder.com
 */
const createLocalPlaceholder = (text = 'Image', width = 600, height = 400) => {
  // Créer un SVG placeholder en data URL
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#3b82f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dy=".3em">
        ${encodeURIComponent(text)}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Fonctions spécialisées
 */
export const getProjectImageUrl = (imagePath, title = 'Projet') => {
  return getMediaUrl(imagePath, {
    fallback: createLocalPlaceholder(title, 600, 400),
    title
  });
};

export const getAvatarUrl = (imagePath, name = 'User') => {
  return getMediaUrl(imagePath, {
    fallback: createLocalPlaceholder(name, 200, 200),
    title: name
  });
};

export const getBlogImageUrl = (imagePath, title = 'Article') => {
  return getMediaUrl(imagePath, {
    fallback: createLocalPlaceholder(title, 800, 400),
    title
  });
};

/**
 * Hook React pour tester et charger les images
 */
export const useImageWithFallback = (imagePath, options = {}) => {
  const [finalUrl, setFinalUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const primaryUrl = getMediaUrl(imagePath, options);
    
    // Test si l'image se charge
    const img = new Image();
    
    img.onload = () => {
      setFinalUrl(primaryUrl);
      setIsLoading(false);
      setHasError(false);
    };
    
    img.onerror = () => {
      console.warn('[useImageWithFallback] Image failed to load:', primaryUrl);
      const fallbackUrl = options.fallback || createLocalPlaceholder(options.title || 'Image');
      setFinalUrl(fallbackUrl);
      setIsLoading(false);
      setHasError(true);
    };
    
    img.src = primaryUrl;
    
    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imagePath, JSON.stringify(options)]);

  return { url: finalUrl, isLoading, hasError };
};

/**
 * Utilitaire pour déboguer les chemins d'images
 */
export const debugImagePath = (imagePath) => {
  const result = {
    input: imagePath,
    environment: getEnvironment(),
    staticBaseUrl: getStaticBaseUrl(),
    apiBaseUrl: getApiBaseUrl(),
    finalUrl: getMediaUrl(imagePath),
    type: 'unknown'
  };

  if (!imagePath) {
    result.type = 'empty';
  } else if (imagePath.startsWith('http')) {
    result.type = 'absolute_url';
  } else if (imagePath.startsWith('/images/')) {
    result.type = 'local_absolute';
  } else if (imagePath.startsWith('images/')) {
    result.type = 'local_relative';
  } else if (imagePath.includes('media/')) {
    result.type = 'api_media';
  } else if (imagePath.includes('.')) {
    result.type = 'direct_file';
  }

  console.table(result);
  return result;
};

// Export par défaut
export default {
  getMediaUrl,
  getProjectImageUrl,
  getAvatarUrl,
  getBlogImageUrl,
  createLocalPlaceholder,
  debugImagePath,
  useImageWithFallback
};