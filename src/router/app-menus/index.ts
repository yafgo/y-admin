import { appRoutes } from '../routes'
import { cloneDeep } from 'lodash'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'

export default function useMenuTree() {
  // 客户端路由菜单
  const ClientAppMenus = appRoutes.map((el) => {
    return {
      name: el.name,
      path: el.path,
      meta: el.meta,
      redirect: el.redirect,
      children: el.children?.map((child) => {
        return {
          name: child.name,
          path: child.path,
          meta: child.meta,
          redirect: child.redirect,
        }
      }),
    }
  })

  /** 最终生效的路由 */
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
    appMenus,
    ClientAppMenus,
  }
}
