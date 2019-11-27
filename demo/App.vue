<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>vue-slick-carousel</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="9">
            <VueSlickCarousel>
              <div>
                <img src="https://picsum.photos/400/300?random=1" />
              </div>
              <div>
                <img src="https://picsum.photos/400/300?random=2" />
              </div>
              <div>
                <img src="https://picsum.photos/400/300?random=3" />
              </div>
              <div>
                <img src="https://picsum.photos/400/300?random=4" />
              </div>
              <div>
                <img src="https://picsum.photos/400/300?random=5" />
              </div>
              <div>
                <img src="https://picsum.photos/400/300?random=6" />
              </div>
            </VueSlickCarousel>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default {
  name: 'app',
  data() {
    return {
      drawer: null,
      settings: {
        slidesToShow: 1,
      },
    }
  },
  created() {
    this.$vuetify.theme.dark = true
  },
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900';
@import 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css';
</style>
