import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  socks: number
}

export const story29: StoryData<DATA> = {
  title: 'Kleiderschrank',
  x: 249,
  y: 649,
  deps: [2, 26, 28],
  generator: () => {
    return { socks: randomItemFromArray([5, 6, 7, 8, 9, 10]) }
  },
  render: ({ data }) => (
    <>
      <p>
        Mein Outfit überlasse ich dem Zufall. Ich habe meine 3 Pullis, 2 Hosen
        und {data.socks} Paar Socken und trage diese im Wechsel. Mit der Zeit
        ergeben sich alle möglichen bunten Kombinationen.
      </p>

      <p>
        Für besondere Anlasse habe ich natürlich noch andere Kleidung, aber für
        den normalen Alltag sind das meine Lieblingsklamotten - simple und
        comfy.
      </p>

      <p>
        Wie viele verschiedene Outfits kann ich mit Pulli, Hose und Socken
        kombinieren?
      </p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        Ich erhalte das Ergebnis mit der Rechnung 3 · 2 · {data.socks} ={' '}
        {data.socks * 6}. Ein Baumdiagramm hilft zu verstehen, <em>warum</em>{' '}
        ich so rechne.
      </p>
      <img src="story29_sol.png" alt="angedeutetes Baumdiagramm" width={500} />
      <p>
        Tina wählt zuerst einen ihrer drei Pullis. Das ist die erste Stufe. In
        der zweiten Stufe wählt sie für jeden Pulli eine Hose. Das Baumdiagramm
        deutet dabei die Möglichkeiten nur an. Wenn man es komplett ausführt,
        sind es 6 Zweige am Ende der zweiten Stufe.
      </p>
      <p>
        In der dritten Stufe spaltet sich jeder der 6 Zweige nochmal in die{' '}
        {data.socks} Zweige für die verschiedenen Socken auf. Multipliziert
        ergibt das <strong>{data.socks * 6}</strong>.
      </p>
      <p>
        Die Farben habe ich mir nur ausgedacht - Tina hat sicherlich schönere
        Farben in ihrem Kleiderschrank.
      </p>
    </>
  ),
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    (data.socks * 6).toString(),
  ]),
}
