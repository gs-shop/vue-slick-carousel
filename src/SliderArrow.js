import { PROP_KEYS, canGoNext } from '@/innerSliderUtils'
import { mergeVNodeData, setVNodeData } from '@/vNodeUtils'

export default {
  name: 'SliderArrow',
  props: [...PROP_KEYS.ARROW, 'type'],
  render(h) {
    let classes = { 'slick-arrow': true }
    let clickable = true
    let arrow
    let key
    if (this.type === 'previous') {
      classes['slick-prev'] = true
      if (
        !this.infinite &&
        (this.currentSlide === 0 || this.slideCount <= this.slidesToShow)
      ) {
        classes['slick-disabled'] = true
        clickable = false
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
        clickable = false
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
    mergeVNodeData(arrow, 'on', {
      click: () => {
        if (clickable) {
          this.$emit('arrowClicked', { message: this.type })
        }
      },
    })

    return arrow
  },
}
