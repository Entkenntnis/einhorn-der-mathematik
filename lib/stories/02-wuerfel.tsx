import { useState } from 'react'
import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import clsx from 'clsx'
import { StoryData } from '../types'
import { shuffleArray } from '../helper/shuffle-array'

interface DATA {
  entries: { url: string; alt: string; correct?: boolean }[]
}

const letters = ['A', 'B', 'C', 'D']

export const story2: StoryData<DATA> = {
  title: 'Würfel',
  x: 260,
  y: 460,
  deps: [10, 23],
  generator: () => {
    const data: DATA = {
      entries: [
        {
          url: '/story2_1.png',
          alt: 'Würfel mit Augenzahlen 1, 2, 6',
          correct: true,
        },
        {
          url: '/story2_2.png',
          alt: 'Würfel mit Augenzahlen 1, 2, 4',
        },
        {
          url: '/story2_3.png',
          alt: 'Würfel mit Augenzahlen 3, 5, 6',
        },
        {
          url: '/story2_4.png',
          alt: 'Würfel mit Augenzahlen 2, 4, 5',
          correct: true,
        },
      ],
    }
    data.entries = shuffleArray(data.entries)
    return data
  },
  render: ({ onSubmit, feedback, data }) => {
    return (
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

        <DiceInput onSubmit={onSubmit} feedback={feedback} data={data} />
      </>
    )
  },
  proof: () => (
    <>
      <p>
        Auf den Bildern sieht man keine gegenüberliegende Seiten. Wenn man also
        ein Augen-Paar findet, dass in Summe 7 ergibt, dann ist dieser Würfel
        fehlerhaft.
      </p>
      <img src="story2_sol.png" alt="Auflösung" />
      <p>
        Das passiert in diesem Beispiel bei den Würfeln A und D. Diese müssten
        sicher korrigiert werden. Aus den verfügbaren Informationen können wir
        nur sagen, wann ein Würfel falsch ist. Um sagen zu können, ob ein Würfel
        korrekt ist, bräuchten wir auch die Rückseiten. Daher hat Tina die Frage
        so formuliert, wie sie jetzt ist.
      </p>
      <p>
        Heutzutage folgen alle mir bekannten Würfel dieser Regel. Ich finde das
        erstaunlich, weil es einen Zeitpunkt geben musste, wo jemand diese Regel
        erfunden hat. Wann ist das geschehen, wer hat das gemacht - und vor
        allem, warum?
      </p>
      <p>
        Das sind die wichtigen Fragen des Lebens, damit sollte sich die Akademie
        viel mehr beschäftigen!
      </p>
    </>
  ),
  hideSubmit: true,
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    data.entries
      .map((e, i) => (e.correct ? letters[i] : null))
      .filter((e) => e)
      .join(' '),
  ]),
}

interface DiceInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
  data: DATA
}

function DiceInput({ onSubmit, feedback, data }: DiceInputProps) {
  const [selected, setSelected] = useState<number[]>([])
  return (
    <>
      <div className="flex flex-wrap mt-3">
        {renderDice(0)}
        {renderDice(1)}
        {renderDice(2)}
        {renderDice(3)}
      </div>
      <div className="ml-2 -mt-2">{feedback}</div>
      <div className="mt-4 ml-2">
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400"
          onClick={() => {
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

  function renderDice(id: number) {
    return (
      <div>
        <img
          src={data.entries[id].url}
          alt={data.entries[id].alt}
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
