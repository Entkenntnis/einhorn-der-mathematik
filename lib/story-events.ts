import { makePost } from './make-post'
import { App } from './types'

export function onOpen(app: App) {
  console.log('read app state')
  console.log(app.state.showStory)
}

export function onTry(app: App) {}

export function onSolution(app: App) {}

export function submitStoryEvent(app: App) {
  const id = app.state.showStory
  if (app.state.storyEvents.submitted.has(id)) return
  app.mut((core) => {
    core.storyEvents.submitted.add(id)
  })
  const events = app.state.storyEvents.additionalEvents[id] ?? []
  makePost('/event', {
    userId: app.state.playerData.id,
    value: `story_${id}_${events.join('_')}`,
  })
}
