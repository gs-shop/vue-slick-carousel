export default {
  accessibility: true,
  adaptiveHeight: false,
  afterChange: null,
  appendDots: (h, dots) => <ul style={{ display: 'block' }}>{dots}</ul>,
  arrows: true,
  autoplay: false,
  autoplaySpeed: 3000,
  beforeChange: null,
  centerMode: false,
  centerPadding: '50px',
  className: '',
  cssEase: 'ease',
  customPaging: (h, i) => <button>{i + 1}</button>,
  dots: false,
  dotsClass: 'slick-dots',
  draggable: true,
  easing: 'linear',
  edgeFriction: 0.35,
  fade: false,
  focusOnSelect: false,
  infinite: true,
  initialSlide: 0,
  lazyLoad: null,
  nextArrow: (h, options) => (
    <button
      key={options.key}
      type="button"
      data-role="none"
      style="display: block;">
      {' '}
      Next
    </button>
  ),
  onEdge: null,
  onInit: null,
  onLazyLoadError: null,
  onReInit: null,
  pauseOnDotsHover: false,
  pauseOnFocus: false,
  pauseOnHover: true,
  prevArrow: (h, options) => (
    <button
      key={options.key}
      type="button"
      data-role="none"
      style="display: block;">
      {' '}
      Previous
    </button>
  ),
  responsive: null,
  rows: 1,
  rtl: false,
  slide: 'div',
  slidesPerRow: 1,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipe: true,
  swipeEvent: null,
  swipeToSlide: false,
  touchMove: true,
  touchThreshold: 5,
  useCSS: true,
  useTransform: true,
  variableWidth: false,
  vertical: false,
  waitForAnimate: true,
}
