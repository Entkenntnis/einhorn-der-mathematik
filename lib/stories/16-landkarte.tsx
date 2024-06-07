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
    const sum = randomIntBetween(50, 70) * 10
    let diff = randomIntBetween(7, 15) * 10
    if ((sum - diff) % 20 === 10) {
      diff += 10
    }
    return { sum, diff }
  },
  render: ({ data }) => (
    <>
      <p>
        Mir macht es Spaß, Bilder für meine Geschichten zu entwerfen. Für meine
        neuste Geschichte habe ich diese Landkarte gezeichnet.
      </p>
      <img src="/story16.jpg" alt="Landkarte" className="w-[400px]" />
      <p>
        Die Insel hat eine Fläche von {data.sum} Fußballfeldern. Auf einer Insel
        leben die Gruppen A und B. Durch einen See mit zwei Flüssen wird die
        Insel in zwei gleich große Teile unterteilt. Gruppe B besitzt{' '}
        {data.diff} Fußballfelder mehr Land als Gruppe A.
      </p>
      <p>Wie viel Fußballfelder Land besitzt Gruppe A?</p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        Das ist eine sehr vertrackte Aufgabe! Ich habe mehrere Versuche
        gebraucht, bis ich einen guten Rechenweg gefunden habe.
      </p>
      <p>
        Von den {data.sum} Fußballfeldern weiß ich, dass {data.diff}{' '}
        Fußballfelder der Gruppe B gehören. Wenn ich diese abziehe, dann haben
        Gruppe A und B jeweils den gleichen Anteil von den restlichen{' '}
        {data.sum - data.diff} Fußballfeldern.
      </p>
      <p>
        Ich halbiere und erhalte <strong>{(data.sum - data.diff) / 2}</strong>{' '}
        Fußballfelder als Ergebnis für die Landfläche von Gruppe A.
      </p>
    </>
  ),
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    ((data.sum - data.diff) / 2).toString(),
  ]),
}
