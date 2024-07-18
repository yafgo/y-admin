import { createRouter, createWebHistory } from 'vue-router'

import { appRoutes } from './routes'
import { LayoutDefault, ROUTE_NOT_FOUND } from './routes/base'
import setupRouteGuard from './guard'

const routes = [
  {
    path: '/',
    name: 'root',
    component: LayoutDefault,
    children: [
      {
        path: '',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (HomeView.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  ...appRoutes,
  ROUTE_NOT_FOUND,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    // 内容区始终滚动到顶部
    document.querySelector('#layout-content')?.scrollTo(0, 0)
    return { top: 0 }
  },
})

// 设置路由守卫
setupRouteGuard(router)

export default router
