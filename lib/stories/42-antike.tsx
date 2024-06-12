import { useState } from 'react'
import { MemoryGame } from '../../components/math-skills/memory/memory-game'
import { toRoman } from '../../components/math-skills/utils/roman-numerals'
import { ignoreCaseSolution } from '../data'
import { shuffleArray } from '../helper/shuffle-array'
import { StoryData } from '../types'
import { CounterContext } from '../../components/math-skills/context/counter-context'

export const story42: StoryData = {
  title: 'Antike',
  x: 510,
  y: 310,
  deps: [41, 48],
  render: ({ back, onSubmit }) => (
    <>
      <p>
        Kannst du dir vorstellen, wie Menschen vor 2000 Jahren gelebt haben? Ich
        frage mich, ob sie sich ähnliche gefühlt haben wie wir heute.
      </p>
      <p>
        Was auf jeden Fall anders war: Sie verwendeten andere Zahlen. Anstatt
        von Dezimal-Zahlen hatten sie ihr eigenes Zahlensystem. Reise mit diesem
        kleinen Memory für einen kurzen Moment in das antike Rom zurück und
        finde alle Paare von römischen Zahlen und Dezimal-Zahlen:
      </p>
      <MultistepExercise
        onDone={() => {
          onSubmit('42')
          back()
        }}
      />
    </>
  ),
  submit: ignoreCaseSolution('42'),
  hideSubmit: true,
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
      <MemoryGame
        centAmount={145}
        checkPair={(v0: number | string, v1: number | string) => {
          return (
            (Number.isInteger(v0) ? toRoman(v0 as number) : v0) ===
            (Number.isInteger(v1) ? toRoman(v1 as number) : v1)
          )
        }}
        generator={() => {
          const candidates = []
          for (let i = 1; i <= 10; i++) {
            candidates.push(i)
          }

          const arabic = shuffleArray(candidates).slice(0, 8)
          const roman = arabic.map(toRoman)
          const values = shuffleArray([...arabic, ...roman])
          return { values }
        }}
      />
    </CounterContext.Provider>
  )
}
