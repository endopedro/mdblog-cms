import api from './api'

const imageApi = () => ({
  getImages: (page) => api.get('images', { params: { page: page } }),
  getImage: (id) => api.get('images', { params: { _id: id } }),
  updateAvatar: (data) => api.put('images', { avatar: true, ...data }),
  updateLogo: (data) => api.put('images', { logo: true, ...data }),
  createImage: (data) => api.post('images', data),
  deleteImage: (id) => api.delete('images', { data: { public_id: id } }),
})

export default imageApi
