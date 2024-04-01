import { StoryData, ignoreCaseSolution } from '../data'

export const story12: StoryData = {
  title: 'Freunde',
  x: 400,
  y: 420,
  deps: [10, 24],
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
        zu finden?
      </p>
    </>
  ),
  submit: ignoreCaseSolution('500000'),
}
