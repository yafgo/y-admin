import { LayoutDefault } from '../base'
import type { AppRouteRecordRaw } from '../types'

const DEMO: AppRouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'demo',
    component: LayoutDefault,
    redirect: '/demo/index',
    meta: {
      order: 1,
      locale: '示例',
      icon: 'icon-settings',
    },
    children: [
      {
        path: 'index',
        name: 'demoIndex',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          locale: '示例',
          icon: 'icon-settings',
        },
      },
    ],
  },
  {
    path: '/about',
    name: 'aboutGroup',
    component: LayoutDefault,
    meta: {
      order: 2,
      locale: '关于',
      icon: 'icon-settings',
    },
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: {
          locale: '关于',
          icon: 'icon-apps',
        },
      },
    ],
  },
]

export default DEMO
