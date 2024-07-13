import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  left: number
  right: number
  base: number
}

export const story49: StoryData<DATA> = {
  title: 'Küchentag',
  x: 1300,
  y: 550,
  deps: [36],
  generator() {
    const base = randomItemFromArray([7, 8, 9, 10, 11])
    const incr = randomItemFromArray([1, 2, 3])
    return { left: base + incr, right: base + incr * 6, base }
  },
  render: ({ data }) => (
    <>
      <p>
        Wir räumen unsere Küche um: einmal alles raus, sortieren und wieder
        rein. Während meine Eltern arbeiten, mache ich mich sehr nützlich
        (nicht) und vermesse verschiedene Schüsselstapel.
      </p>
      <div className="relative my-6">
        <img
          src="/story49.jpg"
          alt="Zwei Stapeln mit Schüsseln"
          className="w-[440px]"
        />
        <div className="absolute left-3 top-24 text-lg">{data.left} cm</div>
        <div className="absolute left-[375px] top-16 text-lg">
          {data.right} cm
        </div>
      </div>
      <p className="!-mt-5">
        <small className="text-gray-700 italic">
          Skizze nicht maßstabsgetreu
        </small>
      </p>
      <p>
        Ein Stapel mit zwei Schüsseln ist {data.left} cm hoch, ein Stapel mit
        sieben Schüsseln ist {data.right} cm hoch. Das sind die wichtigen
        Erkenntnisse!
      </p>
      <p>
        Am Abend frage ich mich: Wie hoch ist eine einzelne Schüssel? Ich möchte
        jetzt nicht nochmal in die Küche gehen und nachmessen. Berechne für mich
        die Höhe einer einzelnen Schüssel.
      </p>
    </>
  ),
  proof({ data }) {
    const one = (data.right - data.left) / 5
    return (
      <>
        <p>
          Als erstes erkenne ich, dass der Unterschied zwischen den zwei Stapeln
          fünf Schüsseln-Erhöhungen sind.
        </p>
        <div className="relative my-6">
          <img
            src="/story49_sol.jpg"
            alt="Zwei Stapeln mit Schüsseln"
            className="w-[440px]"
          />
          <div className="absolute left-3 top-24 text-lg">{data.left} cm</div>
          <div className="absolute left-[375px] top-16 text-lg">
            {data.right} cm
          </div>
        </div>
        <p>
          Ich rechne {data.right} cm - {data.left} cm = {data.right - data.left}{' '}
          cm. Ich teile die Zahl durch fünf und weiß, dass jede Erhöhung genau{' '}
          {one} cm hoch ist.
        </p>
        <p>
          Die Höhe einer Schüssel berechne ich mit der Höhe des linken Stapels
          minus {one} cm.
        </p>
        <p>
          Ich erhalte mit {data.left} cm - {one} cm ={' '}
          <strong>{data.base} cm</strong> die Lösung.
        </p>
      </>
    )
  },
  submit: ({ data }) =>
    ignoreCaseSolutionWithGenData([data.base.toString(), `${data.base}cm`]),
}
