import axios, { type AxiosRequestConfig } from 'axios'
import { useDefaultInterceptor } from './interceptors'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
})

useDefaultInterceptor(instance)

// export default instance
export const request = instance

class myRequest {
  static async request<T>(config: AxiosRequestConfig): Promise<ApiResp<T>> {
    try {
      const res = await instance.request<ApiResp<T>>(config)
      return res.data
    } catch (e: any) {
      return { code: 1, message: e.message || '', data: null } as ApiResp<T>
    }
  }

  static get<T>(url: string, params?: object, config?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'get',
      url,
      params,
      ...config,
    })
  }

  static post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'post',
      url,
      data,
      ...config,
    })
  }

  static put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'put',
      url,
      data,
      ...config,
    })
  }

  static patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'patch',
      url,
      data,
      ...config,
    })
  }

  static delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({
      method: 'delete',
      url,
      ...config,
    })
  }
}

export default myRequest
