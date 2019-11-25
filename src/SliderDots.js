import { PROP_KEYS } from '@/innerSliderUtils'

export default {
  name: 'SliderDots',
  props: [...PROP_KEYS.DOT, 'clickHandler'],
  render() {
    return <div>dots</div>
  },
}
