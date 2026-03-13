import api from './api'

export const reviewsService = {
  getAll: () => api.get('/reviews'),
  getById: (id) => api.get(`/reviews/${id}`),
  getByPointId: (id) => api.get(`/reviews/aquapoint/${id}`),
  create: (data) => api.post('/reviews', data),
}