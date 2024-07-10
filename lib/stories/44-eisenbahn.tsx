import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  n: number
}

export const story44: StoryData<DATA> = {
  title: 'Eisenbahn',
  x: 506,
  y: 860,
  deps: [12, 29],
  generator: () => {
    return { n: randomItemFromArray([70, 80, 90, 100, 110]) }
  },
  render: ({ data }) => (
    <>
      <p>
        Wir sind heute bei unserem Onkel zu besuchen. Das ist immer was
        Besonderes. Er besitzt im Keller eine große Modell-Eisenbahn-Landschaft.
        Dort verbringen wir viel Zeit.
      </p>
      <p>
        Zwei lange Reisezüge sind neu. Wir messen nach und jeder Zug hat eine
        Länge von {data.n}&nbsp;cm. Unser Onkel erzählt uns, dass die Züge im
        Maßstab 1:80 gebaut sind.
      </p>
      <img
        src="/story44.jpg"
        alt="BR 103 Modelleisenbahn"
        className="w-[300px]"
      />
      <p className="!-mt-6">
        <small>
          <a
            href="https://commons.wikimedia.org/wiki/File:BR_103_TEE-Lackierung_%26_orientrot.jpg"
            target="_blank"
            className="!text-gray-400 underline"
          >
            Bildquelle
          </a>
        </small>
      </p>
      <p>
        Welche Länge hat der Zug in der Wirklichkeit? Gib dein Ergebnis mit
        Einheit an.
      </p>
    </>
  ),
  proof: ({ data }) => {
    return (
      <>
        <p>
          Der Maßstab 1:80 bedeutet, dass die Wirlichkeit um 80-fach größer ist
          als das Modell. Ich multipliziere die Länge {data.n}&nbsp;cm mit 80
          und erhalte das Ergebnis <strong>{data.n * 80}&nbsp;cm</strong> oder{' '}
          <strong>{(data.n * 80) / 100}&nbsp;m</strong>.
        </p>
      </>
    )
  },
  submit: ({ data }) =>
    ignoreCaseSolutionWithGenData([
      `${data.n * 80}zentimeter`,
      `${data.n * 80}cm`,
      `${(data.n * 80) / 100}m`,
      `${(data.n * 80) / 100}meter`,
    ]),
}
