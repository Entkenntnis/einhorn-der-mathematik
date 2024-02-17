import { StoryData, ignoreCaseSolution } from '../data'

export const story8: StoryData = {
  title: 'Winkel',
  x: 510,
  y: 310,
  deps: [10, 27],
  render: () => (
    <>
      <p>
        Teo ist erst in der 1. Klasse. Ich konnte ihm bereits beibringen, wie
        man mit dem Geo-Dreieck Winkel misst. In diesem Dreieck hat er schon
        zwei Winkel gemessen.
      </p>
      <img src="story8.png" alt="Ein Dreieck mit Innenwinkel 46 und 60 Grad" />
      <p>
        Ich habe in der Schule gelernt, dass die Summe der drei Winkel eines
        Dreiecks immer 180 Grad beträgt. Damit möchte ich ihn überraschen. Ich
        sage ihm: &quot;Ich kann den Winkel mit bloßen Augen ablesen!&quot; und
        flüstere ihm das Ergebnis.
      </p>
      <p>
        Nachdem Teo den Winkel gemessen hat, ist er ganz erstaunt wie genau ich
        den Winkel geschätzt habe. Dabei habe ich gar nicht schätzen müssen,
        sondern konnte den Winkel ausrechnen. Wie groß ist der fehlende Winkel?
      </p>
    </>
  ),
  submit: ignoreCaseSolution('74', ['74°', '74 grad']),
}
