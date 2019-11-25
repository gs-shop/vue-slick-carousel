export const canUseDOM = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )

export const getPreClones = spec => {
  if (spec.unslick || !spec.infinite) {
    return 0
  }
  if (spec.variableWidth) {
    return spec.slideCount
  }
  return spec.slidesToShow + (spec.centerMode ? 1 : 0)
}

export const getPostClones = spec => {
  if (spec.unslick || !spec.infinite) {
    return 0
  }
  return spec.slideCount
}

// startIndex that needs to be present
export const lazyStartIndex = spec => spec.currentSlide - lazySlidesOnLeft(spec)
export const lazyEndIndex = spec => spec.currentSlide + lazySlidesOnRight(spec)
export const lazySlidesOnLeft = spec =>
  spec.centerMode
    ? Math.floor(spec.slidesToShow / 2) +
      (parseInt(spec.centerPadding) > 0 ? 1 : 0)
    : 0
export const lazySlidesOnRight = spec =>
  spec.centerMode
    ? Math.floor((spec.slidesToShow - 1) / 2) +
      1 +
      (parseInt(spec.centerPadding) > 0 ? 1 : 0)
    : spec.slidesToShow

export const getOnDemandLazySlides = spec => {
  let onDemandSlides = []
  let startIndex = lazyStartIndex(spec)
  let endIndex = lazyEndIndex(spec)
  for (let slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    if (spec.lazyLoadedList.indexOf(slideIndex) < 0) {
      onDemandSlides.push(slideIndex)
    }
  }
  return onDemandSlides
}

export const filterUndefined = props =>
  Object.keys(props)
    .filter(key => props[key] !== undefined)
    .reduce((obj, key) => {
      obj[key] = props[key]
      return obj
    }, {})

// given an object and a list of keys, return new object with given keys
export const extractObject = (spec, keys) => {
  let newObject = {}
  keys.forEach(key => (newObject[key] = spec[key]))
  return newObject
}

export const PROP_KEYS = {
  TRACK: [
    'fade',
    'cssEase',
    'speed',
    'infinite',
    'centerMode',
    'focusOnSelect',
    'currentSlide',
    'lazyLoad',
    'lazyLoadedList',
    'rtl',
    'slideWidth',
    'slideHeight',
    'listHeight',
    'vertical',
    'slidesToShow',
    'slidesToScroll',
    'slideCount',
    'trackStyle',
    'variableWidth',
    'unslick',
    'centerPadding',
    'focusOnSelect',
  ],
  DOT: [
    'dotsClass',
    'slideCount',
    'slidesToShow',
    'currentSlide',
    'slidesToScroll',
    'clickHandler',
    'children',
    'customPaging',
    'infinite',
    'appendDots',
  ],
  ARROW: [
    'infinite',
    'centerMode',
    'currentSlide',
    'slideCount',
    'slidesToShow',
    'prevArrow',
    'nextArrow',
  ],
}

// whether or not we can go next
export const canGoNext = spec => {
  let canGo = true
  if (!spec.infinite) {
    if (spec.centerMode && spec.currentSlide >= spec.slideCount - 1) {
      canGo = false
    } else if (
      spec.slideCount <= spec.slidesToShow ||
      spec.currentSlide >= spec.slideCount - spec.slidesToShow
    ) {
      canGo = false
    }
  }
  return canGo
}

