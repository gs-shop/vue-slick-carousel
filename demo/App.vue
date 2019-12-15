<template>
  <v-app id="inspire">
    <h1 class="head-title py-4 pt-10" relative>
      <router-link to="/">
        vue-slick-carousel
      </router-link>
      <v-btn
        class="github my-7 mx-1"
        small
        absolute
        dark
        fab
        top
        right
        color="secondary"
      >
        <a href="https://github.com/gs-shop/vue-slick-carousel">
          <v-icon dark>fab fa-github</v-icon>
        </a>
      </v-btn>
    </h1>

    <v-tabs v-model="tab" class="head-menu" grow>
      <v-tab v-for="item in menu" :key="item.path" :to="item.path">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <router-view></router-view>

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
      menu: [
        { title: 'Home', path: '/' },
        { title: 'API', path: '/api' },
        { title: 'Example', path: '/example' },
      ],
    }
  },
}
</script>

<style lang="scss">
@import 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900';

html {
  overflow: auto;
}
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
      color: var(--v-primary-lighten2) !important;
    }
  }
}
.v-tabs-slider {
  color: var(--v-primary-lighten2) !important;
}
.v-btn {
  &.github {
    color: var(--v-primary-base) !important;
  }
}
</style>
