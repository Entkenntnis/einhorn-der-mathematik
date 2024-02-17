import { StoryData, ignoreCaseSolution } from '../data'

export const story13: StoryData = {
  title: 'Zahlenfolge',
  x: 390,
  y: 600,
  deps: [],
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
      <img src="story13.png" alt="1, 1, 2, 3, 5, ?" />
      <p>
        Teo kommen die Tränen, als er die Folge nicht lösen kann. Mein Vater
        schaut prüfend zu mir und ich wische die Folge schnell weg. Wie lautet
        die nächste Zahl der Folge?
      </p>
    </>
  ),
  submit: ignoreCaseSolution('8'),
}
