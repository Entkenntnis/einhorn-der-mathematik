export function submit_event(userId: string, storyId: number, value?: string) {
  // only log on production
  if (window.location.host !== 'einhorn.arrrg.de') {
    console.log({ userId, storyId, value })
    return
  }

  void (async () => {
    await fetch('https://stats-einhorn.arrrg.de/submit_event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, storyId, value }),
    })
  })()
}
