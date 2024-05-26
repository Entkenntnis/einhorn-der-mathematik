import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { StoryData } from '../types'

interface DATA {
  start: number
  end: number
}

export const story4: StoryData<DATA> = {
  title: 'Telepathie',
  x: 550,
  y: 660,
  deps: [3, 13],
  generator: () => {
    const start = randomIntBetween(18, 25) * 2
    return { start, end: (start / 2 - 11) * 5 }
  },
  render: ({ data }) => (
    <>
      <p>
        Leider kann ich nicht Gedanken lesen. Aber mit bisschen Mathematik kann
        ich so tun, als ob ich das kann!
      </p>
      <p>
        Ich sage Teo, dass er sich eine Zahl ausdenken soll. Diese Zahl soll er
        halbieren, davon 11 abziehen und dann das Ergebnis mit 5 multiplizieren.
        Nach viel Nachdenken kommt er auf die Antwort{' '}
        <strong>{data.end}</strong>.
      </p>
      <p>Welche Zahl hat Teo sich ausgedacht?</p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        Das ist ein gutes Beispiel dafür, wie man mit gründlichem
        Rückwärts-Arbeiten ans Ziel kommt:
      </p>
      <p>
        Im letzten Schritt hat Teo mit 5 multpliziert und erhält {data.end}. Ich
        drehe das um und rechne {data.end} : 5 = {data.end / 5}.
      </p>
      <p>
        Im zweiten Schritt hat Teo 11 abgezogen, ich addiere also 11, d.h.{' '}
        {data.end / 5} + 11 = {data.end / 5 + 11}.
      </p>
      <p>
        Im ersten Schritt hat Teo die Zahl halbiert, jetzt muss ich die{' '}
        {data.end / 5 + 11} verdoppeln und erhalte das Ergebnis{' '}
        <strong>{data.start}</strong>.
      </p>
      <p>
        Wer das gerne systematisch macht stellt die Gleichung (x : 2 - 11) · 5 ={' '}
        {data.end} auf und löst sie nach x.
      </p>
    </>
  ),
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    data.start.toString(),
  ]),
}
