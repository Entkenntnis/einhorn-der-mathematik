import { StoryData, ignoreCaseSolution } from '../data'

export const story17: StoryData = {
  title: 'Pizza',
  x: 440,
  y: 750,
  deps: [29, 13],
  render: () => (
    <>
      <p>
        Es gibt heute Abend Pizza! Teo und ich schneiden abwechselnd die Pizza.
        Den vierten Schnitt macht Teo leider etwas daneben.
      </p>
      <img src="/story17.jpg" alt="Pizza mit Schnitten" className="w-[350px]" />
      <p>
        Ich lächle und sage: &quot;Schau, jetzt haben wir 10 Stücke!&quot; Teo
        möchte seinen Fehler korrigieren und nochmal schneiden.
      </p>
      <p>
        Wie viele Stücke kann es maximal geben, wenn er ein fünftes Mal
        schneidet?
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>Um 15 Stücke zu erhalten, kann Teo zum Beispiel so schneiden:</p>
      <img
        src="/story17_sol.jpg"
        alt="Pizza mit Schnitten, Auflösung"
        className="w-[350px]"
      />
      <p>
        Die grüne Linie durchläuft 5 Pizza-Stücke und fügt für jedes
        durchlaufene Stück ein neues Stück hinzu. Das sind dann insgesamt 10 + 5
        = <strong>15</strong> Stücke.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('15'),
}
