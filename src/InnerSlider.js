import SliderTrack from '@/SliderTrack'
import SliderArrow from '@/SliderArrow'
import SliderDots from '@/SliderDots'

import defaultProps from '@/defaultProps'
import initialState from '@/initialState'

import { getStyle } from '@/vNodeUtils'
import {
  PROP_KEYS,
  extractObject,
  filterUndefined,
  getPreClones,
  getPostClones,
  getOnDemandLazySlides,
} from '@/innerSliderUtils'

export default {
  name: 'InnerSlider',
  components: {
    SliderTrack,
    SliderArrow,
    SliderDots,
  },
  inheritAttrs: false,
  props: [...Object.keys(defaultProps), 'unslick'],
  data() {
    return { ...initialState, currentSlide: this.initialSlide }
  },
  computed: {
    slideCount() {
      return this.$slots.default.length
    },
    spec() {
      return {
        ...this.$props,
        ...this.$data,
        slideCount: this.slideCount,
      }
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
    if (this.lazyLoad) {
      let slidesToLoad = getOnDemandLazySlides(this.spec)
      if (slidesToLoad.length > 0) {
        this.lazyLoadedList = this.lazyLoadedList.concat(slidesToLoad)
        if (this.onLazyLoad) {
          this.onLazyLoad(slidesToLoad)
        }
      }
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
      const preClones = getPreClones(this.spec)
      const postClones = getPostClones(this.spec)
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
    onTrackOver() {
      console.log('on track over')
    },
    onTrackLeave() {
      console.log('on track leave')
    },
    selectHandler() {
      console.log('select handler')
    },
    clickHandler() {
      console.log('click')
    },
    keyHandler() {
      console.log('key')
    },
    changeSlide() {
      console.log('change slide')
    },
    swipeStart() {
      console.log('swipe start')
    },
    swipeMove() {
      console.log('swipe move')
    },
    swipeEnd() {
      console.log('swipe end')
    },
    onDotsOver() {
      console.log('dot over')
    },
    onDotsLeave() {
      console.log('dot leave')
    },
  },
  render() {
    const className = {
      'slick-slider': true,
      'slick-initialized': true,
      'slick-vertical': this.vertical,
    }
    let trackProps = extractObject(this.spec, PROP_KEYS.TRACK)
    trackProps = filterUndefined({
      ...trackProps,
      focusOnSelect: this.focusOnSelect ? this.selectHandler : undefined,
    })
    const { pauseOnHover } = this
    const trackNativeOn = filterUndefined({
      mouseenter: pauseOnHover ? this.onTrackOver : undefined,
      mouseover: pauseOnHover ? this.onTrackOver : undefined,
      mouseleave: pauseOnHover ? this.onTrackLeave : undefined,
    })

    let dots
    if (this.dots === true && this.slideCount >= this.slidesToShow) {
      let dotProps = extractObject(this.spec, PROP_KEYS.DOT)
      dotProps.clickHandler = this.changeSlide
      const { pauseOnDotsHover } = this
      const dotNativeOn = filterUndefined({
        mouseenter: pauseOnDotsHover ? this.onDotsLeave : undefined,
        mouseover: pauseOnDotsHover ? this.onDotsOver : undefined,
        mouseleave: pauseOnDotsHover ? this.onDotsLeave : undefined,
      })
      dots = (
        <SliderDots {...{ props: dotProps }} {...{ nativeOn: dotNativeOn }} />
      )
    }

    let prevArrow, nextArrow
    let arrowProps = extractObject(this.spec, PROP_KEYS.ARROW)
    arrowProps.clickHandler = this.changeSlide

    if (this.arrows) {
      prevArrow = <SliderArrow {...{ props: arrowProps }} />
      nextArrow = <SliderArrow {...{ props: arrowProps }} />
    }

    var verticalHeightStyle = null
    if (this.vertical) {
      verticalHeightStyle = {
        height: this.listHeight,
      }
    }

    var centerPaddingStyle = null
    if (this.vertical === false) {
      if (this.centerMode === true) {
        centerPaddingStyle = {
          padding: '0px ' + this.centerPadding,
        }
      }
    } else {
      if (this.centerMode === true) {
        centerPaddingStyle = {
          padding: this.centerPadding + ' 0px',
        }
      }
    }
    let listStyle = {}
    if (!this.unslick) {
      listStyle = { ...verticalHeightStyle, ...centerPaddingStyle }
    }

    const { accessibility, dragging, touchMove } = this
    const listOn = filterUndefined({
      click: this.clickHandler,
      mousedown: touchMove ? this.swipeStart : undefined,
      mousemove: dragging && touchMove ? this.swipeMove : undefined,
      mouseup: touchMove ? this.swipeEnd : undefined,
      mouseleave: dragging && touchMove ? this.swipeEnd : undefined,
      touchstart: touchMove ? this.swipeStart : undefined,
      touchmove: dragging && touchMove ? this.swipeMove : undefined,
      touchend: touchMove ? this.swipeEnd : undefined,
      touchcancel: dragging && touchMove ? this.swipeEnd : undefined,
      keydown: accessibility ? this.keyHandler : undefined,
    })

    return (
      <div class={className} dir={!this.unslick ? 'ltr' : false}>
        {!this.unslick ? prevArrow : ''}
        <div
          ref="list"
          class={'slick-list'}
          {...{ on: listOn }}
          style={listStyle}>
          <SliderTrack
            ref="track"
            {...{ props: trackProps }}
            {...{ nativeOn: trackNativeOn }}>
            {this.$slots.default}
          </SliderTrack>
        </div>
        {!this.unslick ? nextArrow : ''}
        {!this.unslick ? dots : ''}
      </div>
    )
  },
}
