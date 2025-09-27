// ========== src/utils/media.js (NOUVELLE VERSION UNIFIÉE) ==========
import { getMediaBaseUrl } from '../services/api';

/**
 * Fonction principale pour gérer toutes les URLs de médias
 * @param {string} mediaPath - Chemin relatif ou absolu du média
 * @param {Object} options - Options de configuration
 * @returns {string} URL complète du média
 */
export const getMediaUrl = (mediaPath, options = {}) => {
  const {
    fallback = null,
    size = null, // 'thumbnail', 'medium', 'large'
    quality = 85,
    format = null // 'webp', 'jpg', 'png'
  } = options;

  console.log('[getMediaUrl] Input:', { mediaPath, options });

  // Cas 1: URL déjà complète (http/https)
  if (typeof mediaPath === 'string' && (
    mediaPath.startsWith('http://') || 
    mediaPath.startsWith('https://') ||
    mediaPath.startsWith('data:')
  )) {
    console.log('[getMediaUrl] Complete URL detected:', mediaPath);
    return mediaPath;
  }

  // Cas 2: URL relative simple (/images/...)
  if (typeof mediaPath === 'string' && mediaPath.startsWith('/')) {
    console.log('[getMediaUrl] Relative URL detected:', mediaPath);
    return mediaPath;
  }

  // Cas 3: Chemin d'API Django (media/...)
  if (typeof mediaPath === 'string' && mediaPath) {
    const baseUrl = getMediaBaseUrl();
    const cleanPath = mediaPath.startsWith('/') ? mediaPath : `/${mediaPath}`;
    const fullUrl = `${baseUrl}${cleanPath}`;
    
    console.log('[getMediaUrl] API media:', {
      baseUrl,
      cleanPath,
      fullUrl
    });
    
    return fullUrl;
  }

  // Cas 4: Fallback ou placeholder
  if (fallback) {
    console.log('[getMediaUrl] Using fallback:', fallback);
    return fallback;
  }

  // Cas 5: Placeholder générique
  const placeholder = 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Image';
  console.log('[getMediaUrl] Using placeholder:', placeholder);
  return placeholder;
};

/**
 * Fonction spécialisée pour les images de projet
 */
export const getProjectImageUrl = (imagePath, options = {}) => {
  return getMediaUrl(imagePath, {
    fallback: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Projet',
    ...options
  });
};

/**
 * Fonction spécialisée pour les avatars
 */
export const getAvatarUrl = (imagePath, options = {}) => {
  return getMediaUrl(imagePath, {
    fallback: 'https://ui-avatars.com/api/?name=User&size=200&background=3b82f6&color=white',
    ...options
  });
};

/**
 * Fonction spécialisée pour les images de blog
 */
export const getBlogImageUrl = (imagePath, options = {}) => {
  return getMediaUrl(imagePath, {
    fallback: 'https://via.placeholder.com/800x400/3b82f6/ffffff?text=Article',
    ...options
  });
};

/**
 * Fonction pour valider si une image existe
 */
export const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * Hook React pour la gestion d'état des images
 */
export const useImageLoader = (imagePath, options = {}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [finalUrl, setFinalUrl] = React.useState('');

  React.useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      setIsError(false);
      
      const url = getMediaUrl(imagePath, options);
      const exists = await checkImageExists(url);
      
      if (exists) {
        setFinalUrl(url);
      } else {
        setIsError(true);
        setFinalUrl(options.fallback || getMediaUrl(null, options));
      }
      
      setIsLoading(false);
    };

    if (imagePath) {
      loadImage();
    } else {
      setFinalUrl(options.fallback || getMediaUrl(null, options));
      setIsLoading(false);
    }
  }, [imagePath, JSON.stringify(options)]);

  return { isLoading, isError, url: finalUrl };
};

// Export par défaut
export default {
  getMediaUrl,
  getProjectImageUrl,
  getAvatarUrl,
  getBlogImageUrl,
  checkImageExists,
  useImageLoader
};