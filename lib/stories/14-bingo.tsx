import { StoryData, ignoreCaseSolution } from '../data'

export const story14: StoryData = {
  title: 'Bingo',
  x: 700,
  y: 200,
  deps: [23, 31],
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
  submit: ignoreCaseSolution('14'),
}
