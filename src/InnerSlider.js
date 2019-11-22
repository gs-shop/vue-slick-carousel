import SliderTrack from '@/SliderTrack'
import SliderArrow from '@/SliderArrow'
import SliderDots from '@/SliderDots'
import initialState from '@/initialState'

export default {
  name: 'InnerSlider',
  components: {
    SliderTrack,
    SliderArrow,
    SliderDots,
  },
  inheritAttrs: false,
  props: ['settings'],
  data() {
    return { ...initialState, currentSlide: this.settings.initialSlide }
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
  },
  render() {
    let prevArrow = <SliderArrow />
    let nextArrow = <SliderArrow />
    let dots = <SliderDots />

    let listProps = {}
    let trackProps = {}

    return (
      <div>
        {!this.settings.unslick ? prevArrow : ''}
        <div ref="list" {...listProps}>
          <SliderTrack ref="track" {...trackProps}>
            {this.$slots.default}
          </SliderTrack>
        </div>
        {!this.settings.unslick ? nextArrow : ''}
        {!this.settings.unslick ? dots : ''}
      </div>
    )
  },
}
