import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story53: StoryData = {
  title: 'Hochwasser',
  x: 1440,
  y: 700,
  deps: [50, 51],
  render: () => (
    <>
      <p>REFACTOR BEFORE FLIGHT</p>
      <p>
        Sturm, Starkregen, Eltern kümmern sich um das Haus, ich und Teo sollen
        draußen Sandsäcke platzieren.
      </p>
      <p>
        Ich schaffe pro Minute zwei Säcke, Teo braucht für einen Sack 2 Minuten.
      </p>
      <p>Wie lange brauchen wir um alle 100 Säcke zu platzieren?</p>
    </>
  ),
  proof: () => {
    return (
      <>
        <p>
          In zwei Minuten schafft Tina 4 Säcke, beide zuammen also 5 Sandsäcke.
          100 : 5 * 2= 40 Minuten.
        </p>
      </>
    )
  },
  submit: ignoreCaseSolution('42'),
}
