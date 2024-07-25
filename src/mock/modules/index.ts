import type { MockMethod } from 'vite-plugin-mock'
import common from './common'
import user from './user'

/** 前缀 */
const prefix = '/api'

/** 提供类型函数 */
export function defineMock(option: MockMethod[]): MockMethod[] {
  return option.map((i) => ({ ...i, url: prefix + i.url }))
}

export default defineMock([...common, ...user])
