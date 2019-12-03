export const props = {
  accessibility: { type: Boolean, default: true },
  adaptiveHeight: { type: Boolean, default: false },
  appendDots: {
    type: Function,
    default: (h, dots) => <ul style={{ display: 'block' }}>{dots}</ul>,
  },
  arrows: { type: Boolean, default: true },
  autoplay: { type: Boolean, default: false },
  autoplaySpeed: { type: Number, default: 3000 },
  beforeChange: { type: Function, default: null },
  centerMode: { type: Boolean, default: false },
  centerPadding: { type: String, default: '50px' },
  className: { type: String, default: '' },
  cssEase: { type: String, default: 'ease' },
  customPaging: { type: Function, default: (h, i) => <button>{i + 1}</button> },
  dots: { type: Boolean, default: false },
  dotsClass: { type: String, default: 'slick-dots' },
  draggable: { type: Boolean, default: true },
  easing: { type: String, default: 'linear' },
  edgeFriction: { type: Number, default: 0.35 },
  fade: { type: Boolean, default: false },
  focusOnSelect: { type: Boolean, default: false },
  infinite: { type: Boolean, default: true },
  initialSlide: { type: Number, default: 0 },
  lazyLoad: { type: Boolean, default: false },
  nextArrow: {
    type: Function,
    default: (h, options) => (
      <button
        key={options.key}
        type="button"
        data-role="none"
        style="display: block;">
        {' '}
        Next
      </button>
    ),
  },
  onInit: { type: Function, default: null },
  onLazyLoadError: { type: Function, default: null },
  onReInit: { type: Function, default: null },
  pauseOnDotsHover: { type: Boolean, default: false },
  pauseOnFocus: { type: Boolean, default: false },
  pauseOnHover: { type: Boolean, default: true },
  prevArrow: {
    type: Function,
    default: (h, options) => (
      <button
        key={options.key}
        type="button"
        data-role="none"
        style="display: block;">
        {' '}
        Previous
      </button>
    ),
  },
  responsive: { type: Array, default: null },
  rows: { type: Number, default: 1 },
  rtl: { type: Boolean, default: false },
  slide: { type: String, default: 'div' },
  slidesPerRow: { type: Number, default: 1 },
  slidesToScroll: { type: Number, default: 1 },
  slidesToShow: { type: Number, default: 1 },
  speed: { type: Number, default: 500 },
  swipe: { type: Boolean, default: true },
  swipeEvent: { type: Function, default: null },
  swipeToSlide: { type: Boolean, default: false },
  touchMove: { type: Boolean, default: true },
  touchThreshold: { type: Number, default: 5 },
  useCSS: { type: Boolean, default: true },
  useTransform: { type: Boolean, default: true },
  variableWidth: { type: Boolean, default: false },
  vertical: { type: Boolean, default: false },
  waitForAnimate: { type: Boolean, default: true },
}

export const defaultValues = Object.keys(props).reduce((acc, key) => {
  acc[key] = props[key].default
  return acc
}, {})

export const types = Object.keys(props).reduce((acc, key) => {
  acc[key] = props[key].type
  return acc
}, {})
