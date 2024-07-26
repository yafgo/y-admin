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
        { username: 'user', password: '123456' },
      ]

      if (
        accounts.some((item) => item.username === body.username && item.password === body.password)
      ) {
        return JsonResp.success({
          token: body.username + '_token123456',
        })
      }

      return JsonResp.error('账号或密码错误')
    },
  },
  {
    url: '/user/info',
    method: 'get',
    timeout: 500,
    response: ({ headers }: { headers: any }) => {
      const token = (headers.authorization || '').replace('Bearer ', '').trim()
      const username = token.split('_')[0] || '[user]'
      return JsonResp.success({
        name: username,
        avatar: `@image(100x100,#50B347,#fff,png,${username === 'admin' ? 'admin' : 'user'})`,
      })
    },
  },
  {
    url: '/user/logout',
    method: 'post',
    timeout: 200,
    response: JsonResp.success({}, '退出成功'),
  },
]

export default mocks
