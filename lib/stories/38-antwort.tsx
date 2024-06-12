import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story38: StoryData = {
  title: 'Antwort',
  x: 506,
  y: 860,
  deps: [29, 47],
  render: () => (
    <>
      <p>
        Das kürzeste Zitat der Welt ist eine Zahl. Manchmal taucht diese Zahl
        zufällig als Ergebnis einer Rechnung auf. Dann kann ich mir ein Lächeln
        nicht verkneifen.
      </p>
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
        Galaxis&quot; und ist ein Witz auf vielen Ebenen. Trotz vieler möglicher
        Deutungen hat der der Autor klar gemacht: Es gibt dahinter keine geheime
        botschaft, die Zahl ist einfach das: eine gewöhnliche Zahl.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
