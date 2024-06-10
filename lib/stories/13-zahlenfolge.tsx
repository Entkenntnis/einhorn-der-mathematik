import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  start: number
  incr: number
}

export const story13: StoryData<DATA> = {
  title: 'Zahlenfolge',
  x: 390,
  y: 620,
  deps: [2, 26, 28],
  generator: () => {
    const start = randomItemFromArray([1, 2, 3, 4])
    const incr = randomItemFromArray([1, 2, 3])
    return { start, incr }
  },
  render: ({ data }) => {
    const nums = [
      data.start,
      data.start + data.incr,
      data.start + data.incr * 2 + 1,
      data.start + data.incr * 3 + 3,
      data.start + data.incr * 4 + 6,
    ]
    return (
      <>
        <p>
          Mein Vater hat mich gebeten, mit Teo für seinen nächsten Mathe-Test zu
          üben. Ein Thema darin sind Zahlenfolgen.
        </p>
        <p>
          Aber das sind keine interessanten Folgen, sondern nur langweilige wie
          2, 4, 6, 8, ... oder 11, 22, 33, ... Mein Vater hat mir verboten, ihm
          zu schwere Aufgaben zu stellen.
        </p>
        <p>
          Ich kann es natürlich nicht verkneifen, am Ende doch folgende Aufgabe
          zu stellen:
        </p>
        <p className="text-2xl">
          {nums[0]}, {nums[1]}, {nums[2]}, {nums[3]}, {nums[4]},{' '}
          <span className="text-pink-700">?</span>
        </p>
        <p>
          Teo kommen die Tränen, als er die Folge nicht lösen kann. Mein Vater
          schaut prüfend zu mir und ich wische die Folge schnell weg. Wie lautet
          die nächste Zahl der Folge?
        </p>
      </>
    )
  },
  proof: ({ data }) => {
    const nums = [
      data.start,
      data.start + data.incr,
      data.start + data.incr * 2 + 1,
      data.start + data.incr * 3 + 3,
      data.start + data.incr * 4 + 6,
    ]
    return (
      <>
        <p>
          Solche Zahlenfolgen sehe ich oft in Intelligenz-Tests. Ich schaue mir
          dann immer zuerst die Differenzen an und sehe schnell, dass die
          Differenz immer um 1 größer wird.
        </p>
        <p className="text-2xl">
          {nums[0]}{' '}
          <span className="text-base text-gray-700">(+{data.incr})</span>{' '}
          {nums[1]}{' '}
          <span className="text-base text-gray-700">(+{data.incr + 1})</span>{' '}
          {nums[2]}{' '}
          <span className="text-base text-gray-700">(+{data.incr + 2})</span>{' '}
          {nums[3]}{' '}
          <span className="text-base text-gray-700">(+{data.incr + 3})</span>{' '}
          {nums[4]}{' '}
          <span className="text-base text-gray-700">(+{data.incr + 4})</span>{' '}
          <span className="text-pink-700">
            {data.start + data.incr * 5 + 10}
          </span>
        </p>
        <p>
          Die Differenz zwischen den ersten beiden Zahlen ist {data.incr}, nach
          der fünften Zahl ist die Differenz {data.incr + 4}.
        </p>
        <p>
          Ich rechne {data.start + data.incr * 4 + 6} + {data.incr + 4} und
          erhalte das Ergebnis{' '}
          <strong>{data.start + data.incr * 5 + 10}</strong>.
        </p>
      </>
    )
  },
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    `${data.start + data.incr * 5 + 10}`,
  ]),
}
