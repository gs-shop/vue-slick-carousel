import Vue from 'vue'
import App from './App.vue'
import VueSlickCarousel from '@/VueSlickCarousel'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.component(VueSlickCarousel.name, VueSlickCarousel)

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
