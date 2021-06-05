import api from './api'

const userApi = () => ({
  createUser: (data) => api.post('/auth/signup', data),
})

export default userApi
