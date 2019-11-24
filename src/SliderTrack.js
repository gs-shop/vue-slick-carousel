import { PROP_KEYS } from '@/innerSliderUtils'

export default {
  name: 'SliderTrack',
  props: PROP_KEYS.TRACK,
  render() {
    return <div>{this.$slots.default}</div>
  },
}
