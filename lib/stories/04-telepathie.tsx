import { StoryData, ignoreCaseSolution } from '../data'

export const story4: StoryData = {
  title: 'Telepathie',
  x: 667,
  y: 744,
  deps: [9, 17],
  render: () => (
    <>
      <p>
        Leider kann ich nicht Gedanken lesen. Aber mit bisschen Mathematik kann
        ich so tun, als ob ich das kann!
      </p>
      <p>
        Ich sage Teo, dass er sich eine Zahl ausdenken soll. Diese Zahl soll er
        halbieren, davon 11 abziehen und dann das Ergebnis mit 5 multiplizieren.
        Nach viel Nachdenken kommt er auf die Antwort <strong>50</strong>.
      </p>
      <p>Welche Zahl hat Teo sich ausgedacht?</p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