export const slideHandler = spec => {
  const {
    waitForAnimate,
    animating,
    fade,
    infinite,
    index,
    slideCount,
    lazyLoadedList,
    lazyLoad,
    currentSlide,
    centerMode,
    slidesToScroll,
    slidesToShow,
    useCSS,
  } = spec
  if (waitForAnimate && animating) return {}
  let animationSlide = index,
    finalSlide,
    animationLeft,
    finalLeft
  let state = {},
    nextState = {}
  if (fade) {
    if (!infinite && (index < 0 || index >= slideCount)) return {}
    if (index < 0) {
      animationSlide = index + slideCount
    } else if (index >= slideCount) {
      animationSlide = index - slideCount
    }
    if (lazyLoad && lazyLoadedList.indexOf(animationSlide) < 0) {
      lazyLoadedList.push(animationSlide)
    }
    state = {
      animating: true,
      currentSlide: animationSlide,
      lazyLoadedList,
    }
    nextState = { animating: false }
  } else {
    finalSlide = animationSlide
    if (animationSlide < 0) {
      finalSlide = animationSlide + slideCount
      if (!infinite) finalSlide = 0
      else if (slideCount % slidesToScroll !== 0)
        finalSlide = slideCount - (slideCount % slidesToScroll)
    } else if (!canGoNext(spec) && animationSlide > currentSlide) {
      animationSlide = finalSlide = currentSlide
    } else if (centerMode && animationSlide >= slideCount) {
      animationSlide = infinite ? slideCount : slideCount - 1
      finalSlide = infinite ? 0 : slideCount - 1
    } else if (animationSlide >= slideCount) {
      finalSlide = animationSlide - slideCount
      if (!infinite) finalSlide = slideCount - slidesToShow
      else if (slideCount % slidesToScroll !== 0) finalSlide = 0
    }
    animationLeft = getTrackLeft({ ...spec, slideIndex: animationSlide })
    finalLeft = getTrackLeft({ ...spec, slideIndex: finalSlide })
    if (!infinite) {
      if (animationLeft === finalLeft) animationSlide = finalSlide
      animationLeft = finalLeft
    }
    lazyLoad &&
      lazyLoadedList.concat(
        getOnDemandLazySlides({ ...spec, currentSlide: animationSlide }),
      )
    if (!useCSS) {
      state = {
        currentSlide: finalSlide,
        trackStyle: getTrackCSS({ ...spec, left: finalLeft }),
        lazyLoadedList,
      }
    } else {
      state = {
        animating: true,
        currentSlide: finalSlide,
        trackStyle: getTrackAnimateCSS({ ...spec, left: animationLeft }),
        lazyLoadedList,
      }
      nextState = {
        animating: false,
        currentSlide: finalSlide,
        trackStyle: getTrackCSS({ ...spec, left: finalLeft }),
        swipeLeft: null,
      }
    }
  }
  return { state, nextState }
}

// get width of an element
export const getWidth = elem => (elem && elem.offsetWidth) || 0
export const getHeight = elem => (elem && elem.offsetHeight) || 0

// get initialized state
export const initializedState = spec => {
  // spec also contains listRef, trackRef
  let slideCount = spec.children.length
  let listWidth = Math.ceil(getWidth(spec.listRef))
  let trackWidth = Math.ceil(getWidth(spec.trackRef))
  let slideWidth
  if (!spec.vertical) {
    let centerPaddingAdj = spec.centerMode && parseInt(spec.centerPadding) * 2
    if (
      typeof spec.centerPadding === 'string' &&
      spec.centerPadding.slice(-1) === '%'
    ) {
      centerPaddingAdj *= listWidth / 100
    }
    slideWidth = Math.ceil((listWidth - centerPaddingAdj) / spec.slidesToShow)
  } else {
    slideWidth = listWidth
  }
  let slideHeight =
    spec.listRef && getHeight(spec.listRef.querySelector('[data-index="0"]'))
  let listHeight = slideHeight * spec.slidesToShow
  let currentSlide =
    spec.currentSlide === undefined ? spec.initialSlide : spec.currentSlide
  if (spec.rtl && spec.currentSlide === undefined) {
    currentSlide = slideCount - 1 - spec.initialSlide
  }
  let lazyLoadedList = spec.lazyLoadedList || []
  let slidesToLoad = getOnDemandLazySlides(
    { currentSlide, lazyLoadedList },
    spec,
  )
  lazyLoadedList.concat(slidesToLoad)

  let state = {
    slideCount,
    slideWidth,
    listWidth,
    trackWidth,
    currentSlide,
    slideHeight,
    listHeight,
    lazyLoadedList,
  }

  if (spec.autoplaying === null && spec.autoplay) {
    state['autoplaying'] = 'playing'
  }

  return state
}

