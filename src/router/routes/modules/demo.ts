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
