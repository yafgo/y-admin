import type { Router, LocationQueryRaw } from 'vue-router'

import { useUserStore } from '@/stores'
import { ROUTE_NAME_HOME } from '@/consts'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (userStore.isLogin) {
      // 没有获取用户信息, 先进行获取
      if (!userStore.hasUserInfo) {
        try {
          await userStore.fetchUserInfo()
        } catch (error) {
          await userStore.logout()
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          })
          return
        }
      }

      if (to.name === 'login') {
        // 当前已登录, 不需要进登录页, 直接跳首页
        next({ name: ROUTE_NAME_HOME })
      } else {
        next()
      }
    } else {
      if (to.name === 'login') {
        next()
        return
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
    }
  })
}
