<template>
  <v-content>
    <v-card>
      <v-tabs show-arrows center-active v-model="tab" class="sub-menu">
        <v-tab v-for="item in menu" :key="item.path" :to="item.path">
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-card>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center" no-gutters>
        <v-col xs="12" sm="6" md="5" lg="4" xl="4" class="pa-7">
          <VueSlickCarousel v-bind="config.settings">
            <div
              v-for="(width, index) in slidesWidth"
              :key="`${width}-${index}`"
              :style="{ width: `${width}px` }"
            >
              <h3>{{ index + 1 }}</h3>
            </div>
          </VueSlickCarousel>
        </v-col>
        <v-col xs="12" sm="6">
          <pre>{{ config.settings }}</pre>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import configs from './configs'

export default {
  name: 'ExamplesPage',
  props: {
    config: Object,
  },
  data() {
    const slidesWidth = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 200) + 200,
    )

    const menu = Object.keys(configs).map(key => {
      return {
        title: configs[key].title,
        path: `/example/${key}`,
      }
    })

    return {
      tab: null,
      slidesWidth,
      menu,
    }
  },
}
</script>

<style>
h3 {
  line-height: 200px;
  background: #000000;
  opacity: 0.75;
  font-size: 24px;
  margin: 10px;
  text-align: center;
  color: #ffffff;
  font-weight: 300;
}
.slick-arrow:before {
  color: #000000;
  opacity: 0.75;
}
</style>
