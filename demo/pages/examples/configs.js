const verticalTemplate = `<VueSlickCarousel v-bind="settings" :style="{height: '372px'}">
  <div><h3>1</h3></div>
  /*...*/
</VueSlickCarousel>`
const imageTemplate = `<VueSlickCarousel v-bind="settings">
  <div><img src="https://picsum.photos/300/300" /></div>
  /*...*/
</VueSlickCarousel>`
const asNavForTemplate = `<VueSlickCarousel
  ref="c1"
  :asNavFor="$refs.c2"
  :focusOnSelect="true">
  <div><h3>1</h3></div>
  /*...*/
</VueSlickCarousel>`
const asNavForTemplate2 = `<VueSlickCarousel
  ref="c2"
  :asNavFor="$refs.c1"
  :slidesToShow="4"
  :focusOnSelect="true">
  <div><h3>1</h3></div>
  /*...*/
</VueSlickCarousel>`

export default {
  simple: {
    title: 'Simple Slides',
    settings: {
      dots: true,
      dotsClass: 'slick-dots custom-dot-class',
      edgeFriction: 0.35,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  multiple: {
    title: 'Multiple Slides',
    numSlides: 9,
    settings: {
      dots: true,
      focusOnSelect: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      touchThreshold: 5,
    },
  },
  responsive: {
    title: 'Responsive',
    numSlides: 8,
    settings: {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
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
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 320,
          settings: 'unslick',
        },
      ],
    },
  },
  resizable: {
    title: 'Resizable',
    settings: {
      dots: true,
      infinite: true,
      initialSlide: 2,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
    },
  },
  'multiple-rows': {
    title: 'Multiple Rows',
    numSlides: 16,
    settings: {
      infinite: true,
      slidesToShow: 3,
      speed: 500,
      rows: 2,
      slidesPerRow: 1,
    },
  },
  'center-mode': {
    title: 'Center Mode',
    settings: {
      centerMode: true,
      centerPadding: '20px',
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 3,
      speed: 500,
    },
  },
  fade: {
    title: 'Fade',
    numSlides: 4,
    image: true,
    template: imageTemplate,
    settings: {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  'lazy-load': {
    title: 'Lazy Load',
    numSlides: 4,
    image: true,
    template: imageTemplate,
    settings: {
      lazyLoad: 'ondemand',
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  'variable-width': {
    title: 'Variable Width',
    settings: {
      dots: true,
      infinite: true,
      centerMode: true,
      centerPadding: '20px',
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
    },
  },
  'adaptive-height': {
    title: 'Adaptive Height',
    settings: {
      accessibility: false,
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
    },
  },
  'auto-play': {
    title: 'Auto Play',
    settings: {
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: 'linear',
    },
  },
  'pause-on-hover': {
    title: 'Pause On Hover',
    settings: {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnDotsHover: true,
      pauseOnFocus: true,
      pauseOnHover: true,
    },
  },
  'vertical-mode': {
    title: 'Vertical Mode',
    template: verticalTemplate,
    settings: {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
    },
  },
  'focus-on-select': {
    title: 'Focus On Select',
    settings: {
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
    },
  },
  rtl: {
    title: 'Right To Left',
    settings: {
      dots: true,
      infinite: true,
      slidesToScroll: 1,
      rtl: true,
    },
  },
  'vertical-swipe-to-slide': {
    title: 'Vertical Swipe To Slide',
    template: verticalTemplate,
    settings: {
      centerMode: true,
      centerPadding: '30px',
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
    },
  },
  'as-nav-for': {
    title: 'As Navigation For',
    template: asNavForTemplate,
    settings: { focusOnSelect: true },
    asNavFor: {
      template: asNavForTemplate2,
      settings: { slidesToShow: 4, focusOnSelect: true },
    },
  },
}
