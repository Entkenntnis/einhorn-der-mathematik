import { StoryData, ignoreCaseSolution } from '../data'

export const story34: StoryData = {
  title: 'Memory',
  x: 940,
  y: 520,
  deps: [5, 16],
  render: () => (
    <>
      <p>
        Ich spiele mit Teo Memory. Wir legen die Karten immer in einem Quadrat
        aus, weil das angenehmer zu spielen ist. Wir spielen zuerst ein Spiel
        mit 36 Karten.
      </p>
      <p>
        Leider ist Teo echt gut in dem Spiel und schlägt mich. Danach möchte er
        eine Profi-Variante spielen: Das Quadrat soll doppelt so breit und
        doppelt so hoch sein.
      </p>
      <p>Wie viele Karten müssen wir hinzufügen?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Um das Quadrat zu verdoppeln, braucht es drei zusätzliche Quadrate der
        Größe 6x6:
      </p>
      <img src="/story34_sol.png" alt="Verdopplung Quadrat" />
      <p>
        Das sind also 3 · 36 = <strong>108</strong> zusätzliche Karten, die Tina
        und Teo hinzufügen müssen.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('108'),
}
