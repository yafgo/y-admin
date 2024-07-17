import { defineStore } from 'pinia'
import defaultSettings from '@/config/app.json'
import type { AppState } from './types'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    ...defaultSettings,
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
})

export default useAppStore
