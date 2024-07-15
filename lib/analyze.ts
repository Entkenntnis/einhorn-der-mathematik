import { storyData } from './data'
import { median } from './helper/median'
import { makePost } from './make-post'
import { App, PlayerInfo } from './types'

export const cutOff = new Date('2024-07-14')

interface Event {
  userId: string
  value: string
  createdAt: string
}

export function analyze(app: App) {
  const password =
    sessionStorage.getItem('einhorn_der_mathematik_analyze_pw') ||
    prompt('Passwort') ||
    '0'
  void (async () => {
    const data = (await makePost('/export', {
      password,
    })) as {
      names: { userId: string; name: string; createdAt: string }[]
      solves: { storyId: number; userId: string; createdAt: string }[]
      logs: {
        userId: string
        storyId: number
        value: string
        correct: boolean
        createdAt: string
      }[]
      events: Event[]
    }

    const eventSources: any = {}

    const storyEvents = []

    for (const event of data.events) {
      const ts = new Date(event.createdAt).getTime()
      if (ts < cutOff.getTime()) continue
      if (event.userId == '--story-event--') {
        storyEvents.push(event)
      } else {
        if (!eventSources[event.value]) {
          eventSources[event.value] = {}
        }
        eventSources[event.value][event.userId] = true
      }
    }

    // TODO: implement proper analytics, but just dump data for now
    analyzeStoryEvents(storyEvents)

    const stories = new Set<number>()
    const solvedBy = data.solves.reduce((res, obj) => {
      const ts = new Date(obj.createdAt).getTime()
      if (ts < cutOff.getTime()) return res
      const key = obj.userId
      const entry = (res[key] = res[key] || {
        solved: new Set(),
        solvedTs: [],
      })
      entry.solved.add(obj.storyId)
      stories.add(obj.storyId)
      entry.solvedTs.push(ts)
      return res
    }, {} as { [key: string]: { solved: Set<number>; solvedTs: number[] } })
    // alert(JSON.stringify(jsonResp))
    sessionStorage.setItem('einhorn_der_mathematik_analyze_pw', password)
    const playerInfo: PlayerInfo[] = data.names
      .map((user) => {
        const createdAt = new Date(user.createdAt).getTime()
        return {
          id: user.userId.toString(),
          createdAt,
          name: user.name,
          solved: solvedBy[user.userId]?.solved.size ?? 0,
          solvedTs: solvedBy[user.userId]?.solvedTs ?? [],
          nameTs: createdAt,
        }
      })
      .filter((x) => x.createdAt >= cutOff.getTime())
    playerInfo.sort((a, b) => a.createdAt - b.createdAt)

    const times = playerInfo
      .map((player) => {
        if (player.solvedTs.length == 0) {
          return -1
        }
        const minTime = Math.min(...player.solvedTs, player.nameTs)
        const maxTime = Math.max(...player.solvedTs)
        if (player) {
          player.mins = ((maxTime - minTime) / 1000 / 60).toFixed(0)
        }
        return maxTime - minTime
      })
      .filter((time) => time >= 0)
    times.sort((a, b) => a - b)

    const storyStats: {
      [key: number]: { reachable: number; solved: number }
    } = {}
    Array.from(stories).forEach((storyId) => {
      const reachable = Object.values(playerInfo).filter(
        (user) =>
          storyId == 1 ||
          storyData[storyId as number].deps.some((dep) =>
            solvedBy[user.id]?.solved.has(dep)
          )
      ).length
      const solved = Object.values(playerInfo).filter((user) =>
        solvedBy[user.id]?.solved.has(storyId as number)
      ).length
      storyStats[storyId] = { reachable, solved }
    })

    const inputs = data.logs.reduce((res, obj) => {
      if (new Date(obj.createdAt).getTime() < cutOff.getTime()) return res
      const key = obj.storyId
      const entry = (res[key] = res[key] || [])
      entry.push({ value: obj.value, correct: !!obj.correct })
      return res
    }, {} as { [key: string]: { value: string; correct: boolean }[] })

    const events = Object.entries(eventSources).map((entry) => {
      return {
        value: entry[0],
        count: Object.keys(entry[1] as any).length,
      }
    })

    events.sort((a, b) => b.count - a.count)

    app.mut((state) => {
      state.analyze = {
        players: playerInfo.length,
        medianSeconds: Math.round(median(times) / 1000),
        medianPlayers: times.length,
        storyStats,
        inputs,
        playerInfo,
        events,
      }
    })
  })()
}

function analyzeStoryEvents(events: Event[]) {
  const storyMap: { [key: string]: { name: string; events: string[][] } } = {}
  for (const key in storyData) {
    storyMap[key] = { name: storyData[key].title, events: [] }
  }
  const storyEvents = events.forEach((e) => {
    const parts = e.value.split('_')
    const story = parseInt(parts[1])
    const modifier = parts.slice(2).filter((x) => x)
    storyMap[story].events.push(modifier)
  })

  for (const key in storyMap) {
    console.log(
      `${storyMap[key].name}: ${JSON.stringify(storyMap[key].events)}`
    )
  }
}
