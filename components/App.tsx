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
import { State } from '../lib/types'
import { CountdownTimer } from './CountdownTimer'
import { HighscoreModal } from './HighscoreModal'
import { DesignModal } from './DesignModal'
import { onOpen, onSolution, submitStoryEvent } from '../lib/story-events'
import { analyze, cutOff } from '../lib/analyze'

export default function App() {
  const [__core, setCore] = useState<State>({
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
    storyEvents: {
      submitted: new Set(),
      events: {},
    },
    showAnalyzeDetails: false,
  })

  const coreRef = useRef(__core)

  const app = {
    get state() {
      return coreRef.current
    },
    mut,
  }

  const runAnalyse = useRef(false)

  const lightBackground =
    app.state.background === 'beach' || app.state.background === 'desert'
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
      analyze(app)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (app.state.showIdeaStory) {
    return renderIdeaStory()
  }

  return <>{app.state.showStory == -1 ? renderOverview() : renderStory()}</>

  function renderOverview() {
    return (
      <div
        className={clsx('overflow-auto', !app.state.analyze && 'h-full')}
        id="map-scroller"
      >
        <div
          className="min-h-full pt-4 sm:pt-6 min-w-fit"
          style={{
            backgroundImage: `url('/wallpapers/${app.state.background}.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <h1 className="ml-4 sm:ml-24 lg:mx-auto px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-pink-400 w-fit text-lg sm:text-2xl">
            Einhorn der Mathematik
          </h1>
          {app.state.analyze && (
            <div className="my-4 bg-white p-3">
              Daten ab {cutOff.toISOString().substring(0, 10)}
              <br />
              <br />
              Anzahl SpielerInnen: {app.state.analyze.players}
              <br />
              <br />
              Median Spielzeit (
              <span className="text-gray-600">
                ab einer gelösten Aufgabe, Zeit ab Namenseingabe,{' '}
                {app.state.analyze.medianPlayers} Personen
              </span>
              ):{' '}
              {isNaN(app.state.analyze.medianSeconds) ? (
                '---'
              ) : (
                <>{app.state.analyze.medianSeconds}s</>
              )}
              <br />
              <br />
              Ereignisse:{' '}
              {app.state.analyze.events.map((event) => (
                <span key={event.value} className="inline-block mr-4">
                  {event.value} (x{event.count})
                </span>
              ))}
              <br />
              <br />
              Details:{' '}
              {app.state.showAnalyzeDetails ? (
                app.state.analyze.playerInfo.map(
                  ({ name, solved, id, createdAt, mins }) =>
                    solved == 0 ? (
                      <span
                        key={id}
                        className="inline-block mr-4 text-gray-400"
                      >
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
                )
              ) : (
                <button
                  className="ml-2 inline-block px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => {
                    app.mut((state) => {
                      state.showAnalyzeDetails = true
                    })
                  }}
                >
                  alle anzeigen
                </button>
              )}
            </div>
          )}
          <div className="fixed top-3 right-5 z-20">
            {app.state.playerData.name && (
              <div className="px-2 py-0.5 bg-white/50 rounded">
                <p>
                  <strong>{app.state.playerData.name}</strong>
                  &nbsp;&nbsp;&nbsp;
                  <span title="gelöste Aufgabe / Gesamtzahl">
                    {app.state.solved.size}/{Object.keys(storyData).length}
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
                  userId: app.state.playerData.id,
                  value: 'show_highscore',
                })
              }}
            >
              Highscore
            </p>
          </div>
          {app.state.solved.size > 0 &&
            !app.state.editorMode &&
            !app.state.analyze &&
            !app.state.persistBannerShown && (
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
                          userId: app.state.playerData.id,
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
          <div className="mt-4 mx-auto w-[1720px] h-[1400px] relative z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1720 1400">
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
                          app.state.solved.has(dep) ||
                          app.state.analyze ||
                          app.state.editorMode ||
                          app.state.demoMode
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
                                app.state.lineColor === 'rainbow'
                                  ? rainbowStroke
                                  : app.state.lineColor === 'pink'
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
            {(app.state.solved.has(36) ||
              app.state.analyze ||
              app.state.editorMode ||
              app.state.demoMode) && (
              <img
                src="/wegweiser.png"
                alt="Wegweiser Chill / Challenge"
                className="w-[130px] absolute left-[1210px] top-[830px]"
              />
            )}
            {!app.state.solved.has(1) &&
              !app.state.editorMode &&
              !app.state.demoMode &&
              !app.state.analyze && (
                <div className="absolute left-4 sm:left-[100px] top-[400px] sm:w-[530px] w-[calc(100vw-32px)] bg-white/50 p-3 rounded-xl">
                  <h2 className="mb-3 font-bold">Beschreibung</h2>
                  <p className="hyphens-auto">
                    Gehe mit der Einhorn-Dame Tina auf eine Tour durch die
                    Mathematik. In bunten Geschichten begegnen dir viele Themen,
                    die dich zum Mitmachen einladen. Der Einstieg ist sehr sanft
                    und für alle ohne Vorwissen geeignet. Für Fortgeschrittene
                    finden sich auch anspruchsvolle Rätsel.
                  </p>
                  <p className="mt-2 italic">Empfohlen ab der 5. Klasse</p>
                  <p className="italic">45 - 90 Minuten Spielzeit</p>
                </div>
              )}
            {(app.state.solved.size > 3 ||
              app.state.demoMode ||
              app.state.editorMode) && (
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
                    userId: app.state.playerData.id,
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
                  userId: app.state.playerData.id,
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
              data.deps.some((d) => app.state.solved.has(d)) ||
              app.state.analyze ||
              app.state.editorMode ||
              app.state.solved.has(parseInt(id)) ||
              app.state.demoMode
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
            {app.state.solved.size > 0 &&
              !app.state.editorMode &&
              app.state.persistBannerShown && (
                <>
                  <label className="cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={app.state.persist}
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
          {app.state.modal == 'impressum' && (
            <AboutModal
              onClose={() => {
                mut((c) => {
                  c.modal = null
                })
              }}
            />
          )}
          {app.state.modal == 'highscore' && (
            <HighscoreModal
              onClose={() => {
                mut((c) => {
                  c.modal = null
                  c.showStory = -1
                })
              }}
            />
          )}
          {app.state.modal == 'design' && (
            <DesignModal
              onClose={() => {
                mut((c) => {
                  c.modal = null
                  c.showStory = -1
                })
              }}
              app={app}
            />
          )}
        </div>
      </div>
    )
  }

  function back(solved: boolean = false) {
    if (solved) {
      submitStoryEvent(app)
    }
    mut((c) => {
      c.showStory = -1
    })
    function scroll() {
      const el = document.getElementById('map-scroller')
      if (el) {
        el.scrollTop = app.state.scrollPosTop
        el.scrollLeft = app.state.scrollPosLeft
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
    const data = storyData[app.state.showStory]

    return (
      <>
        <div className="h-6"></div>
        <h1
          className="ml-4 sm:ml-24 lg:mx-auto mx-auto px-4 py-2 rounded-lg bg-pink-400 w-fit text-2xl cursor-pointer"
          onClick={() => {
            back()
          }}
        >
          Einhorn der Mathematik
        </h1>
        <div className="max-w-[800px] mx-2 md:mx-auto bg-pink-50 rounded p-3 mt-6 relative">
          <h2 className="mt-3 text-xl font-bold">{data.title}</h2>

          {app.state.storyFeedback && app.state.storyFeedback.correct ? (
            <>
              {renderStoryFeedback(app.state.storyFeedback)}

              {data.proof && (
                <details className="mt-8">
                  <summary
                    className="cursor-pointer select-none"
                    onClick={() => {
                      onSolution(app)
                      /*makePost('/event', {
                        userId: app.state.playerData.id,
                        value: 'show_solution',
                      })*/
                    }}
                  >
                    Lösungsweg anzeigen (mit Tante Tea)
                  </summary>

                  {!data.hideSubmit && (
                    <details className="my-6 mx-3 p-2 rounded-lg bg-gray-200">
                      <summary className="cursor-pointer select-none">
                        Aufgabenstellung
                      </summary>
                      <div className="mt-8 [&>p]:mt-4 [&_code]:text-pink-400 [&_code]:font-bold [&>img]:my-6 [&_a]:underline [&_a]:text-blue-600 [&_a]:hover:text-blue-700">
                        {data.render({
                          app,
                          onSubmit: () => {},
                          back: () => {},
                          feedback: null,
                          data: app.state.storyGeneratorData[
                            app.state.showStory
                          ],
                        })}
                      </div>
                    </details>
                  )}
                  <div className="mt-5 [&>p]:mt-4 [&_code]:text-pink-400 [&_code]:font-bold [&>img]:my-6 [&_a]:underline [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_hr]:mt-4">
                    {data.proof({
                      app,
                      data: app.state.storyGeneratorData[app.state.showStory],
                    })}
                  </div>
                </details>
              )}

              <button
                className="mt-8 text-pink-500 hover:underline hover:text-pink-600"
                onClick={() => {
                  back(true)
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
                  app,
                  onSubmit: (value) => {
                    data.submit({
                      data: app.state.storyGeneratorData[app.state.showStory],
                    })({
                      value,
                      id: app.state.showStory,
                      app,
                    })
                  },
                  back: () => back(true),
                  feedback: renderStoryFeedback(app.state.storyFeedback),
                  data: app.state.storyGeneratorData[app.state.showStory],
                })}
                {!data.hideSubmit && (
                  <>
                    {renderStoryFeedback(app.state.storyFeedback)}
                    <InputBox
                      className="mt-8 -ml-1"
                      submit={(value) => {
                        data.submit({
                          data: app.state.storyGeneratorData[
                            app.state.showStory
                          ],
                        })({
                          value,
                          id: app.state.showStory,
                          app,
                        })
                      }}
                    />
                  </>
                )}
                <div className="absolute right-3 top-2 flex items-center flex-col">
                  <img src="/einhorn.png" alt="Einhorn" className="h-16" />
                  <em className="mt-1">Tina</em>
                </div>
                {app.state.analyze && (
                  <div className="mt-3 text-gray-500">
                    Eingaben:{' '}
                    {app.state.analyze.inputs[app.state.showStory]?.map(
                      (val, i) => {
                        return (
                          <span
                            key={i}
                            className={val.correct ? 'text-green-500' : ''}
                          >
                            {val.value},{' '}
                          </span>
                        )
                      }
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="h-32"></div>

        {app.state.modal == 'name' && (
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
              makePost('/name', { name, userId: app.state.playerData.id })
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
              key={app.state.rateLimit.lockedUntil}
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
      (app.state.solved.has(id) || app.state.analyze || app.state.demoMode) &&
      !app.state.editorMode
    const showTina = id == 1 && !showSolved
    return (
      <div
        className={clsx(
          'flex items-center flex-col w-[64px] cursor-pointer group absolute',
          !showTina && 'pt-2',
          showTina &&
            !app.state.playerData.name &&
            !app.state.editorMode &&
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
              c.storyGeneratorData[id] = data.generator() as object
            }
          })
          onOpen(app)
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
        {app.state.analyze && app.state.analyze.storyStats[id] && (
          <small>
            {app.state.analyze.storyStats[id].solved} /{' '}
            <strong>
              {Math.round(
                (app.state.analyze.storyStats[id].solved /
                  app.state.analyze.storyStats[id].reachable) *
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
    const newval = produce(coreRef.current, fn)
    coreRef.current = newval

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

    setCore(newval)
  }

  function isVisible(id: number) {
    return (
      storyData[id].deps.length == 0 ||
      storyData[id].deps.some((d) => app.state.solved.has(d)) ||
      app.state.analyze ||
      app.state.editorMode ||
      app.state.demoMode
    )
  }
}
