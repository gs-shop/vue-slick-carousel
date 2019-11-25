import { PROP_KEYS } from '@/innerSliderUtils'

export default {
  name: 'SliderArrow',
  props: [...PROP_KEYS.ARROW, 'clickHandler'],
  render() {
    return <div>arrow</div>
  },
}
