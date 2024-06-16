import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story52: StoryData = {
  title: 'D',
  x: 1500,
  y: 560,
  deps: [49, 50],
  render: () => (
    <>
      <p>TODO</p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
