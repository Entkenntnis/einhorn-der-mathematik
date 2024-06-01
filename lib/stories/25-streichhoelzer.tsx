import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story25: StoryData = {
  title: 'Streichhölzer',
  x: 330,
  y: 820,
  deps: [5, 29],
  render: () => (
    <>
      <p>
        Von der Weihnachtszeit haben wir noch Streichholzer übrig. Damit spielt
        Teo gerne - ich soll aufpassen, dass er dabei nichts anzündet.
      </p>

      <p>
        Ich schnappe mir 7 Streichhölzer und fange an, damit Ziffern zu legen.
        Du siehst ein paar Beispiele im Bild.
      </p>

      <img src="story25.jpg" alt="Ziffern aus Streichhölzern gelegt" />

      <p>
        Welches ist die <strong>größte</strong> Zahl, die ich mit 7
        Streichhölzern legen kann?
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Die erste Idee lautet: möglichst viele Ziffern. Entsprechend nimmst sich
        Tina auch die Ziffern, die sich aus den wenigsten Streichhölzern bauen
        lassen, das sind die 1 und die 7.
      </p>
      <p>
        Dem fügt sich noch die zweite Idee hinzu, große Ziffern möglichst weit
        nach links zu ziehen - denn in unserem Stellenwertsystem sind Ziffern
        umso wertvoller, je weiter vorne sie stehen. Das Ergebnis lautet damit{' '}
        <strong>711</strong>.
      </p>
      <img src="story25_sol.png" alt="Ergebnis 711" />
      <p>
        Es kann keine andere Lösung geben. Alle anderen Ziffern brauchen
        mindestens vier Streichhölzer, Tina hat dann keine Möglichkeit, aus drei
        Streichhölzern zwei Ziffern zu legen. Jede zweistellige Zahl ist kleine
        als eine dreistellige Zahl - natürlich vorausgesetzt, dass man keine
        Null nach vorne stellt. Die Kombinationen 111, 171 und 117 sind alle
        kleiner als das obige Ergebnis.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('711'),
}
