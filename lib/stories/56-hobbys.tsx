import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { StoryData } from '../types'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export const story56: StoryData<DATA> = {
  title: 'Hobbys',
  x: 1000,
  y: 920,
  deps: [36],
  generator: () => {
    return {
      a: randomIntBetween(8, 12),
      b: randomIntBetween(6, 11),
      c: randomIntBetween(2, 6),
      d: randomIntBetween(5, 10),
    }
  },
  render: ({ data }) => (
    <>
      <p>
        Ich lese und zeichne sehr gerne, aber viele wären anderer Meinung. Ich
        möchte herausfinden, was meine MitschülerInnen dazu sagen und mache eine
        Umfrage. Dabei komme ich zu diesem Ergebnis:
      </p>
      <ul className="my-3 list-disc pl-6">
        <li>{data.a} Personen lesen</li>
        <li>{data.b} Personen zeichnen</li>
        <li>{data.c} Personen lesen und zeichnen</li>
        <li>{data.d} Personen lesen nicht und zeichnen nicht</li>
      </ul>
      <p>
        Das Ergebnis macht mich ganz glücklich, ich bin also nicht alleine. Aber
        wie viele Personen habe ich eigentlich befragt? Die Gesamtzahl der
        befragten Personen ist die Antwort zu diesem Rätsel.
      </p>
    </>
  ),
  proof: ({ data }) => {
    return (
      <>
        <p>Ich zeichne ein Diagramm, um mir die Zahlen die veranschaulichen:</p>
        <img src="/story56.jpg" alt="Venn Diagramm" className="w-[450px]" />
        <p>
          {data.a} Personen lesen und {data.b} Personen zeichnen, das sind
          insgesamt {data.a + data.b} Personen. Aber ich zähle die Personen
          doppelt, die sowohl lesen als auch zeichen, deshalb muss ich die Zahl
          auf {data.a + data.b} - {data.c} = {data.a + data.b - data.c}{' '}
          korrigieren.
        </p>
        <p>
          Als letztes addiere ich die {data.d} Personen, die weder lesen noch
          zeichnen und erhalte das Ergebnis {data.a + data.b - data.c} +{' '}
          {data.d} = <strong>{data.a + data.b - data.c + data.d}</strong>.
        </p>
      </>
    )
  },
  submit: ({ data }) =>
    ignoreCaseSolutionWithGenData([`${data.a + data.b - data.c + data.d}`]),
}
