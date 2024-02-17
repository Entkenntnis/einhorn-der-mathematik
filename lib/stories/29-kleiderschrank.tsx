import { StoryData, ignoreCaseSolution } from '../data'

export const story29: StoryData = {
  title: 'Kleiderschrank',
  x: 190,
  y: 320,
  deps: [7, 26],
  render: () => (
    <>
      <p>
        Mein Outfit überlasse ich dem Zufall. Ich habe meine 3 Pullis, 2 Hosen
        und 10 Paar Socken und trage diese im Wechsel. Mit der Zeit ergeben sich
        alle möglichen bunten Kombinationen.
      </p>

      <p>
        Für besondere Anlasse habe ich natürlich noch andere Kleidung, aber für
        den normalen Alltag sind das meine Lieblingsklamotten - simple und
        comfy.
      </p>

      <p>
        Wie viele verschiedene Outfits kann ich mit Pulli, Hose und Socken
        kombinieren?
      </p>
    </>
  ),
  submit: ignoreCaseSolution('60'),
}
