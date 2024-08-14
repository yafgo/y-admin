import { defineStore } from 'pinia'
import type { TabBarState, ITabItem } from './types'
import router from '@/router'

const useTabBarStore = defineStore('tabBar', {
  state: (): TabBarState => ({
    tabList: [],
    cacheList: [],
  }),

  getters: {
    getCacheList(): string[] {
      return [...this.cacheList] as string[]
    },
  },

  actions: {
    cacheAdd(name: string) {
      if (typeof name === 'string' && name !== '') {
        if (this.cacheList.includes(name)) {
          return
        }
        this.cacheList.push(name)
      }
    },
    cacheRemove(name: string) {
      const index = this.cacheList.indexOf(name)
      if (index !== -1) {
        this.cacheList.splice(index, 1)
      }
    },

    /** 清空页签 */
    clearTabList() {
      const arr: ITabItem[] = []
      this.tabList = arr
    },

    /** 添加页签 */
    addTabItem(item: ITabItem) {
      // 已存在不重复添加
      if (this.tabList.some((v) => v.path === item.path)) {
        return
      }
      // 添加页签
      this.tabList.push(item)
    },

    /** 移除页签 */
    removeTabItem(itemOrKey: ITabItem | string) {
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

    /** 移除其他页签 */
    closeOne(tabPath: string) {
      this.removeTabItem(tabPath)
    },

    /** 移除其他页签 */
    closeOthers(currPath: string) {
      const arr = this.tabList.filter((item) => item.path !== currPath)
      arr.forEach((item) => {
        this.removeTabItem(item)
        if (item.name) {
          this.cacheRemove(item.name)
        }
      })
    },

    /** 关闭全部页签 */
    closeAll() {
      this.clearTabList()
      router.push('/')
    },

    resetTabList() {
      this.tabList = []
      this.cacheList = []
    },
  },

  persist: true,
})

export default useTabBarStore
