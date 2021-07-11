import api from './api'

const pageApi = () => ({
  getPage: (slug) => api.get('/pages', { params: { slug: slug } }),
  getPages: () => api.get('/pages'),
  createPage: (data) => api.post('/pages', data),
  updatePage: (data) => api.put('/pages', data),
  deletePage: (id) => api.delete('/pages', { data: { _id: id } }),
})

export default pageApi
