import api from "./api"

export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  getProfilePicture: (id) => api.get(`/users/${id}/profile-picture`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  changeIsAdmin: (id, data) => api.put(`/users/${id}/change-isadmin`, data),
  delete: (id) => api.delete(`/users/${id}`),
}