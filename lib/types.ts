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
  modal: 'impressum' | 'name' | 'highscore' | 'design' | null
  userId: string
  analyze?: {
    players: number
    medianSeconds: number
    medianPlayers: number
    storyStats: { [key: string]: { reachable: number; solved: number } }
    inputs: { [key: string]: { value: string; correct: boolean }[] }
    playerInfo: PlayerInfo[]
    events: { value: string; count: number }[]
  }
  editorMode: boolean
  demoMode: boolean
  playerData: {
    name: string
    id: string
  }
  persist: boolean
  persistBannerShown: boolean
  rateLimit: { freeTries: number; lockedUntil: number | null }
  scrollPosTop: number
  scrollPosLeft: number
  storyGeneratorData: { [key: number]: object }
  showIdeaStory: boolean
  background: 'beach' | 'desert' | 'mountains' | 'night-sky' | 'pink-clouds'
  lineColor: 'rainbow' | 'gray' | 'pink'
  storyEvents: {
    submitted: Set<number>
    additionalEvents: { [key: number]: string[] }
  }
}>

export interface SubmitProps {
  value: string
  mut: (fn: (draft: Draft<State>) => void) => void
  id: number
  core: State
}

export interface StoryData<T = unknown> {
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
    data: T
  }) => JSX.Element
  hideSubmit?: boolean
  submit: ({ data }: { data: T }) => (props: SubmitProps) => void
  proof?: (props: { core: State; data: T }) => JSX.Element
  generator?: () => T
}
