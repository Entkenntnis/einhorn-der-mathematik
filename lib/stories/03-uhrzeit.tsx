import { useState } from 'react'
import { StoryData, ignoreCaseSolution } from '../data'
import Clock from 'react-clock'

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
        Ich muss mich hier wirklich zurückhalten. Es gibt einen gesamten Zweig
        der Mathematik, der auf dieser Idee aufbaut und es ist ziemlich genial,
        wie weit und tief man diesen Ansatz verfolgen kann!
      </p>
      <p>
        Ich möchte nur so viel sagen: Eine Stunde auf der Uhr kann man auch als
        Drehung um 30° im Uhrzeigersinn verstehen. Um von 4 Uhr auf 7 Uhr zu
        kommen, sind es 3 Stunden und damit eine 90° Drehung.
      </p>
      <img src="story3_sol.png" alt="Drehung 3 Stunden" />
      <p>
        Und stell dir nun vor, man darf den Zeiger auch an der Vertikalen
        spiegeln.
      </p>
      <img src="story3_sol2.png" alt="Drehung 3 Stunden" />
      <p>
        Irgendein Mathematiker hat einmal angefangen, mit Drehung und Spiegelung
        herumzuspielen und dabei festgestellt, dass es viele Ähnlichkeiten zu
        unseren Grundrechenarten gibt - und auch Unterschiede!
      </p>
      <p>
        So viel für jetzt - vielleicht habe ich später noch Gelegenheit, hier
        mehr einzusteigen :)
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
