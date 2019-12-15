# vue-slick-carousel

> 🚥 Vue Slick Carousel with True SSR Written for Faster [Luxstay](https://www.luxstay.com). This Is a Port of [react-slick](https://github.com/akiran/react-slick).

[![npm version](https://img.shields.io/npm/v/vue-slick-carousel.svg)](https://www.npmjs.com/package/vue-slick-carousel)
[![license](https://img.shields.io/npm/l/vue-slick-carousel)](https://github.com/gs-shop/vue-slick-carousel/blob/master/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/gs-shop/vue-slick-carousel/issues?&q=is%3Aissue+is%3Aopen)
[![code with hearth by GSShop](https://img.shields.io/badge/gsshop-%3C%2F%3E%20-cadb2a.svg)](https://github.com/gs-shop)
[![hearth for Luxstay](https://img.shields.io/badge/luxstay-%20%E2%99%A5%20-ff3333.svg)](https://www.luxstay.com)
<a href="https://gitmoji.carloscuesta.me">
<img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
      alt="Gitmoji">
</a>
<br/>

<img src="https://user-images.githubusercontent.com/1215767/70643037-a8697b00-1c83-11ea-9bc0-a3ce71d0ef62.gif" width="100%">

<br/>

## 🚚 Installation

### yarn/npm

```bash
npm i vue-slick-carousel
# or
yarn add vue-slick-carousel
```

### cdn

```bash
# latest
https://unpkg.com/vue-slick-carousel

# specific version
https://unpkg.com/vue-slick-carousel@1.0.0-beta.0
```

<br/>

## 🚀 Quick Start

See [API](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md) & [Examples](https://gs-shop.github.io/vue-slick-carousel/#/example/) to learn advanced usage.

```html
<template>
  <div>
    <VueSlickCarousel v-bind="settings">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </VueSlickCarousel>
  </div>
</template>
<script>
  // require slick styles
  import 'vue-slick-carousel/dist/slick.css'
  import 'vue-slick-carousel/dist/slick-theme.css'

  import VueSlickCarousel from 'vue-slick-carousel'

  export default {
    name: 'MyAwesomeComponent',
    components: { VueSlickCarousel },
    data() {
      return {
        settings: {
          dots: true,
          infinite: true,
        },
      }
    },
  }
</script>
```

<br/>

## 📚 Docs

- [examples](https://gs-shop.github.io/vue-slick-carousel/#/example/)
- [settings props](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md#props)
- [methods](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md#methods)
- [events](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md#events)
- [slots](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md#slots)
- [contributing](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/CONTRIBUTING.md)
- [commit message convention](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/COMMIT_MESSAGE_CONVENTION.md)
- [code of conduct](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/CODE_OF_CONDUCT.md)

<br/>

## 🔖 License

This software is licensed under the [MIT](https://github.com/gs-shop/vue-slick-carousel/blob/master/LICENSE).
