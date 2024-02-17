import { StoryData, ignoreCaseSolution } from '../data'

export const story19: StoryData = {
  title: 'Spielbrett',
  x: 800,
  y: 400,
  deps: [],
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
  submit: ignoreCaseSolution('19'),
}
