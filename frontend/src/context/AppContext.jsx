// ========== src/context/AppContext.jsx (Gestion d'État Globale) ==========
import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

// État initial de l'application
const initialState = {
  // UI State
  theme: 'light',
  sidebarOpen: false,
  loading: false,
  
  // Données
  projects: [],
  blogPosts: [],
  
  // Notifications
  notifications: [],
  
  // Performance
  imageLoadingStates: {},
  apiCache: {},
  
  // Filters
  projectFilters: {
    category: '',
    technology: '',
    search: ''
  },
  
  // SEO & Analytics
  pageViews: {},
  lastVisited: null,
};

// Types d'actions
const ACTION_TYPES = {
  // UI Actions
  SET_THEME: 'SET_THEME',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_LOADING: 'SET_LOADING',
  
  // Data Actions
  SET_PROJECTS: 'SET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  SET_BLOG_POSTS: 'SET_BLOG_POSTS',
  
  // Notifications
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  
  // Performance
  SET_IMAGE_LOADING: 'SET_IMAGE_LOADING',
  CACHE_API_RESPONSE: 'CACHE_API_RESPONSE',
  
  // Filters
  SET_PROJECT_FILTERS: 'SET_PROJECT_FILTERS',
  RESET_PROJECT_FILTERS: 'RESET_PROJECT_FILTERS',
  
  // Analytics
  INCREMENT_PAGE_VIEW: 'INCREMENT_PAGE_VIEW',
  SET_LAST_VISITED: 'SET_LAST_VISITED',
};

// Reducer principal
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_THEME:
      return { ...state, theme: action.payload };
      
    case ACTION_TYPES.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
      
    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload };
      
    case ACTION_TYPES.SET_PROJECTS:
      return { ...state, projects: action.payload };
      
    case ACTION_TYPES.ADD_PROJECT:
      return { 
        ...state, 
        projects: [...state.projects, action.payload] 
      };
      
    case ACTION_TYPES.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? { ...project, ...action.payload } : project
        )
      };
      
    case ACTION_TYPES.SET_BLOG_POSTS:
      return { ...state, blogPosts: action.payload };
      
    case ACTION_TYPES.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...action.payload
        }]
      };
      
    case ACTION_TYPES.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
      
    case ACTION_TYPES.CLEAR_NOTIFICATIONS:
      return { ...state, notifications: [] };
      
    case ACTION_TYPES.SET_IMAGE_LOADING:
      return {
        ...state,
        imageLoadingStates: {
          ...state.imageLoadingStates,
          [action.payload.id]: action.payload.loading
        }
      };
      
    case ACTION_TYPES.CACHE_API_RESPONSE:
      return {
        ...state,
        apiCache: {
          ...state.apiCache,
          [action.payload.key]: {
            data: action.payload.data,
            timestamp: Date.now(),
            expiry: action.payload.expiry || 5 * 60 * 1000 // 5 minutes par défaut
          }
        }
      };
      
    case ACTION_TYPES.SET_PROJECT_FILTERS:
      return {
        ...state,
        projectFilters: { ...state.projectFilters, ...action.payload }
      };
      
    case ACTION_TYPES.RESET_PROJECT_FILTERS:
      return {
        ...state,
        projectFilters: { category: '', technology: '', search: '' }
      };
      
    case ACTION_TYPES.INCREMENT_PAGE_VIEW:
      return {
        ...state,
        pageViews: {
          ...state.pageViews,
          [action.payload]: (state.pageViews[action.payload] || 0) + 1
        }
      };
      
    case ACTION_TYPES.SET_LAST_VISITED:
      return { ...state, lastVisited: action.payload };
      
    default:
      return state;
  }
};

