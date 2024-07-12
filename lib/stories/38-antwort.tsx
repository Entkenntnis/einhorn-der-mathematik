import { ignoreCaseSolution, naturalNumberSolution } from '../data'
import { StoryData } from '../types'

export const story38: StoryData = {
  title: 'Antwort',
  x: 760,
  y: 421,
  deps: [15, 20],
  render: () => (
    <>
      <p>
        Das kürzeste Zitat der Welt ist eine Zahl. Manchmal taucht diese Zahl
        zufällig als Ergebnis einer Rechnung auf. Dann kann ich mir ein Lächeln
        nicht verkneifen.
      </p>
      <p className="text-2xl">66 - 6 · 6 + 6 + 6 = ______</p>
      <p>
        Viele Leute schauen mich dann an und fragen: Was findest du denn an der
        Zahl so lustig? Aber ich kann das nicht beschreiben. Wie soll ich auch
        einen Witz erklären?
      </p>
      <p>
        Die Zahl ist nicht nur die Antwort auf das Leben, das Universum und den
        ganzen Rest - sondern auch die Antwort auf dieses Rätsel.
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Natürlich kennt Tina diese Zahl und baut sie hier ein! Die Zahl{' '}
        <strong>42</strong> stammt aus &quot;Per Anhalter durch die
        Galaxis&quot;. Ein Supercomputer soll die „endgültige Frage nach dem
        Leben, dem Universum und dem ganzen Rest“ berechnen - und liefert als
        Ergebnis 42. Da hätte man die Frage doch etwas präziser stellen sollen.
      </p>
    </>
  ),
  submit: () => naturalNumberSolution(42, 5),
}
