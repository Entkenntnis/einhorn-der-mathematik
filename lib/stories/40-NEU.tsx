import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story40: StoryData = {
  title: 'Sirup',
  x: 750,
  y: 430,
  deps: [15, 20],
  render: () => (
    <>
      <p>TODO</p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
