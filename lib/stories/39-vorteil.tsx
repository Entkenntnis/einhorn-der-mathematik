import { ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  a1: number
  b1: number
  a2: number
  b2: number
}

export const story39: StoryData<DATA> = {
  title: 'Vorteil',
  x: 390,
  y: 70,
  deps: [6],
  generator: () => {
    const A = randomItemFromArray([200, 300, 400, 500, 600, 700])
    const a1 = randomIntBetween(6, 9) * 10 + A - 100
    const b1 = randomIntBetween(6, 9) * 10 - 5
    return { a1, b1, a2: A - a1, b2: 100 - b1 }
  },
  render: ({ data }) => (
    <>
      <p>
        Meine Sitznachbarin beschwert sich, dass Mathe so kacke ist und alle
        Aufgaben schwer zu rechnen sind. Sie rechnet gerade an folgender
        Aufgabe:
      </p>
      <p className="text-xl">
        {data.a1} + {data.b1} + {data.a2} + {data.b2} = __________
      </p>
      <p>Dabei beginnt sie von links und addiert die ersten beiden Zahlen.</p>
      <p>
        Ich sage ihr: &quot;Mädchen, schau dir doch mal die Zahlen an!&quot; Ich
        zeige ihr, was uns die Lehrerin gerade erklärt hat und wie man hier
        vorteilhaft rechnen kann.
      </p>
      <p>Wie lautet das Ergebnis der Rechnung?</p>
    </>
  ),
  proof: ({ data }) => {
    return (
      <>
        <p>
          Mit solchen Vorteilen beschäftigen sich Mathematiker gerne, weil sie
          viele Probleme leichter machen.
        </p>
        <p>
          In diesem Fall kann ich bei der Addition die Reihenfolge der Summanden
          vertauschen:
        </p>
        <p className="text-xl">
          {data.a1} + {data.b1} + {data.a2} + {data.b2} = ({data.a1} + {data.a2}
          ) + ({data.b1} + {data.b2})
        </p>
        <p>
          Die Zahlen ergänzen sich schön und ich erhalte mit {data.a1 + data.a2}{' '}
          + {data.b1 + data.b2} ={' '}
          <strong>{data.a1 + data.a2 + data.b1 + data.b2}</strong> das Ergebnis.
        </p>
      </>
    )
  },
  submit: ({ data }) =>
    ignoreCaseSolutionWithGenData([
      (data.a1 + data.a2 + data.b1 + data.b2).toString(),
    ]),
}
