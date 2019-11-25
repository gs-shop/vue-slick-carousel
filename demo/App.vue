<template>
  <div id="app">
    <vue-slick-carousel v-bind="settings">
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
      <div>item</div>
    </vue-slick-carousel>
  </div>
</template>

<script>
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default {
  name: 'app',
  data() {
    return {
      settings: {
        slidesToShow: 0,
        lazyLoad: true,
        touchMove: true,
        pauseOnHover: true,
        accessibility: true,
        centerMode: true,
        dots: true,
        pauseOnDotsHover: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 300,
            settings: 'unslick',
          },
        ],
      },
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
