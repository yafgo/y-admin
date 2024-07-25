import type { MockMethod } from 'vite-plugin-mock'
import { JsonResp } from '../base'

const mocks: MockMethod[] = [
  {
    url: '/user/login',
    method: 'post',
    timeout: 550,
    response: ({ body }: { body: any }) => {
      const accounts = [
        { username: 'admin', password: '123456' },
        { username: 'guest', password: '123456' },
      ]

      if (
        accounts.some((item) => item.username === body.username && item.password === body.password)
      ) {
        return JsonResp.success({
          token: 'token123456',
        })
      }

      return JsonResp.error('账号或密码错误')
    },
  },
]

export default mocks
