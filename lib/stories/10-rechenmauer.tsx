import { StoryData, ignoreCaseSolution } from '../data'

export const story10: StoryData = {
  title: 'Rechenmauer',
  x: 360,
  y: 320,
  deps: [7],
  render: () => (
    <>
      <p>Teo ist putzig, genauso wie seine Hausaufgaben.</p>
      <p>
        Heute gibt es eine Rechenmauer. Dabei addiert man immer die zwei Zahlen
        unterhalb eines Felds. Das macht auch seiner großen Schwester Spaß!
      </p>
      <img
        alt="Zahlenpyramide mit Grundreihe 6, 4, 8, 1 und Addition"
        src="story10.png"
        className="w-[300px]"
      />
      <p>Welche Zahl steht im obersten Feld?</p>
    </>
  ),
  submit: ignoreCaseSolution('24'),
}
