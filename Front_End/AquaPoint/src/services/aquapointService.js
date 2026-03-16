import api from './api'

export const aquapointService = {
  getAll: () => api.get('/aquapoints'),
  getById: (id) => api.get(`/aquapoints/${id}`),
  getPendingPoints: () => api.get(`/aquapoints/pending-points`),
  getPendingCount: () => api.get(`/aquapoints/pending-points-count`),
  create: (data) => api.post('/aquapoints', data),
  update: (id, data) => api.put(`/aquapoints/${id}`, data),
  delete: (id) => api.delete(`/aquapoints/${id}`),
}