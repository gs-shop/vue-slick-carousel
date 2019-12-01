import { PROP_KEYS, canGoNext } from '@/innerSliderUtils'
import { mergeVNodeData, setVNodeData } from '@/vNodeUtils'

export default {
  name: 'SliderArrow',
  props: [...PROP_KEYS.ARROW, 'clickHandler', 'type'],
  render(h) {
    let classes = { 'slick-arrow': true }
    let clickHandler = this.clickHandler.bind(this, { message: this.type })
    let arrow
    let key
    if (this.type === 'previous') {
      classes['slick-prev'] = true
      if (
        !this.infinite &&
        (this.currentSlide === 0 || this.slideCount <= this.slidesToShow)
      ) {
        classes['slick-disabled'] = true
        clickHandler = null
      }

      key = '0'
      arrow = this.prevArrow(h, {
        key,
        currentSlide: this.currentSlide,
        slideCount: this.slideCount,
      })
    } else {
      classes['slick-next'] = true
      if (!canGoNext(this.$props)) {
        classes['slick-disabled'] = true
        clickHandler = null
      }
      key = '1'
      arrow = this.nextArrow(h, {
        key,
        currentSlide: this.currentSlide,
        slideCount: this.slideCount,
      })
    }
    setVNodeData(arrow, 'key', key)
    mergeVNodeData(arrow, 'class', classes)
    if (clickHandler) {
      mergeVNodeData(arrow, 'on', {
        click: clickHandler,
      })
    }

    return arrow
  },
}
