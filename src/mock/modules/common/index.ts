import type { MockMethod } from 'vite-plugin-mock'

const mocks: MockMethod[] = [
  {
    url: '/get',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 0,
        data: {
          name: '@cword(3,8)',
          age: 18,
        },
      }
    },
  },
  {
    url: '/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: '@cword(3,8)',
      },
    },
  },
  {
    url: '/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },
]

export default mocks
