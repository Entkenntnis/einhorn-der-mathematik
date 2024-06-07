import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story35: StoryData = {
  title: 'Rechenmauer 2',
  x: 74,
  y: 586,
  deps: [10],
  render: () => (
    <>
      <p>
        Die Rechenmauer hat Spaß gemacht. Ich bin nun auf eine verrückte Idee
        gekommen, anstatt die Zahlen in der ersten Reihe anzugeben, sie von oben
        nach rechts anzugeben. Und natürlich nur Zahlen mit zwei gleichen
        Ziffern, weil ich heute mal lustig bin 😄
      </p>
      <img alt="Rechenmauer" src="story35.png" className="w-[300px]" />
      <p>
        Die Zahl in einem Feld ist immer die Summe der beiden darunterliegenden
        Felder.
      </p>
      <p>Welche Zahl steht unten links?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        In der Mathematik geht es nicht nur ums sturre Rechnen - Mathematik
        macht dann Spaß, wenn ich auch rückwärts denken darf. So wie bei dieser
        Aufgabe.
      </p>
      <p>
        Die Umkehrung der Addition ist die Subtraktion. Um die Zahl neben der 55
        herauszufinden, rechne ich also 99&nbsp;-&nbsp;55&nbsp;=&nbsp;44. So
        kann man sich durch die ganze Mauer zurück arbeiten.
      </p>
      <img alt="Rechenmauer" src="story35_sol.png" className="w-[300px]" />
      <p>
        Die Zahl im Feld unten links lautet <strong>11</strong>.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('11'),
}
