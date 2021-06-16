import api from './api'

const postApi = () => ({
  getPost: (slug) => api.get('/posts', { params: { slug: slug } }),
  createPost: (data) => api.post('/posts', data),
})

export default postApi
