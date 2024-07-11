import { useState } from 'react'
import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'
import clsx from 'clsx'
import { FaIcon } from '../../components/FaIcon'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'

export const story55: StoryData = {
  title: 'Einhorn-Maus',
  x: 950,
  y: 840,
  deps: [36],
  render: ({ onSubmit, back }) => (
    <>
      <p>
        &quot;Das ist das Haus der Einhorn-Maus&quot; - hinter diesem Reim
        steckt ein altes Kinderrätsel. Verbinde ohne Absetzen des Stifts die
        fünf Punkte zu einem Haus.
      </p>
      <p>
        Einhorn-Mäuse sind sehr süße Wesen. Ich habe letztens im Zoo welche
        gesehen. Sie verstecken sich gerne in kleinen Öffnungen und würden sich
        in einem solchen Haus sehr wohl fühlen.
      </p>
      <p>
        Klicke nacheinander auf die Punkte und zeichne das Haus der
        Einhorn-Maus:
      </p>
      <HausDerEinhornmaus
        done={() => {
          onSubmit('42')
          back()
        }}
      />
    </>
  ),
  submit: ignoreCaseSolution('42'),
  hideSubmit: true,
}

const points = [
  { x: 150, y: 27 },
  { x: 50, y: 200 },
  { x: 50, y: 400 },
  { x: 250, y: 400 },
  { x: 250, y: 200 },
]

function HausDerEinhornmaus({ done }: { done: () => void }) {
  const [selected, setSelected] = useState<number[]>([])

  const isDone = selected.length == 9

  return (
    <div className="mt-6">
      <svg width="300" height="440" className="bg-white rounded">
        {points.map((point, index) => {
          let canConnect = true

          const last = selected.length > 0 ? selected[selected.length - 1] : -1

          if (last === index) {
            canConnect = false
          }

          for (let i = 0; i + 1 < selected.length; i++) {
            if (selected[i] == last && selected[i + 1] == index) {
              canConnect = false
            }
            if (selected[i] == index && selected[i + 1] == last) {
              canConnect = false
            }
          }

          if ((last == 2 || last == 3) && index == 0) {
            canConnect = false
          }

          if ((index == 2 || index == 3) && last == 0) {
            canConnect = false
          }
          return (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="14"
              fill={index == last ? 'rgb(236 72 153)' : 'rgb(249 168 212)'}
              className={clsx(canConnect && 'cursor-pointer')}
              onClick={() => {
                if (canConnect) {
                  setSelected([...selected, index])
                }
              }}
            />
          )
        })}
        {selected.map((p, index, arr) => {
          if (index === 0) return null
          const start = points[arr[index - 1]]
          const end = points[p]
          return (
            <line
              key={index}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="hotpink"
              strokeWidth={3}
              className="pointer-events-none"
            />
          )
        })}
      </svg>
      <p className="mt-3">
        {isDone ? (
          <>
            <span className="ml-6 inline-block">Piep, piep!</span>
            <br />
            <button
              className="inline-block ml-6 mt-4 go-btn"
              onClick={() => {
                done()
              }}
            >
              weiter
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setSelected([])
            }}
            className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
          >
            <FaIcon icon={faRefresh} className="mr-2" />
            zurücksetzen
          </button>
        )}
      </p>
    </div>
  )
}
