import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { FaIcon } from '../../components/FaIcon'
import { StoryData, ignoreCaseSolution } from '../data'

export const story27: StoryData = {
  title: 'Griechisch',
  x: 340,
  y: 200,
  deps: [6, 7],
  render: ({ onSubmit, feedback }) => (
    <>
      <p>
        Das antike Griechenland hat viele wilde Geschichten zu bieten - wer
        Percy Jackson gelesen hat, weiß, wovon ich rede.
      </p>

      <p>
        Neben den Geschichten haben die Griechen auch eine schöne Schrift. Ich
        finde, sie macht einfach was her. Ich bin so begeisterst, dass ich auch
        unbedingt Teo ein paar Zeichen beibringen möchte.
      </p>

      <p>
        Ich beginne mit diesen drei Buchstaben. Wähle die passenden Namen der
        Buchstaben aus.
      </p>
      <ChoiceInput onSubmit={onSubmit} feedback={feedback} />
    </>
  ),
  hideSubmit: true,
  submit: ignoreCaseSolution('Alpha Beta Gamma'),
}

interface ChoiceInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
}

function ChoiceInput({ onSubmit, feedback }: ChoiceInputProps) {
  const choices = ['Gamma', 'Alpha', 'Beta']

  const [showFeedback, setShowFeedback] = useState(false)
  const [selection, setSelection] = useState([-1, -1, -1])
  return (
    <>
      <div className="mt-2 bg-white/70 rounded pl-3 pt-1 pb-2 [&>p]:my-4">
        <p>α = {renderSelect(0)},</p>
        <p>β = {renderSelect(1)},</p>
        <p>γ = {renderSelect(2)}.</p>
        {showFeedback && feedback}
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400 disabled:bg-gray-300 mt-4"
          disabled={selection.includes(-1)}
          onClick={() => {
            onSubmit(selection.map((i) => choices[i]).join(' '))
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
