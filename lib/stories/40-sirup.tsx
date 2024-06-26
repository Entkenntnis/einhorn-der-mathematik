import { useState } from 'react'
import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { StoryData } from '../types'
import { randomItemFromArray } from '../helper/random-item-from-array'

interface DATA {
  per250: number
}

export const story40: StoryData<DATA> = {
  title: 'Sirup',
  x: 910,
  y: 430,
  deps: [4, 16, 38],
  generator: () => {
    return { per250: randomItemFromArray([10, 15, 20, 25, 30, 35]) }
  },
  render: ({ data, feedback, onSubmit }) => (
    <>
      <p>
        Meine Kola mische ich mir aus Sirup und diese muss das perfekte
        Verhältnis haben. Ich habe viel probiert und bin zu diesem Rezept
        gekommen: In ein Glas mit {250 - data.per250} ml Wasser gebe ich{' '}
        {data.per250} ml Sirup für 0,25 Liter perfektes Getränk.
      </p>
      <p>
        Weil ich mir so viel Mühe beim Mischen gebe, soll ich in Zukunft für die
        ganze Familie die Kola mischen. Unsere Kanne fasst genau 1 Liter. Ich
        möchte auch hier das genaue Verhältnis treffen.
      </p>
      <p>Wie viel Sirup soll ich zu wie viel Wasser geben?</p>
      <SirupInput onSubmit={onSubmit} feedback={feedback} />
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>Die Kola für mich bitte ohne Zucker :)</p>
      <p>
        Zurück zum Mischverhältnis: Tinas Rezept ergibt mit {250 - data.per250}{' '}
        ml Wasser plus {data.per250} ml Sirup insgesamt 250 ml Getränk, das ist
        genau ein Viertel-Liter. Ich brauche als nur das Rezept mal vier zu
        nehmen für den Liter.
      </p>
      <p>
        Ich rechne {data.per250} ml · 4 = <strong>{data.per250 * 4} ml</strong>{' '}
        und erhalte das Ergebnis.
      </p>
    </>
  ),
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    `${data.per250 * 4}ml`,
  ]),
  hideSubmit: true,
}

interface SirupsInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
}

function SirupInput({ onSubmit, feedback }: SirupsInputProps) {
  const [val, setVal] = useState(0)

  return (
    <>
      <svg
        viewBox="128.668 137.134 172.122 186.794"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[150px] mt-6"
        style={{
          fill: colorMixer(
            [182, 223, 233],
            [111, 23, 18],
            1 - (val / 200) * 1.2
          ),
        }}
      >
        <path
          d="M 138.827 145.034 C 138.827 145.034 166.391 187.806 168.736 312.076 L 257.9 313.205 C 258.199 189.61 285.93 146.039 286.117 145.598 L 138.827 145.034 Z"
          transform="matrix(1, 0, 0, 1, 7.105427357601002e-15, 0)"
        />
      </svg>
      <p>
        Sirup: {val} ml&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wasser:{' '}
        {1000 - val} ml
      </p>
      {feedback}
      <div className="flex mt-4">
        <input
          type="range"
          min={0}
          max={200}
          step={5}
          className="w-[350px] mr-4 inline-block"
          value={val}
          onInput={(e) =>
            setVal(parseInt((e.target as HTMLInputElement).value))
          }
        />
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400"
          onClick={() => {
            onSubmit(`${val} ml`)
          }}
        >
          Los
        </button>
      </div>
    </>
  )
}

//colorChannelA and colorChannelB are ints ranging from 0 to 255
function colorChannelMixer(
  colorChannelA: number,
  colorChannelB: number,
  amountToMix: number
) {
  const channelA = colorChannelA * amountToMix
  const channelB = colorChannelB * (1 - amountToMix)
  return channelA + channelB
}
//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
function colorMixer(rgbA: number[], rgbB: number[], amountToMix: number) {
  var r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix)
  var g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix)
  var b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
