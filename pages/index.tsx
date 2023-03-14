import clsx from 'clsx'
import produce, { Draft, enableMapSet, Immutable } from 'immer'
import Head from 'next/head'
import { useState } from 'react'
import { InputBox } from '../components/InputBox'

type State = Immutable<{
  showStory: number
  storyFeedback: { correct: boolean; text: string } | null
  solved: Set<number>
  name: string
}>

enableMapSet()

interface StoryData {
  title: string
  x: number
  y: number
  deps: number[]
  render: (props: {
    mut: (fn: (draft: Draft<State>) => void) => void
    id: number
  }) => JSX.Element
}

const storyData: { [key: number]: StoryData } = {
  1: {
    title: 'Hallo!',
    x: 100,
    y: 100,
    deps: [],
    render: ({ mut, id }) => (
      <>
        <p>Herzlich Willkommen! Schön, dass du hier bist :)</p>
        <p>
          Und hat dir schon jemand gesagt, dass du heute wunderbare Augen hast?
          Love them.
        </p>
        <p>
          Mein Name ist Tina und ich bin eine Einhorn-Dame. Okay, ich bin erst
          13 Jahre alt, aber ich fühle mich schon richtig erwachsen.
        </p>
        <p>
          Das Leben ist nicht easy als Einhorn in unserer Gesellschaft. Es gibt
          nicht viele von uns wir haben doch manchmal ... andere Bedürfnisse.
        </p>
        <p>
          Und manchmal fühle ich mich auch etwas alleine - aber in solchen
          Momenten versuche ich mich abzulenken, zum Beispiel durch das
          Ausdenken von kleinen Mathe-Rätseln. Ich hoffe, diese machen dir
          genauso viel Spaß wie mir.
        </p>
        <p>
          Und nein, es wird nicht so langweilig wie Mathe im Unterricht. Oh
          welp, ich könnte dort sterben.
        </p>
        <p>So viel zu mir. Nun, sage mir, wie darf ich dich nennen?</p>
        <InputBox
          className="mt-8 -ml-1"
          submit={(val) => {
            if (val) {
              const trimmed = val.trim()
              if (trimmed) {
                mut((c) => {
                  c.storyFeedback = {
                    correct: true,
                    text: `Dein Name "${trimmed}" wurde gespeichert.`,
                  }
                  c.solved.add(id)
                })
              }
            }
          }}
        />
      </>
    ),
  },
}

export default function Index() {
  const [core, setCore] = useState<State>({
    showStory: -1,
    storyFeedback: null,
    solved: new Set(),
    name: '',
  })

  return (
    <>
      <Head>
        <title>Einhorn der Mathematik</title>
      </Head>
      {core.showStory == -1 ? renderOverview() : renderStory()}
    </>
  )

  function renderOverview() {
    return (
      <>
        <h1 className="mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit mt-6 text-2xl">
          Einhorn der Mathematik
        </h1>
        <div className="mt-4 ml-4 w-[1200px] h-[600px] relative">
          {Object.entries(storyData).map(([id, data]) =>
            renderStoryIcon(data.title, data.x, data.y, parseInt(id))
          )}
        </div>
        <style jsx global>
          {`
            body {
              background-image: url('/wallpaper.jpg');
              background-repeat: no-repeat;
              background-size: cover;
            }
          `}
        </style>
      </>
    )
  }

  function renderStory() {
    const data = storyData[core.showStory]
    return (
      <>
        <h1 className="mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit mt-6 text-2xl">
          Einhorn der Mathematik
        </h1>
        <div className="max-w-[800px] mx-auto bg-pink-50 rounded p-3 mt-6">
          <h2 className="mt-3 text-xl font-bold">{data.title}</h2>

          {core.storyFeedback && core.storyFeedback.correct ? (
            <>
              <div className="mt-10 text-green-600">
                {core.storyFeedback.text}
              </div>
              <button
                className="mt-8 text-pink-500 hover:underline hover:text-pink-600"
                onClick={() => {
                  mut((c) => {
                    c.showStory = -1
                  })
                }}
              >
                weiter
              </button>
            </>
          ) : (
            <>
              <button
                className="mt-3 text-pink-500 hover:underline hover:text-pink-600"
                onClick={() => {
                  mut((c) => {
                    c.showStory = -1
                  })
                }}
              >
                zurück
              </button>
              <div className="mt-8 [&>p]:mt-4">
                {data.render({ mut, id: core.showStory })}
              </div>
            </>
          )}
        </div>
      </>
    )
  }

  function renderStoryIcon(title: string, x: number, y: number, id: number) {
    return (
      <div
        className="flex items-center flex-col w-fit cursor-pointer group absolute pointer-events-none"
        style={{ left: `${x}px`, top: `${y}px` }}
        onClick={() => {
          mut((c) => {
            c.showStory = id
            c.storyFeedback = null
          })
        }}
      >
        <button className="text-lg bg-white/50 px-1 py-0.5 rounded group-hover:bg-white/80 pointer-events-auto">
          {title}
        </button>
        <img
          src="/einhorn.png"
          alt="Kopf eines Einhorns"
          className="w-16 pointer-events-auto pt-2"
        ></img>
      </div>
    )
  }

  function mut(fn: (draft: Draft<State>) => void) {
    setCore((core) => produce(core, fn))
  }
}
