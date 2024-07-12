import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story49: StoryData = {
  title: 'Küchentag',
  x: 1300,
  y: 550,
  deps: [36],
  render: () => (
    <>
      <p>
        Wir räumen unsere Küche um: einmal alles raus, sortieren und wieder
        rein. Während meine Eltern arbeiten, mache ich mich sehr nützlich
        (nicht) und vermesse verschiedene Schüsselstapel.
      </p>
      <img
        src="/story49.jpg"
        alt="Zwei Stapeln mit Schüsseln"
        className="w-[420px]"
      />
      <p>
        Ein Stapel mit zwei Schüsseln ist 11 cm hoch, ein Stapel mit sieben
        Schüsseln ist 26 cm hoch. Das sind die wichtigen Erkenntnisse!
      </p>
      <p>
        Am Abend frage ich mich: Wie hoch ist eine einzelne Schüssel? Ich möchte
        jetzt nicht nochmal in die Küche gehen und nachmessen. Berechne für mich
        die Höhe einer einzelnen Schüssel.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('8', ['8cm']),
}
