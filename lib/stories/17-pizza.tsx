import { StoryData, ignoreCaseSolution } from '../data'

export const story17: StoryData = {
  title: 'Pizza',
  x: 740,
  y: 200,
  deps: [],
  render: () => (
    <>
      <p>
        Es gibt heute Abend Pizza! Ich und Teo schneiden abwechselnd die Pizza.
        Den vierten Schnitt macht Teo leider etwas daneben.
      </p>
      <img src="/story17.jpg" alt="Pizza mit Schnitten" className="w-[350px]" />
      <p>
        Ich lächte und sage: &quot;Schau, jetzt haben wir 10 Stücke!&quot; Teo
        möchte seinen Fehler korrigieren und nochmal schneiden.
      </p>
      <p>
        Wie viele Stücke kann es maximal geben, wenn man ein fünftes Mal
        schneidet?
      </p>
    </>
  ),
  submit: ignoreCaseSolution('15'),
}
