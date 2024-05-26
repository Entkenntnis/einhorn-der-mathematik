import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { StoryData } from '../types'

interface DATA {
  missing: number
  a: number
  b: number
}

export const story8: StoryData<DATA> = {
  title: 'Winkel',
  x: 510,
  y: 310,
  deps: [10, 27],
  generator: () => {
    const missing = randomIntBetween(63, 81)
    const t = 180 - missing
    const a = randomIntBetween(Math.floor(t * 0.55), Math.ceil(t * 0.65))
    const b = t - a
    return { missing, a, b }
  },
  render: ({ data }) => (
    <>
      <p>
        Teo fragt mich, was das Wort &quot;Winkel&quot; bedeutet. Ich erkläre
        das sehr gerne und zeige ihm auch, wie man Winkel mit dem Geodreieck
        misst. In diesem Dreieck haben wir bereits zwei Winkel gemessen.
      </p>
      <div className="relative mt-4">
        <img src="story8.png" alt="Ein Dreieck mit Innenwinkel eingezeichnet" />
        <div className="absolute top-[43px] left-[170px] text-2xl text-blue-700">
          {data.a}°
        </div>
        <div className="absolute top-[222px] left-[50px] text-2xl text-blue-700">
          {data.b}°
        </div>
      </div>
      <p>
        Ich habe in der Schule gelernt, dass die Summe der drei Winkel eines
        Dreiecks immer 180 Grad beträgt. Damit möchte ich ihn überraschen. Ich
        sage ihm: &quot;Ich kann den Winkel mit bloßen Augen ablesen!&quot; und
        flüstere ihm das Ergebnis.
      </p>
      <p>
        Nachdem wir den Winkel gemessen haben, ist er ganz erstaunt wie genau
        ich den Winkel geschätzt habe. Dabei habe ich gar nicht schätzen müssen,
        sondern konnte den Winkel ausrechnen. Wie groß ist der fehlende Winkel?
      </p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        In der Aufgabe ist der mathematische Satz angegeben, mit dem du diese
        Aufgabe lösen kannst.
      </p>
      <p>
        Rechne{' '}
        <strong>
          180°&nbsp;-&nbsp;{data.a}°&nbsp;-&nbsp;{data.b}°&nbsp;=&nbsp;
          {data.missing}°
        </strong>{' '}
        und erhalte das Ergebnis.
      </p>
      <div className="relative mt-4">
        <img
          src="story8_sol.png"
          alt="Ein Dreieck mit Innenwinkel eingezeichnet"
        />
        <div className="absolute top-[43px] left-[170px] text-2xl text-blue-700">
          {data.a}°
        </div>
        <div className="absolute top-[222px] left-[50px] text-2xl text-blue-700">
          {data.b}°
        </div>
        <div className="absolute top-[188px] left-[250px] text-2xl text-pink-700">
          {data.missing}°
        </div>
      </div>
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
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    data.missing.toString(),
    data.missing.toString() + '°',
    data.missing.toString() + 'grad',
  ]),
}
