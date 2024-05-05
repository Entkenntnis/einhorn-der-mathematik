import { StoryData, ignoreCaseSolution } from '../data'

export const story16: StoryData = {
  title: 'Landkarte',
  x: 800,
  y: 300,
  deps: [20, 31],
  render: () => (
    <>
      <p>
        Mir macht es Spaß, Bilder für meine Geschichten zu entwerfen. Für meine
        neuste Geschichte habe ich diese Landkarte gezeichnet.
      </p>
      <img src="/story16.jpg" alt="Landkarte" className="w-[400px]" />
      <p>
        Die Insel hat eine Fläche von 620 Fußballfeldern. Auf einer Insel leben
        die Gruppen A und B. Durch einen See mit zwei Flüssen wird die Insel in
        zwei gleich große Teile unterteilt. Gruppe B besitzt 180 Fußballfelder
        mehr Land als Gruppe A.
      </p>
      <p>Wie viel Fußballfelder Land besitzt Gruppe A?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Das ist eine sehr vertrackte Aufgabe! Ich gehe sie Schritt für Schritt
        an.
      </p>
      <img src="/story16_sol.jpg" alt="Landkarte" className="w-[400px]" />
      <p>
        Die rechte Hälfte der Insel hat eine Fläche von 620 : 2 = 310
        Fußballfeldern.
      </p>
      <p>
        Nun bleibt noch die Fläche unten links. Zwar hat B laut Angabe 180
        Fußballfelder mehr als A, aber die Fläche ist nur 90 Fußballfelder groß.
        Denn jedes Fußballfeld, dass ich über den Fluss an B gebe, gibt B ein
        Feld mehr und zieht A ein Feld ab - die Differenz wird um 2 größer!
        Daher muss hier einmal die Zahl halbiert werden.
      </p>
      <p>
        Damit hat die Gruppe B eine Fläche von 400 Fußballfeldern und der Rest
        von <strong>220</strong> Fußballbeldern geht an Gruppe A.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('220'),
}
