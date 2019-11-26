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

const vueServerRender = async (itemHtmls = []) => {
  const renderedString = await vueRenderer.renderToString(
    new Vue({
      template: `<vue-slick-carousel>${itemHtmls.join(
        '',
      )}</vue-slick-carousel>`,
      components: { VueSlickCarousel },
    }),
  )

  return new JSDOM(renderedString).window.document.body.firstElementChild
}

const reactParser = new Parser()

const reactServerRender = (itemHtmls = []) => {
  const renderedString = ReactDOMServer.renderToString(
    React.createElement(
      ReactSlickCarousel,
      null,
      reactParser.parse(itemHtmls.join('')),
    ),
  )

  return new JSDOM(renderedString).window.document.body.firstElementChild
}

const prettify = element => {
  // remove react, vue specific attrs
  element.removeAttribute('data-server-rendered')
  element.removeAttribute('data-reactroot')

  // pad ending semicolon to style
  element.querySelectorAll('*').forEach(el => {
    const { cssText } = el.style
    el.style.cssText =
      cssText && cssText.substr(-1) !== ';' ? cssText + ';`' : cssText
  })

  const options = prettyDiff.options
  options.source = stripHtmlComments(element.outerHTML)
  options.mode = 'beautify'
  options.attribute_sort = true
  options.force_attribute = true
  options.force_indent = true

  return prettyDiff()
}

describe('carousel', () => {
  test('should render the same to react slick', () =>
    fc.assert(
      fc.asyncProperty(
        fc.array(fc.constantFrom('<div>item</div>'), 1, 100), // itemHtmls: array of lengths 1 ~ 100 with '<div>item</div>'
        async itemHtmls => {
          const vueCarousel = await vueServerRender(itemHtmls)
          const reactCarousel = reactServerRender(itemHtmls)

          expect(prettify(vueCarousel)).toEqual(prettify(reactCarousel))
        },
      ),
    ))
})
