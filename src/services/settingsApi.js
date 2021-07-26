import api from './api'

const settingApi = () => ({
  getSettings: () => api.get('/settings'),
  updateSetting: (data) => api.put('/settings', data),
})

export default settingApi
