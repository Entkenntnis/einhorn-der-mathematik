import { StoryData, ignoreCaseSolution } from '../data'

export const story7: StoryData = {
  title: 'Hufeisen',
  x: 190,
  y: 175,
  deps: [1],
  render: () => (
    <>
      <p>Bei uns Zuhause hängt dieses Bild an der Wand.</p>
      <img src="story7.png" alt="viele Hufeisen" className="w-[400px]" />
      <p>
        Als Teo die Hufeisen zählt, fängt er oben links an und geht Reihe für
        Reihe durch.
      </p>
      <p>
        Wenn du die Struktur des Bilds nutzt, kannst du dir die Arbeit ein wenig
        erleichtern. Wie viele Hufeisen sind im Bild zu sehen?
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Es gibt viele Möglichkeiten, die Struktur des Bildes zu nutzen. Ich
        möchte zwei Varianten zeigen.
      </p>
      <img src="story7_sol1.png" alt="viele Hufeisen" className="w-[200px]" />
      <p>
        In der ersten Variante nehme ich 4er-Gruppen und rechne 7 mal 4 = 28.
      </p>
      <img src="story7_sol2.png" alt="viele Hufeisen" className="w-[200px]" />
      <p>
        Auch schön ist es, die Symmetrie des Bildes zu nutzen und sich die
        Arbeit zumindest zu halbieren.
      </p>
      <p>
        In der Mathematik gibt es zwar oft nur eine Lösung, aber viele Wege,
        dahin zu kommen. Ohne diesen Platz für Kreativität hätte ich
        wahrscheinlich keinen so großen Spaß an Mathe.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('28'),
}
