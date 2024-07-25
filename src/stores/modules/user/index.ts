import { defineStore } from 'pinia'
import type { UserState } from './types'
import { getToken } from '@/utils/auth'
import { login as apiLogin, logout as apiLogout } from '@/api'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: {
      id: 0,
      name: 'admin',
      avatar: '',
    },
    token: getToken() || '',
  }),

  getters: {
    name: (state) => state.userInfo.name,
    avatar: (state) => state.userInfo.avatar,
  },

  actions: {
    async login(params: any) {
      const res = await apiLogin(params)
      console.log('登录', res)
      // this.token = '123456789'
    },
    async logout() {
      const res = await apiLogout()
      console.log('登出', res)
      this.token = ''
    },
  },
})

export default useUserStore
