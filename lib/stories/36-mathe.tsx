import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story36: StoryData = {
  title: 'Mathe',
  x: 1081,
  y: 693,
  deps: [12, 33, 34],
  render: () => (
    <>
      <p>
        Herzlichen Glückwunsch, dass du soweit gekommen bist! Ich hoffe, dass du
        hier ein wenig Spaß mit Mathematik hattest. Ab hier startet nun das
        zweite Kapitel - weiterhin viel Spaß beim Knobeln :)
      </p>
      <p>
        Stelle dir für diese Aufgabe vor, dass A = 1, E = 2, H = 3, M = 4 und T
        = 5.
      </p>
      <p>Was macht dann (M + A) · (T + H) - E?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Wenn ich die Zahlen einsetze, erhalte ich die Rechnung (4 + 1) · (5 + 3)
        - 2.
      </p>
      <p>
        Ich rechne aus und komme auf 5 · 8 - 2 = 40 - 2 = <strong>38</strong>.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('38'),
}
