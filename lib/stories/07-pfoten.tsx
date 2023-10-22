import { StoryData, ignoreCaseSolution } from '../data'

export const story7: StoryData = {
  title: 'Pfoten',
  x: 180,
  y: 220,
  deps: [1],
  render: () => (
    <>
      <p>Bei uns Zuhause hängt dieses Bild an der Wand:</p>
      <img src="story7.png" alt="viele Pfoten" />
      <p>
        Eines Tages fängt Teo an, die Pfoten zu zählen und fängt in der ersten
        Reihe an: 1, 2, 3, ...
      </p>
      <p>
        Wenige Sekunden später habe ich das Ergebnis bereits im Kopf und schaue
        meinem Bruder beim Zählen zu. Wie viele Pfoten sind im Bild zu sehen?
      </p>
    </>
  ),
  submit: ignoreCaseSolution('32'),
}
