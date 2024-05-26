import { Draft } from 'immer'
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
import { story14 } from './stories/14-bingo'
import { story15 } from './stories/15-koerper'
import { story16 } from './stories/16-landkarte'
import { story17 } from './stories/17-pizza'
import { story18 } from './stories/18-mathe-video'
import { story19 } from './stories/19-spielbrett'
import { story20 } from './stories/20-100-nullen'
import { story21 } from './stories/21-erdumfang'
import { story22 } from './stories/22-schatzkiste'
import { makePost } from './make-post'
import { story23 } from './stories/23-geschenk'
import { story24 } from './stories/24-riesenrad'
import { story25 } from './stories/25-streichhoelzer'
import { story26 } from './stories/26-wochentag'
import { story28 } from './stories/28-taschengeld'
import { story29 } from './stories/29-kleiderschrank'
import { story27 } from './stories/27-griechisch'
import { story30 } from './stories/30-um-die-ecke'
import { story31 } from './stories/31-barock'
import { story32 } from './stories/32-turnier'
import { story33 } from './stories/33-ungeduld'
import { story34 } from './stories/34-memory'
import { story36 } from './stories/36-mathe'
import { story35 } from './stories/35-schnapszahlen'
import { story37 } from './stories/37-zahlenstrahl'
import { State, StoryData } from './types'
import { story38 } from './stories/38-NEU'
import { story39 } from './stories/39-NEU'
import { story40 } from './stories/40-NEU'

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
  22: story22,
  23: story23,
  24: story24,
  25: story25,
  26: story26,
  27: story27,
  28: story28,
  29: story29,
  30: story30,
  31: story31,
  32: story32,
  33: story33,
  34: story34,
  35: story35,
  36: story36,
  37: story37,
  38: story38,
  39: story39,
  40: story40,
}

export function genericSubmitHandler(
  value: string,
  isCorrect: boolean,
  mut: (fn: (draft: Draft<State>) => void) => void,
  id: number,
  core: State
) {
  const ts = new Date().getTime()
  const isLocked =
    core.rateLimit.lockedUntil !== null && ts < core.rateLimit.lockedUntil

  if (isLocked) {
    return
  } else {
    if (core.rateLimit.lockedUntil !== null) {
      mut((c) => {
        c.rateLimit.lockedUntil = null
      })
    }
  }

  if (core.rateLimit.freeTries > 0) {
    mut((c) => {
      c.rateLimit.freeTries--
    })
  }

  if (value) {
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
        toWait: core.rateLimit.freeTries === 0 ? 10000 : undefined,
      }
      if (core.rateLimit.freeTries === 0) {
        c.rateLimit.lockedUntil = new Date().getTime() + 10000
      }
    })
  }
}

export function ignoreCaseSolutionWithGenData<T>(f: (data: T) => string[]) {
  return (props: Parameters<StoryData['submit']>[0]) => {
    const value = props.value.trim().toLowerCase().replace(/\s/g, '')
    const data = props.data as T
    const answers = f(data)
    const isCorrect = answers.some(
      (answer) => answer.toLowerCase().trim().replace(/\s/g, '') == value
    )
    genericSubmitHandler(
      props.value.trim(),
      isCorrect,
      props.mut,
      props.id,
      props.core
    )
  }
}

export function ignoreCaseSolution(answer: string, alternatives?: string[]) {
  return (props: Parameters<StoryData['submit']>[0]) => {
    const value = props.value.trim().toLowerCase().replace(/\s/g, '')
    const isCorrect =
      (answer.toLowerCase().trim().replace(/\s/g, '') == value ||
        alternatives?.some(
          (alt) => alt.toLowerCase().trim().replace(/\s/g, '') == value
        )) ??
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
