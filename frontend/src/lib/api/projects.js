import client from './client';

export const projectService = {
    getAll: () => client.get('/projects/'),
    getById: (id) => client.get(`/projects/${id}/`),
    getFeatured: () => client.get('/projects/?featured=true'),
};
