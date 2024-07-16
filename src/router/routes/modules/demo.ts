import { LayoutDefault } from '../base'
import type { AppRouteRecordRaw } from '../types'

const DEMO: AppRouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'demo',
    component: LayoutDefault,
    // redirect: '/demo/index',
    meta: { order: 1 },
    children: [
      {
        path: '',
        name: 'demoIndex',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'aboutGroup',
    component: LayoutDefault,
    meta: { order: 2 },
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
