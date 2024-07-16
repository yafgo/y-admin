import { appRoutes } from '../routes'

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

export default ClientAppMenus
