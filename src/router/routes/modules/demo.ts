import { LayoutDefault } from '../base'
import type { AppRouteRecordRaw } from '../types'

const DEMO: AppRouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'demoGroup',
    component: LayoutDefault,
    children: [
      {
        path: '',
        name: 'demo',
        component: () => import('@/views/AboutView.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'aboutGroup',
    component: LayoutDefault,
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue')
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: {
          footer: true,
        },
      },
    ],
  },
]

export default DEMO
