import type { Router, LocationQueryRaw } from 'vue-router'

import { useUserStore } from '@/stores'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (userStore.isLogin) {
      if (userStore.hasUserInfo) {
        next()
      } else {
        try {
          await userStore.fetchUserInfo()
          next()
        } catch (error) {
          await userStore.logout()
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          })
        }
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
