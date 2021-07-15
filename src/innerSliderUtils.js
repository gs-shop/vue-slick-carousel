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

export const keyHandler = (e, accessibility, rtl) => {
  if (e.target.tagName.match('TEXTAREA|INPUT|SELECT') || !accessibility)
    return ''
  if (e.keyCode === 37) return rtl ? 'next' : 'previous'
  if (e.keyCode === 39) return rtl ? 'previous' : 'next'
  return ''
}

export const siblingDirection = spec => {
  if (spec.targetSlide > spec.currentSlide) {
    if (spec.targetSlide > spec.currentSlide + slidesAfter(spec)) {
      return spec.rtl ? 'right' : 'left'
    }
    return spec.rtl ? 'left' : 'right'
  } else {
    if (spec.targetSlide < spec.currentSlide - slidesBefore(spec)) {
      return spec.rtl ? 'left' : 'right'
    }
    return spec.rtl ? 'right' : 'left'
  }
}

export const slidesAfter = ({ slidesToShow, centerMode, centerPadding }) => {
  // returns no of slides on the right of active slide
  if (centerMode) {
    let after = (slidesToShow - 1) / 2 + 1
    if (parseInt(centerPadding) > 0) after += 1
    return after
  }
  return slidesToShow - 1
}

export const slidesBefore = ({ slidesToShow, centerMode, centerPadding }) => {
  // returns no of slides on the left of active slide
  if (centerMode) {
    let before = (slidesToShow - 1) / 2 + 1
    if (parseInt(centerPadding) > 0) before += 1
    return before
  }
  return 0
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

export const changeSlide = (spec, options) => {
  let indexOffset, previousInt, slideOffset, unevenOffset, targetSlide
  const {
    slidesToScroll,
    slidesToShow,
    slideCount,
    currentSlide,
    lazyLoad,
    infinite,
  } = spec
  unevenOffset = slideCount % slidesToScroll !== 0
  indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll

  if (options.message === 'previous') {
    slideOffset =
      indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset
    targetSlide = currentSlide - slideOffset
    if (lazyLoad && !infinite) {
      previousInt = currentSlide - slideOffset
      targetSlide = previousInt === -1 ? slideCount - 1 : previousInt
    }
  } else if (options.message === 'next') {
    slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset
    targetSlide = currentSlide + slideOffset
    if (lazyLoad && !infinite) {
      targetSlide = ((currentSlide + slidesToScroll) % slideCount) + indexOffset
    }
  } else if (options.message === 'dots') {
    // Click on dots
    targetSlide = options.index * options.slidesToScroll
    if (targetSlide === options.currentSlide) {
      return null
    }
  } else if (options.message === 'children') {
    // Click on the slides
    targetSlide = options.index
    if (targetSlide === options.currentSlide) {
      return null
    }
    if (infinite) {
      let direction = siblingDirection({ ...spec, targetSlide })
      if (
        targetSlide > options.currentSlide &&
        direction === (spec.rtl ? 'right' : 'left')
      ) {
        targetSlide = targetSlide - slideCount
      } else if (
        targetSlide < options.currentSlide &&
        direction === (spec.rtl ? 'left' : 'right')
      ) {
        targetSlide = targetSlide + slideCount
      }
    }
  } else if (options.message === 'index') {
    targetSlide = Number(options.index)
    if (targetSlide === options.currentSlide) {
      return null
    }
  }
  return targetSlide
}

export const filterUndefined = props =>
  Object.keys(props)
    .filter(key => props[key] !== undefined)
    .reduce((obj, key) => {
      obj[key] = props[key]
      return obj
    }, {})

export const filterUndefinedOrNull = props =>
  Object.keys(props)
    .filter(key => props[key] !== undefined && props[key] !== null)
    .reduce((obj, key) => {
      obj[key] = props[key]
      return obj
    }, {})

export const swipeStart = (e, swipe, draggable) => {
  if (!swipe || (!draggable && e.type.indexOf('mouse') !== -1)) return ''
  return {
    dragging: true,
    touchObject: {
      startX: e.touches ? e.touches[0].pageX : e.clientX,
      startY: e.touches ? e.touches[0].pageY : e.clientY,
      curX: e.touches ? e.touches[0].pageX : e.clientX,
      curY: e.touches ? e.touches[0].pageY : e.clientY,
    },
  }
}
export const swipeMove = (e, spec) => {
  // spec also contains, trackRef and slideIndex
  const {
    scrolling,
    animating,
    vertical,
    swipeToSlide,
    verticalSwiping,
    rtl,
    currentSlide,
    edgeFriction,
    edgeDragged,
    onEdge,
    swiped,
    swiping,
    slideCount,
    slidesToScroll,
    infinite,
    touchObject,
    swipeEvent,
    listHeight,
    listWidth,
  } = spec
  if (scrolling) return
  if (animating) return e.preventDefault()
  if (vertical && swipeToSlide && verticalSwiping) e.preventDefault()
  let swipeLeft,
    state = {}
  let curLeft = getTrackLeft(spec)
  touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX
  touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY
  touchObject.swipeLength = Math.round(
    Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)),
  )
  let verticalSwipeLength = Math.round(
    Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2)),
  )
  if (!verticalSwiping && !swiping && verticalSwipeLength > 10) {
    return { scrolling: true }
  }
  if (verticalSwiping) touchObject.swipeLength = verticalSwipeLength
  let positionOffset =
    (!rtl ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1)
  if (verticalSwiping)
    positionOffset = touchObject.curY > touchObject.startY ? 1 : -1

  let dotCount = Math.ceil(slideCount / slidesToScroll)
  let swipeDirection = getSwipeDirection(spec.touchObject, verticalSwiping, rtl)
  let touchSwipeLength = touchObject.swipeLength
  if (!infinite) {
    if (
      (currentSlide === 0 && swipeDirection === 'right') ||
      (currentSlide + 1 >= dotCount && swipeDirection === 'left') ||
      (!canGoNext(spec) && swipeDirection === 'left')
    ) {
      touchSwipeLength = touchObject.swipeLength * edgeFriction
      if (edgeDragged === false && onEdge) {
        onEdge(swipeDirection)
        state['edgeDragged'] = true
      }
    }
  }
  if (!swiped && swipeEvent) {
    swipeEvent(swipeDirection)
    state['swiped'] = true
  }
  if (!vertical) {
    swipeLeft = curLeft + touchSwipeLength * positionOffset
  } else {
    swipeLeft =
      curLeft + touchSwipeLength * (listHeight / listWidth) * positionOffset
  }
  if (verticalSwiping) {
    swipeLeft = curLeft + touchSwipeLength * positionOffset
  }
  state = {
    ...state,
    touchObject,
    swipeLeft,
    trackStyle: getTrackCSS({ ...spec, left: swipeLeft }),
  }
  if (
    Math.abs(touchObject.curX - touchObject.startX) <
    Math.abs(touchObject.curY - touchObject.startY) * 0.8
  ) {
    return state
  }
  if (touchObject.swipeLength > 10) {
    state['swiping'] = true
    e.preventDefault()
  }
  return state
}
export const swipeEnd = (e, spec) => {
  const {
    dragging,
    swipe,
    touchObject,
    listWidth,
    touchThreshold,
    verticalSwiping,
    listHeight,
    currentSlide,
    swipeToSlide,
    scrolling,
    onSwipe,
    rtl,
  } = spec
  if (!dragging) {
    if (swipe) e.preventDefault()
    return {}
  }
  let minSwipe = verticalSwiping
    ? listHeight / touchThreshold
    : listWidth / touchThreshold
  let swipeDirection = getSwipeDirection(touchObject, verticalSwiping, rtl)
  // reset the state of touch related state variables.
  let state = {
    dragging: false,
    edgeDragged: false,
    scrolling: false,
    swiping: false,
    swiped: false,
    swipeLeft: null,
    touchObject: {},
  }
  if (scrolling) {
    return state
  }
  if (!touchObject.swipeLength) {
    return state
  }
  if (touchObject.swipeLength > minSwipe) {
    e.preventDefault()
    if (onSwipe) {
      onSwipe(swipeDirection)
    }
    let slideCount, newSlide
    switch (swipeDirection) {
      case 'left':
      case 'up':
        newSlide = currentSlide + getSlideCount(spec)
        slideCount = swipeToSlide ? newSlide : checkNavigable(spec, newSlide)
        state['currentDirection'] = 0
        break
      case 'right':
      case 'down':
        newSlide = currentSlide - getSlideCount(spec)
        slideCount = swipeToSlide ? newSlide : checkNavigable(spec, newSlide)
        state['currentDirection'] = 1
        break
      default:
        slideCount = currentSlide
    }
    state['triggerSlideHandler'] = slideCount
  } else {
    // Adjust the track back to it's original position.
    let currentLeft = getTrackLeft(spec)
    state['trackStyle'] = getTrackAnimateCSS({ ...spec, left: currentLeft })
  }
  return state
}
export const getNavigableIndexes = spec => {
  let max = spec.infinite ? spec.slideCount * 2 : spec.slideCount
  let breakpoint = spec.infinite ? spec.currentSlide : 0
  let indexes = []
  while (breakpoint < max) {
    indexes.push(breakpoint)
    breakpoint += Math.min(spec.slidesToScroll, spec.slidesToShow)
  }
  if (spec.infinite) {
    for (
      breakpoint =
        spec.currentSlide - Math.min(spec.slidesToScroll, spec.slidesToShow);
      breakpoint >= spec.slidesToShow * -1;
      breakpoint -= Math.min(spec.slidesToScroll, spec.slidesToShow)
    ) {
      indexes.push(breakpoint)
    }
    indexes.sort(function(a, b) {
      return a - b
    })
  }
  return indexes
}
export const checkNavigable = (spec, index) => {
  const navigables = getNavigableIndexes(spec)
  if (index > navigables[navigables.length - 1]) {
    index = navigables[navigables.length - 1]
  } else {
    const nav = navigables.map(navIndex => Math.abs(navIndex - index))
    index = navigables[nav.indexOf(Math.min(...nav))]
  }
  return index
}

