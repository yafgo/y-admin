import type { MockMethod } from 'vite-plugin-mock'

const mocks: MockMethod[] = [
  {
    url: '/user/login',
    method: 'post',
    timeout: 1000,
    response: () => {
      return {
        code: 0,
        data: {
          name: '@cword(3,8)',
        },
      }
    },
  },
]

export default mocks
