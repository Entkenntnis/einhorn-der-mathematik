import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { capitalize } from '../helper/capitalize'
import { numberToWord } from '../helper/number-to-word'
import { randomIntBetween } from '../helper/random-int-between'
import { StoryData } from '../types'

interface DATA {
  gondeln: number
  defekt: number
  proGondel: number
}

export const story24: StoryData = {
  title: 'Riesenrad',
  x: 191,
  y: 320,
  deps: [7, 37],
  generator: () => {
    const data: DATA = {
      gondeln: randomIntBetween(12, 25),
      defekt: randomIntBetween(2, 5),
      proGondel: randomIntBetween(3, 5),
    }
    return data
  },
  render: ({ genData }) => {
    const data = genData as DATA
    return (
      <>
        <p>
          Ich habe bisschen Höhenangst - daher verzichte ich auf die Fahrt im
          Riesenrad. Stattdessen schaue ich Teo und meinen Eltern zu, wie sie in
          die Gondel einsteigen und ihre Runde starten.
        </p>

        <p>
          Von unten habe ich einen guten Überblick über das Riesenrad. Es hat{' '}
          {data.gondeln} Gondeln. In jede Gondel passen{' '}
          {numberToWord(data.proGondel)} Einhörner.{' '}
          {capitalize(numberToWord(data.defekt))} der Gondeln sind im Moment in
          Reparatur und daher nicht für Fahrgäste verfügbar.
        </p>

        <p>Wie viele Einhörner passen in das Riesenrad?</p>
      </>
    )
  },
  proof: ({ genData }) => {
    const data = genData as DATA
    return (
      <>
        <p>
          Wenn man die {numberToWord(data.defekt)} Gondeln in Reparatur abzieht,
          sind es noch {data.gondeln - data.defekt} Gondeln, die zur Verfügung
          stehen. Multipliziere die Zahl mit {data.proGondel} und du hast das
          Ergebnis:{' '}
          <strong>
            {data.gondeln - data.defekt} · {data.proGondel} ={' '}
            {(data.gondeln - data.defekt) * data.proGondel} Gondeln
          </strong>
          .
        </p>
        <p></p>
      </>
    )
  },
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    `${(data.gondeln - data.defekt) * data.proGondel}`,
  ]),
}
