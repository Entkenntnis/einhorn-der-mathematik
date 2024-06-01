import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { StoryData } from '../types'

interface DATA {
  tina: number
  teo: number
}

export const story28: StoryData<DATA> = {
  title: 'Taschengeld',
  x: 74,
  y: 586,
  deps: [41],
  generator: () => {
    const teo = randomIntBetween(5, 15)
    return {
      tina: teo + randomIntBetween(2, 10),
      teo,
    }
  },
  render: ({ data }) => {
    return (
      <>
        <p>
          Ich und Teo bekommen pro Monat zusammen {data.tina + data.teo}€
          Taschengeld. Meine Eltern wollen uns damit nicht
          &quot;verwöhnen&quot;, wir sollen bitte selbst kreativ werden und uns
          was zu arbeiten suchen, wenn wir mehr Geld brauchen. Anstrengend 😤
        </p>

        <p>
          Immerhin habe ich mit Teo ausmachen können, dass ich{' '}
          {data.tina - data.teo}€ mehr bekomme als er. Das ist trotzdem recht
          wenig, aber damit muss ich halt klar kommen.
        </p>

        <p>Wie viel Euro Taschengeld bekomme ich im Monat?</p>
      </>
    )
  },
  proof: ({ data }) => {
    return (
      <>
        <p>
          Von den {data.tina + data.teo}€ weißt du, dass Tina davon{' '}
          {data.tina - data.teo}€ bekommt. Die restlichen {data.teo * 2}€ werden
          gleichmäßig auf Tina und Teo aufgeteilt, also für beide je {data.teo}
          €. Damit bekommt Tina <strong>{data.tina}€ im Monat</strong>, Teo
          bekommt {data.teo}€ im Monat. Die Probe geht auf.
        </p>
        <p>
          Man könnte hier auch die Gleichung x + (x - {data.tina - data.teo}) ={' '}
          {data.tina + data.teo} aufstellen und das formal lösen. Wenn dir
          dieser Weg leichter fällt, ist das sehr legit. Aber manchmal gefällt
          es mir auch, mal nicht mit Formeln zu arbeiten.
        </p>
      </>
    )
  },
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    `${data.tina}`,
    `${data.tina}€`,
    `${data.tina}euro`,
  ]),
}
