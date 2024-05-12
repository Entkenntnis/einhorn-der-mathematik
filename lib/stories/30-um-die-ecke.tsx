import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story30: StoryData = {
  title: 'Um die Ecke',
  x: 700,
  y: 80,
  deps: [23],
  render: () => (
    <>
      <p>
        Eine Mitschülerin zeigt mir ein Kurzvideo mit einem Mathe-Rätsel. Sie
        weiß, dass ich gerne Mathe mache. Ich schaue es mir an. Es ist eines
        dieser Rätsel, wo man &quot;um die Ecke denkt&quot;. Die Rechnungen
        sehen auf dem ersten Blick sinnlos aus:
      </p>

      <p className="ml-5">
        Wenn 5+3=28,
        <br />
        8+1=79 und
        <br />
        6+5=111.
        <br />
        Wie viel sind dann 6+4?{' '}
      </p>

      <p>
        Ich brauche einen Moment, um mich zu orientieren. Doch dann beginne ich
        das Muster zu erkennen. Wie lautet die Antwort?
      </p>

      <details className="mt-4">
        <summary className="cursor-pointer mb-2">Hinweis</summary>
        Schaue dir die Summe und die Differenz an, z. B. 5+3 und 5-3. Überlege,
        wie sich daraus das Ergebnis zusammensetzt.
      </details>
    </>
  ),
  proof: () => (
    <>
      <p>
        Da musst ich auch einen Moment meine grauen Zellen anwerfen. Tina hat
        sicherlich schnell erkannt, dass jeweils die Summe und die Differenz der
        zwei Zahlen eine Rolle spielen.
      </p>
      <p>5 - 3 = 2; 5 + 3 = 8; das Ergebnis lautet 28.</p>
      <p>8 - 1 = 7; 8 + 1 = 9; das Ergebnis lautet 79.</p>
      <p>6 - 5 = 1; 6 + 5 = 11; das Ergebnis lautet 111.</p>
      <p>
        6 - 4 = 2; 6 + 4 = 10; das Ergebnis lautet <strong>210</strong>.
      </p>
      <p>
        Schreibe sie hintereinander als Zahl und schon hast du das Ergebnis.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('210'),
}
