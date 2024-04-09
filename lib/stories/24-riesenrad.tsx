import { StoryData, ignoreCaseSolution } from '../data'

export const story24: StoryData = {
  title: 'Riesenrad',
  x: 190,
  y: 320,
  deps: [7, 26],
  render: () => (
    <>
      <p>
        Ich habe bisschen Höhenangst - daher verzichte ich auf die Fahrt im
        Riesenrad. Stattdessen schaue ich Teo und meinen Eltern zu, wie sie in
        die Gondel einsteigen und ihre Runde starten.
      </p>

      <p>
        Von unten habe ich einen guten Überblick über das Riesenrad. Es hat 24
        Gondeln. In jede Gondel passen drei Einhörner. Drei der Gondeln sind im
        Moment in Reparatur und daher nicht für Fahrgäste verfügbar.
      </p>

      <p>Wie viele Einhörner passen in das Riesenrad?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Wenn man die drei Gondeln in Reparatur abzieht, sind es noch 21 Gondeln,
        die zur Verfügung stehen. Multipliziere die Zahl mit 3 und du hast das
        Ergebnis: <strong>21 · 3 = 63 Gondeln</strong>.
      </p>
      <p></p>
    </>
  ),
  submit: ignoreCaseSolution('63'),
}
