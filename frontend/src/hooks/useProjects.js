import { useQuery } from '@tanstack/react-query';
import { projectService } from '../lib/api/projects';
import { FEATURED_PROJECTS } from '../utils/constants';

export const useProjects = (params = {}) => {
    return useQuery({
        queryKey: ['projects', params],
        queryFn: async () => {
            try {
                const response = await projectService.getAll();
                return response.results || response;
            } catch (error) {
                console.warn('API fetch failed, using fallback data', error);
                // Fallback filtering logic
                let filtered = [...FEATURED_PROJECTS];

                if (params.category) {
                    filtered = filtered.filter(p =>
                        p.category?.toLowerCase() === params.category.toLowerCase()
                    );
                }

                // Simple fallback search/filter
                return filtered;
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useFeaturedProjects = () => {
    return useQuery({
        queryKey: ['projects', 'featured'],
        queryFn: async () => {
            try {
                const response = await projectService.getFeatured();
                return response.results || response || [];
            } catch (error) {
                console.warn('API fetch failed, using fallback featured projects', error);
                return FEATURED_PROJECTS.filter(p => p.featured !== false);
            }
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useProject = (id) => {
    return useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            try {
                return await projectService.getById(id);
            } catch (error) {
                console.warn(`API fetch failed for project ${id}, using fallback`, error);
                const project = FEATURED_PROJECTS.find(p => p.id === id || p.slug === id || (typeof p.id === 'number' && p.id === parseInt(id)));
                if (project) return project;
                throw error;
            }
        },
        enabled: !!id,
    });
};
