import request from './request'
export * from './modules/user'

export const getDemo = () => {
  return request.get('/get')
}
