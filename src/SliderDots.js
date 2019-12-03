import { PROP_KEYS } from '@/innerSliderUtils'
import { mergeVNodeData } from '@/vNodeUtils'

const getDotCount = spec => {
  let dots

  if (spec.infinite) {
    dots = Math.ceil(spec.slideCount / spec.slidesToScroll)
  } else {
    dots =
      Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1
  }

  return dots
}

export default {
  name: 'SliderDots',
  props: PROP_KEYS.DOT,
  render(h) {
    let dotCount = getDotCount({
      slideCount: this.slideCount,
      slidesToScroll: this.slidesToScroll,
      slidesToShow: this.slidesToShow,
      infinite: this.infinite,
    })

    // Apply join & split to Array to pre-fill it for IE8
    //
    // Credit: http://stackoverflow.com/a/13735425/1849458
    let dots = Array.apply(
      null,
      Array(dotCount + 1)
        .join('0')
        .split(''),
    ).map((x, i) => {
      let leftBound = i * this.slidesToScroll
      let rightBound = i * this.slidesToScroll + (this.slidesToScroll - 1)
      let className = {
        'slick-active':
          this.currentSlide >= leftBound && this.currentSlide <= rightBound,
      }

      let dotOptions = {
        message: 'dots',
        index: i,
        slidesToScroll: this.slidesToScroll,
        currentSlide: this.currentSlide,
      }

      return (
        <li
          key={i}
          class={className}
          onClick={() => this.$emit('dotClicked', dotOptions)}>
          {this.customPaging(h, i)}
        </li>
      )
    })

    const wrapper = this.appendDots(h, dots)
    mergeVNodeData(wrapper, 'class', {
      [this.dotsClass]: true,
    })
    wrapper.children = dots
    return wrapper
  },
}
