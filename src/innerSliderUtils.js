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
