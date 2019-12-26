# VueSlickCarousel

## Props

### Passing Setting Props

```html
<template>
  <VueSlickCarousel :arrows="true" :dots="true">
    <div><h3>1</h3></div>
    /*...*/
  </VueSlickCarousel>
</template>
```

### Passing Settings Object by `v-bind`

```html
<template>
  <VueSlickCarousel v-bind="settings">
    <div><h3>1</h3></div>
    /*...*/
  </VueSlickCarousel>
</template>
<script>
  export default {
    data() {
      return {
        settings: {
          arrows: true,
          dots: true,
        },
      }
    },
  }
</script>
```

### All Props

Check out [demo examples](https://gs-shop.github.io/vue-slick-carousel/#/example) for settings usage.

| Prop name        | Description                                                                                                                                                                      | Type    | Values                | Default      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------- | ------------ |
| accessibility    | enables tabbing and arrow key navigation                                                                                                                                         | boolean | -                     | true         |
| adaptiveHeight   | enables adaptive height for single slide horizontal carousels                                                                                                                    | boolean | -                     | false        |
| arrows           | enables prev/next arrows                                                                                                                                                         | boolean | -                     | true         |
| asNavFor         | set the slider to be the navigation of other slider                                                                                                                              | object  | -                     | null         |
| autoplay         | enables autoplay                                                                                                                                                                 | boolean | -                     | false        |
| autoplaySpeed    | autoplay Speed in milliseconds                                                                                                                                                   | number  | -                     | 3000         |
| centerMode       | enables centered view with partial prev/next slides. use with odd numbered slidesToShow counts                                                                                   | boolean | -                     | false        |
| centerPadding    | side padding for center mode (px or %)                                                                                                                                           | string  | -                     | '50px'       |
| cssEase          | css3 animation easing                                                                                                                                                            | string  | -                     | 'ease'       |
| dots             | enables dot indicators                                                                                                                                                           | boolean | -                     | false        |
| dotsClass        | class for slide indicator dots container                                                                                                                                         | string  | -                     | 'slick-dots' |
| draggable        | enables scroll via dragging on desktop                                                                                                                                           | boolean | -                     | true         |
| edgeFriction     | resistance when swiping edges of non-infinite carousels                                                                                                                          | number  | -                     | 0.35         |
| fade             | enables fade                                                                                                                                                                     | boolean | -                     | false        |
| focusOnSelect    | go to slide on click                                                                                                                                                             | boolean | -                     | false        |
| infinite         | infinitely wrap around contents                                                                                                                                                  | boolean | -                     | true         |
| initialSlide     | slide index to start on                                                                                                                                                          | number  | -                     | 0            |
| lazyLoad         | load images or render components on demand or progressively                                                                                                                      | string  | ondemand, progressive | false        |
| pauseOnDotsHover | pauses autoplay while hovering on dots                                                                                                                                           | boolean | -                     | false        |
| pauseOnFocus     | pauses autoplay while focused on slides                                                                                                                                          | boolean | -                     | false        |
| pauseOnHover     | pauses autoplay while hovering on track                                                                                                                                          | boolean | -                     | true         |
| responsive       | breakpoints and settings objects (see demo). enables settings sets at given screen width. set settings to "unslick" instead of an object to disable slick at a given breakpoint. | array   | -                     | null         |
| rows             | enables grid mode, number of rows per slide in the slider                                                                                                                        | number  | -                     | 1            |
| rtl              | reverses the slider's direction to become right-to-left                                                                                                                          | boolean | -                     | false        |
| slidesPerRow     | number of slides to display in grid mode, this is useful with rows option                                                                                                        | number  | -                     | 1            |
| slidesToScroll   | number of slides to scroll                                                                                                                                                       | number  | -                     | 1            |
| slidesToShow     | number of slides to show                                                                                                                                                         | number  | -                     | 1            |
| speed            | animation speed in milliseconds                                                                                                                                                  | number  | -                     | 500          |
| swipe            | enables swiping                                                                                                                                                                  | boolean | -                     | true         |
| swipeToSlide     | allows users to drag or swipe directly to a slide irrespective of slidesToScroll                                                                                                 | boolean | -                     | false        |
| touchMove        | enables slide motion with touch                                                                                                                                                  | boolean | -                     | true         |
| touchThreshold   | threshold to move slide                                                                                                                                                          | number  | -                     | 5            |
| useCSS           | enables css transitions                                                                                                                                                          | boolean | -                     | true         |
| useTransform     | enables css transform                                                                                                                                                            | boolean | -                     | true         |
| variableWidth    | allows variable slide width                                                                                                                                                      | boolean | -                     | false        |
| vertical         | enables vertical slide mode                                                                                                                                                      | boolean | -                     | false        |
| waitForAnimate   | ignores events to move the slide while animating                                                                                                                                 | boolean | -                     | true         |

## Methods

### Calling Methods

```html
<template>
  <VueSlickCarousel ref="carousel">
    <div><h3>1</h3></div>
    /*...*/
  </VueSlickCarousel>
  <button @click="showNext">show me the next</button>
</template>
<script>
  export default {
    methods: {
      showNext() {
        this.$refs.carousel.next()
      },
    },
  }
</script>
```

### All Methods

| Method name | Description                                                          | Returns | Parameters                               | Default |
| ----------- | -------------------------------------------------------------------- | ------- | ---------------------------------------- | ------- |
| prev        | go to the previous slide                                             | -       |                                          | -       |
| next        | go to the next slide                                                 | -       |                                          | -       |
| goTo        | go to slide index, if dontAnimate=true, it happens without animation | -       | slide:Number - slide number              | null    |
|             |                                                                      |         | dontAnimate:Boolean - disables animation | false   |
| play        | starts the autoplay                                                  | -       |                                          |         |
| pause       | pauses the autoplay                                                  | -       |                                          |         |

## Events

### Listening to Events

```html
<template>
  <VueSlickCarousel @init="onInitCarousel">
    <div><h3>1</h3></div>
    /*...*/
  </VueSlickCarousel>
</template>
<script>
  export default {
    methods: {
      onInitCarousel() {
        console.log('our carousel is ready')
      },
    },
  }
</script>
```

### All Events

| Event name    | Description                    | Arguments                                  |
| ------------- | ------------------------------ | ------------------------------------------ |
| init          | first initialization           | -                                          |
| reInit        | component update               | -                                          |
| lazyLoad      | slides load lazily             | slidesToLoad:Array                         |
| lazyLoadError | image fails to load            | slidesToLoad:Array                         |
| beforeChange  | before current slide change    | oldSlideIndex:Number, newSlideIndex:Number |
| afterChange   | after current slide change     | slideIndex:Number                          |
| edge          | edge dragged in finite case    | -                                          |
| swipe         | after slide changes by swiping | -                                          |

## Slots

### Customizing Arrows & Dots

```html
<template>
  <VueSlickCarousel @init="onInitCarousel">
    <div><h3>1</h3></div>
    /*...*/
    <template #prevArrow="arrowOption">
      <div class="custom-arrow">
        {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
      </div>
    </template>
    /*...*/
    <template #customPaging="page">
      <div class="custom-dot">
        {{ page }}
      </div>
    </template>
  </VueSlickCarousel>
</template>
```

### All Slots

| Name         | Description                           | Bindings                                     |
| ------------ | ------------------------------------- | -------------------------------------------- |
| prevArrow    | replaces prev arrow with given child  | currentSlide:Number - index of current slide |
|              |                                       | slideCount:Number - number of slides         |
| nextArrow    | replaces next arrow with given child  | currentSlide:Number - index of current slide |
|              |                                       | slideCount:Number - number of slides         |
| customPaging | replaces paging dots with given child | Number - index of a dot                      |
| default      | slides children                       |                                              |