// Contexte
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions optimisées avec useCallback (déclarées séparément)
  const setTheme = useCallback((theme) => {
    dispatch({ type: ACTION_TYPES.SET_THEME, payload: theme });
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading });
  }, []);

  const setProjects = useCallback((projects) => {
    dispatch({ type: ACTION_TYPES.SET_PROJECTS, payload: projects });
  }, []);

  const addProject = useCallback((project) => {
    dispatch({ type: ACTION_TYPES.ADD_PROJECT, payload: project });
  }, []);

  const updateProject = useCallback((project) => {
    dispatch({ type: ACTION_TYPES.UPDATE_PROJECT, payload: project });
  }, []);

  const setBlogPosts = useCallback((posts) => {
    dispatch({ type: ACTION_TYPES.SET_BLOG_POSTS, payload: posts });
  }, []);

  const addNotification = useCallback((notification) => {
    const notificationId = notification.id || Date.now();
    dispatch({ 
      type: ACTION_TYPES.ADD_NOTIFICATION, 
      payload: { ...notification, id: notificationId }
    });
    
    // Auto-remove après 5 secondes si pas de durée spécifiée
    if (notification.autoRemove !== false) {
      setTimeout(() => {
        dispatch({ type: ACTION_TYPES.REMOVE_NOTIFICATION, payload: notificationId });
      }, notification.duration || 5000);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({ type: ACTION_TYPES.REMOVE_NOTIFICATION, payload: id });
  }, []);

  const clearNotifications = useCallback(() => {
    dispatch({ type: ACTION_TYPES.CLEAR_NOTIFICATIONS });
  }, []);

  const setImageLoading = useCallback((id, loading) => {
    dispatch({ type: ACTION_TYPES.SET_IMAGE_LOADING, payload: { id, loading } });
  }, []);

  const cacheApiResponse = useCallback((key, data, expiry) => {
    dispatch({ type: ACTION_TYPES.CACHE_API_RESPONSE, payload: { key, data, expiry } });
  }, []);

  const getCachedData = useCallback((key) => {
    const cached = state.apiCache[key];
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > cached.expiry;
    return isExpired ? null : cached.data;
  }, [state.apiCache]);

  const setProjectFilters = useCallback((filters) => {
    dispatch({ type: ACTION_TYPES.SET_PROJECT_FILTERS, payload: filters });
  }, []);

  const resetProjectFilters = useCallback(() => {
    dispatch({ type: ACTION_TYPES.RESET_PROJECT_FILTERS });
  }, []);

  const trackPageView = useCallback((page) => {
    dispatch({ type: ACTION_TYPES.INCREMENT_PAGE_VIEW, payload: page });
    dispatch({ type: ACTION_TYPES.SET_LAST_VISITED, payload: new Date().toISOString() });
  }, []);

  // Regroupement des actions avec un useMemo stable
  const actions = useMemo(() => ({
    // UI Actions
    setTheme,
    toggleSidebar,
    setLoading,
    
    // Data Actions
    setProjects,
    addProject,
    updateProject,
    setBlogPosts,
    
    // Notifications
    addNotification,
    removeNotification,
    clearNotifications,
    
    // Performance
    setImageLoading,
    cacheApiResponse,
    getCachedData,
    
    // Filters
    setProjectFilters,
    resetProjectFilters,
    
    // Analytics
    trackPageView,
  }), [
    setTheme, toggleSidebar, setLoading, setProjects, addProject, updateProject,
    setBlogPosts, addNotification, removeNotification, clearNotifications,
    setImageLoading, cacheApiResponse, getCachedData, setProjectFilters,
    resetProjectFilters, trackPageView
  ]);

  // Selectors mémorisés
  const selectors = useMemo(() => ({
    // Projects selectors
    getFilteredProjects: () => {
      const { category, technology, search } = state.projectFilters;
      return state.projects.filter(project => {
        const matchesCategory = !category || project.category?.slug === category || project.category === category;
        const matchesTechnology = !technology || project.techStack?.some(tech => 
          (typeof tech === 'string' ? tech : tech.name).toLowerCase().includes(technology.toLowerCase())
        );
        const matchesSearch = !search || 
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase());
        
        return matchesCategory && matchesTechnology && matchesSearch;
      });
    },
    
    getFeaturedProjects: () => state.projects.filter(project => project.featured),
    
    getProjectById: (id) => state.projects.find(project => project.id === id),
    
    // Blog selectors
    getFeaturedPosts: () => state.blogPosts.filter(post => post.featured),
    
    getPostById: (id) => state.blogPosts.find(post => post.id === id),
    
    // UI selectors
    getActiveNotifications: () => state.notifications.filter(n => !n.dismissed),
    
    isImageLoading: (id) => state.imageLoadingStates[id] || false,
    
    // Analytics selectors
    getTotalPageViews: () => Object.values(state.pageViews).reduce((sum, views) => sum + views, 0),
    
    getMostVisitedPages: () => {
      return Object.entries(state.pageViews)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
    }
  }), [
    state.projectFilters, 
    state.projects, 
    state.blogPosts, 
    state.notifications, 
    state.imageLoadingStates, 
    state.pageViews
  ]);

  // Valeur du contexte mémorisée
  const value = useMemo(() => ({
    state,
    actions,
    selectors
  }), [state, actions, selectors]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personnalisé
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Hooks spécialisés (restent identiques)
export const useNotifications = () => {
  const { state, actions } = useApp();
  return {
    notifications: state.notifications,
    addNotification: actions.addNotification,
    removeNotification: actions.removeNotification,
    clearNotifications: actions.clearNotifications
  };
};

export const useProjects = () => {
  const { state, actions, selectors } = useApp();
  return {
    projects: state.projects,
    filteredProjects: selectors.getFilteredProjects(),
    featuredProjects: selectors.getFeaturedProjects(),
    filters: state.projectFilters,
    setProjects: actions.setProjects,
    addProject: actions.addProject,
    updateProject: actions.updateProject,
    setFilters: actions.setProjectFilters,
    resetFilters: actions.resetProjectFilters,
    getProjectById: selectors.getProjectById
  };
};

export const useTheme = () => {
  const { state, actions } = useApp();
  return {
    theme: state.theme,
    setTheme: actions.setTheme,
    isDark: state.theme === 'dark'
  };
};

export const usePerformance = () => {
  const { actions, selectors } = useApp();
  return {
    setImageLoading: actions.setImageLoading,
    isImageLoading: selectors.isImageLoading,
    cacheApiResponse: actions.cacheApiResponse,
    getCachedData: actions.getCachedData
  };
};

export default AppContext;