import Vue from "vue";
import App from "./App.vue";
import VueSlickCarousel from "@/VueSlickCarousel";

Vue.config.productionTip = false;

Vue.component(VueSlickCarousel.name, VueSlickCarousel);

new Vue({
  render: h => h(App)
}).$mount("#app");
