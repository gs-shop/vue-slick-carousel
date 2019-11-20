import fc from 'fast-check'
import Vue from 'vue/dist/vue'
import { createRenderer } from 'vue-server-renderer'
import VueSlickCarousel from '@/VueSlickCarousel'

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

  const template = document.createElement('template')
  template.innerHTML = renderedString

  return template.content.firstChild
}

describe('carousel', () => {
  test('should render the same to react slick', () =>
    fc.assert(
      fc.asyncProperty(
        fc.array(fc.constantFrom('<div>item</div>'), 1, 100), // itemHtmls: array of lengths 1 ~ 100 with '<div>item</div>'
        async itemHtmls => {
          const vueCarousel = await vueServerRender(itemHtmls)
          expect(vueCarousel).toBeTruthy()
        },
      ),
    ))
})
