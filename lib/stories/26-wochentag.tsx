import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  days: number
  answer: string
  answerShort: string
}

export const story26: StoryData<DATA> = {
  title: 'Wochentag',
  x: 120,
  y: 500,
  deps: [23, 41],
  generator: () => {
    const [days, answer, answerShort] = randomItemFromArray([
      [6, 'Dienstag', 'di'],
      [5, 'Mittwoch', 'mi'],
      [4, 'Donnerstag', 'do'],
      [3, 'Freitag', 'fr'],
    ])
    return { days, answer, answerShort }
  },
  render: ({ data }) => (
    <>
      <p>Wunderbar, dich wieder zu sehen ☺️</p>
      <p>Ich fühle mich gleich wohler, wenn du hier bist.</p>
      <p>
        Bei mir fühlen sich alle Tage aktuell sehr ähnlich an, weil wir gerade
        Ferien haben. Ohne einen festen Schulalltag weiß ich gar nicht mehr,
        welchen Tag wir in der Woche haben.
      </p>
      <p>
        Ich kann mich nur noch daran erinnern, dass in {data.days} Tagen die
        Schule an einem Montag beginnt.
      </p>
      <p>Hilf mir auf die Sprünge. Welcher Wochentag ist heute?</p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        Bei solchen Aufgaben brauche ich immer eine Skizze. Diese darf auch sehr
        einfach sein.
      </p>
      <p>Mo - Di - Mi - Do - Fr - Sa - So - MONTAG</p>
      <p>
        Ich gehe vom Montag {data.days} Tage zurück und komme am{' '}
        <strong>{data.answer}</strong> an.
      </p>
    </>
  ),
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    data.answer,
    data.answerShort,
  ]),
}
