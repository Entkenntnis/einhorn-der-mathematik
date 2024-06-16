import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story50: StoryData = {
  title: 'B',
  x: 1270,
  y: 650,
  deps: [36],
  render: () => (
    <>
      <p>TODO</p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
