import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story20: StoryData = {
  title: '100 Nullen',
  x: 680,
  y: 320,
  deps: [14, 42],
  render: () => (
    <>
      <p>
        Teo fragt mich, ob ich ihm eine ganz große Zahl zeigen kann. Nach ein
        wenig Schreibarbeit präsentiere ich folgendes Ergebnis.
      </p>
      <p className="break-words text-xl">
        10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
      </p>
      <p>
        Das ist ist eine 1 mit 100 Nullen. Wahrlich eine große Zahl. Diese Zahl
        hat einen ganz bestimmten Namen.
      </p>
      <p>Wie heißt diese Zahl?</p>
      <p className="italic text-gray-600">
        <small>Du kannst für diese Aufgabe eine Suchmaschine verwenden.</small>
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Auf diese Zahl ist Tina vermutlich über die bekannte Suchmaschine
        gestoßen, die ihren Namen davon abgeleitet hat.
      </p>
      <p>
        Ausgedacht hat sich den Namen ein 9-Jähriges Kind! Ich finde das
        ziemlich cool. Nicht immer muss in der Mathematik alles so ernsthaft
        sein. Manchmal gehört auch einfach eine Portion kindliche Faszination
        dazu, das Staunen über die Größe und Weite dieser Welt.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('googol'),
}
