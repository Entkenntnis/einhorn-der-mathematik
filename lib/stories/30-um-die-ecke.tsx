import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  a: number
  b: number
}

export const story30: StoryData<DATA> = {
  title: 'Um die Ecke',
  x: 700,
  y: 80,
  deps: [24],
  generator: () => {
    const [a, b] = randomItemFromArray([
      [9, 1],
      [8, 2],
      [7, 3],
      [6, 4],
    ])
    return { a, b }
  },
  render: ({ data }) => (
    <>
      <p>
        Eine Mitschülerin zeigt mir ein Kurzvideo mit einem Mathe-Rätsel. Sie
        weiß, dass ich gerne Mathe mache. Ich schaue es mir an. Es ist eines
        dieser Rätsel, wo man &quot;um die Ecke denkt&quot;. Die Rechnungen
        sehen auf dem ersten Blick sinnlos aus:
      </p>

      <p className="ml-5">
        Wenn 5 ± 3 = 82,
        <br />
        8 ± 1 = 97 und
        <br />
        6 ± 5 = 111.
        <br />
        Wie viel sind dann {data.a} ± {data.b}?
      </p>

      <p>
        Ich brauche einen Moment, um mich zu orientieren. Doch dann beginne ich
        das Muster zu erkennen. Wie lautet die Antwort?
      </p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        Da musst ich auch einen Moment meine grauen Zellen anwerfen. Tina hat
        sicherlich schnell erkannt, dass jeweils die Summe und die Differenz der
        zwei Zahlen eine Rolle spielen.
      </p>
      <p>5 + 3 = 8; 5 - 3 = 2; das Ergebnis lautet 82.</p>
      <p>8 + 1 = 9; 8 - 1 = 7; das Ergebnis lautet 97.</p>
      <p>6 + 5 = 11; 6 - 5 = 1; das Ergebnis lautet 111.</p>
      <p>
        {data.a} + {data.b} = {data.a + data.b}; {data.a} - {data.b} ={' '}
        {data.a - data.b}; das Ergebnis lautet{' '}
        <strong>{`${data.a + data.b}${data.a - data.b}`}</strong>.
      </p>
    </>
  ),
  submit: ({ data }) =>
    ignoreCaseSolutionWithGenData([`${data.a + data.b}${data.a - data.b}`]),
}
