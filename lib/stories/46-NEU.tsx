import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story46: StoryData = {
  title: 'Na logisch (TODO)',
  x: 590,
  y: 631,
  deps: [3, 13],
  render: () => (
    <>
      <p>TODO</p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
