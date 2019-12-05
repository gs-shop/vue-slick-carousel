<template>
  <v-content>
    <v-card>
      <v-tabs show-arrows center-active v-model="tab" class="sub-menu">
        <v-tab v-for="item in menu" :key="item.path" :to="item.path">
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-card>
    <v-container fluid>
      <v-row
        align="center"
        justify="center"
        no-gutters
        :class="{ 'carousel-wrapper': true, 'as-nav-for': config.asNavFor }"
      >
        <v-col cols="8" class="pa-7">
          <VueSlickCarousel
            v-bind="config.settings"
            :style="style"
            :class="classes"
            ref="c1"
            :asNavFor="config.asNavFor ? $refs.c2 : null"
          >
            <div
              v-for="(width, index) in slidesWidth"
              :key="`${width}-${index}`"
              :style="{ width: `${width}px` }"
            >
              <img
                v-if="config.image"
                :src="`https://picsum.photos/300/300?random=${index}`"
              />
              <h1 v-else>
                {{ config.settings.variableWidth ? `${width}px` : index + 1 }}
              </h1>
            </div>
          </VueSlickCarousel>
        </v-col>
      </v-row>
      <v-row
        v-if="config.asNavFor"
        align="center"
        justify="center"
        no-gutters
        class="carousel-wrapper as-nav-for"
      >
        <v-col cols="8" class="pa-7">
          <VueSlickCarousel
            v-bind="config.asNavFor.settings"
            :style="style"
            :class="classes"
            ref="c2"
            :asNavFor="$refs.c1"
          >
            <div
              v-for="(width, index) in slidesWidth"
              :key="`${width}-${index}`"
              :style="{ width: `${width}px` }"
            >
              <h1>
                {{
                  config.asNavFor.settings.variableWidth
                    ? `${width}px`
                    : index + 1
                }}
              </h1>
            </div>
          </VueSlickCarousel>
        </v-col>
      </v-row>
      <v-row class="pl-7 pr-7"><hr width="100%" /></v-row>
      <v-row>
        <v-col sm="12" md="6" class="pa-7">
          <h2># Template</h2>
          <prism language="html" :code="template" class="code"></prism>
        </v-col>
        <v-col v-if="config.asNavFor" sm="12" md="6" class="pa-7">
          <h2># Template</h2>
          <prism
            language="html"
            :code="config.asNavFor.template"
            class="code"
          ></prism>
        </v-col>
        <v-col v-else sm="12" md="6" class="pa-7">
          <h2># Settings</h2>
          <prism
            language="javascript"
            :code="JSON.stringify(config.settings, null, 2)"
            class="code"
          ></prism>
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
  computed: {
    slidesWidth() {
      return Array.from(
        { length: this.config.numSlides || 6 },
        () => Math.floor(Math.random() * 300) + 100,
      )
    },
    style() {
      return { height: this.config.settings.vertical ? '372px' : '' }
    },
    template() {
      return this.config.template ? this.config.template : exampleVueTemplate
    },
    classes() {
      const { asNavFor } = this.config
      const { vertical, rows, adaptiveHeight } = this.config.settings

      return {
        'short-row': vertical || rows > 1 || asNavFor,
        'adaptive-height': adaptiveHeight,
        vertical,
      }
    },
  },
  data() {
    const menu = Object.keys(configs).map(key => {
      return {
        title: configs[key].title,
        path: `/example/${key}`,
      }
    })

    return {
      tab: null,
      menu,
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep * {
  font-weight: 300;
  color: var(--v-secondary-base);
}
.slick-slider {
  h1 {
    line-height: 300px;
    background-color: var(--v-secondary-base);
    margin: 10px;
    text-align: center;
    color: var(--v-primary-lighten2);
  }
  &.short-row h1 {
    line-height: 100px;
  }
  img {
    height: 300px;
    margin: 10px auto;
  }
  &.adaptive-height .slick-slide:nth-of-type(even) h1 {
    line-height: 200px;
  }
}
.vertical {
  height: 372px;
}
.carousel-wrapper {
  min-height: 430px;
  &.as-nav-for {
    min-height: 180px;
  }
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
  max-height: 200px;
  overflow: auto;
  background-color: var(--v-secondary-base);
  ::v-deep code {
    width: 100%;
    background-color: var(--v-secondary-base);
  }
}
</style>
