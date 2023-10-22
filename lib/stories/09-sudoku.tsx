import { StoryData, ignoreCaseSolution } from '../data'

export const story9: StoryData = {
  title: 'Sudoku',
  x: 460,
  y: 280,
  deps: [10, 13],
  render: () => (
    <>
      <p>
        Ich löse manchmal Sudoku, wenn mir langweilig ist. Heute schaut mir Teo
        zu und er fragt mich natürlich, was die Regeln sind.
      </p>
      <p>
        Ich weiß nicht, wie viel Chancen ich habe, einem 7-jährigen Sudoku zu
        erklären 😅. Ich versuche es aber (in jede Reihe, Spalte und 3x3-Feld
        muss jeder Ziffer von 1 bis 9 genau einmal vorkommen). Und am Ende
        konnte er das markierte Feld ausfüllen.
      </p>
      <img src="story9.png" alt="ein Sudoku" />
      <p>Welche Zahl kommt in das Feld?</p>
    </>
  ),
  submit: ignoreCaseSolution('3'),
}
