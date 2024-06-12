import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { shuffleArray } from '../helper/shuffle-array'
import { StoryData } from '../types'

interface DATA {
  missing: number
  shuffled: number[]
}

export const story14: StoryData<DATA> = {
  title: 'Bingo',
  x: 580,
  y: 230,
  deps: [27, 48],
  generator: () => {
    const ns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const missing = randomItemFromArray(ns)
    const shuffled = shuffleArray(ns.filter((n) => n != missing))
    return { missing, shuffled }
  },
  render: ({ data }) => {
    return (
      <>
        <p>
          Bevor wir Bingo spielen, müssen wir zuerst in ein Quadrat unsere
          Zahlen von 1 bis 16 eintragen. Teo geht dabei nicht systematisch vor
          und verliert den Überblick. Ich helfe ihm, die letzte Zahl
          einzutragen.
        </p>
        <div className="text-2xl mt-6">
          <div className="flex flex-row">
            {renderCell(data.shuffled[0])}
            {renderCell(data.shuffled[1])}
            {renderCell(data.shuffled[2])}
            {renderCell(data.shuffled[3])}
          </div>
          <div className="flex flex-row">
            {renderCell(data.shuffled[4])}
            <div className="border-2 border-r-0 border-black border-b-0 w-12 h-12 text-center pt-1 last:border-r-2 bg-yellow-100">
              ?
            </div>
            {renderCell(data.shuffled[5])}
            {renderCell(data.shuffled[6])}
          </div>
          <div className="flex flex-row">
            {renderCell(data.shuffled[7])}
            {renderCell(data.shuffled[8])}
            {renderCell(data.shuffled[9])}
            {renderCell(data.shuffled[10])}
          </div>
          <div className="flex flex-row [&>div]:!border-b-2">
            {renderCell(data.shuffled[11])}
            {renderCell(data.shuffled[12])}
            {renderCell(data.shuffled[13])}
            {renderCell(data.shuffled[14])}
          </div>
        </div>
        <p>Welche Zahl muss in das letzte Feld?</p>
      </>
    )
  },
  proof: ({ data }) => (
    <>
      <p>
        Mein Lösungsweg: Ich gehe im Kopf einmal alle Zahlen von 1 bis 16 durch.
        Für jede Zahl schaue ich, ob sie schon da ist - das dauert zwar einen
        Moment, aber diese Zeit diese Geduld muss ich haben, damit der Plan
        funktioniert.
      </p>
      <p>
        Wenn ich die Zahl finde, gehe ich zur nächsten Zahl. Wenn nicht, dann
        habe ich Ergebnis gefunden. In diesem Fall die Zahl{' '}
        <strong>{data.missing}</strong>.
      </p>
      <div className="text-2xl mt-6">
        <div className="flex flex-row">
          {renderCell(data.shuffled[0])}
          {renderCell(data.shuffled[1])}
          {renderCell(data.shuffled[2])}
          {renderCell(data.shuffled[3])}
        </div>
        <div className="flex flex-row">
          {renderCell(data.shuffled[4])}
          <div className="border-2 border-r-0 border-black border-b-0 w-12 h-12 text-center pt-1 last:border-r-2 bg-yellow-100 text-pink-600 font-bold">
            {data.missing}
          </div>
          {renderCell(data.shuffled[5])}
          {renderCell(data.shuffled[6])}
        </div>
        <div className="flex flex-row">
          {renderCell(data.shuffled[7])}
          {renderCell(data.shuffled[8])}
          {renderCell(data.shuffled[9])}
          {renderCell(data.shuffled[10])}
        </div>
        <div className="flex flex-row [&>div]:!border-b-2">
          {renderCell(data.shuffled[11])}
          {renderCell(data.shuffled[12])}
          {renderCell(data.shuffled[13])}
          {renderCell(data.shuffled[14])}
        </div>
      </div>
      <p>
        Ich kann gut verstehen, wenn jemand unter Zeitdruck oder Stress nicht
        die Geduld hat, einen solchen systematischen Weg zu gehen. Das ist aber
        eine Kunst, die man mit der Zeit lernen kann. Und nicht immer muss es
        dabei um komplizierte Mathematik gehen.
      </p>
    </>
  ),
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    data.missing.toString(),
  ]),
}

function renderCell(val: number) {
  return (
    <div className="border-2 border-r-0 border-black border-b-0 w-12 h-12 text-center pt-1.5 last:border-r-2">
      {val}
    </div>
  )
}
