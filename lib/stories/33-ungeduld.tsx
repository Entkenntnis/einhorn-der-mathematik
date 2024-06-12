import { ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { StoryData } from '../types'

interface DATA {
  mins: number
}

export const story33: StoryData<DATA> = {
  title: 'Ungeduld',
  x: 1000,
  y: 590,
  deps: [19, 40, 43],
  generator: () => {
    return { mins: randomIntBetween(29, 38) }
  },
  render: ({ data }) => (
    <>
      <p>
        Ich bin heute so ungeduldig. Ich kann es kaum erwartet, dass der
        Unterricht um 12:45 Uhr endet. Die Uhr zeigt genau 12:{data.mins}.
      </p>
      <p>Wie viele Sekunden muss ich noch bis zum Unterrichtsende warten?</p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        Ich kenne beide Seiten von Tina - wenn sie in etwas eintaucht, kann sie
        super konzentriert sein - und zu anderen Zeiten kann sie einfach nicht
        still sitzen.
      </p>
      <p>
        Zwischen 12:{data.mins} und 12:45 liegen {45 - data.mins} Minuten. Das
        sind {45 - data.mins} · 60 = <strong>{(45 - data.mins) * 60}</strong>{' '}
        Sekunden. Der Unterricht ist gleich geschafft.
      </p>
    </>
  ),
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => {
    // ('840', ['840s', '840 sekunden'])
    const res = (45 - data.mins) * 60
    return [`${res}`, `${res}s`, `${res}sekunden`]
  }),
}
