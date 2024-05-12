import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

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
        alt="Rechenmauer mit Grundreihe 6, 4, 8, 1 und Addition"
        src="story10.png"
        className="w-[300px]"
      />
      <p>Welche Zahl steht im obersten Feld?</p>
    </>
  ),
  proof: () => (
    <>
      <p>So sieht die ausgefüllte Mauer aus:</p>
      <img
        src="/story10_sol.png"
        className="w-[250px]"
        alt="ausgefüllte Rechenmauer"
      />
      <p>
        Die oberste Zahl lautet <strong>24</strong>.
      </p>
      <p>
        In der Grundschule nutzt man die Rechenmauer gerne, weil man nur vier
        Zahlen angeben muss, um sechs Rechnungen abzufragen. Sehr effizient.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('24'),
}
