<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left>
      <v-toolbar-title>vue-slick-carousel</v-toolbar-title>
    </v-app-bar>

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
  created() {
    console.log(this.$route)
  },
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900';
@import 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css';

body {
  font-weight: 300;
}
</style>
