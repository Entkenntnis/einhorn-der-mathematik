import { StoryData, ignoreCaseSolution } from '../data'

export const story19: StoryData = {
  title: 'Spielbrett',
  x: 680,
  y: 550,
  deps: [15, 25],
  render: () => (
    <>
      <p>
        Teo spielt mit seinen Eltern gerne ein Spiel auf diesem Spielbrett. Das
        Spiel ist für mich etwas langweilig, aber das Spielbrett sieht witzig
        aus und erlaubt viele Wege.
      </p>
      <img src="/story19.jpg" alt="Spielbrett" className="w-[500px]" />
      <p>
        Wie viele Schritte muss man mindestens gehen, um vom Start ins Ziel zu
        kommen?
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Der kürzeste Weg besteht aus 4 Abschnitten und hat eine Gesamtlänge von
        6 + 3 + 5 + 5 = <strong>19</strong> Schritten.
      </p>
      <img src="/story19_sol.jpg" alt="Spielbrett" className="w-[500px]" />
      <p>
        Die untere Alternative vom Start aus ist um einen Schritt länger, ebenso
        ist der mittlere Weg zum Ziel um einen Schritt länger.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('19'),
}
