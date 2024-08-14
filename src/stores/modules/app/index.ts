import { defineStore } from 'pinia'
import defaultSettings from '@/config/app.json'
import type { AppState } from './types'
import { useStorageKey } from '@/utils/storage'

const storeSetup = () => {
  /** app配置 */
  const appConfig = reactive({ ...defaultSettings }) as AppState

  const updateSettings = (partial: Partial<AppState>) => {
    // @ts-ignore-next-line
    Object.assign(appConfig, partial)
  }

  const toggleTheme = (isDark: boolean) => {
    appConfig.theme = isDark ? 'dark' : 'light'
  }

  /** 页面是否正在刷新 */
  const reloadPageFlag = ref(true)
  /** 刷新页面 */
  const reloadPage = () => {
    reloadPageFlag.value = false
    nextTick(() => {
      reloadPageFlag.value = true
    })
  }

  return {
    ...toRefs(appConfig),
    updateSettings,
    toggleTheme,

    reloadPageFlag,
    reloadPage,
  }
}

const useAppStore = defineStore('app', storeSetup, {
  persist: {
    key: useStorageKey('app'),
    storage: localStorage,
  },
})

export default useAppStore
