import { StoryData, ignoreCaseSolution } from '../data'

export const story25: StoryData = {
  title: 'Streichhölzer',
  x: 500,
  y: 550,
  deps: [3, 12],
  render: () => (
    <>
      <p>
        Von der Weihnachtszeit haben wir noch Streichholzer übrig. Damit spielt
        Teo gerne - ich soll aufpassen, dass er dabei nichts anzündet.
      </p>

      <p>
        Ich schnappe mir 7 Streichhölzer und fange an, damit Ziffern zu legen.
        Du siehst ein paar Beispiele im Bild.
      </p>

      <img src="story25.jpg" alt="Ziffern aus Streichhölzern gelegt" />

      <p>
        Welches ist die <strong>größte</strong> Zahl, die ich mit 7
        Streichhölzern legen kann?
      </p>
    </>
  ),
  submit: ignoreCaseSolution('711'),
}
