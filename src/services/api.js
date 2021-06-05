import axios from 'axios'
import qs from 'qs'

axios.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: 'brackets' })

const api = axios.create({
  baseURL: '/api',
})

// api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${process.env.MOVIEDB_API_TOKEN}`
//   return config
// })

export default api
