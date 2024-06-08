import clsx from 'clsx'
import produce, { Draft } from 'immer'
import { Fragment, useEffect, useRef, useState } from 'react'
import shortid from 'shortid'
import { storyData } from '../lib/data'
import { AboutModal } from './AboutModal'
import { InputBox } from './InputBox'
import { NameModal } from './NameModal'
import { FaIcon } from './FaIcon'
import { faCheck, faPalette } from '@fortawesome/free-solid-svg-icons'
import { makePost } from '../lib/make-post'
import { median } from '../lib/helper/median'
import { State, PlayerInfo } from '../lib/types'
import { CountdownTimer } from './CountdownTimer'
import { HighscoreModal } from './HighscoreModal'
import { DesignModal } from './DesignModal'

export default function App() {
  const [core, setCore] = useState<State>({
    showStory: -1,
    storyFeedback: null,
    solved: new Set(),
    modal: null,
    userId: shortid.generate(),
    editorMode: false,
    demoMode: false,
    playerData: {
      name: '',
      id: shortid(),
    },
    persist: false,
    persistBannerShown: false,
    rateLimit: { freeTries: 3, lockedUntil: null },
    scrollPosTop: 0,
    scrollPosLeft: 0,
    storyGeneratorData: {},
    showIdeaStory: false,
    background: 'pink-clouds',
    lineColor: 'rainbow',
  })

  const cutOff = new Date('2024-05-31')

  const runAnalyse = useRef(false)

  const lightBackground =
    core.background === 'beach' || core.background === 'desert'
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
        state.background = data.background ?? 'pink-clouds'
        state.lineColor = data.lineColor ?? 'rainbow'
      } catch (e) {
        // probably invalid state
      }
    })
    if (window.location.hash == '#demo') {
      mut((state) => {
        state.demoMode = true
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
            userId: string
            storyId: number
            value: string
            correct: boolean
            createdAt: string
          }[]
          events: { userId: string; value: string; createdAt: string }[]
        }

        const eventSources: any = {}

        for (const event of data.events) {
          const ts = new Date(event.createdAt).getTime()
          if (ts < cutOff.getTime()) continue
          if (!eventSources[event.value]) {
            eventSources[event.value] = {}
          }
          eventSources[event.value][event.userId] = true
        }

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
            events: Object.entries(eventSources).map((entry) => {
              return {
                value: entry[0],
                count: Object.keys(entry[1] as any).length,
              }
            }),
          }
        })
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (core.showIdeaStory) {
    return renderIdeaStory()
  }

  return <>{core.showStory == -1 ? renderOverview() : renderStory()}</>

  function renderOverview() {
    return (
      <div className="overflow-auto h-full" id="map-scroller">
        <div
          className="min-h-full pt-4 sm:pt-6 min-w-fit"
          style={{
            backgroundImage: `url('/wallpapers/${core.background}.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <h1 className="ml-4 sm:ml-24 lg:mx-auto px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-pink-400 w-fit text-lg sm:text-2xl">
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
              Ereignisse:{' '}
              {core.analyze.events.map((event) => (
                <span key={event.value} className="inline-block mr-4">
                  {event.value} (x{event.count})
                </span>
              ))}
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
          <div className="fixed top-3 right-5">
            {core.playerData.name && (
              <div className="px-2 py-0.5 bg-white/50 rounded">
                <p>
                  <strong>{core.playerData.name}</strong>
                  &nbsp;&nbsp;&nbsp;
                  <span title="gelöste Aufgabe / Gesamtzahl">
                    {core.solved.size}/{Object.keys(storyData).length}
                  </span>
                </p>
              </div>
            )}
            <p
              className={clsx(
                'underline cursor-pointer text-right mr-2',
                lightBackground ? 'text-gray-950' : 'text-gray-200'
              )}
              onClick={() => {
                mut((c) => {
                  c.modal = 'highscore'
                })
                makePost('/event', {
                  userId: core.playerData.id,
                  value: 'show_highscore',
                })
              }}
            >
              Highscore
            </p>
          </div>
          {core.solved.size > 0 &&
            !core.editorMode &&
            !core.analyze &&
            !core.persistBannerShown && (
              <div className="lg:flex lg:justify-center mt-6 ml-4 sm:ml-8 lg:ml-0">
                <div className="flex flex-col sm:flex-row justify-between items-baseline w-fit sm:w-[550px] bg-yellow-100 px-4 py-2 rounded">
                  <div>Fortschritt auf diesem Gerät speichern?</div>
                  <div>
                    <button
                      className="text-sm text-gray-700 underline mr-8"
                      onClick={() => {
                        mut((c) => {
                          c.persistBannerShown = true
                        })
                      }}
                    >
                      später
                    </button>
                    <button
                      className="px-2 py-0.5 bg-yellow-300 hover:bg-yellow-400 inline-block rounded animate-wiggle"
                      onClick={() => {
                        mut((c) => {
                          c.persist = true
                          c.persistBannerShown = true
                        })
                        makePost('/event', {
                          userId: core.playerData.id,
                          value: 'persist',
                        })
                      }}
                    >
                      Speichern
                    </button>
                  </div>
                </div>
              </div>
            )}
          <div className="mt-4 mx-auto w-[1400px] h-[1100px] relative z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1100">
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
                          core.editorMode ||
                          core.demoMode
                        ) {
                          const angle =
                            (Math.atan2(
                              storyData[dep].y - data.y,
                              storyData[dep].x - data.x
                            ) /
                              Math.PI) *
                            180
                          const rainbowStroke =
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
                              stroke={
                                core.lineColor === 'rainbow'
                                  ? rainbowStroke
                                  : core.lineColor === 'pink'
                                  ? '#f472b6'
                                  : 'gray'
                              }
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
              className="w-[100px] absolute left-[1060px] top-[700px]"
            />
            {(core.solved.size > 3 || core.demoMode || core.editorMode) && (
              <button
                className={clsx(
                  'absolute top-[210px] left-[1050px] w-[120px] block z-10 rounded-xl transition-colors',
                  lightBackground
                    ? 'hover:bg-gray-300/20'
                    : 'hover:bg-gray-700/20 text-white'
                )}
                onClick={() => {
                  mut((c) => {
                    c.showIdeaStory = true
                  })
                  makePost('/event', {
                    userId: core.playerData.id,
                    value: 'your_story',
                  })
                }}
              >
                <p className="text-center mb-1">Dein Rätsel</p>
                <img
                  src="/gluehbirne.png"
                  alt="Glühbirne"
                  className="w-[65px] mx-auto mb-2"
                />
              </button>
            )}
            <button
              className={clsx(
                'absolute top-[860px] left-[80px] w-[76px] block z-10 rounded-xl transition-colors pb-1',
                lightBackground ? 'hover:bg-white/20' : 'hover:bg-black/20'
              )}
              onClick={() => {
                mut((c) => {
                  c.modal = 'design'
                })
                makePost('/event', {
                  userId: core.playerData.id,
                  value: 'show_design',
                })
              }}
            >
              <p
                className={clsx(
                  'text-center mb-1',
                  lightBackground ? 'text-gray-950' : 'text-white'
                )}
              >
                Aussehen
              </p>
              <FaIcon icon={faPalette} className="text-pink-200 text-2xl" />
            </button>
            {Object.entries(storyData).map(([id, data]) =>
              data.deps.length == 0 ||
              data.deps.some((d) => core.solved.has(d)) ||
              core.analyze ||
              core.editorMode ||
              core.solved.has(parseInt(id)) ||
              core.demoMode
                ? renderStoryIcon(data.title, data.x, data.y, parseInt(id))
                : null
            )}
          </div>
          <div className="h-48"></div>
          <div
            className={clsx(
              'pb-14 lg:pb-4 ml-4 sm:text-center text-sm',
              lightBackground ? 'text-gray-800' : 'text-gray-300'
            )}
          >
            {core.solved.size > 0 &&
              !core.editorMode &&
              core.persistBannerShown && (
                <>
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
                  &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                </>
              )}
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
            &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href="https://karol.arrrg.de"
              target="_blank"
              className="hover:underline"
            >
              Robot Karol Online
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href="https://hack.arrrg.de"
              target="_blank"
              className="hover:underline"
            >
              Hack The Web
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
          {core.modal == 'highscore' && (
            <HighscoreModal
              onClose={() => {
                mut((c) => {
                  c.modal = null
                  c.showStory = -1
                })
              }}
            />
          )}
          {core.modal == 'design' && (
            <DesignModal
              onClose={() => {
                mut((c) => {
                  c.modal = null
                  c.showStory = -1
                })
              }}
              core={core}
              mut={mut}
            />
          )}
        </div>
      </div>
    )
  }

  function back() {
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
  }

  function renderIdeaStory() {
    return (
      <>
        <div className="h-6"></div>
        <h1
          className="ml-4 sm:ml-24 lg:mx-auto mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit text-2xl cursor-pointer"
          onClick={() => {
            mut((c) => {
              c.showIdeaStory = false
            })
          }}
        >
          Einhorn der Mathematik
        </h1>
        <div className="max-w-[800px] mx-2 md:mx-auto bg-pink-50 rounded p-3 mt-6 relative">
          <h2 className="mt-3 text-xl font-bold">Dein Rätsel</h2>
          <button
            className="mt-3 text-pink-500 hover:underline hover:text-pink-600"
            onClick={() => {
              mut((c) => {
                c.showIdeaStory = false
              })
            }}
          >
            zurück
          </button>
          <div className="mt-8 [&>p]:mt-4 [&_code]:text-pink-400 [&_code]:font-bold [&>img]:my-6 [&_a]:underline [&_a]:text-blue-600 [&_a]:hover:text-blue-700">
            <p>
              Ich mag Mathe, ich mag Rätsel - aber alleine macht es nur halb so
              viel Spaß.
            </p>
            <p>
              Hast du ein Lieblingsrätsel? Gibt es Themen aus der Mathematik,
              die dir Spaß machen? Ich freue mich über jede Person, die mir ihre
              Rätsel oder Ideen schickt. Du kannst das verlinkte Formular
              nutzen. Ich lese mir jede Einsendung durch.
            </p>
            <p>
              Wenn deine Einsendung zu den anderen Rätseln auf der Seite passen,
              dann baue ich sie auch sehr gerne an passender Stelle ein.
            </p>
            <p>Liebe Grüße an alle Mathematik-Begeisterten da draußen 💗!</p>
            <p>
              -&gt;{' '}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScoDuazOyILYEAWFZiK5KPOtAP-G-lVE9vTea4O-GTaVukXzw/viewform?usp=sf_link"
                target="_blank"
              >
                Formular für dein Rätsel
              </a>
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
        <div className="h-32"></div>
      </>
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

              {data.proof && (
                <details className="mt-8">
                  <summary
                    className="cursor-pointer select-none"
                    onClick={() => {
                      makePost('/event', {
                        userId: core.playerData.id,
                        value: 'show_solution',
                      })
                    }}
                  >
                    Lösungsweg anzeigen (mit Tante Tea)
                  </summary>
                  <div className="mt-5 [&>p]:mt-4 [&_code]:text-pink-400 [&_code]:font-bold [&>img]:my-6 [&_a]:underline [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_hr]:mt-4">
                    {data.proof({
                      core,
                      data: core.storyGeneratorData[core.showStory],
                    })}
                  </div>
                </details>
              )}

              <button
                className="mt-8 text-pink-500 hover:underline hover:text-pink-600"
                onClick={() => {
                  back()
                }}
              >
                weiter
              </button>
            </>
          ) : (
            <>
              <button
                className="mt-1 -ml-2 text-pink-500 hover:underline hover:text-pink-600 p-2"
                onClick={() => {
                  back()
                }}
              >
                zurück
              </button>
              <div className="mt-8 [&>p]:mt-4 [&_code]:text-pink-400 [&_code]:font-bold [&>img]:my-6 [&_a]:underline [&_a]:text-blue-600 [&_a]:hover:text-blue-700">
                {data.render({
                  core,
                  mut,
                  onSubmit: (value) => {
                    data.submit({
                      value,
                      mut,
                      id: core.showStory,
                      core,
                      data: core.storyGeneratorData[core.showStory],
                    })
                  },
                  back,
                  feedback: renderStoryFeedback(core.storyFeedback),
                  data: core.storyGeneratorData[core.showStory],
                })}
                {!data.hideSubmit && (
                  <>
                    {renderStoryFeedback(core.storyFeedback)}
                    <InputBox
                      className="mt-8 -ml-1"
                      submit={(value) => {
                        data.submit({
                          value,
                          mut,
                          id: core.showStory,
                          core,
                          data: core.storyGeneratorData[core.showStory],
                        })
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
        <div className="h-32"></div>

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
    if (!feedback || !feedback.text) {
      return null
    }
    if (feedback.correct == false) {
      return (
        <>
          <div className="mt-6 text-yellow-600">{feedback.text}</div>
          {feedback.toWait && (
            <CountdownTimer
              toWait={feedback.toWait}
              key={core.rateLimit.lockedUntil}
            />
          )}
        </>
      )
    }
    if (feedback.correct) {
      return <div className="mt-10 text-green-600">{feedback.text}</div>
    }
  }

  function renderStoryIcon(title: string, x: number, y: number, id: number) {
    const showSolved =
      (core.solved.has(id) || core.analyze || core.demoMode) && !core.editorMode
    const showTina = id == 1 && !showSolved
    return (
      <div
        className={clsx(
          'flex items-center flex-col w-[64px] cursor-pointer group absolute',
          !showTina && 'pt-2',
          showTina &&
            !core.playerData.name &&
            !core.editorMode &&
            'animate-wiggle'
        )}
        style={{ left: `${x}px`, top: `${y + 10}px` }}
        onClick={() => {
          mut((c) => {
            c.showStory = id
            c.storyFeedback = null
            c.rateLimit.freeTries = 3
            c.rateLimit.lockedUntil = null
            c.scrollPosTop =
              document.getElementById('map-scroller')?.scrollTop ?? 0
            c.scrollPosLeft =
              document.getElementById('map-scroller')?.scrollLeft ?? 0

            const data = storyData[id]
            if (data.generator && !c.storyGeneratorData[id]) {
              c.storyGeneratorData[id] = data.generator()
            }
          })
        }}
        key={id}
      >
        <button className="text-base bg-gray-100/80 px-1 py-0.5 rounded group-hover:bg-white/90 pointer-events-auto whitespace-nowrap">
          {title}
        </button>
        {showTina ? (
          <img
            src="/einhorn.png"
            alt="Kopf eines Einhorns"
            className="w-16 pointer-events-auto pt-2"
          ></img>
        ) : showSolved ? (
          <div className="w-16 pt-1.5 flex justify-center items-center">
            <div className="bg-gray-200 rounded-full w-6 h-6 pointer-events-auto">
              <FaIcon icon={faCheck} className="ml-[5px] text-pink-400" />
            </div>
          </div>
        ) : (
          <div className="w-16 pt-1.5 flex justify-center items-center">
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
        background: newval.background,
        lineColor: newval.lineColor,
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
      core.editorMode ||
      core.demoMode
    )
  }
}
