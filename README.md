# vue-slick-carousel

> 🚥 Vue Slick Carousel with True SSR Written for Faster [Luxstay](https://www.luxstay.com). This Is a Port of [react-slick](https://github.com/akiran/react-slick).

[![npm version](https://img.shields.io/npm/v/vue-slick-carousel.svg)](https://www.npmjs.com/package/vue-slick-carousel)
[![bit](https://img.shields.io/bit/collection/total-components/gsshop/vue-slick-carousel)](https://bit.dev/gsshop/vue-slick-carousel/vue-slick-carousel)
[![license](https://img.shields.io/npm/l/vue-slick-carousel)](https://github.com/gs-shop/vue-slick-carousel/blob/master/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/gs-shop/vue-slick-carousel/issues?&q=is%3Aissue+is%3Aopen)
[![code with hearth by GSShop](https://img.shields.io/badge/gsshop-%3C%2F%3E%20-cadb2a.svg)](https://github.com/gs-shop)
[![hearth for Luxstay](https://img.shields.io/badge/luxstay-%20%E2%99%A5%20-ff3333.svg)](https://www.luxstay.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
<a href="https://gitmoji.carloscuesta.me">
<img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
      alt="Gitmoji">
</a>
<br/>

<img src="https://user-images.githubusercontent.com/1215767/70643037-a8697b00-1c83-11ea-9bc0-a3ce71d0ef62.gif" width="100%">

<br/>

## 🎨 Features

|                                                      simple                                                       |                                                      center mode                                                       |                                                      multiple                                                       |                                                           rows                                                           |
| :---------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| ![01 simple](https://user-images.githubusercontent.com/1215767/70865165-bbd75780-1f9d-11ea-8e2d-fc50bf2f322a.png) | ![02 center mode](https://user-images.githubusercontent.com/1215767/70865168-bf6ade80-1f9d-11ea-8d5a-7dd2bf8ba695.png) | ![03 multiple](https://user-images.githubusercontent.com/1215767/70865170-c396fc00-1f9d-11ea-894f-7b38a30d9932.png) | ![04 multiple rows](https://user-images.githubusercontent.com/1215767/70865171-c42f9280-1f9d-11ea-9b98-182d65560694.png) |

|                                                      variable width                                                       |                                                         vertical                                                         |                                                        lazy load                                                        |                                                      synced sliders                                                       |
| :-----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| ![05 variable width](https://user-images.githubusercontent.com/1215767/70865172-c42f9280-1f9d-11ea-91dc-566ef181759a.png) | ![06 vertical mode](https://user-images.githubusercontent.com/1215767/70865173-c42f9280-1f9d-11ea-93a2-d467cf409fe5.png) | ![07 lazy loading](https://user-images.githubusercontent.com/1215767/70865174-c4c82900-1f9d-11ea-96f7-0a11cc7e1d98.png) | ![08 synced sliders](https://user-images.githubusercontent.com/1215767/70865175-c4c82900-1f9d-11ea-8731-05235efa0d10.png) |

vue-slick-carousel inherits the long-loved slick-carousel features, offers a variety of functions. It has been completely rewritten as a vue component. If you were trying to use the slick-carousel in the vue, it would be a perfect choice. You can use it in a vue component manner without any disparity. It also makes it easy to solve difficult problems such as custom arrows/dots.

Find out all available features on [setting props](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md#props) and see how that works on [examples](https://gs-shop.github.io/vue-slick-carousel/#/example/).

<br/>

## True SSR

|             [no-ssr-slick](https://codesandbox.io/s/github/kyuwoo-choi/nuxt-no-ssr-slick-example)             |       [vue-slick-carousel](https://codesandbox.io/s/github/kyuwoo-choi/nuxt-vue-slick-carousel-example)       |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/1215767/71011941-a3984180-2131-11ea-8fb5-bbcdaf5740c7.png) | ![image](https://user-images.githubusercontent.com/1215767/71011993-b3b02100-2131-11ea-9295-4aca745f0706.png) |
|                                           FCP: 1920ms & LCP: 3090ms                                           |                                           FCP: 620ms & LCP: 1850ms                                            |

It is designed to support SSR from the start. vue-slick-carousel supports true SSR. No more `no-ssr` or `client-only` to make it work anyway. If you value website performance, you are in the right place.

Here're nuxt examples for you to test yourself:
[no-ssr-slick](https://codesandbox.io/s/github/kyuwoo-choi/nuxt-no-ssr-slick-example) vs [vue-slick-carousel](https://codesandbox.io/s/github/kyuwoo-choi/nuxt-vue-slick-carousel-example)

[Find out how fast it is compared to the Top 5 carousels.](https://dev.to/gsshop/vue-js-carousels-ssr-support-and-performance-24nh) And leave what you think.

<br/>

## 🚚 Installation

### yarn/npm/bit

```bash
# npm
npm i vue-slick-carousel
# yarn
yarn add vue-slick-carousel
# bit
bit import gsshop.vue-slick-carousel/vue-slick-carousel
```

### cdn

```bash
# latest
https://unpkg.com/vue-slick-carousel
```

<br/>

## 🚀 Quick Start

See [API](https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md) & [Examples](https://gs-shop.github.io/vue-slick-carousel/#/example/) to learn advanced usage.

```html
<template>
  <div>
    <VueSlickCarousel :arrows="true" :dots="true">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </VueSlickCarousel>
  </div>
</template>

<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

  export default {
    name: 'MyComponent',
    components: { VueSlickCarousel },
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
