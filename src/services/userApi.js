import api from './api'

const userApi = () => ({
  createUser: (data) => api.post('/auth/signup', data),
  forgotPassword: (data) => api.post('/auth/password', data),
  verifyToken: (token) =>
    api.get('/auth/password', { params: { token: token } }),
  resetPassword: (data) => api.put('/auth/password', data),
  getUsers: () => api.get('/users'),
  getUser: (email) => api.get('/users', { params: { email: email } }),
  registerUser: (data) => api.post('/users', data),
  updateUser: (data) => api.put('/users', data),
})

export default userApi
