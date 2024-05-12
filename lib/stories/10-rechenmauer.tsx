import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { StoryData } from '../types'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export const story10: StoryData = {
  title: 'Rechenmauer',
  x: 360,
  y: 320,
  deps: [7],
  generator: () => {
    const data: DATA = {
      a: randomIntBetween(2, 8),
      b: randomIntBetween(2, 8),
      c: randomIntBetween(2, 8),
      d: randomIntBetween(2, 8),
    }
    return data
  },
  render: ({ genData }) => {
    const data = genData as DATA
    return (
      <>
        <p>Teo ist putzig, genauso wie seine Hausaufgaben.</p>
        <p>
          Heute gibt es eine Rechenmauer. Dabei addiert man immer die zwei
          Zahlen unterhalb eines Felds. Das macht auch seiner großen Schwester
          Spaß!
        </p>
        <div className="mt-6 text-3xl ">
          <div className="flex flex-row ml-[72px]">
            <div className="border-2 border-black border-b-0 w-12 h-12 text-center pt-1"></div>
          </div>
          <div className="flex flex-row ml-12">
            <div className="border-2 border-black border-b-0 w-12 h-12 text-center pt-1 text-violet-700">
              {data.a + 2 * data.b + data.c}
            </div>
            <div className="border-2 border-black border-b-0 border-l-0 w-12 h-12 text-center pt-1"></div>
          </div>
          <div className="flex flex-row ml-6">
            <div className="border-2 border-black border-b-0 w-12 h-12 text-center pt-1 text-violet-700">
              {data.a + data.b}
            </div>
            <div className="border-2 border-black border-b-0 border-l-0 w-12 h-12 text-center pt-1 text-violet-700">
              {data.b + data.c}
            </div>
            <div className="border-2 border-black border-b-0 border-l-0 w-12 h-12 text-center pt-1"></div>
          </div>
          <div className="flex flex-row">
            <div className="border-2 border-black w-12 h-12 text-center pt-1">
              {data.a}
            </div>
            <div className="border-2 border-black border-l-0 w-12 h-12 text-center pt-1">
              {data.b}
            </div>
            <div className="border-2 border-black border-l-0 w-12 h-12 text-center pt-1">
              {data.c}
            </div>
            <div className="border-2 border-black border-l-0 w-12 h-12 text-center pt-1">
              {data.d}
            </div>
          </div>
        </div>
        <p>Welche Zahl steht im obersten Feld?</p>
      </>
    )
  },
  proof: ({ genData }) => {
    const data = genData as DATA
    return (
      <>
        <p>So sieht die ausgefüllte Mauer aus:</p>

        <div className="mt-6 text-3xl ">
          <div className="flex flex-row ml-[72px]">
            <div className="border-2 border-black border-b-0 w-12 h-12 text-center pt-1 text-green-500">
              {data.a + 3 * data.b + 3 * data.c + data.d}
            </div>
          </div>
          <div className="flex flex-row ml-12">
            <div className="border-2 border-black border-b-0 w-12 h-12 text-center pt-1 text-violet-700">
              {data.a + 2 * data.b + data.c}
            </div>
            <div className="border-2 border-black border-b-0 border-l-0 w-12 h-12 text-center pt-1 text-green-500">
              {data.b + 2 * data.c + data.d}
            </div>
          </div>
          <div className="flex flex-row ml-6">
            <div className="border-2 border-black border-b-0 w-12 h-12 text-center pt-1 text-violet-700">
              {data.a + data.b}
            </div>
            <div className="border-2 border-black border-b-0 border-l-0 w-12 h-12 text-center pt-1 text-violet-700">
              {data.b + data.c}
            </div>
            <div className="border-2 border-black border-b-0 border-l-0 w-12 h-12 text-center pt-1 text-green-500">
              {data.c + data.d}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="border-2 border-black w-12 h-12 text-center pt-1">
              {data.a}
            </div>
            <div className="border-2 border-black border-l-0 w-12 h-12 text-center pt-1">
              {data.b}
            </div>
            <div className="border-2 border-black border-l-0 w-12 h-12 text-center pt-1">
              {data.c}
            </div>
            <div className="border-2 border-black border-l-0 w-12 h-12 text-center pt-1">
              {data.d}
            </div>
          </div>
        </div>
        <p>
          Die oberste Zahl lautet{' '}
          <strong>{data.a + 3 * data.b + 3 * data.c + data.d}</strong>.
        </p>
        <p>
          In der Grundschule nutzt man die Rechenmauer gerne, weil man nur vier
          Zahlen angeben muss, um sechs Rechnungen abzufragen. Sehr effizient.
        </p>
      </>
    )
  },
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    `${data.a + 3 * data.b + 3 * data.c + data.d}`,
  ]),
}
