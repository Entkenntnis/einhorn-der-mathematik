import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story12: StoryData = {
  title: 'Freunde',
  x: 800,
  y: 720,
  deps: [4, 19],
  render: () => (
    <>
      <p>
        Freunde finden ist gar nicht so einfach! Ich versuche gerade
        auszurechnen, wie viele Personen ich begegnen muss um eine
        Einhorn-Freundin zu finden.
      </p>
      <p>
        Auf der Welt ist eine von 1000 Personen ein Einhorn. Eine von 5
        Einhörnern spricht meine Sprache. Bei einer von 100 Einhörnern gelingt
        es, Freunde zu werden (grob geschätzt).
      </p>
      <p>
        Wie viele Personen muss ich durchschnittlich begegnen, um eine Freundin
        zu finden, die meine Sprache spricht?
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Awwh! Tina, gib nicht auf! Suche weiter, auch wenn das Ergebnis
        entmutigend wirkt!
      </p>
      <p>
        An der Rechnung von Tina ist aber nichts auszusetzen, im Durchschnitt
        muss sie 1000 · 5 · 100 = <strong>500000</strong> Personen begegnen.
      </p>
      <p>
        Wenn du ein Einhorn bist und gute Freunde hast: schätze dich glücklich
        und behandle sie wie einen Schatz.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('500000'),
}
