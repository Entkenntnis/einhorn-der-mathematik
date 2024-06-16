import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { StoryData } from '../types'

interface DATA {
  sum: number
  diff: number
}

export const story16: StoryData<DATA> = {
  title: 'Landkarte',
  x: 850,
  y: 240,
  deps: [8, 30],
  generator: () => {
    const sum = randomIntBetween(50, 70)
    let diff = randomIntBetween(7, 15)
    if ((sum - diff) % 2 === 1) {
      diff += 1
    }
    return { sum, diff }
  },
  render: ({ data }) => (
    <>
      <p>
        &quot;Auf einer kleinen Inselgruppe im Meer lebt ein Volk von orangen
        Nashörnern friedlich mit einem Volk von pinken Einhörnern zusammen
        ...&quot;
      </p>
      <p>
        Mit diesen Worten beginnt mein Aufsatz. Ich habe schon eine Karte
        gezeichnet, nun möchte ich noch einige Städte auf der Karte ergänzen.
      </p>
      <img src="/story16.jpg" alt="Landkarte" className="w-[400px]" />
      <p>
        Auf den Inseln soll es insgesamt {data.sum} Städte geben. Auf der
        kleinen Insel rechts befinden sich {data.diff} Städte, auf der großen
        Insel haben die beiden Völker gleich viele Städte.
      </p>
      <p>Wie viele Städte besitzt das Volk der orangen Nashörner?</p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        Bin sehr gespannt, ob der Frieden auf der Insel bleibt oder ob die
        beiden Völker sich nicht irgendwann ins Horn kriegen.
      </p>
      <p>
        Zuerst aber die Berechnung der Städte-Zahl. Im ersten Schritt kann ich
        die Anzahl der Städte auf der kleinen Insel abziehen. Ich erhalte{' '}
        {data.sum} - {data.diff} = {data.sum - data.diff} Städte für die große
        Insel links.
      </p>
      <p>
        Nun weiß ich, dass beide Völker davon gleich viele Städte besitzen. Das
        Ergebnis lautet damit <strong>{(data.sum - data.diff) / 2}</strong>.
      </p>
    </>
  ),
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => {
    const result = (data.sum - data.diff) / 2
    return [`${result}`, `${result} städte`]
  }),
}
