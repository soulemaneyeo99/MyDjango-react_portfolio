import client from './client';

export const blogService = {
    getAll: () => client.get('/blog/posts/'),
    getById: (id) => client.get(`/blog/posts/${id}/`),
    getByCategory: (category) => client.get(`/blog/posts/?category=${category}`),
};
