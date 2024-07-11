import { makePost } from './make-post'
import { App } from './types'

export function onOpen(app: App) {
  app.mut((core) => {
    if (!core.storyEvents.events[core.showStory]) {
      core.storyEvents.events[core.showStory] = []
    }
    core.storyEvents.events[core.showStory].push('open')
  })
}

export function onTry(app: App) {
  app.mut((core) => {
    if (!core.storyEvents.events[core.showStory]) {
      core.storyEvents.events[core.showStory] = []
    }
    core.storyEvents.events[core.showStory].push('try')
  })
}

export function onSolution(app: App) {
  app.mut((core) => {
    if (!core.storyEvents.events[core.showStory]) {
      core.storyEvents.events[core.showStory] = []
    }
    core.storyEvents.events[core.showStory].push('solution')
  })
}

export function submitStoryEvent(app: App) {
  const id = app.state.showStory
  if (app.state.storyEvents.submitted.has(id)) return
  app.mut((core) => {
    core.storyEvents.submitted.add(id)
  })
  const events = []
  if (
    app.state.storyEvents.events[id] &&
    app.state.storyEvents.events[id].filter((x) => x == 'open').length > 1
  ) {
    events.push('reopen')
  }
  if (
    app.state.storyEvents.events[id] &&
    app.state.storyEvents.events[id].filter((x) => x == 'try').length > 1
  ) {
    events.push('retry')
  }
  if (
    app.state.storyEvents.events[id] &&
    app.state.storyEvents.events[id].filter((x) => x == 'solution').length > 0
  ) {
    events.push('solution')
  }
  makePost('/event', {
    userId: app.state.playerData.id,
    value: `story_${id}_${events.join('_')}`,
  })
}
