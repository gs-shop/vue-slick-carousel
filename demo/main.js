import Vue from 'vue'

import './plugins/fragment'
import router from './plugins/router'
import vuetify from './plugins/vuetify'

import App from './App.vue'
import VueSlickCarousel from '@/VueSlickCarousel'

Vue.config.productionTip = false

Vue.component(VueSlickCarousel.name, VueSlickCarousel)

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
