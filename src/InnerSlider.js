import SliderTrack from '@/SliderTrack'
import SliderArrow from '@/SliderArrow'
import SliderDots from '@/SliderDots'

export default {
  name: 'InnerSlider',
  components: {
    SliderTrack,
    SliderArrow,
    SliderDots,
  },
  inheritAttrs: false,
  render() {
    return (
      <div>
        <SliderArrow />
        <div>
          <SliderTrack>{this.$slots.default}</SliderTrack>
        </div>
        <SliderArrow />
        <SliderDots />
      </div>
    )
  },
}
