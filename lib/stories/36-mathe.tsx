import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { shuffleArray } from '../helper/shuffle-array'
import { StoryData } from '../types'

interface DATA {
  ns: number[]
  r: number
}

export const story36: StoryData<DATA> = {
  title: 'Mathe',
  x: 1081,
  y: 693,
  deps: [33, 34, 47],
  generator: () => {
    const ns = shuffleArray([1, 2, 3, 4, 5])
    const r = (ns[3] + ns[0]) * (ns[4] + ns[2]) - ns[1]
    return { ns, r }
  },
  render: ({ data }) => (
    <>
      <p>Herzlichen Glückwunsch, dass du so weit gekommen bist!</p>
      <p>
        Ab hier startet das zweite Kapitel. Im zweiten Kapitel hast du die
        Auswahl: Wenn du nach dieser Aufgabe nach rechts weitergehst, findest du
        entspannte Aufgaben ähnlich wie bisher. Wenn du bereit bist für eine
        Herausforderung kannst du den Pfad nach unten folgen. Stelle dort dein
        Können unter Beweis.
      </p>
      <p>Viel Spaß beim Knobeln :)</p>
      <p>
        Stelle dir für diese Aufgabe vor, dass A = {data.ns[0]}, E ={' '}
        {data.ns[1]}, H = {data.ns[2]}, M = {data.ns[3]} und T = {data.ns[4]}.
      </p>
      <p>Was macht dann (M + A) · (T + H) - E?</p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        Wenn ich die Zahlen einsetze, erhalte ich die Rechnung ({data.ns[3]} +{' '}
        {data.ns[0]}) · ({data.ns[4]} + {data.ns[2]}) - {data.ns[1]}.
      </p>
      <p>
        Ich rechne aus und komme auf {data.ns[3] + data.ns[0]} ·{' '}
        {data.ns[4] + data.ns[2]} - {data.ns[1]} = {data.r + data.ns[1]} -{' '}
        {data.ns[1]} = <strong>{data.r}</strong>.
      </p>
    </>
  ),
  submit: ({ data }) => ignoreCaseSolutionWithGenData([data.r.toString()]),
}
