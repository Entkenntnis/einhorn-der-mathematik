import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

import { feedbackAnimation } from '../utils/feedback-animation'
import { SkipExerciseButton } from './skip-exercise-button'
import { CounterContext } from '../context/counter-context'

export type ExStatus = 'fresh' | 'correct' | 'incorrect' | 'revealed'

interface ExerciseFeedbackProps {
  noUserInput: boolean
  noUserInputText?: JSX.Element
  exStatus: ExStatus
  setExStatus: Dispatch<SetStateAction<ExStatus>>
  isCorrect: boolean
  feedbacks?: {
    correct?: JSX.Element | string
    incorrect?: JSX.Element | Text
    followUps?: JSX.Element | Text
    revealed?: JSX.Element | Text
  }
  onNewExecise: () => void
  shakeElementQuery?: string // nod or shake for feedback
  focusElementQuery?: string // focus on new exercise
  centAmount?: number
  forceCheck?: boolean
  hideSkipButton?: boolean
}
export function ExerciseFeedback({
  noUserInput,
  noUserInputText,
  setExStatus,
  feedbacks,
  exStatus,
  isCorrect,
  onNewExecise,
  shakeElementQuery,
  focusElementQuery,
  centAmount,
  forceCheck,
  hideSkipButton,
}: ExerciseFeedbackProps) {
  // const { setExerciseData } = useExerciseData()
  const [attempts, setAttempts] = useState(0)

  const { count, target, increment, onDone } = useContext(CounterContext)

  // const data = useMathSkillsStorage().data

  const isRevealButton = exStatus === 'incorrect'
  const isNextButton = exStatus === 'correct' || exStatus === 'revealed'
  const isDone = isNextButton && count == target

  function newEx() {
    setExStatus('fresh')
    onNewExecise()

    if (focusElementQuery) {
      setTimeout(() => {
        const target = document.querySelector(focusElementQuery)
        ;(target as HTMLInputElement)?.focus()
      })
    }
  }

  function checkEx() {
    if (noUserInput) return
    feedbackAnimation(isCorrect, shakeElementQuery)
    setExStatus(isCorrect ? 'correct' : 'incorrect')
    setAttempts(attempts + 1)
    if (isCorrect) {
      increment()
    }
    // setExerciseData(isCorrect, centAmount)
  }

  function revealEx() {
    setExStatus('revealed')
  }

  const onButtonClick = isRevealButton
    ? undefined
    : isDone
    ? onDone
    : isNextButton
    ? newEx
    : checkEx

  useEffect(() => {
    if (forceCheck) checkEx()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceCheck])

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onButtonClick?.()
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onButtonClick])

  return (
    <>
      <div className="mt-2 flex min-h-[120px] flex-col items-center sm:min-h-[80px] sm:flex-row sm:justify-between">
        {noUserInput ? (
          noUserInputText ?? ''
        ) : (
          <>
            <div className="text-almost-black">
              <p>
                {exStatus === 'correct'
                  ? feedbacks?.correct ?? `Das ist der richtige Platz!`
                  : null}
                {exStatus === 'incorrect' ? (
                  <>
                    {feedbacks?.incorrect ?? 'Das stimmt so noch nicht.'}
                    {feedbacks?.followUps ?? (
                      <>
                        <br />
                        Probiere weiter, oder{' '}
                        <a className="cursor-pointer" onClick={revealEx}>
                          zeige dir die Lösung an
                        </a>
                        .
                      </>
                    )}
                  </>
                ) : null}
                {exStatus === 'revealed' ? (
                  <>{feedbacks?.revealed ?? ''}</>
                ) : null}
              </p>
            </div>
            <div className="pt-5 sm:flex sm:justify-between sm:pt-0">
              {noUserInput ? noUserInputText ?? '' : renderMainButton()}
            </div>
          </>
        )}
      </div>
      {hideSkipButton ? null : (
        <div className="text-right">
          <SkipExerciseButton makeNewExercise={newEx} hidden={isNextButton} />
        </div>
      )}
    </>
  )

  function renderMainButton() {
    if (isRevealButton) return null
    return (
      <button
        className="px-2 py-0.5 bg-pink-300 hover:bg-pink-400 rounded"
        onClick={onButtonClick}
      >
        {isNextButton && (isDone ? 'weiter' : 'Neue Zahl 👉')}
        {exStatus === 'fresh' && "Stimmt's?"}
      </button>
    )
  }
}
