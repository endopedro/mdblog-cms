import api from './api'

const postApi = () => ({
  createPost: (data) => api.post('/posts', data),
})

export default postApi
