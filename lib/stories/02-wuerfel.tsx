import { useState } from 'react'
import { StoryData, ignoreCaseSolution } from '../data'
import clsx from 'clsx'

export const story2: StoryData = {
  title: 'Würfel',
  x: 249,
  y: 649,
  deps: [3, 24],
  render: ({ onSubmit, feedback }) => (
    <>
      <p>
        Teo hat heute in der Schule Würfel gebastelt. Stolz zeigt er mir seine
        Ergebnisse.
      </p>

      <p>
        Er hat die Augenzahlen frei nach Lust und Laune aufgezeichnet. Aber du
        und ich wissen, dass man aufpassen muss: Die Summe auf
        gegenüberliegenden Seiten ergibt immer 7.
      </p>

      <p>
        Welche der 4 Würfel müssen sicher korrigiert werden? Wähle sie aus und
        klicke auf sie.
      </p>

      <DiceInput onSubmit={onSubmit} feedback={feedback} />
    </>
  ),
  hideSubmit: true,
  submit: ignoreCaseSolution('A D'),
}

interface DiceInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
}

function DiceInput({ onSubmit, feedback }: DiceInputProps) {
  const [selected, setSelected] = useState<number[]>([])
  return (
    <>
      <div className="flex flex-wrap mt-3">
        {renderDice('/story2_1.png', 'Würfel mit Augenzahlen 1, 2, 6', 0)}
        {renderDice('/story2_2.png', 'Würfel mit Augenzahlen 1, 2, 4', 1)}
        {renderDice('/story2_3.png', 'Würfel mit Augenzahlen 3, 5, 6', 2)}
        {renderDice('/story2_4.png', 'Würfel mit Augenzahlen 2, 4, 5', 3)}
      </div>
      <div className="ml-2 -mt-2">{feedback}</div>
      <div className="mt-4 ml-2">
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400"
          onClick={() => {
            const letters = ['A', 'B', 'C', 'D']
            onSubmit(
              letters
                .filter((letter) => selected.includes(letters.indexOf(letter)))
                .join(' ')
            )
          }}
        >
          Los
        </button>
      </div>
    </>
  )

  function renderDice(src: string, alt: string, id: number) {
    return (
      <div>
        <img
          src={src}
          alt={alt}
          className={clsx(
            'w-40 m-2 border-2 cursor-pointer',
            selected.includes(id) ? 'border-pink-500' : 'border-transparent'
          )}
          onClick={() => {
            if (selected.includes(id)) {
              setSelected(selected.filter((s) => s != id))
            } else {
              setSelected([...selected, id])
            }
          }}
        />
      </div>
    )
  }
}
