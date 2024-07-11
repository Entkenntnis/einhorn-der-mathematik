import { useState } from 'react'
import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story52: StoryData = {
  title: 'Mandala',
  x: 1500,
  y: 560,
  deps: [49, 50],
  render: ({ onSubmit, back }) => (
    <>
      <p>
        Ich mache heute einen Tag Praktikum in der Krippe. Es ist sehr süß, wie
        die 2-jährigen Mandalas ausmalen. Wir müssen aber gut darauf aufpassen,
        dass die Kinder die Stifte nicht essen.
      </p>
      <p>
        Ich schnappe mir auch ein Mandala. Hier ist eine Mini-Herausforderung:
        Wähle die Farben so, dass zwei benachbarte Flächen unterschiedliche
        Farben haben. Verwende so <strong>wenige Farben</strong> wie möglich.
      </p>
      <p>Klicke auf die Flächen, um die Farbe zu wechseln.</p>
      <Mandala
        handleDone={() => {
          onSubmit('42')
          back()
        }}
      />
    </>
  ),
  submit: ignoreCaseSolution('42'),
  hideSubmit: true,
}

function Mandala(props: { handleDone: () => void }) {
  const [colors, setColors] = useState([0, 1, 2, 3, 4, 5])
  const [solved, setSolved] = useState(false)
  return (
    <>
      <div className="mt-6">
        <svg width="300" height="300" className="bg-white rounded">
          <circle
            className="cursor-pointer"
            cx="150"
            cy="150"
            r="120"
            fill={getC(colors[0])}
            stroke="black"
            onClick={() => {
              handle(0)
            }}
          />
          <circle
            className="cursor-pointer"
            cx="150"
            cy="150"
            r="80"
            fill={getC(colors[1])}
            stroke="black"
            onClick={() => {
              handle(1)
            }}
          />
          <circle
            className="cursor-pointer"
            cx="80"
            cy="130"
            r="40"
            fill={getC(colors[2])}
            stroke="black"
            onClick={() => {
              handle(2)
            }}
          />
          <circle
            className="cursor-pointer"
            cx="220"
            cy="130"
            r="40"
            fill={getC(colors[3])}
            stroke="black"
            onClick={() => {
              handle(3)
            }}
          />
          <circle
            className="cursor-pointer"
            cx="150"
            cy="210"
            r="40"
            fill={getC(colors[4])}
            stroke="black"
            onClick={() => {
              handle(4)
            }}
          />
          <circle
            className="cursor-pointer"
            cx="150"
            cy="150"
            r="50"
            fill={getC(colors[5])}
            stroke="black"
            onClick={() => {
              handle(5)
            }}
          />
        </svg>
      </div>
      <div className="mt-3">
        {!solved ? (
          <button
            className="go-btn"
            onClick={() => {
              if (checkCorrect()) {
                setSolved(true)
              }
            }}
          >
            Abschicken
          </button>
        ) : (
          <>
            Sehr schön! Drei Farben sind das Minimum.{' '}
            <button
              className="go-btn ml-3"
              onClick={() => {
                props.handleDone()
              }}
            >
              weiter
            </button>
          </>
        )}
      </div>
    </>
  )

  function handle(n: number) {
    const newColors = [...colors]
    newColors[n] = (newColors[n] + 1) % 6
    setColors(newColors)
  }

  function getC(n: number) {
    switch (n) {
      case 0:
        return 'rebeccapurple'
      case 1:
        return 'greenyellow'
      case 2:
        return 'yellow'
      case 3:
        return 'orange'
      case 4:
        return 'red'
      case 5:
        return 'pink'
    }
  }

  function checkCorrect() {
    const adj = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
    ]
    for (const pair of adj) {
      if (colors[pair[0]] == colors[pair[1]]) {
        alert('Benachbarte Flächen haben die gleiche Farbe.')
        return false
      }
    }
    if (new Set(colors).size > 3) {
      alert('Nutze weniger unterschiedliche Farben.')
      return false
    }
    return true
  }
}
