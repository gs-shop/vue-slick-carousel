<script>
import { PROP_KEYS, canGoNext } from './innerSliderUtils'
import { mergeVNodeData, setVNodeData } from './vNodeUtils'

export default {
  name: 'SliderArrow',
  props: [...PROP_KEYS.ARROW, 'type'],
  render() {
    let classes = { 'slick-arrow': true }
    let clickable = true
    let arrow
    let option = {
      currentSlide: this.currentSlide,
      slideCount: this.slideCount,
    }
    if (this.type === 'previous') {
      classes['slick-prev'] = true
      if (
        !this.infinite &&
        (this.currentSlide === 0 || this.slideCount <= this.slidesToShow)
      ) {
        classes['slick-disabled'] = true
        clickable = false
      }

      option.key = '0'
      arrow = this.prevArrow ? (
        this.prevArrow(option)[0]
      ) : (
        <button type="button" data-role="none" style="display: block;">
          Previous
        </button>
      )
    } else {
      classes['slick-next'] = true
      if (!canGoNext(this.$props)) {
        classes['slick-disabled'] = true
        clickable = false
      }

      option.key = '1'
      arrow = this.nextArrow ? (
        this.nextArrow(option)[0]
      ) : (
        <button type="button" data-role="none" style="display: block;">
          Next
        </button>
      )
    }
    setVNodeData(arrow, 'key', option.key)
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
</script>
<style scoped>
.slick-arrow.slick-hidden {
  display: none;
}
</style>
