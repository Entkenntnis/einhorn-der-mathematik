import { makePost } from './make-post'
import { App } from './types'

function addEvent(app: App, event: string) {
  app.mut((core) => {
    if (!core.storyEvents.events[core.showStory]) {
      core.storyEvents.events[core.showStory] = []
    }
    core.storyEvents.events[core.showStory].push(event)
  })
}

export function onOpen(app: App) {
  addEvent(app, 'open')
}

export function onTry(app: App) {
  addEvent(app, 'try')
}

export function onSolution(app: App) {
  addEvent(app, 'solution')
}

export function onCloseCallFeedback(app: App) {
  console.log('add closecall event')
  addEvent(app, 'closecall')
}

export function submitStoryEvent(app: App) {
  const id = app.state.showStory
  if (app.state.storyEvents.submitted.has(id)) return
  app.mut((core) => {
    core.storyEvents.submitted.add(id)
  })
  function count(event: string) {
    if (!app.state.storyEvents.events[id]) return -1
    return app.state.storyEvents.events[id].filter((x) => x == event).length
  }
  const events = []
  if (count('open') > 1) {
    events.push('reopen')
  }
  if (count('try') > 1) {
    events.push('retry')
  }
  if (count('solution') > 0) {
    events.push('solution')
  }
  if (count('closecall') > 0) {
    events.push('closecall')
  }

  console.log(app.state.storyEvents)
  makePost('/event', {
    userId: '--story-event--',
    value: `story_${id}_${events.join('_')}`,
  })
}
