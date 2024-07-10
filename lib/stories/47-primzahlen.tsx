import { jsxJoin } from '../../components/math-skills/utils/jsx-join'
import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { shuffleArray } from '../helper/shuffle-array'
import { StoryData } from '../types'

interface DATA {
  n: number[]
  d: number
}

export const story47: StoryData<DATA> = {
  title: 'Primzahlen',
  x: 960,
  y: 720,
  deps: [9, 19],
  generator: () => {
    const correct = shuffleArray([3, 5, 7, 11, 13, 17, 19, 23, 29]).slice(0, 7)
    const d = randomItemFromArray([9, 15, 21, 25])
    const n = shuffleArray([...correct, d])
    n.sort((a, b) => a - b)
    return { n, d }
  },
  render: ({ data }) => (
    <>
      <p>
        Heute morgen erfahren wir in der Schule eine traurige Nachricht: Unsere
        alte Mathe-Lehrerin ist plötzlich verstorben. Wir mochten sie alle sehr
        gerne.
      </p>
      <p>
        Unsere Klasse entscheidet sich schnell, für die Lehrerin einen Eintrag
        im Trauerbuch zu gestalten. Natürlich möchten wir etwas mit Mathe
        machen.
      </p>
      <p>
        Neben einem kleinen Text wollen wir die Seite mit Primzahlen verzieren.
        Diese mochte die Lehrerin sehr und sie hat uns viel zu oft erklären
        müssen: &quot;Eine Primzahl hat genau zwei Teiler: Die Eins und sich
        selbst.&quot;
      </p>
      <p className="text-2xl">{data.n.map((x) => x.toString()).join(', ')}</p>
      <p>
        Ich schreibe ein paar Primzahlen auf. Aber halt, bei einer Zahl habe ich
        einen Fehler gemacht. Welche dieser Zahlen hat zu viele Teiler und ist
        damit nicht prim?
      </p>
    </>
  ),
  proof: ({ data }) => {
    return (
      <>
        <p className="text-2xl">
          {jsxJoin(
            data.n.map((x) =>
              x == data.d ? (
                <strong key={x} className="text-pink-500">
                  {x}
                </strong>
              ) : (
                <>{x}</>
              )
            ),
            ', '
          )}
        </p>
        <p>
          Wenn ich mir die Zahlen anschaue, stelle ich fest, dass {data.d} durch{' '}
          {data.d === 25 ? 5 : 3} teilbar ist. Die Zahl hat mehr als 2 Teiler
          und ist damit nicht prim.
        </p>
      </>
    )
  },
  submit: ({ data }) => ignoreCaseSolutionWithGenData([data.d.toString()]),
}
