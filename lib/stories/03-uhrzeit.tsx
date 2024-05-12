import { useState } from 'react'
import { ignoreCaseSolution } from '../data'
import Clock from 'react-clock'
import { StoryData } from '../types'

export const story3: StoryData = {
  title: 'Uhrzeit',
  x: 260,
  y: 460,
  deps: [24, 28],
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
  proof: () => (
    <>
      <p>
        24 Uhr ist die gleiche Uhrzeit wie 0 Uhr, genauso wie die Vielfachen 48,
        72 und 96.
      </p>
      <p>
        96 Uhr ist also gleich 0 Uhr. Bis 100 Uhr vergehen noch weitere 4
        Stunden. Damit entspricht 100 Uhr der Uhrzeit <strong>4 Uhr</strong>.
      </p>
      <p>
        Teo macht also mit der Uhr acht ganze 12-Stunden-Runden, dann bleiben
        noch 4 Stunden übrig. So kann man sich die Aufgabe auch überlegen.
      </p>
      <p>
        Oder mal teilt 100 durch 24 und nimmt den Rest. So würden wahrscheinlich
        die meisten von uns an der Akademie die Aufgabe lösen.
      </p>
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
