import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story45: StoryData = {
  title: 'C',
  x: 660,
  y: 531,
  deps: [3, 15],
  render: () => (
    <>
      <p>TODO</p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
