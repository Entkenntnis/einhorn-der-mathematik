import { ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  m1: number
  m2: number
  pommes: number
}

export const story50: StoryData<DATA> = {
  title: 'Burger',
  x: 1270,
  y: 650,
  deps: [36],
  generator() {
    const burger = randomItemFromArray([5, 6, 7, 8])
    const pommes = randomItemFromArray([2, 3, 4])
    return { m1: burger + burger, m2: burger + pommes, pommes }
  },
  render({ data }) {
    return (
      <>
        <p>
          Neben unserer Schule gibt es einen kleinen Burger-Laden. Dort gehen
          wir gerne hin, weil der Laden zum Mittag für SchülerInnen ein paar
          günstige Angebote hat.
        </p>
        <div className="relative my-6">
          <img src="/story50.jpg" alt="Mittagsmenü" className="w-[400px]" />
          <div className="absolute left-[300px] top-8 text-3xl w-16 text-right">
            {data.m1} €
          </div>
          <div className="absolute left-[300px] top-36 text-3xl w-16 text-right">
            {data.m2} €
          </div>
        </div>
        <p>
          Zwei Burger kosten {data.m1} €, ein Burger und eine Portion Pommes
          kosten {data.m2} €. Ich habe heute nicht so viel Hunger und möchte nur
          eine Pommes essen.
        </p>
        <p>
          Meine Mitschülerin kauft sich sich das zweite Menü und gibt mir ihre
          Pommes ab. Ich möchte ihr den passenden Geldbetrag zurückgeben.
        </p>
        <p>
          Wie viel Euro soll ich meiner Mitschülerin geben für eine Portion
          Pommes?
        </p>
      </>
    )
  },
  proof({ data }) {
    return (
      <>
        <p>
          Zwei Burger kosten {data.m1} €, daraus schließe ich, dass ein Burger{' '}
          {data.m1 / 2} € wert ist.
        </p>
        <p>
          Das Menü mit Burger und Pommes kostet {data.m2} €, davon ziehe ich{' '}
          {data.m1 / 2} € für den Burger ab. Die Portion Pommes sind damit{' '}
          <strong>{data.pommes} €</strong> wert.
        </p>
      </>
    )
  },
  submit: ({ data }) =>
    ignoreCaseSolutionWithGenData([`${data.pommes}`, `${data.pommes}€`]),
}
