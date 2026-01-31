import { useQuery } from '@tanstack/react-query';
import { blogService } from '../lib/api/blog';

// Placeholder for blog fallback data if needed
const FALLBACK_BLOG_POSTS = [];

export const useBlogPosts = (params = {}) => {
    return useQuery({
        queryKey: ['blog', params],
        queryFn: async () => {
            try {
                const response = await blogService.getAll();
                return response.results || response;
            } catch (error) {
                console.warn('Blog API fetch failed, return empty/fallback', error);
                return FALLBACK_BLOG_POSTS;
            }
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useBlogPost = (id) => {
    return useQuery({
        queryKey: ['blog-post', id],
        queryFn: async () => {
            return await blogService.getById(id);
        },
        enabled: !!id,
    });
};
