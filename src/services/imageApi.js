import api from './api'

const imageApi = () => ({
  getImages: (page) => api.get('images', { params: { page: page } }),
  createImage: (data) => api.post('images', data),
  deleteImage: (id) => api.delete('images', { data: { public_id: id } }),
})

export default imageApi
