import axios from 'axios'
import { useDefaultInterceptor } from './interceptors'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
})

useDefaultInterceptor(instance)

export default instance
