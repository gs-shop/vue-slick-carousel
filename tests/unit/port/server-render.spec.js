import fc from 'fast-check'
import { JSDOM } from 'jsdom'
import Vue from 'vue'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Parser } from 'html-to-react'
import { createRenderer } from 'vue-server-renderer'
import VueSlickCarousel from '@/VueSlickCarousel'
import ReactSlickCarousel from 'react-slick'
import prettyDiff from 'prettydiff'
import stripHtmlComments from 'strip-html-comments'

const vueRenderer = createRenderer({
  runInNewContext: true,
})
const vueServerRender = async (itemHtmls = [], settings = {}) => {
  const className = settings.className || ''
  const renderedString = await vueRenderer.renderToString(
    new Vue({
      template: `<vue-slick-carousel v-bind="settings" class="${className}">${itemHtmls.join(
        '',
      )}</vue-slick-carousel>`,
      components: { VueSlickCarousel },
      props: {
        settings: {
          type: Object,
          default: () => settings,
        },
      },
    }),
  )

  return new JSDOM(renderedString).window.document.body.firstElementChild
}

const reactParser = new Parser()

const reactServerRender = (itemHtmls = [], settings = {}) => {
  const renderedString = ReactDOMServer.renderToString(
    React.createElement(
      ReactSlickCarousel,
      settings,
      reactParser.parse(itemHtmls.join('')),
    ),
  )

  return new JSDOM(renderedString).window.document.body.firstElementChild
}

const normElementAttr = element => {
  const { cssText } = element.style
  element.style.cssText =
    cssText && cssText.substr(-1) !== ';' ? cssText + ';`' : cssText
  element.className = [...element.classList].sort().join(' ')
}
const prettify = element => {
  // remove react, vue specific attrs
  element.removeAttribute('data-server-rendered')
  element.removeAttribute('data-reactroot')

  normElementAttr(element)
  element.querySelectorAll('*').forEach(el => normElementAttr(el))

  const options = prettyDiff.options
  options.source = stripHtmlComments(element.outerHTML)
  options.mode = 'beautify'
  options.attribute_sort = true
  options.force_attribute = true
  options.force_indent = true

  return prettyDiff()
}

const settingsResponsives = [
  [
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
      settings: 'unslick',
    },
  ],
  [
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
  ],
  [
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
]

const settingsModel = {
  accessibility: fc.boolean(), // Enable tabbing and arrow key navigation
  adaptiveHeight: fc.boolean(), // Adjust the slide's height automatically
  arrows: fc.boolean(), // Prev/Next Arrows
  // asNavFor: undefined, // provide ref to another slider and sync it with current slider // to be replaced
  autoplaySpeed: fc.constantFrom(3000, 5000), // Delay between each auto scroll (in milliseconds) // not for test
  autoplay: fc.boolean(), // auto play
  centerMode: fc.boolean(), // Center current slide
  centerPadding: fc.constantFrom('100px', '150px'), // center padding
  className: fc.constant('custom-slick'), // CSS class for inner slider div
  dotsClass: fc.constant('custom-dots'), // CSS class for dots
  dots: fc.boolean(), // dots
  draggable: fc.boolean(), // Enable scrollable via dragging on desktop
  fade: fc.boolean(), // fade
  focusOnSelect: fc.boolean(), // Go to slide on click
  infinite: fc.boolean(), // Infinitely wrap around contents
  initialSlide: fc.integer(5), // Index of first slide
  lazyLoad: fc.constantFrom('ondemand', 'progressive'), // Load images or render components on demand or progressively
  // onSwipe: () => {}, // Callback after slide changes by swiping // not for test
  pauseOnDotsHover: fc.boolean(), // Prevents autoplay while hovering on dots
  pauseOnFocus: fc.boolean(), // Prevents autoplay while focused on slides
  pauseOnHover: fc.boolean(), // Prevents autoplay while hovering on track
  responsive: fc.constantFrom(...settingsResponsives), // Customize based on breakpoints (see the demo example for better understanding)
  rows: fc.integer(1, 5), // number of rows per slide in the slider, (enables grid mode)
  rtl: fc.boolean(), // Reverses the slide order
  slidesPerRow: fc.integer(1, 5), // number of slides to display in grid mode, this is useful with rows option
  slidesToScroll: fc.integer(1, 5), // How many slides to scroll at once
  slidesToShow: fc.integer(1, 5), // How many slides to show in one frame
  speed: fc.constantFrom(500, 1000), // Animation speed in milliseconds
  swipeToSlide: fc.boolean(), // Enable drag/swipe irrespective of `slidesToScroll`
  swipe: fc.boolean(), // Enable/disable swiping to change slides
  touchMove: fc.boolean(), // touch move
  touchThreshold: fc.integer(1, 20), // touch threshold
  useCSS: fc.boolean(), // Enable/Disable CSS Transitions
  useTransform: fc.boolean(), // Enable/Disable CSS transforms
  variableWidth: fc.boolean(), // variable width
  // vertical: fc.boolean(), // vertical // react has error on vertical settings. disabled.
}

describe('carousel', () => {
  test('should render the same to react slick', () =>
    fc.assert(
      fc.asyncProperty(
        fc.array(fc.constantFrom('<div>item</div> '), 1, 100), // itemHtmls: array of lengths 1 ~ 100 with '<div>item</div>'
        fc.record(settingsModel, { withDeletedKeys: true }),
        async (itemHtmls, settings) => {
          // test only when the conditions meet
          fc.pre(settings.initialSlide < itemHtmls.length)
          fc.pre(settings.centerMode !== (settings.slidesToScroll !== 1))
          fc.pre(settings.fade !== (settings.slidesToScroll !== 1))
          fc.pre(settings.fade !== (settings.slidesToShow !== 1))
          fc.pre(
            settings.variableWidth !==
              (settings.row !== 1 || settings.slidesPerRow),
          )
          // no clone slides if less number of slides than it needs to be on a screen
          if (settings.infinite !== false && settings.fade !== true) {
            fc.pre(
              itemHtmls.length >
                (settings.slidesToShow || 1) *
                  (settings.slidesPerRow || 1) *
                  (settings.rows || 1),
            )
          }
          fc.pre(settings.centerMode !== true)

          const vueCarousel = await vueServerRender(itemHtmls, settings)
          const reactCarousel = reactServerRender(itemHtmls, settings)

          expect(prettify(vueCarousel)).toEqual(prettify(reactCarousel))
        },
      ),
    ))
})
