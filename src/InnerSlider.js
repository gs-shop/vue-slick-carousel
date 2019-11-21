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
  render() {
    return (
      <div>
        <SliderArrow />
        <div>
          <SliderTrack />
        </div>
        <SliderArrow />
        <SliderDots />
      </div>
    )
  },
}
