import { getToken } from '@/utils/auth'
import { type AxiosInstance } from 'axios'

/**
 * 使用默认拦截器配置
 * @param instance
 */
const useDefaultInterceptor = (instance: AxiosInstance) => {
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      // 请求错误时的处理
      return Promise.reject(error)
    }
  )

  // 响应拦截
  instance.interceptors.response.use(
    (response) => {
      // 2xx 状态码的响应
      return response
    },
    (error) => {
      // 超出 2xx 状态码的响应
      return Promise.reject(error)
    }
  )
}

export { useDefaultInterceptor }
