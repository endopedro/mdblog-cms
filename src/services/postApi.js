import api from './api'

const postApi = () => ({
  getPost: (slug) => api.get('/posts', { params: { slug: slug } }),
  getPosts: () => api.get('/posts'),
  createPost: (data) => api.post('/posts', data),
  updatePost: (data) => api.put('/posts', data),
  deletePost: (id) => api.delete('/posts', { data: { _id: id } }),
})

export default postApi
