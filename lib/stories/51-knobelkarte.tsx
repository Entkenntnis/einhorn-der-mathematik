import { ignoreCaseSolutionWithGenData } from '../data'
import { shuffleArray } from '../helper/shuffle-array'
import { StoryData } from '../types'

interface DATA {
  numbers: number[]
}

export const story51: StoryData<DATA> = {
  title: 'Knobelkarte',
  x: 1280,
  y: 760,
  deps: [36],
  generator: () => {
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 7)
    numbers.sort((a, b) => a - b)
    return { numbers }
  },
  render: ({ data }) => (
    <>
      <p>
        Meine Mathe-Lehrerin gibt sich wirklich viel Mühe, uns für Mathematik zu
        begeistern. Ihre neuste Erfindung sind Knobelkarten. Diese teilt sie uns
        am Ende jeder Woche aus und wir sollen die Aufgaben bis zur nächsten
        Stunde lösen.
      </p>
      <p>
        Ich bin ihr dankbar, dass sie sich diese Mühe macht. Ich merke, wie ihre
        Begeisterung auch ein wenig auf mich überspringt. Und die Aufgaben sind
        gar nicht so schrecklich. Hier ist ein Beispiel:
      </p>
      <p className="text-2xl">
        {data.numbers[4]} {data.numbers[5]} {data.numbers[2]} {data.numbers[3]}{' '}
        {data.numbers[1]} {data.numbers[6]} {data.numbers[0]}
      </p>
      <p>
        Streiche genau drei Ziffern durch. Die übrigen Ziffern sollen eine
        möglichst große Zahl ergeben. Die Reihenfolge der Ziffern darf nicht
        verändert werden. Wie lautet das größtmögliche Ergebnis?
      </p>
    </>
  ),
  proof: ({ data }) => {
    return (
      <>
        <p>
          Ich finde es toll, dass Tinas Mathe-Lehrerin sich um ihre SchülerInnen
          kümmert und ihnen auch kleine Herausforderungen stellt.
        </p>
        <p className="text-2xl">
          {data.numbers[4]} {data.numbers[5]} {data.numbers[2]}{' '}
          {data.numbers[3]} {data.numbers[1]} {data.numbers[6]}{' '}
          {data.numbers[0]}
        </p>
        <p>
          Die Ziffer {data.numbers[5]} ist größer als die Ziffer{' '}
          {data.numbers[4]}, deshalb brauche ich die {data.numbers[5]} an der
          ersten Stelle. Ich streiche also die erste Ziffer:
        </p>
        <p className="text-2xl">
          <s className="text-pink-500 italic">{data.numbers[4]}</s>{' '}
          {data.numbers[5]} {data.numbers[2]} {data.numbers[3]}{' '}
          {data.numbers[1]} {data.numbers[6]} {data.numbers[0]}
        </p>
        <p>
          Mit der gleichen Logik muss auch die {data.numbers[2]} gestrichen
          werden um Platz für die {data.numbers[3]} zu schaffen und die{' '}
          {data.numbers[1]} gestrichen werden um Platz für die {data.numbers[6]}{' '}
          zu schaffen.
        </p>
        <p className="text-2xl">
          <s className="text-pink-500 italic">{data.numbers[4]}</s>{' '}
          {data.numbers[5]}{' '}
          <s className="text-pink-500 italic">{data.numbers[2]}</s>{' '}
          {data.numbers[3]}{' '}
          <s className="text-pink-500 italic">{data.numbers[1]}</s>{' '}
          {data.numbers[6]} {data.numbers[0]}
        </p>
        <p>
          Ich erhalte das Ergebnis{' '}
          <strong>
            {data.numbers[5]}
            {data.numbers[3]}
            {data.numbers[6]}
            {data.numbers[0]}
          </strong>
          .
        </p>
      </>
    )
  },
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    `${data.numbers[5]}${data.numbers[3]}${data.numbers[6]}${data.numbers[0]}`,
  ]),
}
