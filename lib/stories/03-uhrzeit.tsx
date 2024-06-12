import { useState } from 'react'
import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import Clock from 'react-clock'
import { StoryData } from '../types'
import { randomIntBetween } from '../helper/random-int-between'

interface DATA {
  clock: number
}

export const story3: StoryData<DATA> = {
  title: 'Uhrzeit',
  x: 500,
  y: 551,
  deps: [26, 37],
  generator: () => {
    const data: DATA = {
      clock: randomIntBetween(49, 48 + 11),
    }
    return data
  },
  render: ({ onSubmit, feedback, data }) => {
    return (
      <>
        <p>
          &quot;22 Uhr, 23 Uhr, 24 Uhr, 25 Uhr ...&quot;, murmelt Teo vor sich
          hin, während er seine Hausaufgaben macht.
        </p>
        <p>
          Ich korrigiere ihn: &quot;Hey Teo, es gibt kein 25 Uhr. Das ist wieder
          1 Uhr.&quot;
        </p>
        <p>
          Natürlich ignoriert er mich und ärgert mich extra, indem er vergnügt
          weitermacht:
        </p>
        <p>&quot;26 Uhr, 27 Uhr, 28 Uhr, 29 Uhr ...&quot;</p>
        <p>
          Nach einer Weile ist er bei <strong>{data.clock} Uhr</strong>{' '}
          angekommen. Da interessiert es mich schon: Welcher Uhrzeit entspricht
          das ⌚? Verschiebe den Regler, um die Uhrzeit einzustellen:
        </p>
        <ClockInput onSubmit={onSubmit} feedback={feedback} />
      </>
    )
  },
  proof: ({ data }) => {
    return (
      <>
        <p>
          24 Uhr ist die gleiche Uhrzeit wie 0 Uhr, genauso auch die Vielfachen
          48, 72, 96, ...
        </p>
        <p>
          48 Uhr entspricht also gleich 0 Uhr. Bis {data.clock} Uhr vergehen
          noch weitere {data.clock - 48} Stunden. Damit entspricht {data.clock}{' '}
          Uhr der Uhrzeit <strong>{data.clock - 48} Uhr</strong>.
        </p>
      </>
    )
  },
  hideSubmit: true,
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    `${data.clock % 24} Uhr`,
  ]),
}

interface ClockInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
}

function ClockInput({ onSubmit, feedback }: ClockInputProps) {
  const [val, setVal] = useState(12)
  return (
    <>
      <Clock
        className="mt-6"
        value={new Date(2023, 0, 1, val)}
        renderSecondHand={false}
        renderMinuteHand={false}
        hourHandLength={70}
      />
      <p className="ml-12">{val} Uhr</p>
      {feedback}
      <div className="flex mt-4">
        <input
          type="range"
          min={0}
          max={24}
          step={1}
          className="w-64 mr-4 inline-block"
          value={val}
          onInput={(e) =>
            setVal(parseInt((e.target as HTMLInputElement).value))
          }
        />
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400"
          onClick={() => {
            onSubmit(`${val} Uhr`)
          }}
        >
          Los
        </button>
      </div>
    </>
  )
}
