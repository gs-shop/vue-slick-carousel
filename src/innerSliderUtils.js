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
