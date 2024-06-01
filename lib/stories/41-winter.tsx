import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  d: number
  base: number
}

const end = 540
const positive30 = 95
const negative30 = 496.5

export const story41: StoryData<DATA> = {
  title: 'Winter',
  x: 66,
  y: 350,
  deps: [37],
  generator: () => {
    const d = randomItemFromArray([1, 2, 3, 4])
    const base = randomItemFromArray([-10, -20, -30])
    return {
      d,
      base,
    }
  },
  render: ({ data }) => {
    const t = data.base + data.d

    const pos = ((negative30 - positive30) / 60) * (-t + 30) + positive30

    return (
      <>
        <p>
          Ich freue mich, wenn es im Winter mal richtig kalt wird. Es ist ein
          besonders Gefühl, an die kalte Luft zu gehen und die Kälte auf der
          Haut zu spüren. Heute ist ein besonders kalter Tag.
        </p>
        <p>
          Ich schaue zusammen mit Teo auf das Thermometer. Das Thermometer hängt
          außen am Fenster und zeigt die aktuelle Temperatur an.
        </p>
        <p>
          Teo fragt mich, wie kalt es ist. Er kann das Thermometer noch nicht
          ablesen. Wie viel Grad hat es draußen?
        </p>
        <div className="my-6 relative">
          <img src="/story41.png" alt="Thermometer" />
          <div className="absolute top-[535px] left-[143px] w-10 h-10 rounded-full bg-pink-400"></div>
          <div
            className="w-4 bg-pink-400 left-[155px] absolute"
            style={{ top: `${pos}px`, height: `${end - pos}px` }}
          ></div>
        </div>
      </>
    )
  },
  proof: ({ data }) => {
    const t = data.base + data.d
    const pos = ((negative30 - positive30) / 60) * (-t + 30) + positive30

    return (
      <>
        <p>
          Hier habe ich eine zusätzliche Linie eingezeichnet, um das Ablesen zu
          erleichtern. Achte darauf, dass die Skale im Vergleich zum normalen
          Zahlenstrahl umgekehrt ist. Die aktuelle Temperatur ist{' '}
          <strong>{t}°C</strong>.
        </p>
        <div className="my-6 relative">
          <img src="/story41.png" alt="Thermometer" />
          <div className="absolute top-[535px] left-[143px] w-10 h-10 rounded-full bg-pink-400"></div>
          <div
            className="w-4 bg-pink-400 left-[155px] absolute"
            style={{ top: `${pos}px`, height: `${end - pos}px` }}
          ></div>
          <div
            className="absolute left-[130px] h-0.5 w-16 bg-blue-700"
            style={{ top: `${pos - 1}px` }}
          ></div>
        </div>
      </>
    )
  },
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => {
    const t = data.base + data.d
    return [`${t}`, `${t}°`, `${t}°c`]
  }),
}
