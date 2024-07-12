import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story49: StoryData = {
  title: 'Schüsseln',
  x: 1300,
  y: 550,
  deps: [36],
  render: () => (
    <>
      <p>TODO</p>
      <img
        src="/story49.jpg"
        alt="Zwei Stapeln mit Schüsseln"
        className="w-[420px]"
      />
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
