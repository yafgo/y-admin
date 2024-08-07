import { defineStore } from 'pinia'
import defaultSettings from '@/config/app.json'
import type { AppState } from './types'
import { useStorageKey } from '@/utils/storage'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    ...(defaultSettings as AppState),
  }),

  getters: {},

  actions: {
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial)
    },

    toggleTheme(isDark: boolean) {
      this.theme = isDark ? 'dark' : 'light'
    },
  },

  persist: {
    key: useStorageKey('app'),
    storage: localStorage,
  },
})

export default useAppStore
