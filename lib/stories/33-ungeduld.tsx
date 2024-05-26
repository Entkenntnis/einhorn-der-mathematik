import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story33: StoryData = {
  title: 'Ungeduld',
  x: 840,
  y: 590,
  deps: [4, 19, 40],
  render: () => (
    <>
      <p>
        Ich bin heute so ungeduldig. Ich kann es kaum erwartet, dass der
        Unterricht um 12:45 Uhr endet. Die Uhr zeigt genau 12:31.
      </p>
      <p>Wie viele Sekunden muss ich noch bis zum Unterrichtsende warten?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Ich kenne beide Seiten von Tina - wenn sie in etwas eintaucht, kann sie
        super konzentriert sein - und zu anderen Zeiten kann sie einfach nicht
        still sitzen.
      </p>
      <p>
        Zwischen 12:31 und 12:45 liegen 14 Minuten. Das sind 14 · 60 ={' '}
        <strong>840</strong> Sekunden. Der Unterricht ist gleich geschafft.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('840', ['840s', '840 sekunden']),
}
