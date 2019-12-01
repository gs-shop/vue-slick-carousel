export default {
  simple: {
    title: 'Simple Slides',
    settings: {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  multiple: {
    title: 'Multiple Slides',
    settings: {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
  responsive: {
    title: 'Responsive',
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
      ],
    },
  },
  resizable: {
    title: 'Resizable',
    settings: {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  'multiple-rows': {
    title: 'Multiple Rows',
    settings: {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
      rows: 2,
      slidesPerRow: 2,
    },
  },
  'center-mode': {
    title: 'Center Mode',
    settings: {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
    },
  },
  fade: {
    title: 'Fade',
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
    settings: {
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
      className: 'slider variable-width',
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
    },
  },
  'adaptive-height': {
    title: 'Adaptive Height',
    settings: {
      className: '',
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
      pauseOnHover: true,
    },
  },
  'vertical-mode': {
    title: 'Vertical Mode',
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
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      rtl: true,
    },
  },
  'vertical-swipe-to-slide': {
    title: 'Vertical Swipe To Slide',
    settings: {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
    },
  },
}
