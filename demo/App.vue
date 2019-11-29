<template>
  <v-app id="inspire">
    <h1 class="head-title py-6">
      <router-link to="/">
        vue-slick-carousel
      </router-link>
    </h1>
    <v-tabs v-model="tab" class="head-menu" grow>
      <v-tab v-for="item in menu" :key="item.path" :to="item.path">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  props: {
    propsA: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tab: null,
      items: ['Home', 'API', 'Examples'],
      menu: [
        { title: 'Home', path: '/' },
        { title: 'Example', path: '/example' },
      ],
    }
  },
  created() {
    console.log(this.$route)
  },
}
</script>

<style lang="scss">
@import 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900';
@import 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css';

body {
  font-weight: 100;
}
a {
  text-decoration: none;
}
.head-title {
  text-align: center;
  font-size: 36px;
  font-weight: 100;
  color: var(--v-primary-base);
  background-color: var(--v-secondary-base);
}

.head-menu {
  flex: 0 1 auto;
  .v-tab {
    font-weight: 300;
    color: var(--v-primary-base) !important;
    background-color: var(--v-secondary-base) !important;
    &.v-tab--active {
      color: var(--v-primary-base-lighten2) !important;
    }
  }
}
.v-tabs-slider {
  color: var(--v-primary-lighten2) !important;
}
</style>
