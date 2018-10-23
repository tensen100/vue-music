import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          redirect:'recommend'
      },
      {
        path: '/recommend',
        component: () => import('../views/recommend'),
          children: [
              {
                  path: ':id',
                  component: () => import('../views/disc')
              }
          ]
      },
      {
          path: '/singer',
          component: () => import('../views/singer'),
          children: [
              {
                  path: ':id',
                  component: () => import('../views/singer-detail')
              }
          ]
      },
      {
          path: '/rank',
          component: () => import('../views/rank'),
          children: [
              {
                  path: ':id',
                  component: () => import('../views/top-list')
              }
          ]
      },
      {
          path: '/search',
          component: () => import('../views/search'),
      },
      {
          path: '/user',
          component: () => import('../views/user-center')
      },
  ]
})
