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
  submit: ignoreCaseSolution('63'),
}
