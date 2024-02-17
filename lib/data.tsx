import { Draft } from 'immer'
import type { ReactNode } from 'react'
import { State } from '../components/App'
import { story1 } from './stories/01-hallo'
import { story2 } from './stories/02-wuerfel'
import { story3 } from './stories/03-uhrzeit'
import { story4 } from './stories/04-telepathie'
import { story5 } from './stories/05-figur'
import { story6 } from './stories/06-dreiecke'
import { story7 } from './stories/07-hufeisen'
import { story8 } from './stories/08-winkel'
import { story9 } from './stories/09-sudoku'
import { story10 } from './stories/10-rechenmauer'
import { story11 } from './stories/11-melonen'
import { story12 } from './stories/12-freunde'
import { story13 } from './stories/13-zahlenfolge'
import { story14 } from './stories/14-zufall'
import { story15 } from './stories/15-koerper'
import { story16 } from './stories/16-landkarte'
import { story17 } from './stories/17-pizza'
import { story18 } from './stories/18-mathe-video'
import { story19 } from './stories/19-spielbrett'
import { story20 } from './stories/20-100-nullen'
import { story21 } from './stories/21-erdumfang'
import { story22 } from './stories/22-todo'
import { makePost } from './make-post'

export interface StoryData {
  title: string
  x: number
  y: number
  deps: number[]
  render: (props: {
    core: State
    mut: (fn: (draft: Draft<State>) => void) => void
    onSubmit: (val: string) => void
    feedback: ReactNode
  }) => JSX.Element
  hideSubmit?: boolean
  submit: (props: {
    value: string
    mut: (fn: (draft: Draft<State>) => void) => void
    id: number
    core: State
  }) => void
}

export const storyData: { [key: number]: StoryData } = {
  1: story1,
  2: story2,
  3: story3,
  4: story4,
  5: story5,
  6: story6,
  7: story7,
  8: story8,
  9: story9,
  10: story10,
  11: story11,
  12: story12,
  13: story13,
  14: story14,
  15: story15,
  16: story16,
  17: story17,
  18: story18,
  19: story19,
  20: story20,
  21: story21,
  /*22: story22,*/
}

export function genericSubmitHandler(
  value: string,
  isCorrect: boolean,
  mut: (fn: (draft: Draft<State>) => void) => void,
  id: number,
  core: State
) {
  if (value) {
    console.log(core)
    makePost('/log', {
      storyId: id,
      userId: core.playerData.id,
      value,
      correct: isCorrect,
    })
  }
  if (isCorrect) {
    mut((c) => {
      c.storyFeedback = {
        correct: true,
        text: `"${value}" ist richtig`,
      }
    })
    addSolved(mut, id, core.playerData.id)
  } else {
    mut((c) => {
      c.storyFeedback = {
        correct: false,
        text: `"${value}" ist falsch`,
      }
    })
  }
}

export function ignoreCaseSolution(answer: string, alternatives?: string[]) {
  return (props: Parameters<StoryData['submit']>[0]) => {
    const value = props.value.trim().toLowerCase()
    const isCorrect =
      (answer.toLowerCase().trim() == value ||
        alternatives?.some((alt) => alt.toLowerCase().trim() == value)) ??
      false
    genericSubmitHandler(
      props.value.trim(),
      isCorrect,
      props.mut,
      props.id,
      props.core
    )
  }
}

function addSolved(
  mut: (fn: (draft: Draft<State>) => void) => void,
  storyId: number,
  userId: string
) {
  mut((c) => {
    c.solved.add(storyId)
  })
  makePost('/solve', { storyId, userId })
}
