import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

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
  proof: () => (
    <>
      <p>
        In der Aufgabe ist der mathematische Satz angegeben, mit dem du diese
        Aufgabe lösen kannst.
      </p>
      <p>
        Rechne{' '}
        <strong>180°&nbsp;-&nbsp;60°&nbsp;-&nbsp;46°&nbsp;=&nbsp;74°</strong>{' '}
        und erhalte das Ergebnis.
      </p>
      <img src="story8_sol.png" alt="Lösung" />
      <p>
        Die Mathematik hat zwei Seiten - erstens kann man vorhandene Sätze
        anwenden und damit Ergebnisse berechnen. Das macht Spaß.
      </p>
      <p>
        Oder zweitens, man erfindet neue Sätze oder schreibt Beweise für
        vorhandene Sätze, wie zum Beispiel den Innenwinkelsummensatz für das
        Dreieck. Das ist oft anstrengend, braucht ein wenig Kreativität und
        Geduld - aber manchmal auch eine schöne Abwechslung zum reinen Rechnen.
      </p>
      <p>
        Es gibt viele Wege um zu begründen, dass die Innenwinkelsumme 180°
        ergeben muss. Weißt du, warum das so ist? Wenn dich das interessiert,
        dann steht dir eine ganze Welt zum Entdecken offen.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('74', ['74°', '74 grad']),
}
