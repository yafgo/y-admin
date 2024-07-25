import { defineStore } from 'pinia'
import type { UserState } from './types'
import { clearToken, getToken, setToken } from '@/utils/auth'
import { login as apiLogin, logout as apiLogout } from '@/api'
import { RespCode } from '@/consts'

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
      const { code, data } = await apiLogin(params)
      if (code !== RespCode.SUCCESS || !data.token) {
        return false
      }
      setToken(data.token)
      this.token = data.token
      return data
    },
    async logout() {
      const { code } = await apiLogout()
      if (code !== RespCode.SUCCESS) {
        return false
      }
      clearToken()
      this.token = ''
      return true
    },
  },
})

export default useUserStore
