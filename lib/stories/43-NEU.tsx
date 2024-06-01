import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story43: StoryData = {
  title: 'A',
  x: 810,
  y: 321,
  deps: [20, 42],
  render: () => (
    <>
      <p>TODO</p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
