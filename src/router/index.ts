import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/index.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      }
    ]
  },
  {
    path: '/about',
    // name: 'about',
    component: AppLayout,
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue')
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
