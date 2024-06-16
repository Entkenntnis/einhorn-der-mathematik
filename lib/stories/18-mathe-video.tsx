import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story18: StoryData = {
  title: 'Mathe-Video',
  x: 1160,
  y: 1070,
  deps: [54],
  render: () => (
    <>
      <p>
        Youtube hat erkannt, dass ich Mathe mag. Deshalb bekomme ich immer
        wieder Mathe-Videos vorgeschlage, wie dieses hier:{' '}
        <a href="https://www.youtube.com/watch?v=IUAUyR07wHo" target="_blank">
          So you like math videos
        </a>
      </p>
      <p>
        Und das Video hat mir echt gut gefallen, daher gibt es hier eine
        Variante der Aufgabe für dich.
      </p>
      <p>
        Sei N eine natürliche Zahl. Wenn man eine oder mehrere Teilziffern aus N
        herausnimmt, entstehen <i>Teilzahlen</i>. Beispiel: Die Zahl 3208 hat
        die Teilzahlen 3, 2, 8, 32, 20, 320, 208 und 3208 (die Teilzahl 08 ist
        gleich 8).
      </p>
      <img src="/story18.png" alt="Teilzahlen" className="w-[300px]" />
      <p>
        Gesucht ist die größte Zahl N, für die keine der Teilzahlen durch 3
        teilbar ist (0 ist durch 3 teilbar).
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Uhmm, eine sehr interessante Aufgabe - die kann ich gleich morgen in der
        Akademie zeigen.
      </p>
      <p>
        Nach dem Argument aus dem Video kann es keine dreistellige Zahl geben,
        die die gewünschte Eigenschaft erfüllt. Außerdem darf keine Ziffere
        durch 3 teilbar sein.
      </p>
      <p>
        Die größte zweistellige Zahl mit dieser Bedingung ist{' '}
        <strong>88</strong>.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('88'),
}
