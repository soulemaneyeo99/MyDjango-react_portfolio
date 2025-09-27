// ========== src/utils/helpers.js (Complet et Corrigé) ==========

// Utilitaires pour le formatage des dates
export const formatDate = (dateString, locale = 'fr-FR') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRelativeDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'année', seconds: 31536000 },
    { label: 'mois', seconds: 2592000 },
    { label: 'jour', seconds: 86400 },
    { label: 'heure', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `Il y a ${count} ${interval.label}${count > 1 ? 's' : ''}`;
    }
  }

  return 'À l\'instant';
};

// frontend/src/utils/helpers.js

export const getMediaUrl = (imagePath) => {
  // Debug en console pour voir ce qui est passé
  console.log('getMediaUrl called with:', imagePath);
  
  if (!imagePath) {
    console.log('No image path, using placeholder');
    return '/images/placeholder.jpg';
  }
  
  if (imagePath.startsWith('http')) {
    console.log('Full URL, returning as is');
    return imagePath;
  }
  
  if (imagePath.startsWith('/images/')) {
    console.log('Local image path, returning as is');
    return imagePath;
  }
  
  if (imagePath.startsWith('/')) {
    console.log('Root path, returning as is');
    return imagePath;
  }

  // Si rien ne correspond → retourne quand même un placeholder
  console.log('Unknown path, fallback to placeholder');
  return '/images/placeholder.jpg';
};

// ✅ Wrapper pour compatibilité avec l’ancien code
export const getImageUrl = (imagePath) => {
  return getMediaUrl(imagePath);
};

// Mapping des images locales
export const getLocalImage = (imageName) => {
  const imageMap = {
    'profile': '/images/moi2.jpg',
    'hero-bg': '/images/hero-bg.jpg',
    'opportuci': '/images/OpotuCI.png',
    'ecommerce-django': '/images/portfolio/e-comerceclienDjango.jpg',
    'ecommerce-fastapi': '/images/Fastapiecommerce.jpeg',
    'react-todo': '/images/react_todo.jpeg',
    'fashion-store': '/images/fashionStoreashborard.jpeg',
    'django-logo': '/images/portfolio/Djagologo.jpg',
  };
  
  return imageMap[imageName] || '/images/placeholder.jpg';
};

// Utilitaires pour le SEO
export const generateMetaTags = (title, description, image, url) => {
  const siteName = import.meta.env.VITE_SITE_NAME || 'Souleymane Yeo';
  const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173';
  
  return {
    title: `${title} | ${siteName}`,
    description,
    'og:title': title,
    'og:description': description,
    'og:image': image || `${baseUrl}/images/og-default.jpg`,
    'og:url': url || baseUrl,
    'og:type': 'website',
    'og:site_name': siteName,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image || `${baseUrl}/images/og-default.jpg`,
  };
};

// Utilitaires pour la validation
export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().length <= maxLength;
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^(\+225|00225|225)?\s?[0-9]{8,10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Utilitaires pour l'animation et le scroll
export const scrollToSection = (sectionId, offset = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = (behavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    behavior
  });
};

// Utilitaires pour le localStorage
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

// Utilitaires pour les couleurs
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const getContrastColor = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
};

// Utilitaires pour le texte
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatNumber = (number) => {
  if (!number) return '0';
  return new Intl.NumberFormat('fr-FR').format(number);
};

// Utilitaire pour le debounce
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Utilitaire pour le throttle
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Utilitaires pour les objets et arrays
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, {});
};

export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (direction === 'desc') {
      return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
    }
    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
  });
};

export const filterBy = (array, filters) => {
  return array.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Skip empty filters
      return item[key] === value || item[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
    });
  });
};

// Utilitaires pour les URL et paramètres
export const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

export const updateUrlParams = (params) => {
  const url = new URL(window.location);
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  window.history.replaceState({}, '', url);
};

// Utilitaires pour la détection de l'appareil
export const isMobile = () => {
  return window.innerWidth <= 768;
};

export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = () => {
  return window.innerWidth > 1024;
};

// Utilitaire pour la copie dans le presse-papiers
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback pour les navigateurs plus anciens
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};



// Export default pour la compatibilité
export default {
  formatDate,
  formatRelativeDate,
  getMediaUrl,
  getImageUrl,
  getLocalImage,
  generateMetaTags,
  validateEmail,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validatePhone,
  scrollToSection,
  scrollToTop,
  storage,
  hexToRgb,
  getContrastColor,
  truncateText,
  slugify,
  capitalize,
  formatNumber,
  debounce,
  throttle,
  groupBy,
  sortBy,
  filterBy,
  getUrlParams,
  updateUrlParams,
  isMobile,
  isTablet,
  isDesktop,
  copyToClipboard
};