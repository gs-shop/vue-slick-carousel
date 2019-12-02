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
        <v-col xs="12" sm="6" class="pa-7">
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
        <v-col xs="12" sm="6" class="pa-7">
          <v-row>
            <prism
              language="html"
              :code="exampleVueTemplate"
              class="code"
            ></prism>
          </v-row>
          <v-row>
            <prism
              language="javascript"
              :code="JSON.stringify(config.settings, null, 2)"
              class="code"
            ></prism>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Prism from 'vue-prismjs'

import 'prismjs/themes/prism-tomorrow.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import configs from './configs'

const exampleVueTemplate = `<VueSlickCarousel v-bind="settings">
  <div><h3>1</h3></div>
  /*...*/
</VueSlickCarousel>`

export default {
  name: 'ExamplesPage',
  components: {
    Prism,
  },
  props: {
    config: Object,
  },
  data() {
    const slidesWidth = Array.from(
      { length: this.config.numSlides || 6 },
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
      exampleVueTemplate,
    }
  },
}
</script>

<style lang="scss" scoped>
h3 {
  line-height: 200px;
  background-color: var(--v-secondary-base);
  font-size: 24px;
  margin: 10px;
  text-align: center;
  color: var(--v-primary-lighten2);
  font-weight: 300;
}
.slick-slider {
  ::v-deep .slick-dots button::before {
    color: var(--v-secondary-base);
    opacity: 0.25;
  }
  ::v-deep .slick-dots .slick-active button::before {
    opacity: 1;
  }

  ::v-deep .slick-arrow:before {
    color: var(--v-secondary-base);
    opacity: 1;
  }
  ::v-deep .slick-arrow.slick-disabled:before {
    opacity: 0.25;
  }
}

.code {
  width: 100%;
  background-color: var(--v-secondary-base);
  ::v-deep code {
    width: 100%;
    background-color: var(--v-secondary-base);
  }
}
</style>
