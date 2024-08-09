import type { ResLogin } from './type'
import request from '../../request'

/** 用户登录 */
export const login = (data: { username: string; password: string }) => {
  return request.post<ResLogin>('/user/login', data)
}

/** 退出登录 */
export const logout = () => {
  return request.post('/user/logout')
}

/** 获取用户信息 */
export const getUserInfo = () => {
  return request.get<UserInfo>('/user/info')
}
