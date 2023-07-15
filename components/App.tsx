import clsx from 'clsx'
import produce, { Immutable, Draft } from 'immer'
import { Fragment, useState } from 'react'
import shortid from 'shortid'
import { storyData } from '../lib/data'
import { AboutModal } from './AboutModal'
import { InputBox } from './InputBox'
import { NameModal } from './NameModal'

export type State = Immutable<{
  showStory: number
  storyFeedback: { correct: boolean; text: string } | null
  solved: Set<number>
  name: string | null
  modal: 'impressum' | 'name' | null
  userId: string
}>

export default function App() {
  const [core, setCore] = useState<State>({
    showStory: -1,
    storyFeedback: null,
    solved: new Set(),
    name: null,
    modal: null,
    userId: shortid.generate(),
  })

  return <>{core.showStory == -1 ? renderOverview() : renderStory()}</>

  function renderOverview() {
    return (
      <div className="overflow-auto min-h-full main-container">
        <h1 className="mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit mt-6 text-2xl">
          Einhorn der Mathematik
        </h1>
        {core.name && (
          <div className="fixed top-2 right-2 px-1 bg-white/50 rounded">
            Name: <strong>{core.name}</strong>
          </div>
        )}
        <div className="mt-4 ml-4 w-[1200px] h-[600px] relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
            {Object.entries(storyData).map(([id, data]) => {
              if (isVisible(parseInt(id))) {
                return (
                  <Fragment key={id}>
                    {data.deps.map((dep) => {
                      if (isVisible(dep)) {
                        return (
                          <line
                            key={`connect-${id}-${dep}`}
                            x1={data.x + 32}
                            y1={data.y + 64}
                            x2={storyData[dep].x + 32}
                            y2={storyData[dep].y + 64}
                            strokeWidth="10"
                            stroke="gray"
                          />
                        )
                      } else {
                        return null
                      }
                    })}
                  </Fragment>
                )
              }
              return null
            })}
          </svg>
          {Object.entries(storyData).map(([id, data]) =>
            data.deps.length == 0 || data.deps.some((d) => core.solved.has(d))
              ? renderStoryIcon(
                  data.title,
                  data.x + (data.xCorrection ?? 0),
                  data.y,
                  parseInt(id)
                )
              : null
          )}
        </div>
        <div className="fixed right-1 bottom-1 text-sm text-gray-300">
          <button
            className="hover:underline"
            onClick={() => {
              mut((c) => {
                c.modal = 'impressum'
              })
            }}
          >
            Impressum/Datenschutz
          </button>{' '}
          | Hintergrund:{' '}
          <a
            href="https://www.wallpaperflare.com/pink-and-blue-sky-sky-clouds-nature-wallpaper-275895"
            className="underline"
            target="_blank"
          >
            wallpaperflare
          </a>
        </div>
        {core.modal == 'impressum' && (
          <AboutModal
            onClose={() => {
              mut((c) => {
                c.modal = null
              })
            }}
          />
        )}
        <style jsx global>
          {`
            html,
            body,
            #__next {
              height: 100%;
            }
            .main-container {
              background-image: url('/wallpaper.jpg');
              background-repeat: no-repeat;
              background-size: cover;
            }
          `}
        </style>
      </div>
    )
  }

  function renderStory() {
    const data = storyData[core.showStory]
    return (
      <>
        <h1
          className="mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit mt-6 text-2xl cursor-pointer"
          onClick={() => {
            mut((c) => {
              c.showStory = -1
            })
          }}
        >
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
              <div className="mt-8 [&>p]:mt-4 [&_code]:text-pink-400 [&_code]:font-bold [&>img]:my-6">
                {data.render({
                  core,
                  mut,
                  onSubmit: (value) => {
                    data.submit({ value, mut, id: core.showStory, core })
                  },
                  feedback: core.storyFeedback ? (
                    <div className="mt-6 text-yellow-600">
                      {core.storyFeedback.text}
                    </div>
                  ) : null,
                })}
                {!data.hideSubmit && (
                  <>
                    {core.storyFeedback && (
                      <div className="mt-6 text-yellow-600">
                        {core.storyFeedback.text}
                      </div>
                    )}
                    <InputBox
                      className="mt-8 -ml-1"
                      submit={(value) => {
                        data.submit({ value, mut, id: core.showStory, core })
                      }}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
        {core.modal == 'name' && (
          <NameModal
            onClose={() => {
              mut((c) => {
                c.modal = null
                c.showStory = -1
              })
            }}
            setUserName={(name) => {
              mut((c) => {
                c.name = name
                c.modal = null
              })
            }}
          />
        )}
      </>
    )
  }

  function renderStoryIcon(title: string, x: number, y: number, id: number) {
    return (
      <div
        className={clsx(
          'flex items-center flex-col w-fit cursor-pointer group absolute pointer-events-none',
          core.solved.has(id) && 'pt-2'
        )}
        style={{ left: `${x}px`, top: `${y}px` }}
        onClick={() => {
          mut((c) => {
            c.showStory = id
            c.storyFeedback = null
          })
        }}
        key={id}
      >
        <button className="text-lg bg-gray-100/70 px-1 py-0.5 rounded group-hover:bg-white/80 pointer-events-auto">
          {title}
        </button>
        {core.solved.has(id) ? (
          <div className="w-16 pt-3 flex justify-center items-center">
            <div className="bg-pink-200 rounded-full w-6 h-6 pointer-events-auto"></div>
          </div>
        ) : (
          <img
            src="/einhorn.png"
            alt="Kopf eines Einhorns"
            className="w-16 pointer-events-auto pt-2"
          ></img>
        )}
      </div>
    )
  }

  function mut(fn: (draft: Draft<State>) => void) {
    setCore((core) => produce(core, fn))
  }

  function isVisible(id: number) {
    return (
      storyData[id].deps.length == 0 ||
      storyData[id].deps.some((d) => core.solved.has(d))
    )
  }
}
