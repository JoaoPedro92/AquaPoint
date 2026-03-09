import api from './api'

export const aquapointService = {
  getAll: () => api.get('/aquapoints'),
  getById: (id) => api.get(`/aquapoints/${id}`),
  create: (data) => api.post('/aquapoints', data),
  update: (id, data) => api.put(`/aquapoints/${id}`, data),
  delete: (id) => api.delete(`/aquapoints/${id}`),
}