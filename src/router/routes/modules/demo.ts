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

for (let i = 0; i < 6; i++) {
  const item = {
    path: `/demo${i}`,
    name: `demoGroup${i}`,
    component: LayoutDefault,
    redirect: `/demo${i}/index`,
    meta: {
      order: 3 + i,
      locale: `示例${i + 1}`,
      icon: 'icon-settings',
    },
    children: [],
  }
  for (let j = 0; j < 5; j++) {
    item.children.push({
      path: `index${j}`,
      name: `demo${i}Index${j}`,
      component: () => import('@/views/AboutView.vue'),
      meta: {
        locale: `示例项 ${i} - ${j + 1}`,
        icon: 'icon-apps',
      },
    } as never)
  }

  DEMO.push(item)
}

export default DEMO
