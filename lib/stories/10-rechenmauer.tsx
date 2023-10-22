import { StoryData, ignoreCaseSolution } from '../data'

export const story10: StoryData = {
  title: 'Rechenmauer',
  x: 286,
  y: 277,
  deps: [7],
  render: () => (
    <>
      <p>
        Ich schaue Teo bei seinen Hausaufgaben zu, weil er so putzig ist und
        seine Aufgaben so leicht sind.
      </p>
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
