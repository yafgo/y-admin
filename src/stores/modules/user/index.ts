import { defineStore } from 'pinia'
import type { UserState } from './types'
import { clearToken, getToken, setToken } from '@/utils/auth'
import { login as apiLogin, logout as apiLogout, getUserInfo as apiGetUserInfo } from '@/api'
import { RespCode } from '@/consts'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: {
      id: 0,
      name: '',
      avatar: '',
    },
    token: getToken() || '',
  }),

  getters: {
    name: (state) => state.userInfo.name,
    avatar: (state) => state.userInfo.avatar,
    isLogin: (state) => !!state.token,
    /** 是否已获取用户信息 */
    hasUserInfo: (state) => !!state.userInfo.name,
  },

  actions: {
    async fetchUserInfo() {
      const { code, data, message } = await apiGetUserInfo()
      if (code === RespCode.SUCCESS) {
        this.userInfo = data
      } else {
        throw new Error(message)
      }
      return data
    },

    async login(params: any) {
      const { code, data, message } = await apiLogin(params)
      if (code !== RespCode.SUCCESS || !data.token) {
        throw new Error(message || '登录失败')
      }
      setToken(data.token)
      this.$reset()
      this.token = data.token
      return data
    },

    async logout() {
      await apiLogout()
      this.logoutCallback()
      return true
    },
    logoutCallback() {
      clearToken()
      this.token = ''
      this.$reset()
    },
  },
})

export default useUserStore
