import { StoryData, ignoreCaseSolution } from '../data'

export const story20: StoryData = {
  title: '100 Nullen',
  x: 680,
  y: 320,
  deps: [8, 31],
  render: () => (
    <>
      <p>
        Teo fragt mich, ob ich ihm eine ganz große Zahl zeigen kann. Nach ein
        wenig Schreibarbeit präsentiere ich folgendes Ergebnis.
      </p>
      <p className="break-words text-xl">
        10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
      </p>
      <p>
        Das ist ist eine 1 mit 100 Nullen. Wahrlich eine große Zahl. Diese Zahl
        hat einen ganz bestimmten Namen.
      </p>
      <p>Wie heißt diese Zahl?</p>
    </>
  ),
  submit: ignoreCaseSolution('googol'),
}
