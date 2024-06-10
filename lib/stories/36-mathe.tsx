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
  deps: [12, 33, 34],
  generator: () => {
    const ns = shuffleArray([1, 2, 3, 4, 5])
    const r = (ns[3] + ns[0]) * (ns[4] + ns[2]) - ns[1]
    return { ns, r }
  },
  render: ({ data }) => (
    <>
      <p>
        Herzlichen Glückwunsch, dass du soweit gekommen bist! Ich hoffe, dass du
        hier ein wenig Spaß mit Mathematik hattest. Ab hier startet nun das
        zweite Kapitel - weiterhin viel Spaß beim Knobeln :)
      </p>
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
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [data.r.toString()]),
}
