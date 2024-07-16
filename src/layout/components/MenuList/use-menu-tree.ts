import ClientAppMenus from '@/router/app-menus'
import { cloneDeep } from 'lodash'
import type { RouteRecordNormalized } from 'vue-router'

export default function useMenuTree() {
  const appMenus = computed(() => {
    // todo 服务端菜单逻辑
    return ClientAppMenus
  })

  const menuTree = computed(() => {
    const routesCopy = cloneDeep(appMenus.value) as RouteRecordNormalized[]
    console.log(111, routesCopy)
    routesCopy.sort((a, b) => (a?.meta?.order || 0) - (b?.meta?.order || 0))

    return routesCopy
  })

  return {
    menuTree,
  }
}
