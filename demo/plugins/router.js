import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages'
import ApiDoc from '../pages/api'
import Examples from '../pages/examples'
import exampleConfigs from '../pages/examples/configs'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/api', component: ApiDoc },
  { path: '/example', redirect: '/example/simple' },
  {
    path: '/example/:example',
    component: Examples,
    props: route => {
      const config = exampleConfigs[route.params.example]
      if (window.Cypress) {
        // disable animation on e2e
        config.settings.speed = 0
        config.settings.autoplaySpeed = 100
        if (config.asNavFor) {
          config.asNavFor.settings.speed = 0
          config.asNavFor.settings.autoplaySpeed = 100
        }
      }
      return {
        config,
      }
    },
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
  mode: 'hash',
  routes,
})

export default router
