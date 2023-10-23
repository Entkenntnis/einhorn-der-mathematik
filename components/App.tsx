import clsx from 'clsx'
import produce, { Immutable, Draft } from 'immer'
import { Fragment, useEffect, useRef, useState } from 'react'
import shortid from 'shortid'
import { storyData } from '../lib/data'
import { AboutModal } from './AboutModal'
import { InputBox } from './InputBox'
import { NameModal } from './NameModal'
import { FaIcon } from './FaIcon'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface PlayerInfo {
  name: string
  solved: number
  id: string
}
export type State = Immutable<{
  showStory: number
  storyFeedback: { correct: boolean; text: string } | null
  solved: Set<number>
  name: string | null
  modal: 'impressum' | 'name' | null
  userId: string
  analyze?: {
    players: number
    medianSeconds: number
    storyStats: { [key: string]: { reachable: number; solved: number } }
    inputs: { [key: string]: string[] }
    playerInfo: PlayerInfo[]
  }
  editorMode: boolean
}>

export default function App() {
  const [core, setCore] = useState<State>({
    showStory: -1,
    storyFeedback: null,
    solved: new Set(),
    name: null,
    modal: null,
    userId: shortid.generate(),
    editorMode: false,
  })

  const cutOff = new Date('2023-10-24')

  const runAnalyse = useRef(false)

  useEffect(() => {
    const previousStorage = JSON.parse(
      sessionStorage.getItem('einhorn_der_mathematik_solved') ?? '[]'
    )
    previousStorage.forEach((id: number) => {
      mut((state) => {
        state.solved.add(id)
      })
    })
    const username = sessionStorage.getItem('einhorn_der_mathematik_name')
    if (username) {
      mut((state) => {
        state.name = username
      })
    }
    const userId = sessionStorage.getItem('einhorn_der_mathematik_userid')
    if (userId) {
      mut((state) => {
        state.userId = userId
      })
    } else {
      sessionStorage.setItem('einhorn_der_mathematik_userid', core.userId)
    }
    if (window.location.hash == '#demo') {
      mut((state) => {
        for (const id in storyData) {
          state.solved.add(parseInt(id))
        }
      })
    }
    if (window.location.hash == '#editor') {
      mut((state) => {
        state.editorMode = true
      })
    }
    if (window.location.hash == '#analyze' && !runAnalyse.current) {
      runAnalyse.current = true
      const password =
        sessionStorage.getItem('einhorn_der_mathematik_analyze_pw') ||
        prompt('Passwort') ||
        '0'
      void (async () => {
        const res = await fetch('https://stats-einhorn.arrrg.de/export', {
          method: 'POST',
          body: new URLSearchParams({
            password,
          }),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        const jsonResp = await res.json()
        const data = jsonResp.event as {
          userId: string
          storyId: number
          createdAt: string
        }[]
        const playerInfo: PlayerInfo[] = []
        const inputs = (
          jsonResp.input as {
            userId: string
            storyId: number
            createdAt: string
            value: string
          }[]
        ).reduce((res, obj) => {
          if (new Date(obj.createdAt).getTime() < cutOff.getTime()) return res
          if (obj.storyId == -1) {
            playerInfo.push({ name: obj.value, id: obj.userId, solved: -1 })
            return res
          }
          const key = obj.storyId
          const entry = (res[key] = res[key] || [])
          entry.push(obj.value)
          return res
        }, {} as { [key: string]: string[] })
        sessionStorage.setItem('einhorn_der_mathematik_analyze_pw', password)
        const stories = new Set()
        const users = data.reduce((res, obj) => {
          if (new Date(obj.createdAt).getTime() < cutOff.getTime()) return res
          const key = obj.userId
          const entry = (res[key] = res[key] || { solved: new Set(), ts: [] })
          entry.solved.add(obj.storyId)
          stories.add(obj.storyId)
          entry.ts.push(new Date(obj.createdAt).getTime())
          return res
        }, {} as { [key: string]: { solved: Set<number>; ts: number[] } })
        const times = Object.values(users).map((user) => {
          const minTime = Math.min(...user.ts)
          const maxTime = Math.max(...user.ts)
          return maxTime - minTime
        })
        times.sort((a, b) => a - b)
        const storyStats: {
          [key: string]: { reachable: number; solved: number }
        } = {}
        for (const userId in users) {
          const player = playerInfo.find((p) => p.id == userId)
          if (player) {
            player.solved = users[userId].solved.size
          }
        }
        Array.from(stories).forEach((storyId) => {
          const reachable = Object.values(users).filter(
            (user) =>
              storyId == 1 ||
              storyData[storyId as number].deps.some((dep) =>
                user.solved.has(dep)
              )
          ).length
          const solved = Object.values(users).filter((user) =>
            user.solved.has(storyId as number)
          ).length
          storyStats[storyId as string] = { reachable, solved }
        })
        mut((state) => {
          state.analyze = {
            players: Object.keys(users).length,
            medianSeconds: Math.round(median(times) / 1000),
            storyStats,
            inputs,
            playerInfo,
          }
        })
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{core.showStory == -1 ? renderOverview() : renderStory()}</>

  function renderOverview() {
    return (
      <div className="overflow-auto h-full">
        <div className="min-h-full main-container pt-6 min-w-fit">
          <h1 className="mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit text-2xl">
            Einhorn der Mathematik
          </h1>
          {core.name && (
            <div className="fixed top-2 right-2 px-1 bg-white/50 rounded">
              Name: <strong>{core.name}</strong>
            </div>
          )}
          {core.analyze && (
            <div className="my-4 bg-white p-3">
              Daten ab {cutOff.toISOString().substring(0, 10)}
              <br />
              <br />
              Anzahl SpielerInnen: {core.analyze.players}
              <br />
              <br />
              Median Spielzeit: {core.analyze.medianSeconds}s
              <br />
              <br />
              Namen:{' '}
              {core.analyze.playerInfo.map(({ name, solved, id }) =>
                solved == -1 ? (
                  <span key={id} className="inline-block mr-4 text-gray-400">
                    <i>{name}</i>
                  </span>
                ) : (
                  <span key={id} className="inline-block mr-4">
                    {name} <span className="text-gray-600">({solved})</span>
                  </span>
                )
              )}
            </div>
          )}
          <div className="mt-4 mx-auto w-[1200px] h-[700px] relative">
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
            <img
              src="/shooting-star.png"
              alt="Sternschnuppe"
              className="w-[60px] absolute left-[1000px] top-[500px]"
            />
            {Object.entries(storyData).map(([id, data]) =>
              data.deps.length == 0 ||
              data.deps.some((d) => core.solved.has(d)) ||
              core.analyze ||
              core.editorMode
                ? renderStoryIcon(data.title, data.x, data.y, parseInt(id))
                : null
            )}
          </div>
          <div className="fixed right-4 bottom-4 text-sm text-gray-300">
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
        <div className="max-w-[800px] mx-auto bg-pink-50 rounded p-3 mt-6 mb-12">
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
              <div className="mt-8 [&>p]:mt-4 [&_code]:text-pink-400 [&_code]:font-bold [&>img]:my-6 [&_a]:underline [&_a]:text-blue-600 [&_a]:hover:text-blue-700">
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
        {core.analyze && (
          <div className="mt-24 mx-4 text-gray-500">
            Eingaben: {core.analyze.inputs[core.showStory]?.join(', ')}
          </div>
        )}
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
            userId={core.userId}
          />
        )}
      </>
    )
  }

  function renderStoryIcon(title: string, x: number, y: number, id: number) {
    return (
      <div
        className={clsx(
          'flex items-center flex-col w-[64px] cursor-pointer group absolute pointer-events-none',
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
        <button className="text-lg bg-gray-100/70 px-1 py-0.5 rounded group-hover:bg-white/80 pointer-events-auto whitespace-nowrap">
          {title}
        </button>
        {core.solved.has(id) || core.analyze ? (
          <div className="w-16 pt-3 flex justify-center items-center">
            <div className="bg-pink-200 rounded-full w-6 h-6 pointer-events-auto">
              <FaIcon icon={faCheck} className="ml-[5px] text-pink-400" />
            </div>
          </div>
        ) : (
          <img
            src="/einhorn.png"
            alt="Kopf eines Einhorns"
            className="w-16 pointer-events-auto pt-2"
          ></img>
        )}
        {core.analyze && core.analyze.storyStats[id] && (
          <small>
            {core.analyze.storyStats[id].solved} /{' '}
            <strong>
              {Math.round(
                (core.analyze.storyStats[id].solved /
                  core.analyze.storyStats[id].reachable) *
                  100
              )}
              %
            </strong>
          </small>
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
      storyData[id].deps.some((d) => core.solved.has(d)) ||
      core.analyze ||
      core.editorMode
    )
  }

  function median(arr: number[]) {
    const middle = Math.floor(arr.length / 2)
    if (arr.length % 2 === 0) {
      return (arr[middle - 1] + arr[middle]) / 2
    } else {
      return arr[middle]
    }
  }
}
