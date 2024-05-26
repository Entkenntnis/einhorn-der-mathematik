import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

interface DATA {
  missing: number
  shuffled: number[]
}

export const story14: StoryData<DATA> = {
  title: 'Bingo',
  x: 580,
  y: 230,
  deps: [27, 32],
  generator: () => {
    return { missing: 14, shuffled: [123] }
  },
  render: () => (
    <>
      <p>
        Bevor wir Bingo spielen, müssen wir zuerst in ein Quadrat unsere Zahlen
        von 1 bis 16 eintragen. Teo geht dabei nicht systematisch vor und
        verliert den Überblick. Ich soll ihm helfen, die letzte Zahl
        einzutragen.
      </p>
      <img src="story14.png" alt="Tabelle mit Zahlen" />
      <p>Welche Zahl muss in das letzte Feld?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Mein Lösungsweg: Ich gehe im Kopf einmal alle Zahlen von 1 bis 16 durch.
        Für jede Zahl schaue ich, ob sie schon da ist - das dauert zwar einen
        Moment, aber diese Zeit diese Geduld muss ich haben, damit der Plan
        funktioniert.
      </p>
      <p>
        Wenn ich die Zahl finde, gehe ich zur nächsten Zahl. Wenn nicht, dann
        habe ich Ergebnis gefunden. In diesem Fall die Zahl <strong>14</strong>.
      </p>
      <img src="story14_sol.png" alt="Tabelle mit Zahlen" />
      <p>
        Ich kann gut verstehen, wenn jemand unter Zeitdruck oder Stress nicht
        die Geduld hat, einen solchen systematischen Weg zu gehen. Das ist aber
        eine Kunst, die man mit der Zeit lernen kann. Und nicht immer muss es
        dabei um komplizierte Mathematik gehen.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('14'),
}
