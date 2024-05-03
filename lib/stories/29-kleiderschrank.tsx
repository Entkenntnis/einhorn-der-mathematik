import { StoryData, ignoreCaseSolution } from '../data'

export const story29: StoryData = {
  title: 'Kleiderschrank',
  x: 249,
  y: 649,
  deps: [2, 3],
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
  proof: () => (
    <>
      <p>
        Du erhältst das Ergebnis, wenn du 3 · 2 · 10 = 60 rechnest. Ein
        Baumdiagramm hilft dir zu verstehen, <em>warum</em> man so rechnet.
      </p>
      <img src="story29_sol.png" alt="angedeutetes Baumdiagramm" width={500} />
      <p>
        Tina wählt zuerst einen ihrer drei Pullis. Das ist die erste Stufe. In
        der zweiten Stufe wählst du für jeden Pulli dann deine Hose. Das
        Baumdiagramm deutet dabei die Möglichkeiten nur an. Wenn man es komplett
        ausführt, sind es 6 Zweige am Ende der zweiten Stufe.
      </p>
      <p>
        In der dritten Stufe spaltet sich jeder der 6 Zweige nochmal in die 10
        Zweige für die verschiedenen Socken auf. Du erhältst ebenso dein
        Ergebnis 60.
      </p>
      <p>
        Die Farben habe ich mir nur ausgedacht - Tina hat sicherlich schönere
        Farben in ihrem Kleiderschrank.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('60'),
}
