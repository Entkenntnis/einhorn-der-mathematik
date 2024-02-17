import { StoryData, ignoreCaseSolution } from '../data'

export const story7: StoryData = {
  title: 'Hufeisen',
  x: 190,
  y: 175,
  deps: [1],
  render: () => (
    <>
      <p>Bei uns Zuhause hängt dieses Bild an der Wand.</p>
      <img src="story7.png" alt="viele Pfoten" className="w-[400px]" />
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
  submit: ignoreCaseSolution('32'),
}
