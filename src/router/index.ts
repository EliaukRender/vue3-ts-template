import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/demos',
    name: 'Demos',
    component: () => import('@/views/Demos/index.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 