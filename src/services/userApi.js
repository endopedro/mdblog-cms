import api from './api'

const userApi = () => ({
  createUser: (data) => api.post('/auth/signup', data),
  forgotPassword: (data) => api.post('/auth/password', data),
  verifyToken: (token) =>
    api.get('/auth/password', { params: { token: token } }),
  resetPassword: (data) => api.put('/auth/password', data),
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get('/users', { params: { _id: id } }),
  registerUser: (data) => api.post('/users', data),
  updateUser: (data) => api.put('/users', data),
  deleteUser: (id) => api.delete('/users', { data: { _id: id } }),
})

export default userApi
