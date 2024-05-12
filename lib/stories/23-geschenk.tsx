import { useState } from 'react'
import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story23: StoryData = {
  title: 'Geschenk',
  x: 540,
  y: 110,
  deps: [27, 32],
  render: ({ onSubmit, feedback }) => (
    <>
      <p>
        Ich versuche die Verpackung so wenig zu beschädigen wie möglich, wenn
        ich ein Geschenk auspacke. Es macht Spaß sich zu überlegen, in welchen
        Schritte die Person beim Einpacken vorgegangen ist.
      </p>

      <p>
        Teo hat mir zu Weihnachten dieses Paket geschenkt mit vier farbigen
        Bändern (er hat sich wirklich Mühe gegeben). Daher versuche ich auch,
        die Bänder nicht kaputt zu machen.
      </p>

      <img src="story23.jpg" alt="Geschenk umwickelt mit Bändern" width={350} />
      <p>
        In welcher Reihenfolge muss ich das machen? Wähle die passenden
        Antworten.
      </p>
      <ChoiceInput onSubmit={onSubmit} feedback={feedback} />
    </>
  ),
  proof: () => {
    return (
      <>
        <img
          src="story23.jpg"
          alt="Geschenk umwickelt mit Bändern"
          width={350}
        />
        <p>
          Bei dieser Aufgabe braucht es einen scharfen Blick und bisschen
          Vorstellungskraft. Das rote Band muss als erstes entfernt werden, weil
          es von keinem anderen Band gekreuzt wird. Jetzt kann man die zwei
          Kreuzungen des roten Bandes ignorieren. Hier ein Bild, falls es dir
          schwerfällt, das vorzustellen:
        </p>
        <img
          src="story23_sol.jpg"
          alt="Geschenk umwickelt mit Bändern"
          width={350}
        />
        <p>
          Als nächstes liegt das grüne Band offen, dann das blaue Band und am
          Ende das violette Band.
        </p>
        <p>
          Bei der Aufgabe ist es so, dass die Reihenfolge eindeutig ist. Das
          muss nicht immer so sein. Es kann durchaus passieren, dass die Bände
          so liegen, dass es gar kein Reihenfolge gibt - oder mehrere mögliche
          Reihenfolgen.
        </p>
      </>
    )
  },
  hideSubmit: true,
  submit: ignoreCaseSolution('R G B V'),
}

interface ChoiceInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
}

function ChoiceInput({ onSubmit, feedback }: ChoiceInputProps) {
  const choices = [
    'das blaue Band',
    'das violette Band',
    'das rote Band',
    'das grüne Band',
  ]
  const short = 'BVRG'

  const [showFeedback, setShowFeedback] = useState(false)
  const [selection, setSelection] = useState([-1, -1, -1, -1])
  return (
    <>
      <div className="mt-2 bg-white/70 rounded pl-3 pt-1 pb-2 [&>p]:my-4">
        <p>Entferne zuerst {renderSelect(0)},</p>
        <p>dann {renderSelect(1)},</p>
        <p>dann {renderSelect(2)},</p>
        <p>und als letztes {renderSelect(3)}.</p>
        {showFeedback && feedback}
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400 disabled:bg-gray-300 mt-4"
          disabled={selection.includes(-1)}
          onClick={() => {
            onSubmit(selection.map((i) => short.charAt(i)).join(' '))
            setShowFeedback(true)
          }}
        >
          Los
        </button>
      </div>
    </>
  )

  function renderSelect(index: number) {
    if (selection[index] >= 0) {
      return (
        <button
          onClick={() => {
            const newSelection = selection.slice()
            newSelection[index] = -1
            setSelection(newSelection)
            setShowFeedback(false)
          }}
          className="px-2 py-0.5 bg-pink-200 rounded"
          title="Auswahl zurücksetzen"
        >
          {choices[selection[index]]}
        </button>
      )
    }
    return (
      <select
        className="px-2 py-0.5"
        value={selection[index]}
        onChange={(e) => {
          const newSelection = selection.slice()
          newSelection[index] = parseInt(e.target.value)
          setSelection(newSelection)
        }}
      >
        <option value={-1}>---</option>
        {choices.map((c, i) => {
          if (selection.includes(i) && selection[index] !== i) {
            return null
          }
          return (
            <option key={c} value={i}>
              {c}
            </option>
          )
        })}
      </select>
    )
  }
}
