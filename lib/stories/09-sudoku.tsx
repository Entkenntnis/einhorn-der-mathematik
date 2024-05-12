import { useState } from 'react'
import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story9: StoryData = {
  title: 'Sudoku',
  x: 550,
  y: 660,
  deps: [13, 25],
  render: ({ onSubmit, feedback }) => (
    <>
      <p>
        Ich löse manchmal Sudoku, wenn mir langweilig ist. Heute schaut mir Teo
        zu und er fragt mich natürlich, was die Regeln sind.
      </p>
      <p>
        Ich weiß nicht, wie viel Chancen ich habe, einem 7-jährigen Sudoku zu
        erklären 😅. Ich versuche es aber (in jede Reihe, Spalte und 3x3-Feld
        muss jeder Ziffer von 1 bis 9 genau einmal vorkommen). Und am Ende
        konnte er die markierten Felder ausfüllen.
      </p>
      <SudokuInput onSubmit={onSubmit} feedback={feedback} />
    </>
  ),
  proof: () => (
    <>
      <p>
        In das linke Feld kommt die Zahl 3 hinein, in das rechte Feld die Zahl
        6.
      </p>
      <img src="story9_sol.png" alt="ein Sudoku" />
      <p>
        In beiden Fällen konnten Tina und Teo das Ausschlussprinzip nutzen, den
        irgendwo in dem 3x3-Feld muss die Zahl einmal vorkommen. Aber weil alle
        Felder bis auf das markierte ausgeschlossen sind, bleibt nur diese eine
        Möglichkeit übrig.
      </p>
      <p>
        In Sudoku gibt es viele Varianten, um logisches Denken anzuwenden. Das
        hier ist nur ein Beispiel davon. Nicht umsonst wird es von vielen auch
        als Gehirnjogging gesehen.
      </p>
    </>
  ),
  hideSubmit: true,
  submit: ignoreCaseSolution('3; 6'),
}

interface SudokuInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
}

function SudokuInput({ onSubmit, feedback }: SudokuInputProps) {
  const [val, setVal] = useState('')
  const [val2, setVal2] = useState('')
  return (
    <>
      <div className="relative mt-3">
        <input
          className="absolute h-10 w-10 border-pink-500 border text-2xl text-center"
          style={{ left: '106px', top: '205px' }}
          maxLength={1}
          value={val}
          onChange={(e) => {
            setVal(e.target.value)
          }}
        ></input>
        <input
          className="absolute h-10 w-10 border-pink-500 border text-2xl text-center"
          style={{ left: '252px', top: '205px' }}
          maxLength={1}
          value={val2}
          onChange={(e) => {
            setVal2(e.target.value)
          }}
        ></input>
        <img src="story9.png" alt="ein Sudoku" />
      </div>
      <p>
        Welche Zahlen kommen in die Felder? Trage sie ein und klicke dann auf
        Los.
      </p>
      <div className="-mt-2">{feedback}</div>
      <div className="mt-4">
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400"
          onClick={() => {
            onSubmit(`${val}; ${val2}`)
          }}
        >
          Los
        </button>
      </div>
    </>
  )
}
