import { StoryData, ignoreCaseSolution } from '../data'

export const story22: StoryData = {
  title: 'Schatzkiste',
  x: 1100,
  y: 700,
  deps: [36],
  render: () => (
    <>
      <p>
        Stell dir vor, du hast eine magische Schatzkiste. Diese Kiste kann ihren
        Inhalt alle 5 Minuten verdoppeln.
      </p>

      <p>
        Du holst eine Goldmünze aus deiner Tasche und legst sie in die
        Schatzkiste. Nach einer Stunde ist die Schatzkiste voll und du bist
        reich.
      </p>

      <p>Nach wie vielen Minuten war die Schatzkiste genau halb voll?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Oha, das ist eine trickreiche Frage. Die Idee besteht darin, rückwärts
        zu denken. Weil sich der Inhalt alle 5 Minuten verdoppelt, heißt das
        umgekehrt, dass der Inhalt vor 5 Minuten nur halb so viel war.
      </p>
      <p>
        Am Ende der 60 Minuten ist die Kiste voll. Gehe 5 Minuten zurück und
        damit hast du den Zeitpunkt, an dem die Kiste halb voll ist.
      </p>
      <p>
        Das sind <strong>55 Minuten</strong> nach dem Start.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('55', ['55 min', '55 Minuten']),
}
