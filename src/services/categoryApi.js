import api from './api'

const categoryApi = () => ({
  getCategory: (id) => api.get('/categories', { params: { id: id } }),
  getCategories: () => api.get('/categories'),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (data) => api.put('/categories', data),
  deleteCategory: (id) => api.delete('/categories', { data: { id: id } }),
})

export default categoryApi
