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
  const renderedString = await vueRenderer.renderToString(
    new Vue({
      template: `<vue-slick-carousel v-bind="settings">${itemHtmls.join(
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

const settingsModel = {
  arrows: fc.boolean(), // Prev/Next Arrows
}

describe('carousel', () => {
  test('should render the same to react slick', () =>
    fc.assert(
      fc.asyncProperty(
        fc.array(fc.constantFrom('<div>item</div>'), 1, 100), // itemHtmls: array of lengths 1 ~ 100 with '<div>item</div>'
        fc.record(settingsModel, { withDeletedKeys: true }),
        async (itemHtmls, settings) => {
          const vueCarousel = await vueServerRender(itemHtmls, settings)
          const reactCarousel = reactServerRender(itemHtmls, settings)

          expect(prettify(vueCarousel)).toEqual(prettify(reactCarousel))
        },
      ),
    ))
})
