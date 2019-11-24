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
