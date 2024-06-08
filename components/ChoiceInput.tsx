import { useState } from 'react'

interface ChoiceInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
  choices: string[]
  renderContent: (renderSelect: (n: number) => JSX.Element) => JSX.Element
  getShort?: (n: number) => string
}

export function ChoiceInput({
  onSubmit,
  feedback,
  choices,
  renderContent,
  getShort,
}: ChoiceInputProps) {
  const [showFeedback, setShowFeedback] = useState(false)
  const [selection, setSelection] = useState(choices.map((x) => -1))
  return (
    <>
      <div className="mt-2 bg-white/70 rounded pl-3 pt-1 pb-2 [&>p]:my-4">
        {renderContent(renderSelect)}
        {showFeedback && feedback}
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400 disabled:bg-gray-300 mt-4"
          disabled={selection.includes(-1)}
          onClick={() => {
            onSubmit(
              selection
                .map((i) => (getShort ? getShort(i) : choices[i]))
                .join(' ')
            )
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
          className="px-2 py-0.5 bg-pink-200 rounded h-7"
          title="Auswahl zurücksetzen"
        >
          {choices[selection[index]]}
        </button>
      )
    }
    return (
      <select
        className="px-2 py-0.5 h-7"
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