export const getSlideCount = spec => {
  const centerOffset = spec.centerMode
    ? spec.slideWidth * Math.floor(spec.slidesToShow / 2)
    : 0
  if (spec.swipeToSlide) {
    let swipedSlide
    const slickList = spec.listRef
    const slides = slickList.querySelectorAll('.slick-slide')
    Array.from(slides).every(slide => {
      if (!spec.vertical) {
        const offsetRight =
          slide.parentNode.offsetWidth - slide.offsetLeft - slide.offsetWidth
        const offsetLeft = slide.offsetLeft
        const offset = spec.rtl ? offsetRight : offsetLeft
        if (offset - centerOffset + getWidth(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide
          return false
        }
      } else {
        if (slide.offsetTop + getHeight(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide
          return false
        }
      }

      return true
    })

    if (!swipedSlide) {
      return 0
    }
    const currentIndex = spec.currentSlide
    const slidesTraversed =
      Math.abs(swipedSlide.dataset.index - currentIndex) || 1
    return slidesTraversed
  } else {
    return spec.slidesToScroll
  }
}

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
  ],
  DOT: [
    'dotsClass',
    'slideCount',
    'slidesToShow',
    'currentSlide',
    'slidesToScroll',
    'children',
    'customPaging',
    'infinite',
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
      // else if (slideCount % slidesToScroll !== 0)
      //   finalSlide = slideCount - (slideCount % slidesToScroll)
    } else if (!canGoNext(spec) && animationSlide > currentSlide) {
      animationSlide = finalSlide = currentSlide
    } else if (centerMode && animationSlide >= slideCount) {
      animationSlide = infinite ? slideCount : slideCount - 1
      finalSlide = infinite ? 0 : slideCount - 1
    } else if (animationSlide >= slideCount) {
      finalSlide = animationSlide - slideCount
      if (!infinite) finalSlide = slideCount - slidesToShow
      // else if (slideCount % slidesToScroll !== 0) finalSlide = 0
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

export const getSwipeDirection = (
  touchObject,
  verticalSwiping = false,
  rtl = false,
) => {
  let xDist, yDist, r, swipeAngle
  xDist = touchObject.startX - touchObject.curX
  yDist = touchObject.startY - touchObject.curY
  r = Math.atan2(yDist, xDist)
  swipeAngle = Math.round((r * 180) / Math.PI)
  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle)
  }
  if (
    (swipeAngle <= 45 && swipeAngle >= 0) ||
    (swipeAngle <= 360 && swipeAngle >= 315)
  ) {
    return !rtl ? 'left' : 'right'
  }
  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return !rtl ? 'right' : 'left'
  }
  if (verticalSwiping === true) {
    if (swipeAngle >= 35 && swipeAngle <= 135) {
      return 'up'
    } else {
      return 'down'
    }
  }

  return 'vertical'
}

