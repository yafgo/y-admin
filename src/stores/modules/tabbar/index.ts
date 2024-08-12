import { defineStore } from 'pinia'
import type { TabBarState, TabItem } from './types'
import router from '@/router'

const useTabBarStore = defineStore('tabBar', {
  state: (): TabBarState => ({
    tabList: [],
    cacheList: [],
  }),

  getters: {},

  actions: {
    /** 添加页签 */
    addTabItem(item: TabItem) {
      // 已存在不重复添加
      if (this.tabList.some((v) => v.path === item.path)) {
        return
      }
      // 添加页签
      this.tabList.push(item)
    },

    /** 移除页签 */
    removeTabItem(itemOrKey: TabItem | string) {
      let key = ''
      if (typeof itemOrKey === 'string') {
        key = itemOrKey
      } else {
        key = itemOrKey.path
      }
      const index = this.tabList.findIndex((v) => v.path === key)
      if (index >= 0) {
        const isActive = router.currentRoute.value.path === key
        this.tabList.splice(index, 1)
        if (isActive) {
          router.push(this.tabList[index - 1]?.path || '/')
        }
      }
    },
  },

  persist: true,
})

export default useTabBarStore
