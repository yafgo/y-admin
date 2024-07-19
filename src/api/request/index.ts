import axios from 'axios'
import { useDefaultInterceptor } from './interceptors'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
})

useDefaultInterceptor(instance)

export default instance
