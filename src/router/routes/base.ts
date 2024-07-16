import type { RouteRecordRaw } from 'vue-router'

export const LayoutDefault = () => import('@/layout/index.vue')

export const ROUTE_NOT_FOUND: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/not-found/index.vue'),
}
