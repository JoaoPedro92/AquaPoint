import api from './api'

export const favoritesService = {
  getAll: () => api.get('/favorites'),
  getById: (id) => api.get(`/favorites/${id}`),
  create: (data) => api.post('/favorites', data),
  deleteByUserAndPointId: (user_id, point_id) => api.delete('/favorites', user_id, point_id)
}