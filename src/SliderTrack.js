import {
  PROP_KEYS,
  lazyStartIndex,
  lazyEndIndex,
  getPreClones,
} from '@/innerSliderUtils'
import { cloneVNode, getData, mergeVNodeData } from '@/vNodeUtils'

const getSlideClasses = spec => {
  let slickActive, slickCenter, slickCloned
  let centerOffset, index

  if (spec.rtl) {
    index = spec.slideCount - 1 - spec.index
  } else {
    index = spec.index
  }
  slickCloned = index < 0 || index >= spec.slideCount
  if (spec.centerMode) {
    centerOffset = Math.floor(spec.slidesToShow / 2)
    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0
    if (
      index > spec.currentSlide - centerOffset - 1 &&
      index <= spec.currentSlide + centerOffset
    ) {
      slickActive = true
    }
  } else {
    slickActive =
      spec.currentSlide <= index &&
      index < spec.currentSlide + spec.slidesToShow
  }
  let slickCurrent = index === spec.currentSlide
  return {
    'slick-slide': true,
    'slick-active': slickActive,
    'slick-center': slickCenter,
    'slick-cloned': slickCloned,
    'slick-current': slickCurrent, // dubious in case of RTL
  }
}

const getSlideStyle = spec => {
  let style = {}

  if (spec.variableWidth === undefined || spec.variableWidth === false) {
    style.width = spec.slideWidth
  }

  if (spec.fade) {
    style.position = 'relative'
    if (spec.vertical) {
      style.top = -spec.index * parseInt(spec.slideHeight)
    } else {
      style.left = -spec.index * parseInt(spec.slideWidth)
    }
    style.opacity = spec.currentSlide === spec.index ? 1 : 0
    style.transition =
      'opacity ' +
      spec.speed +
      'ms ' +
      spec.cssEase +
      ', ' +
      'visibility ' +
      spec.speed +
      'ms ' +
      spec.cssEase
    style.WebkitTransition =
      'opacity ' +
      spec.speed +
      'ms ' +
      spec.cssEase +
      ', ' +
      'visibility ' +
      spec.speed +
      'ms ' +
      spec.cssEase
  }

  return style
}

const getKey = (child, fallbackKey) => child.key || fallbackKey

const cloneSlide = (slide, options) => {
  let clone = cloneVNode(slide)
  clone.key = options.key
  mergeVNodeData(clone, 'class', options.class)
  mergeVNodeData(clone, 'attrs', options.attrs)
  mergeVNodeData(clone, 'style', options.style)
  mergeVNodeData(clone, 'on', {
    click: e => {
      getData(slide, 'on.click', () => {})(e)
      if (options.focusOnSelect) {
        options.focusOnSelect(options.childOnClickOptions)
      }
    },
  })

  return clone
}

const renderSlides = (h, spec, children) => {
  let key
  let slides = []
  let preCloneSlides = []
  let postCloneSlides = []
  let childrenCount = children.length
  let startIndex = lazyStartIndex(spec)
  let endIndex = lazyEndIndex(spec)

  children.forEach((elem, index) => {
    let child
    let childOnClickOptions = {
      message: 'children',
      index: index,
      slidesToScroll: spec.slidesToScroll,
      currentSlide: spec.currentSlide,
    }

    // in case of lazyLoad, whether or not we want to fetch the slide
    if (
      !spec.lazyLoad ||
      (spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0)
    ) {
      child = elem
    } else {
      child = <div />
    }
    let childStyle = getSlideStyle({ ...spec, index })
    let slideClasses = getSlideClasses({ ...spec, index })
    // push a cloned element of the desired slide
    slides.push(
      cloneSlide(child, {
        key: 'original' + getKey(child, index),
        class: slideClasses,
        childStyle,
        style: {
          outline: 'none',
          ...childStyle,
        },
        attrs: {
          tabIndex: '-1',
          'data-index': index,
          'aria-hidden': !slideClasses['slick-active'],
        },
        childOnClickOptions,
        focusOnSelect: spec.focusOnSelect,
      }),
    )

    // if slide needs to be precloned or postcloned
    if (spec.infinite && spec.fade === false) {
      let preCloneNo = childrenCount - index
      if (
        preCloneNo <= getPreClones(spec) &&
        childrenCount !== spec.slidesToShow
      ) {
        key = -preCloneNo
        if (key >= startIndex) {
          child = elem
        }
        slideClasses = getSlideClasses({ ...spec, index: key })
        preCloneSlides.push(
          cloneSlide(child, {
            key: 'precloned' + getKey(child, key),
            class: slideClasses,
            style: childStyle,
            attrs: {
              tabIndex: '-1',
              'data-index': key,
              'aria-hidden': !slideClasses['slick-active'],
            },
            childOnClickOptions,
            focusOnSelect: spec.focusOnSelect,
          }),
        )
      }

      if (childrenCount !== spec.slidesToShow) {
        key = childrenCount + index
        if (key < endIndex) {
          child = elem
        }
        slideClasses = getSlideClasses({ ...spec, index: key })
        postCloneSlides.push(
          cloneSlide(child, {
            key: 'postcloned' + getKey(child, key),
            class: slideClasses,
            style: childStyle,
            attrs: {
              tabIndex: '-1',
              'data-index': key,
              'aria-hidden': !slideClasses['slick-active'],
            },
            childOnClickOptions,
            focusOnSelect: spec.focusOnSelect,
          }),
        )
      }
    }
  })

  if (spec.rtl) {
    return preCloneSlides.concat(slides, postCloneSlides).reverse()
  } else {
    return preCloneSlides.concat(slides, postCloneSlides)
  }
}

export default {
  name: 'SliderTrack',
  props: PROP_KEYS.TRACK,
  render(h) {
    const slides = renderSlides(h, this.$props, this.$slots.default)
    return (
      <div className="slick-track" style={this.trackStyle}>
        {slides}
      </div>
    )
  },
}
