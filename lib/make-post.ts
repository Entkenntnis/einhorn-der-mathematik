export async function makePost(route: string, body: object) {
  if (window.location.hostname === 'localhost') {
    console.log('makePost', route, body)
    return
  }
  const res = await fetch('https://stats-einhorn.arrrg.de' + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the appropriate content type for your data
    },
    body: JSON.stringify(body), // Convert the data to a JSON string
  })
  return await res.json()
}
