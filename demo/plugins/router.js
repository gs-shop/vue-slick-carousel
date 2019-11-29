import Vue from 'vue'
import VueRouter from 'vue-router'

import Examples from '../pages/eamples'
import exampleConfigs from '../pages/eamples/configs'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/example/simple' },
  { path: '/example', redirect: '/example/simple' },
  {
    path: '/example/:example',
    component: Examples,
    props: route => ({
      config: exampleConfigs[route.params.example],
    }),
    beforeEnter: (to, from, next) => {
      const setting = exampleConfigs[to.params.example]
      if (!setting) {
        next('/example/simple')
      } else {
        next()
      }
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
