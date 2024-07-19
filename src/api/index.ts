import request from './request'

export const getDemo = () => {
  return request.get('/')
}
