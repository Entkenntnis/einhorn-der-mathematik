import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story38: StoryData = {
  title: 'Antwort',
  x: 66,
  y: 350,
  deps: [37],
  render: () => (
    <>
      <p>TODO</p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
