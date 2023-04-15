import { Draft } from 'immer'
import React, { useState } from 'react'
import Clock from 'react-clock'
import { State } from '../components/App'
import { submit_event } from './submit'

interface StoryData {
  title: string
  x: number
  y: number
  deps: number[]
  render: (props: {
    core: State
    mut: (fn: (draft: Draft<State>) => void) => void
    onSubmit: (val: string) => void
    feedback: React.ReactNode
  }) => JSX.Element
  hideSubmit?: boolean
  submit: (props: {
    value: string
    mut: (fn: (draft: Draft<State>) => void) => void
    id: number
    core: State
  }) => void
}

export const storyData: { [key: number]: StoryData } = {
  1: {
    title: 'Hallo',
    x: 100,
    y: 100,
    deps: [],
    render: ({ core, mut }) => {
      if (!core.name && core.modal != 'name') {
        mut((c) => {
          c.modal = 'name'
        })
      }
      return (
        <>
          <p>
            Hallo{core.name ? <strong> {core.name}</strong> : ''}! Schön, dass
            du hier bist :)
          </p>
          <p>
            Und hat dir schon jemand gesagt, dass du wunderbare ✨Augen✨ hast?
            Love them.
          </p>
          <p>
            Mein Name ist Tina und ich bin eine Einhorn-Dame. Okay, ich bin erst
            13 Jahre alt, aber ich fühle mich schon richtig erwachsen. Im
            Gegensatz zu meinem putzigen Bruder Teo, er ist erst 7 Jahre alt.
          </p>
          <p>
            Das Leben ist nicht easy als Einhorn in unserer Gesellschaft. Es
            gibt nicht viele von uns und wir werden manchmal komisch angeschaut
            😢
          </p>
          <p>
            Aber darum soll es hier nicht gehen. Ich denke mir gerne kleine
            Mathe-Rätsel aus. Ich hoffe, diese machen dir genauso viel Spaß wie
            mir!
          </p>
          <p>Dein erstes Rätsel: Wie viele Buchstaben hat dein Name?</p>
        </>
      )
    },
    submit: ({ value, mut, id, core }) => {
      genericSubmitHandler(
        value,
        parseInt(value) == core.name?.length,
        mut,
        id,
        core
      )
    },
  },
  2: {
    title: 'Würfel',
    x: 250,
    y: 70,
    deps: [1],
    render: () => (
      <>
        <p>
          Schau dir deine Hände an: so wunderschön zart und feinfühlig. Manchmal
          wünschte ich, ich hätte statt meiner Hufen auch Hände wie du!
        </p>
        <p>
          Aber auch mit Hufen kann ich gut mit Würfeln umgehen und ich denke mir
          gerne kleine Spiele damit aus. Eine Regel erfüllen alle Würfel: Die
          Summe der Augenzahlen auf einem Würfel muss auf gegenüberliegenden
          Seiten immer 7 betragen. Das weißt du bestimmt schon.
        </p>
        <p>
          Mein Bruder Teo weiß das noch nicht. Er hat heute in der Schule eine
          handvoll Würfel gebastelt und auf dem ersten Blick sehe ich schon,
          dass einige falsch sind.
        </p>
        <img src="/story2.jpg" alt="5 Würfel" />
        <p>
          Das sage ich ihm natürlich nicht, sondern lobe ihn für seine Mühe :)
          Aber mir kannst du das sagen: Welche Würfel sind sicherlich falsch?
          Gib die entsprechenden Buchstaben als Antwort ein, z.B.{' '}
          <code>a b c</code>.
        </p>
      </>
    ),
    submit: ({ value, mut, id, core }) => {
      const letters = new Set(
        value
          .toLowerCase()
          .split('')
          .map((x) => x.trim())
          .filter(Boolean)
      )
      const isCorrect =
        letters.size == 3 &&
        letters.has('a') &&
        letters.has('d') &&
        letters.has('e')

      genericSubmitHandler(value, isCorrect, mut, id, core)
    },
  },
  3: {
    title: 'Uhrzeit',
    x: 180,
    y: 220,
    deps: [1],
    render: ({ onSubmit, feedback }) => (
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
          Nach einer Weile ist er bei <strong>100 Uhr</strong> angekommen. Da
          interessiert es mich schon: Welcher Uhrzeit entspricht das ⌚?
          Verschiebe den Regler, um die Uhrzeit einzustellen:
        </p>
        <ClockInput onSubmit={onSubmit} feedback={feedback} />
      </>
    ),
    hideSubmit: true,
    submit: ignoreCaseSolution('4 Uhr'),
  },
}

function genericSubmitHandler(
  value: string,
  isCorrect: boolean,
  mut: (fn: (draft: Draft<State>) => void) => void,
  id: number,
  core: State
) {
  if (isCorrect) {
    mut((c) => {
      c.storyFeedback = {
        correct: true,
        text: `"${value}" ist richtig`,
      }
    })
    addSolved(mut, core.userId, id)
  } else {
    mut((c) => {
      c.storyFeedback = {
        correct: false,
        text: `"${value}" ist falsch`,
      }
    })
  }
}

function ignoreCaseSolution(answer: string) {
  return (props: Parameters<StoryData['submit']>[0]) => {
    const value = props.value.trim().toLowerCase()
    const isCorrect = answer.toLowerCase().trim() == value
    genericSubmitHandler(
      props.value.trim(),
      isCorrect,
      props.mut,
      props.id,
      props.core
    )
  }
}

function addSolved(
  mut: (fn: (draft: Draft<State>) => void) => void,
  userId: string,
  storyId: number
) {
  mut((c) => {
    c.solved.add(storyId)
  })
  submit_event(userId, storyId)
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
