import { Draft, Immutable } from 'immer'
import { ReactNode } from 'react'

export interface PlayerInfo {
  name: string
  solved: number
  id: string
  createdAt: number
  solvedTs: number[]
  nameTs: number
  mins?: string
}

export type State = Immutable<{
  showStory: number
  storyFeedback: { correct: boolean; text: string; toWait?: number } | null
  solved: Set<number>
  modal: 'impressum' | 'name' | 'login' | 'change' | null
  userId: string
  analyze?: {
    players: number
    medianSeconds: number
    medianPlayers: number
    storyStats: { [key: string]: { reachable: number; solved: number } }
    inputs: { [key: string]: { value: string; correct: boolean }[] }
    playerInfo: PlayerInfo[]
  }
  editorMode: boolean
  demoMode: boolean
  playerData: {
    name: string
    id: string
  }
  persist: boolean
  persistBannerShown: boolean
  freeTries: number
  scrollPosTop: number
  scrollPosLeft: number
  storyGeneratorData: { [key: number]: object }
}>

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
    back: () => void
  }) => JSX.Element
  hideSubmit?: boolean
  submit: (props: {
    value: string
    mut: (fn: (draft: Draft<State>) => void) => void
    id: number
    core: State
  }) => void
  proof?: (props: { core: State }) => JSX.Element
}
