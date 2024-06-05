import { PlaceValueChart } from '../../components/math-skills/implementations/place-value-chart'
import { ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { StoryData } from '../types'

interface DATA {
  n: number
  h: number
  z: number
  e: number
}

export const story43: StoryData<DATA> = {
  title: 'Stellenwerte',
  x: 810,
  y: 321,
  deps: [20, 42],
  generator: () => {
    const h = randomItemFromArray([6, 7, 8, 9])
    const z = randomItemFromArray([6, 7, 8, 9])
    const e = randomItemFromArray([6, 7, 8, 9])
    const n = h * 100 + z * 10 + e

    return { n, h, z, e }
  },
  render: ({ data }) => (
    <>
      <p>
        Die Schule von Teo macht einen Tag der offenen Tür. Aus Höflichkeit
        komme ich mit und schaue mir die Ausstellungen der GrundschülerInnen an.
      </p>
      <p>
        Es ist eine wundersame Reise zurück in die Kindheit. An einem Stand
        werden verschiedene Materialien aus dem Mathe-Unterricht vorgestellt,
        darunter auch eine Tafel mit bunten Plättchen:
      </p>
      <PlaceValueChart value={data.n} />
      <p>
        Eine solche Tafel habe ich schon lange nicht mehr gesehen. Welche Zahl
        ist hier dargestellt?
      </p>
    </>
  ),
  proof: ({ data }) => (
    <>
      <p>
        Auch ich habe in der Grundschule mit der Stellenwerttafel das
        Dezimalsystem gelernt. H bedeutet Hunderter, Z bedeutet Zehner und E
        steht für Einer.
      </p>
      <p>
        Ich kann als nächstes die Anzahl der Plättchen zählen und die Zahl
        notieren:
      </p>
      <PlaceValueChart value={data.n} />
      <p>
        H = {data.h}, Z = {data.z}, E = {data.e} -&gt; <strong>{data.n}</strong>
      </p>
    </>
  ),
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [data.n.toString()]),
}
