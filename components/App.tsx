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
import { LoginModal } from './LoginModal'
import { makePost } from '../lib/make-post'

interface PlayerInfo {
  name: string
  solved: number
  id: string
  createdAt: number
  solvedTs: number[]
  mins?: string
}
export type State = Immutable<{
  showStory: number
  storyFeedback: { correct: boolean; text: string } | null
  solved: Set<number>
  modal: 'impressum' | 'name' | 'login' | 'change' | null
  userId: string
  analyze?: {
    players: number
    medianSeconds: number
    storyStats: { [key: string]: { reachable: number; solved: number } }
    inputs: { [key: string]: string[] }
    playerInfo: PlayerInfo[]
  }
  editorMode: boolean
  playerData: {
    name: string
    id: string
  }
  persist: boolean
  persistBannerShown: boolean
}>

export default function App() {
  const [core, setCore] = useState<State>({
    showStory: -1,
    storyFeedback: null,
    solved: new Set(),
    modal: null,
    userId: shortid.generate(),
    editorMode: false,
    playerData: {
      name: '',
      id: shortid(),
    },
    persist: false,
    persistBannerShown: false,
  })

  const cutOff = new Date('2023-11-01')

  const runAnalyse = useRef(false)

  console.log('render', core.modal)

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem('einhorn_der_mathematik_data_v2') ??
        sessionStorage.getItem('einhorn_der_mathematik_data_v2') ??
        '{}'
    )
    mut((state) => {
      try {
        data.solved.forEach((id: number) => {
          state.solved.add(id)
        })
        state.playerData.id = data.id
        state.playerData.name = data.name
        state.persist = data.persist
        state.persistBannerShown = data.persistBannerShown
      } catch (e) {
        // probably invalid state
      }
    })
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
        const data = (await makePost('/export', {
          password,
        })) as {
          users: { id: number; name: string; createdAt: string }[]
          solved: { storyId: number; userId: number; createdAt: string }[]
          logs: {
            userId: number
            storyId: number
            value: string
            correct: number
            createdAt: string
          }[]
        }

        // TODO: preprocess solved data properly
        const stories = new Set<number>()
        const solvedBy = data.solved.reduce((res, obj) => {
          const ts = new Date(obj.createdAt.substring(0, 23)).getTime()
          if (ts < cutOff.getTime()) return res
          const key = obj.userId
          const entry = (res[key] = res[key] || {
            solved: new Set(),
            solvedTs: [],
          })
          entry.solved.add(obj.storyId)
          stories.add(obj.storyId)
          entry.solvedTs.push(ts)
          return res
        }, {} as { [key: number]: { solved: Set<number>; solvedTs: number[] } })
        // alert(JSON.stringify(jsonResp))
        sessionStorage.setItem('einhorn_der_mathematik_analyze_pw', password)
        const playerInfo: PlayerInfo[] = data.users
          .map((user) => {
            const createdAt = new Date(
              user.createdAt.substring(0, 23)
            ).getTime()
            return {
              id: user.id.toString(),
              createdAt,
              name: user.name,
              solved: solvedBy[user.id]?.solved.size ?? 0,
              solvedTs: solvedBy[user.id]?.solvedTs ?? [],
            }
          })
          .filter((x) => x.createdAt >= cutOff.getTime())
        playerInfo.sort((a, b) => a.createdAt - b.createdAt)

        const times = playerInfo.map((player) => {
          if (player.solvedTs.length == 0) {
            return 0
          }
          const minTime = Math.min(...player.solvedTs)
          const maxTime = Math.max(...player.solvedTs)
          if (player) {
            player.mins = ((maxTime - minTime) / 1000 / 60).toFixed(0)
          }
          return maxTime - minTime
        })
        times.sort((a, b) => a - b)

        const storyStats: {
          [key: number]: { reachable: number; solved: number }
        } = {}
        Array.from(stories).forEach((storyId) => {
          const reachable = Object.values(playerInfo).filter(
            (user) =>
              storyId == 1 ||
              storyData[storyId as number].deps.some((dep) =>
                solvedBy[parseInt(user.id)]?.solved.has(dep)
              )
          ).length
          const solved = Object.values(playerInfo).filter((user) =>
            solvedBy[parseInt(user.id)]?.solved.has(storyId as number)
          ).length
          storyStats[storyId] = { reachable, solved }
        })

        const inputs = data.logs.reduce((res, obj) => {
          if (
            new Date(obj.createdAt.substring(0, 23)).getTime() <
            cutOff.getTime()
          )
            return res
          const key = obj.storyId
          const entry = (res[key] = res[key] || [])
          entry.push(obj.value)
          return res
        }, {} as { [key: string]: string[] })

        mut((state) => {
          state.analyze = {
            players: data.users.length,
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
        <div
          className="min-h-full pt-6 min-w-fit"
          style={{
            backgroundImage: "url('/wallpaper.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <h1 className="mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit text-2xl">
            Einhorn der Mathematik
          </h1>
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
              {core.analyze.playerInfo.map(
                ({ name, solved, id, createdAt, mins }) =>
                  solved == 0 ? (
                    <span key={id} className="inline-block mr-4 text-gray-400">
                      <i>{name}</i>
                    </span>
                  ) : (
                    <span
                      key={id}
                      className="inline-block mr-4"
                      title={
                        new Date(createdAt).toString() + ' / ' + mins + 'min'
                      }
                    >
                      {name}{' '}
                      <span className="text-gray-600">
                        ({solved} / {mins}min)
                      </span>
                    </span>
                  )
              )}
            </div>
          )}
          {core.playerData.name && (
            <div className="fixed top-3 right-3 px-2 py-0.5 bg-white/50 rounded">
              Name: <strong>{core.playerData.name}</strong>
            </div>
          )}
          {core.solved.size > 0 &&
            (core.persistBannerShown ? (
              <div className="fixed left-6 bottom-9 sm:bottom-4 text-white">
                <label className="cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={core.persist}
                    onChange={(e) => {
                      mut((c) => {
                        c.persist = e.target.checked
                      })
                      if (!e.target.checked) {
                        localStorage.removeItem(
                          'einhorn_der_mathematik_data_v2'
                        )
                      }
                    }}
                  />{' '}
                  Fortschritt speichern
                </label>
              </div>
            ) : (
              <div className="fixed left-6 bottom-9 sm:bottom-4 w-[450px] max-w-[90%] mr-4 bg-yellow-100 rounded-xl px-2 py-1">
                <p>
                  Möchtest du deinen Fortschritt auf diesem Gerät speichern?
                </p>
                <p className="my-2 flex justify-between items-baseline">
                  <button
                    className="text-sm text-gray-700 underline ml-4"
                    onClick={() => {
                      mut((c) => {
                        c.persistBannerShown = true
                      })
                    }}
                  >
                    später
                  </button>
                  <button
                    className="px-2 py-0.5 bg-yellow-300 hover:bg-yellow-400 inline-block rounded mr-4"
                    onClick={() => {
                      mut((c) => {
                        c.persist = true
                        c.persistBannerShown = true
                      })
                    }}
                  >
                    Speichern
                  </button>
                </p>
              </div>
            ))}
          <div className="mt-4 mx-auto w-[1200px] h-[700px] relative z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
              {Object.entries(storyData).map(([id, data]) => {
                if (isVisible(parseInt(id))) {
                  return (
                    <Fragment key={id}>
                      {data.deps.map((dep) => {
                        if (core.solved.has(dep) || core.analyze) {
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
          <div className="fixed right-6 bottom-4 text-sm text-gray-300">
            <button
              className="hover:underline"
              onClick={() => {
                mut((c) => {
                  c.modal = 'impressum'
                })
              }}
            >
              Impressum/Datenschutz
            </button>
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
          {core.modal == 'login' && (
            <LoginModal
              onClose={() => {
                mut((c) => {
                  c.modal = null
                  c.showStory = -1
                })
              }}
              mut={mut}
            />
          )}{' '}
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
              console.log('hi')
              mut((c) => {
                c.playerData.name = name
                c.modal = null
              })
              console.log('value after mut', core.modal)
              // makePost('/name', { name, userId: core.playerData.id })
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
    setCore((core) => {
      const newval = produce(core, fn)

      const data = JSON.stringify({
        solved: Array.from(newval.solved),
        id: newval.playerData.id,
        name: newval.playerData.name,
        persist: newval.persist,
        persistBannerShown: newval.persistBannerShown,
      })

      if (newval.persist) {
        localStorage.setItem('einhorn_der_mathematik_data_v2', data)
        sessionStorage.removeItem('einhorn_der_mathematik_data_v2')
      } else {
        sessionStorage.setItem('einhorn_der_mathematik_data_v2', data)
        localStorage.removeItem('einhorn_der_mathematik_data_v2')
      }

      return newval
    })
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