export const getTrackLeft = spec => {
  if (spec.unslick) {
    return 0
  }

  checkSpecKeys(spec, [
    'slideIndex',
    'trackRef',
    'infinite',
    'centerMode',
    'slideCount',
    'slidesToShow',
    'slidesToScroll',
    'slideWidth',
    'listWidth',
    'variableWidth',
    'slideHeight',
  ])

  const {
    slideIndex,
    trackRef,
    infinite,
    centerMode,
    slideCount,
    slidesToShow,
    slidesToScroll,
    slideWidth,
    listWidth,
    variableWidth,
    slideHeight,
    fade,
    vertical,
  } = spec

  var slideOffset = 0
  var targetLeft
  var targetSlide
  var verticalOffset = 0

  if (fade || spec.slideCount === 1) {
    return 0
  }

  let slidesToOffset = 0
  if (infinite) {
    slidesToOffset = -getPreClones(spec) // bring active slide to the beginning of visual area
    // if next scroll doesn't have enough children, just reach till the end of original slides instead of shifting slidesToScroll children
    if (
      slideCount % slidesToScroll !== 0 &&
      slideIndex + slidesToScroll > slideCount
    ) {
      slidesToOffset = -(slideIndex > slideCount
        ? slidesToShow - (slideIndex - slideCount)
        : slideCount % slidesToScroll)
    }
    // shift current slide to center of the frame
    if (centerMode) {
      slidesToOffset += parseInt(slidesToShow / 2)
    }
  } else {
    if (
      slideCount % slidesToScroll !== 0 &&
      slideIndex + slidesToScroll > slideCount
    ) {
      slidesToOffset = slidesToShow - (slideCount % slidesToScroll)
    }
    if (centerMode) {
      slidesToOffset = parseInt(slidesToShow / 2)
    }
  }
  slideOffset = slidesToOffset * slideWidth
  verticalOffset = slidesToOffset * slideHeight

  if (!vertical) {
    targetLeft = slideIndex * slideWidth * -1 + slideOffset
  } else {
    targetLeft = slideIndex * slideHeight * -1 + verticalOffset
  }

  if (variableWidth === true) {
    var targetSlideIndex
    let trackElem = trackRef.$el
    targetSlideIndex = slideIndex + getPreClones(spec)
    targetSlide = trackElem && trackElem.childNodes[targetSlideIndex]
    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0
    if (centerMode === true) {
      targetSlideIndex = infinite ? slideIndex + getPreClones(spec) : slideIndex
      targetSlide = trackElem && trackElem.children[targetSlideIndex]
      targetLeft = 0
      for (let slide = 0; slide < targetSlideIndex; slide++) {
        targetLeft -=
          trackElem &&
          trackElem.children[slide] &&
          trackElem.children[slide].offsetWidth
      }
      targetLeft -= parseInt(spec.centerPadding)
      targetLeft += targetSlide && (listWidth - targetSlide.offsetWidth) / 2
    }
  }

  return targetLeft
}

export const getTotalSlides = spec =>
  spec.slideCount === 1
    ? 1
    : getPreClones(spec) + spec.slideCount + getPostClones(spec)

export const checkSpecKeys = (spec, keysArray) =>
  keysArray.reduce((value, key) => value && spec.hasOwnProperty(key), true)
    ? null
    : console.error('Keys Missing:', spec)

export const getTrackCSS = spec => {
  checkSpecKeys(spec, [
    'left',
    'variableWidth',
    'slideCount',
    'slidesToShow',
    'slideWidth',
  ])
  let trackWidth, trackHeight
  const trackChildren = spec.slideCount + 2 * spec.slidesToShow
  if (!spec.vertical) {
    trackWidth = getTotalSlides(spec) * spec.slideWidth
  } else {
    trackHeight = trackChildren * spec.slideHeight
  }
  let style = {
    opacity: 1,
    transition: '',
    WebkitTransition: '',
  }
  if (spec.useTransform) {
    let WebkitTransform = !spec.vertical
      ? 'translate3d(' + spec.left + 'px, 0px, 0px)'
      : 'translate3d(0px, ' + spec.left + 'px, 0px)'
    let transform = !spec.vertical
      ? 'translate3d(' + spec.left + 'px, 0px, 0px)'
      : 'translate3d(0px, ' + spec.left + 'px, 0px)'
    let msTransform = !spec.vertical
      ? 'translateX(' + spec.left + 'px)'
      : 'translateY(' + spec.left + 'px)'
    style = {
      ...style,
      WebkitTransform,
      transform,
      msTransform,
    }
  } else {
    if (spec.vertical) {
      style['top'] = spec.left
    } else {
      style['left'] = spec.left
    }
  }
  if (spec.fade) style = { opacity: 1 }
  if (trackWidth) style.width = trackWidth
  if (trackHeight) style.height = trackHeight

  // Fallback for IE8
  if (window && !window.addEventListener && window.attachEvent) {
    if (!spec.vertical) {
      style.marginLeft = spec.left + 'px'
    } else {
      style.marginTop = spec.left + 'px'
    }
  }

  return style
}

export const getTrackAnimateCSS = spec => {
  checkSpecKeys(spec, [
    'left',
    'variableWidth',
    'slideCount',
    'slidesToShow',
    'slideWidth',
    'speed',
    'cssEase',
  ])
  let style = getTrackCSS(spec)
  // useCSS is true by default so it can be undefined
  if (spec.useTransform) {
    style.WebkitTransition =
      '-webkit-transform ' + spec.speed + 'ms ' + spec.cssEase
    style.transition = 'transform ' + spec.speed + 'ms ' + spec.cssEase
  } else {
    if (spec.vertical) {
      style.transition = 'top ' + spec.speed + 'ms ' + spec.cssEase
    } else {
      style.transition = 'left ' + spec.speed + 'ms ' + spec.cssEase
    }
  }
  return style
}
