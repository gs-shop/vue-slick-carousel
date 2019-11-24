import SliderTrack from '@/SliderTrack'
import SliderArrow from '@/SliderArrow'
import SliderDots from '@/SliderDots'

import defaultProps from '@/defaultProps'
import initialState from '@/initialState'

import { getStyle } from '@/vNodeUtils'
import { getPreClones, getPostClones } from '@/innerSliderUtils'

export default {
  name: 'InnerSlider',
  components: {
    SliderTrack,
    SliderArrow,
    SliderDots,
  },
  inheritAttrs: false,
  props: Object.keys(defaultProps),
  data() {
    return { ...initialState, currentSlide: this.initialSlide }
  },
  computed: {
    slideCount() {
      return this.$slots.default.length
    },
  },
  created() {
    // non-reactive data
    this.callbackTimers = []
    this.clickable = true
    this.debouncedResize = null

    this.ssrInit()
    if (this.onInit) {
      this.onInit()
    }
  },
  methods: {
    slickPrev() {
      throw Error('not implemented yet')
    },
    slickNext() {
      throw Error('not implemented yet')
    },
    slickGoTo() {
      throw Error('not implemented yet')
    },
    pause() {
      throw Error('not implemented yet')
    },
    autoPlay() {
      throw Error('not implemented yet')
    },
    ssrInit() {
      const spec = {
        ...this.$props,
        ...this.$data,
        slideCount: this.slideCount,
      }
      const preClones = getPreClones(spec)
      const postClones = getPostClones(spec)
      if (this.variableWidth) {
        let trackWidth = [],
          trackLeft = []
        let childrenWidths = []
        this.$slots.default.forEach(child => {
          const { width } = getStyle(child)
          childrenWidths.push(width)
          trackWidth.push(width)
        })
        for (let i = 0; i < preClones; i++) {
          trackLeft.push(childrenWidths[childrenWidths.length - 1 - i])
          trackWidth.push(childrenWidths[childrenWidths.length - 1 - i])
        }
        for (let i = 0; i < postClones; i++) {
          trackWidth.push(childrenWidths[i])
        }
        for (let i = 0; i < this.currentSlide; i++) {
          trackLeft.push(childrenWidths[i])
        }
        // filter undefined
        trackWidth = trackWidth.filter(o => o)
        trackLeft = trackLeft.filter(o => o)
        let trackStyle = {
          width: `calc(${trackWidth.join(' + ')})`,
          left: `calc(${trackLeft.map(o => `-${o}`).join(' + ')})`,
        }
        if (this.centerMode) {
          let currentWidth = childrenWidths[this.currentSlide]
          trackStyle.left = `calc(${trackLeft
            .map(o => `-${o}`)
            .join(' + ')} + (100% - ${currentWidth}) / 2 )`
        }
        this.trackStyle = trackStyle
      } else {
        let slideCount = preClones + postClones + this.slideCount
        let trackWidth = (100 / this.slidesToShow) * slideCount
        let slideWidth = 100 / slideCount
        let trackLeft =
          (-slideWidth * (preClones + this.currentSlide) * trackWidth) / 100
        if (this.centerMode) {
          trackLeft += (100 - (slideWidth * trackWidth) / 100) / 2
        }
        this.slideWidth = slideWidth + '%'
        this.trackStyle = {
          width: trackWidth + '%',
          left: trackLeft + '%',
        }
      }
    },
  },
  render() {
    let prevArrow = <SliderArrow />
    let nextArrow = <SliderArrow />
    let dots = <SliderDots />

    let listProps = {}
    let trackProps = {}

    return (
      <div>
        {!this.unslick ? prevArrow : ''}
        <div ref="list" {...listProps}>
          <SliderTrack ref="track" {...trackProps}>
            {this.$slots.default}
          </SliderTrack>
        </div>
        {!this.unslick ? nextArrow : ''}
        {!this.unslick ? dots : ''}
      </div>
    )
  },
}
