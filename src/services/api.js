import axios from 'axios'
import qs from 'qs'

axios.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: 'brackets' })

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api`,
})

// api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${process.env.MOVIEDB_API_TOKEN}`
//   return config
// })

export default api