// get initialized state
export const initializedState = spec => {
  // spec also contains listRef, trackRef
  let slideCount = (spec.children && spec.children.length) || 0
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

  let slideOffset = 0
  let targetLeft
  let targetSlide
  let verticalOffset = 0

  if (fade || spec.slideCount === 1) {
    return 0
  }

  let slidesToOffset = 0
  if (infinite) {
    slidesToOffset = -getPreClones(spec) // bring active slide to the beginning of visual area
    // if next scroll doesn't have enough children, just reach till the end of original slides instead of shifting slidesToScroll children
    // const postSlides = getPostClones(spec)
    // if (
    //   slideCount % slidesToScroll !== 0 &&
    //   slideIndex + slidesToScroll > slideCount // + postSlides
    // ) {
    //   slidesToOffset = -(slideIndex > slideCount
    //     ? slidesToShow - (slideIndex - slideCount)
    //     : slideCount % slidesToScroll)
    // }
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
    let targetSlideIndex
    let trackElem = trackRef.$el
    targetSlideIndex = slideIndex + getPreClones(spec)
    targetSlide = trackElem && trackElem.childNodes[targetSlideIndex]
    const offsetRight =
      targetSlide.parentNode.offsetWidth -
      targetSlide.offsetLeft -
      targetSlide.offsetWidth
    const offsetLeft = targetSlide.offsetLeft
    const offset = spec.rtl ? offsetRight : offsetLeft
    targetLeft = targetSlide ? offset * -1 : 0
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
  keysArray.reduce(
    (value, key) => value && spec.hasOwnProperty.call(spec, key),
    true,
  )
    ? null
    : console.error('Keys Missing:', spec) // eslint-disable-line no-console

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
    const correctedLeft = spec.rtl ? -spec.left : spec.left
    let WebkitTransform = !spec.vertical
      ? 'translate3d(' + correctedLeft + 'px, 0px, 0px)'
      : 'translate3d(0px, ' + spec.left + 'px, 0px)'
    let transform = !spec.vertical
      ? 'translate3d(' + correctedLeft + 'px, 0px, 0px)'
      : 'translate3d(0px, ' + spec.left + 'px, 0px)'
    let msTransform = !spec.vertical
      ? 'translateX(' + correctedLeft + 'px)'
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
  if (trackWidth) style.width = trackWidth + 'px'
  if (trackHeight) style.height = trackHeight + 'px'

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
