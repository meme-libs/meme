import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(`${REPO}`),
  routes: [{
    path: '/',
    component: () => import('./views/Home.vue')
  }, {
    path: '/:idOrTitle',
    props: true,
    component: () => import('./views/MemeDetail.vue')
  }]
})
