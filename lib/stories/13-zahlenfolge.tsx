import { StoryData, ignoreCaseSolution } from '../data'

export const story13: StoryData = {
  title: 'Zahlenfolge',
  x: 390,
  y: 620,
  deps: [2, 3, 35],
  render: () => (
    <>
      <p>
        Mein Vater hat mich gebeten, mit Teo für seinen nächsten Mathe-Test zu
        üben. Ein Thema darin sind Zahlenfolgen.
      </p>
      <p>
        Aber das sind keine interessanten Folgen, sondern nur langweilige wie 2,
        4, 6, 8, ... oder 11, 22, 33, ... Mein Vater hat mir verboten, ihm zu
        schwere Aufgaben zu stellen.
      </p>
      <p>
        Ich kann es natürlich nicht verkneifen, am Ende doch folgende Aufgabe zu
        stellen:
      </p>
      <img src="story13.png" alt="1, 1, 2, 3, 5, ?" width={350} />
      <p>
        Teo kommen die Tränen, als er die Folge nicht lösen kann. Mein Vater
        schaut prüfend zu mir und ich wische die Folge schnell weg. Wie lautet
        die nächste Zahl der Folge?
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Das hier ist die berühmte Fibonacci-Folge. Sie ist das Ergebnis davon,
        wenn Mathematiker sich mit praktischen Dinge wie die Fortpflanzung von
        Kaninchen befassen. Alles schön abstrakt und sauber :) vielleicht für
        manche auch etwas langweilig.
      </p>
      <p>
        Die Regel für die Folge ist denkbar einfach. Nimm die letzten zwei
        Zahlen und addiere sie.
      </p>
      <img src="story13_sol.png" alt="1, 1, 2, 3, 5, ?" width={350} />
      <p>
        1 + 1 = 2, 2 + 3 = 5 und schließlich 3 + 5 = <strong>8</strong>.
      </p>
      <p>
        Was die Zahlenfolge aber mit der Kaninchen-Population gemeinsam hat: Sie
        wächst sehr schnell. Die 20. Fibonacci-Zahl lautet 6765, die 100.
        Fibonacci-Zahl dann schon 354224848179261915075.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('8'),
}
