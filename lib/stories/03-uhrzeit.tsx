import { useState } from 'react'
import { StoryData, ignoreCaseSolution } from '../data'
import Clock from 'react-clock'

export const story3: StoryData = {
  title: 'Uhrzeit',
  x: 230,
  y: 430,
  deps: [28, 29],
  render: ({ onSubmit, feedback }) => (
    <>
      <p>
        &quot;22 Uhr, 23 Uhr, 24 Uhr, 25 Uhr ...&quot;, murmelt Teo vor sich
        hin, während er seine Hausaufgaben macht.
      </p>
      <p>
        Ich korrigiere ihn: &quot;Hey Teo, es gibt kein 25 Uhr. Das ist wieder 1
        Uhr.&quot;
      </p>
      <p>
        Natürlich ignoriert er mich und ärgert mich extra, indem er vergnügt
        weitermacht:
      </p>
      <p>&quot;26 Uhr, 27 Uhr, 28 Uhr, 29 Uhr ...&quot;</p>
      <p>
        Nach einer Weile ist er bei <strong>100 Uhr</strong> angekommen. Da
        interessiert es mich schon: Welcher Uhrzeit entspricht das ⌚?
        Verschiebe den Regler, um die Uhrzeit einzustellen:
      </p>
      <ClockInput onSubmit={onSubmit} feedback={feedback} />
    </>
  ),
  hideSubmit: true,
  submit: ignoreCaseSolution('4 Uhr'),
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
