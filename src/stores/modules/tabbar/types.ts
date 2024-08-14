import type { RouteRecordName } from 'vue-router'

export interface ITabItem {
  title: string
  name: string
  path: string
  query?: any
}

export interface TabBarState {
  /** 页签数组 */
  tabList: ITabItem[]

  /** keep-alive缓存的数组 */
  cacheList: RouteRecordName[]
}
