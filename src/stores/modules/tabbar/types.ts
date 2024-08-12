import type { RouteRecordRaw } from 'vue-router'

export interface TabItem {
  title: string
  name: string
  path: string
  query?: any
}

export interface TabBarState {
  /** 页签数组 */
  tabList: TabItem[]

  /** keep-alive缓存的数组 */
  cacheList: RouteRecordRaw[]
}
