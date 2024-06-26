import { useState } from 'react'
import { NumberLineExercise } from '../../components/math-skills/number-line/number-line-exercise'
import { ignoreCaseSolution } from '../data'
import { getIntRange } from '../helper/get-int-range'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { CounterContext } from '../../components/math-skills/context/counter-context'
import { StoryData } from '../types'

export const story37: StoryData = {
  title: 'Zahlenstrahl',
  x: 260,
  y: 460,
  deps: [10, 23],
  render: ({ back, onSubmit }) => (
    <>
      <p>
        Ich liebe es, wenn man Dinge aufzeichnen kann, dann kann ich sie mir
        viel besser vorstellen. Ich bin sehr froh, dass es auch mit Zahlen geht.
        Auf dem Zahlenstrahl hat jede Zahl ihren festen Platz.
      </p>
      <MultistepExercise
        onDone={() => {
          onSubmit('42')
          back()
        }}
      />
    </>
  ),
  hideSubmit: true,
  submit: ignoreCaseSolution('42'),
}

function MultistepExercise({ onDone }: { onDone: () => void }) {
  const [count, setCounter] = useState(0)

  return (
    <CounterContext.Provider
      value={{
        count,
        target: 1,
        increment: () => setCounter((x) => x + 1),
        onDone,
      }}
    >
      <NumberLineExercise generator={numberLineGeneratorLevel1} />
    </CounterContext.Provider>
  )
}

function numberLineGeneratorLevel1(): [number, number, number] {
  const maxVal = 40

  const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
  const searchValues = getIntRange(10, 39, [labeledPos * 40])
  const searchedVal = randomItemFromArray(searchValues)
  return [searchedVal, labeledPos, maxVal]
}
