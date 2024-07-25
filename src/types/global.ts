export interface RespData<T = any> {
  code: number
  data: T
  message: string
}
