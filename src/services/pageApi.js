import api from './api'

const pageApi = () => ({
  getPage: (slug) => api.get('/pages', { params: { slug: slug } }),
  getPages: () => api.get('/pages'),
  createPage: (data) => api.post('/pages', data),
  updatePage: (data) => api.put('/pages', data),
  deletePage: (slug) => api.delete('/pages', { data: { slug: slug } }),
})

export default pageApi
