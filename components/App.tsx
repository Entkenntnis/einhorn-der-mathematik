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
import { makePost } from '../lib/make-post'

interface PlayerInfo {
  name: string
  solved: number
  id: string
  createdAt: number
  solvedTs: number[]
  nameTs: number
  mins?: string
}
export type State = Immutable<{
  showStory: number
  storyFeedback: { correct: boolean; text: string; toWait?: number } | null
  solved: Set<number>
  modal: 'impressum' | 'name' | 'login' | 'change' | null
  userId: string
  analyze?: {
    players: number
    medianSeconds: number
    medianPlayers: number
    storyStats: { [key: string]: { reachable: number; solved: number } }
    inputs: { [key: string]: { value: string; correct: boolean }[] }
    playerInfo: PlayerInfo[]
  }
  editorMode: boolean
  playerData: {
    name: string
    id: string
  }
  persist: boolean
  persistBannerShown: boolean
  freeTries: number
  scrollPosTop: number
  scrollPosLeft: number
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
    freeTries: 0,
    scrollPosTop: 0,
    scrollPosLeft: 0,
  })

  const cutOff = new Date('2024-05-05')

  const runAnalyse = useRef(false)

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      window.location.reload()
    })
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
          names: { userId: string; name: string; createdAt: string }[]
          solves: { storyId: number; userId: string; createdAt: string }[]
          logs: {
            userId: number
            storyId: number
            value: string
            correct: boolean
            createdAt: string
          }[]
        }

        // TODO: preprocess solved data properly
        const stories = new Set<number>()
        const solvedBy = data.solves.reduce((res, obj) => {
          const ts = new Date(obj.createdAt).getTime()
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
        }, {} as { [key: string]: { solved: Set<number>; solvedTs: number[] } })
        // alert(JSON.stringify(jsonResp))
        sessionStorage.setItem('einhorn_der_mathematik_analyze_pw', password)
        const playerInfo: PlayerInfo[] = data.names
          .map((user) => {
            const createdAt = new Date(user.createdAt).getTime()
            return {
              id: user.userId.toString(),
              createdAt,
              name: user.name,
              solved: solvedBy[user.userId]?.solved.size ?? 0,
              solvedTs: solvedBy[user.userId]?.solvedTs ?? [],
              nameTs: createdAt,
            }
          })
          .filter((x) => x.createdAt >= cutOff.getTime())
        playerInfo.sort((a, b) => a.createdAt - b.createdAt)

        const times = playerInfo
          .map((player) => {
            if (player.solvedTs.length == 0) {
              return -1
            }
            const minTime = Math.min(...player.solvedTs, player.nameTs)
            const maxTime = Math.max(...player.solvedTs)
            if (player) {
              player.mins = ((maxTime - minTime) / 1000 / 60).toFixed(0)
            }
            return maxTime - minTime
          })
          .filter((time) => time >= 0)
        times.sort((a, b) => a - b)

        const storyStats: {
          [key: number]: { reachable: number; solved: number }
        } = {}
        Array.from(stories).forEach((storyId) => {
          const reachable = Object.values(playerInfo).filter(
            (user) =>
              storyId == 1 ||
              storyData[storyId as number].deps.some((dep) =>
                solvedBy[user.id]?.solved.has(dep)
              )
          ).length
          const solved = Object.values(playerInfo).filter((user) =>
            solvedBy[user.id]?.solved.has(storyId as number)
          ).length
          storyStats[storyId] = { reachable, solved }
        })

        const inputs = data.logs.reduce((res, obj) => {
          if (new Date(obj.createdAt).getTime() < cutOff.getTime()) return res
          const key = obj.storyId
          const entry = (res[key] = res[key] || [])
          entry.push({ value: obj.value, correct: !!obj.correct })
          return res
        }, {} as { [key: string]: { value: string; correct: boolean }[] })

        mut((state) => {
          state.analyze = {
            players: playerInfo.length,
            medianSeconds: Math.round(median(times) / 1000),
            medianPlayers: times.length,
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
      <div className="overflow-auto h-full" id="map-scroller">
        <div
          className="min-h-full pt-6 min-w-fit"
          style={{
            backgroundImage: "url('/wallpaper.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <h1 className="ml-4 sm:ml-24 lg:mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit text-2xl">
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
              Median Spielzeit (
              <span className="text-gray-600">
                ab einer gelösten Aufgabe, Zeit ab Namenseingabe,{' '}
                {core.analyze.medianPlayers} Personen
              </span>
              ):{' '}
              {isNaN(core.analyze.medianSeconds) ? (
                '---'
              ) : (
                <>{core.analyze.medianSeconds}s</>
              )}
              <br />
              <br />
              Details:{' '}
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
            <div className="fixed top-3 right-5 px-2 py-0.5 bg-white/50 rounded">
              Name: <strong>{core.playerData.name}</strong>
            </div>
          )}
          {core.solved.size > 0 &&
            !core.editorMode &&
            (core.persistBannerShown ? (
              <div className="fixed sm:left-6 left-2 text-sm sm:text-base bottom-4 text-white z-10">
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
              <div className="fixed left-6 bottom-9 sm:bottom-4 max-w-[90%] mr-4 bg-yellow-100 rounded-xl px-4 pb-1 pt-2 z-10">
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
          <div className="mt-4 mx-auto w-[1200px] h-[1000px] relative z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1000">
              <defs>
                <linearGradient
                  id="grad_vertical"
                  gradientTransform="rotate(90)"
                >
                  <stop offset="0%" stopColor="rgba(255, 153, 153, 1)" />
                  <stop offset="10%" stopColor="rgba(255, 204, 153, 1)" />
                  <stop offset="20%" stopColor="rgba(255, 255, 153, 1)" />
                  <stop offset="30%" stopColor="rgba(204, 255, 153, 1)" />
                  <stop offset="40%" stopColor="rgba(153, 255, 204, 1)" />
                  <stop offset="50%" stopColor="rgba(153, 204, 255, 1)" />
                  <stop offset="60%" stopColor="rgba(153, 153, 255, 1)" />
                  <stop offset="70%" stopColor="rgba(204, 153, 255, 1)" />
                  <stop offset="80%" stopColor="rgba(255, 153, 255, 1)" />
                  <stop offset="90%" stopColor="rgba(255, 204, 204, 1)" />
                  <stop offset="100%" stopColor="rgba(255, 153, 153, 1)" />
                </linearGradient>
                <linearGradient id="grad_horizontal">
                  <stop offset="0%" stopColor="rgba(255, 153, 153, 1)" />
                  <stop offset="10%" stopColor="rgba(255, 204, 153, 1)" />
                  <stop offset="20%" stopColor="rgba(255, 255, 153, 1)" />
                  <stop offset="30%" stopColor="rgba(204, 255, 153, 1)" />
                  <stop offset="40%" stopColor="rgba(153, 255, 204, 1)" />
                  <stop offset="50%" stopColor="rgba(153, 204, 255, 1)" />
                  <stop offset="60%" stopColor="rgba(153, 153, 255, 1)" />
                  <stop offset="70%" stopColor="rgba(204, 153, 255, 1)" />
                  <stop offset="80%" stopColor="rgba(255, 153, 255, 1)" />
                  <stop offset="90%" stopColor="rgba(255, 204, 204, 1)" />
                  <stop offset="100%" stopColor="rgba(255, 153, 153, 1)" />
                </linearGradient>
              </defs>
              {Object.entries(storyData).map(([id, data]) => {
                if (isVisible(parseInt(id))) {
                  return (
                    <Fragment key={id}>
                      {data.deps.map((dep) => {
                        if (
                          core.solved.has(dep) ||
                          core.analyze ||
                          core.editorMode
                        ) {
                          const angle =
                            (Math.atan2(
                              storyData[dep].y - data.y,
                              storyData[dep].x - data.x
                            ) /
                              Math.PI) *
                            180
                          const stroke =
                            angle < -135 ||
                            angle > 135 ||
                            (angle > -45 && angle < 45)
                              ? 'url(#grad_horizontal)'
                              : 'url(#grad_vertical)'

                          if (angle === -90 || angle === 0 || angle === 180) {
                            console.log('DANGER', id, dep)
                          }
                          // console.log(angle, stroke)
                          return (
                            <line
                              key={`connect-${id}-${dep}`}
                              x1={data.x + 32}
                              y1={data.y + 64}
                              x2={storyData[dep].x + 32}
                              y2={storyData[dep].y + 64}
                              strokeWidth="9"
                              stroke={stroke}
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
              src="/rainbow.png"
              alt="Regenbogen"
              className="w-[100px] absolute left-[900px] top-[700px]"
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
          <div className="h-48"></div>
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
        </div>
      </div>
    )
  }

  function renderStory() {
    const data = storyData[core.showStory]
    return (
      <>
        <div className="h-6"></div>
        <h1
          className="ml-4 sm:ml-24 lg:mx-auto mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit text-2xl cursor-pointer"
          onClick={() => {
            mut((c) => {
              c.showStory = -1
            })
          }}
        >
          Einhorn der Mathematik
        </h1>
        <div className="max-w-[800px] mx-2 md:mx-auto bg-pink-50 rounded p-3 mt-6 relative">
          <h2 className="mt-3 text-xl font-bold">{data.title}</h2>

          {core.storyFeedback && core.storyFeedback.correct ? (
            <>
              {renderStoryFeedback(core.storyFeedback)}
              <button
                className="mt-8 text-pink-500 hover:underline hover:text-pink-600"
                onClick={() => {
                  mut((c) => {
                    c.showStory = -1
                  })
                  function scroll() {
                    const el = document.getElementById('map-scroller')
                    if (el) {
                      el.scrollTop = core.scrollPosTop
                      el.scrollLeft = core.scrollPosLeft
                    } else {
                      requestAnimationFrame(scroll)
                    }
                  }
                  requestAnimationFrame(scroll)
                }}
              >
                weiter
              </button>
              {data.proof && (
                <details className="mt-8">
                  <summary className="cursor-pointer">
                    Lösungsweg anzeigen (mit Tante Tea)
                  </summary>
                  <div className="mt-5 [&>p]:mt-4 [&_code]:text-pink-400 [&_code]:font-bold [&>img]:my-6 [&_a]:underline [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_hr]:mt-4">
                    {data.proof({ core })}
                  </div>
                </details>
              )}

              {/*data.proof && (
                <div className="absolute right-3 top-2 flex items-center flex-col">
                  <img src="/gluehbirne.png" alt="Glühbirne" className="h-16" />
                  <em className="mt-1">Tante Tea</em>
                </div>
              )*/}
            </>
          ) : (
            <>
              <button
                className="mt-3 text-pink-500 hover:underline hover:text-pink-600"
                onClick={() => {
                  mut((c) => {
                    c.showStory = -1
                  })
                  function scroll() {
                    const el = document.getElementById('map-scroller')
                    if (el) {
                      el.scrollTop = core.scrollPosTop
                      el.scrollLeft = core.scrollPosLeft
                    } else {
                      requestAnimationFrame(scroll)
                    }
                  }
                  requestAnimationFrame(scroll)
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
                  feedback: renderStoryFeedback(core.storyFeedback),
                })}
                {!data.hideSubmit && (
                  <>
                    {renderStoryFeedback(core.storyFeedback)}
                    <InputBox
                      className="mt-8 -ml-1"
                      submit={(value) => {
                        data.submit({ value, mut, id: core.showStory, core })
                      }}
                    />
                  </>
                )}
                <div className="absolute right-3 top-2 flex items-center flex-col">
                  <img src="/einhorn.png" alt="Glühbirne" className="h-16" />
                  <em className="mt-1">Tina</em>
                </div>
                {core.analyze && (
                  <div className="mt-3 text-gray-500">
                    Eingaben:{' '}
                    {core.analyze.inputs[core.showStory]?.map((val, i) => {
                      return (
                        <span
                          key={i}
                          className={val.correct ? 'text-green-500' : ''}
                        >
                          {val.value},{' '}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="h-16"></div>

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
                c.playerData.name = name
                c.modal = null
              })
              makePost('/name', { name, userId: core.playerData.id })
            }}
          />
        )}
      </>
    )
  }

  function renderStoryFeedback(feedback: State['storyFeedback']) {
    if (!feedback) {
      return null
    }
    if (feedback.toWait && !feedback.text) {
      return <CountdownTimer toWait={feedback.toWait} />
    }
    if (feedback.correct == false) {
      return (
        <>
          <div className="mt-6 text-yellow-600">{feedback.text}</div>
          {feedback.toWait && <CountdownTimer toWait={feedback.toWait} />}
        </>
      )
    }
    if (feedback.correct) {
      return <div className="mt-10 text-green-600">{feedback.text}</div>
    }
  }

  function renderStoryIcon(title: string, x: number, y: number, id: number) {
    const showSolved = (core.solved.has(id) || core.analyze) && !core.editorMode
    const showTina = id == 1 && !showSolved
    return (
      <div
        className={clsx(
          'flex items-center flex-col w-[64px] cursor-pointer group absolute pointer-events-none',
          !showTina && 'pt-2'
        )}
        style={{ left: `${x}px`, top: `${y}px` }}
        onClick={() => {
          mut((c) => {
            c.showStory = id
            c.storyFeedback = null
            c.freeTries = 3
            c.scrollPosTop =
              document.getElementById('map-scroller')?.scrollTop ?? 0
            c.scrollPosLeft =
              document.getElementById('map-scroller')?.scrollLeft ?? 0
          })
        }}
        key={id}
      >
        <button className="text-lg bg-gray-100/70 px-1 py-0.5 rounded group-hover:bg-white/80 pointer-events-auto whitespace-nowrap">
          {title}
        </button>
        {showSolved ? (
          <div className="w-16 pt-3 flex justify-center items-center">
            <div className="bg-gray-200 rounded-full w-6 h-6 pointer-events-auto">
              <FaIcon icon={faCheck} className="ml-[5px] text-pink-400" />
            </div>
          </div>
        ) : showTina ? (
          <img
            src="/einhorn.png"
            alt="Kopf eines Einhorns"
            className="w-16 pointer-events-auto pt-2"
          ></img>
        ) : (
          <div className="w-16 pt-3 flex justify-center items-center">
            <div className="bg-emerald-500 rounded-full w-6 h-6 pointer-events-auto"></div>
          </div>
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

function CountdownTimer({ toWait }: { toWait: number }) {
  const [seconds, setSeconds] = useState(Math.ceil(toWait / 1000))
  useEffect(() => {
    seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000)
  }, [seconds])
  if (seconds == 0) return null
  return (
    <div className="mt-6 text-gray-600 italic">
      Warte noch {seconds} Sekunde{seconds == 1 ? '' : 'n'} bis zum nächsten
      Versuch.
    </div>
  )
}
