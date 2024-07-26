export interface RespData<T = any> {
  code: number
  data: T
  message: string
}

export interface UserInfo {
  id: number
  name: string
  avatar: string
}
