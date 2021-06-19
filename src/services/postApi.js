import api from './api'

const postApi = () => ({
  getPost: (slug) => api.get('/posts', { params: { slug: slug } }),
  getPosts: () => api.get('/posts'),
  createPost: (data) => api.post('/posts', data),
})

export default postApi
