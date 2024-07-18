import ClientAppMenus from '@/router/app-menus'
import { cloneDeep } from 'lodash'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'

export default function useMenuTree() {
  const appMenus = computed(() => {
    // todo 服务端菜单逻辑
    return ClientAppMenus
  })

  const menuTree = computed(() => {
    const routesCopy = cloneDeep(appMenus.value) as RouteRecordNormalized[]
    routesCopy.sort((a, b) => (a?.meta?.order || 0) - (b?.meta?.order || 0))

    function travel(_routes: RouteRecordRaw[], level: number) {
      if (!_routes) return []

      const list: any = _routes.map((el) => {
        // todo 权限判断

        if (el.children?.length) {
          // 过滤不需要显示的子菜单
          el.children = el.children.filter((x) => x.meta?.hideInMenu !== true)
        }

        // 叶子结点
        if (el.meta?.hideChildrenInMenu || !el.children?.length) {
          el.children = []
          return el
        }

        if (el.meta?.hideInMenu) {
          return null
        }

        // 非叶子结点
        const subItems = travel(el.children, level + 1)
        if (subItems.length) {
          el.children = subItems
          return el
        }

        return null
      })
      return list.filter(Boolean)
    }

    return travel(routesCopy, 0)
  })

  return {
    menuTree,
  }
}
