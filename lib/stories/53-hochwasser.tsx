import { ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  n: number
}

export const story53: StoryData<DATA> = {
  title: 'Hochwasser',
  x: 1440,
  y: 700,
  deps: [50, 51],
  render: ({ data }) => (
    <>
      <p>
        Es regnet schon den ganzen Tag und es ist kein Ende in Sicht. Der Himmel
        ist grau und die Sonne ist nicht zu sehen.
      </p>
      <p>
        Der Regen ist ein großes Problem. Unser Haus steht in der Nähe eines
        Fluss und der läuft gerade über. Es soll auch in der Nacht weiterregnen.
        Wir nutzen die Zeit, um unser Haus mit Sandsäcken zu schützen.
      </p>
      <p>
        Teo und ich dichten die Garagen ab. Dazu brauchen wir {data.n}{' '}
        Sandsäcke. Ich bin stark und kann in einer Minute zwei Säcke aufstellen,
        Teo braucht für einen Sack zwei Minuten. Wir arbeiten ohne Pause, bis
        alle Sandsäcke aufgestellt sind.
      </p>
      <p>Wie viele Minuten brauchen wir zusammen, um die Garage abzudichten?</p>
    </>
  ),
  generator: () => {
    return { n: randomItemFromArray([20, 25, 30, 35, 40, 45, 50]) }
  },
  proof: ({ data }) => {
    return (
      <>
        <p>
          Teo braucht für einen Sandsack zwei Minuten, in der Zeit kann Tina
          vier Säcke aufstellen, zusammen sind das 5 Säcke in 2 Minuten.
        </p>
        <p>
          Ich rechne ({data.n} : 5) · 2 Minuten und erhalte das Ergebnis{' '}
          <strong>{(data.n / 5) * 2} Minuten</strong>.
        </p>
        <p>Ich hoffe, dass sie die Nacht gut überstehen 😟</p>
      </>
    )
  },
  submit: ({ data }) => {
    const n = (data.n / 5) * 2
    return ignoreCaseSolutionWithGenData([
      `${n}`,
      `${n} min`,
      `${n} Minuten`,
      `${n} m`,
    ])
  },
}
