import type { Router } from 'vue-router'
import { handleRouteChange } from '@/utils/route-listener'
import setupUserLoginInfoGuard from './userLoginInfo'

function setupPageGuard(router: Router) {
  router.afterEach(async (to) => {
    // emit route change
    handleRouteChange(to)
  })
}

export default function setupRouteGuard(router: Router) {
  setupPageGuard(router)
  setupUserLoginInfoGuard(router)
}
