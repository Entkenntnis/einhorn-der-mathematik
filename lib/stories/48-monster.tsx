import clsx from 'clsx'
import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'
import { useState } from 'react'
import { randomItemFromArray } from '../helper/random-item-from-array'

export const story48: StoryData = {
  title: 'Monster',
  x: 340,
  y: 200,
  deps: [6, 7],
  render: ({ onSubmit, back }) => (
    <>
      <p>
        Ich möchte mit Teo ein kleines Computerspiel entwickeln. Meine Eltern
        helfen uns bei der Programmierung. Die Grafiken gestalten wir.
      </p>
      <p>
        In unserem Spiel kommen verschiedene Monster vor. Wir sind keine
        Design-Profis. Um uns etwas Arbeit zu sparen, wollen wir die Monster
        achsensymmetrisch zeichen. Hier haben wir die erste Hälfte fertig.
      </p>
      <p>
        Vervollständige die zweite Hälfte des Monster. Klicke auf eine Zelle, um
        die Farbe zu wechseln.
      </p>
      <InteractiveGrid
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

const startGrid1 = [
  [false, true, false, false, false, false, false, false],
  [false, true, true, false, false, false, false, false],
  [false, false, true, false, false, false, false, false],
  [false, false, false, true, false, false, false, false],
  [false, false, true, true, false, false, false, false],
  [false, true, false, true, false, false, false, false],
  [true, true, true, true, false, false, false, false],
  [false, true, true, false, false, false, false, false],
]

const startGrid2 = [
  [false, false, true, true, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [true, true, true, true, false, false, false, false],
  [true, true, false, true, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [false, false, true, true, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [true, true, false, true, false, false, false, false],
]

const startGrid3 = [
  [false, false, true, false, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [true, true, true, true, false, false, false, false],
  [true, true, false, true, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [false, true, false, false, false, false, false, false],
  [true, false, true, true, false, false, false, false],
  [true, false, false, false, false, false, false, false],
]
const startGrid4 = [
  [false, true, false, false, false, false, false, false],
  [true, false, false, false, false, false, false, false],
  [true, true, true, true, false, false, false, false],
  [false, true, false, true, false, false, false, false],
  [false, true, true, false, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [false, true, true, false, false, false, false, false],
  [false, true, false, false, false, false, false, false],
]
const startGrid5 = [
  [false, false, true, false, false, false, false, false],
  [false, true, false, false, false, false, false, false],
  [false, false, true, false, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [true, false, false, true, false, false, false, false],
  [true, true, true, true, false, false, false, false],
  [false, true, true, false, false, false, false, false],
  [true, false, true, false, false, false, false, false],
]
const startGrid6 = [
  [false, false, true, true, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [true, true, true, true, false, false, false, false],
  [true, true, true, true, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [false, true, false, true, false, false, false, false],
  [false, false, true, true, false, false, false, false],
  [false, true, false, true, false, false, false, false],
]
const startGrid7 = [
  [true, false, false, true, false, false, false, false],
  [true, false, true, true, false, false, false, false],
  [false, true, false, true, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [false, true, false, false, false, false, false, false],
  [false, false, true, true, false, false, false, false],
  [true, true, false, true, false, false, false, false],
  [true, false, false, false, false, false, false, false],
]
const startGrid8 = [
  [true, false, true, false, false, false, false, false],
  [false, true, false, true, false, false, false, false],
  [false, false, true, false, false, false, false, false],
  [false, false, true, true, false, false, false, false],
  [false, true, true, true, false, false, false, false],
  [true, true, false, true, false, false, false, false],
  [true, true, true, true, false, false, false, false],
  [false, true, true, false, false, false, false, false],
]

export function InteractiveGrid({ handleDone }: { handleDone: () => void }) {
  const [grid, setGrid] = useState<boolean[][]>(
    randomItemFromArray([
      startGrid1,
      startGrid2,
      startGrid3,
      startGrid4,
      startGrid5,
      startGrid6,
      startGrid7,
      startGrid8,
    ])
  )
  const [done, setDone] = useState(false)

  return (
    <>
      <div className="flex my-6">
        <div className="flex p-4 bg-white rounded">
          {renderCol(0)}
          {renderCol(1)}
          {renderCol(2)}
          {renderCol(3)}
          {renderCol(4)}
          {renderCol(5)}
          {renderCol(6)}
          {renderCol(7)}
        </div>
      </div>
      {
        <div className={clsx('my-6 ml-2', !done && 'invisible')}>
          <p>Grrrh :)</p>
          <button
            className="mt-3 px-2 py-0.5 bg-pink-300 hover:bg-pink-400 rounded"
            onClick={() => {
              handleDone()
            }}
          >
            weiter
          </button>
        </div>
      }
    </>
  )

  function renderCol(col: number) {
    return (
      <div
        className={clsx(
          'flex flex-col',
          col === 3 && !done && 'border-r-lime-500 border-r-2',
          col > 3 && !done && 'cursor-pointer'
        )}
      >
        {renderCell(col, 0)}
        {renderCell(col, 1)}
        {renderCell(col, 2)}
        {renderCell(col, 3)}
        {renderCell(col, 4)}
        {renderCell(col, 5)}
        {renderCell(col, 6)}
        {renderCell(col, 7)}
      </div>
    )
  }

  function renderCell(col: number, row: number) {
    return (
      <div
        className={clsx('w-8 h-8 border', grid[row][col] && 'bg-lime-200')}
        onClick={() => {
          if (col > 3 && !done) {
            const newGrid: boolean[][] = JSON.parse(JSON.stringify(grid))
            newGrid[row][col] = !newGrid[row][col]
            setGrid(newGrid)

            // TODO
            // check if done
            let isDone = true
            for (let row = 0; row < 8; row++) {
              for (let col = 0; col < 4; col++) {
                if (newGrid[row][col] !== newGrid[row][7 - col]) {
                  isDone = false
                }
              }
            }
            if (isDone) {
              setDone(true)
            }
          }
        }}
      ></div>
    )
  }
}
