import api from './api'

const settingApi = () => ({
  getSettings: () => api.get('/settings'),
  getMetrics: () => api.get('/settings', { params: { metrics: true } }),
  updateSetting: (data) => api.put('/settings', data),
})

export default settingApi
