import { StoryData, ignoreCaseSolution } from '../data'

export const story5: StoryData = {
  title: 'Figur',
  x: 490,
  y: 71,
  deps: [15],
  render: () => (
    <>
      <p>
        Teo mag zeichnen! Wir spielen oft ein Spiel, bei dem er mir ein Bild mit
        Worten beschreibt und ich versuche es nachzuzeichnen.
      </p>
      <p>Heute beschreibe ich. Ich gebe ihm diesen Hinweis:</p>
      <p className="pl-4 border-l-4 border-l-pink-600">
        Ein unsichtbarer Punkt regiert unendlich viele sichtbare Punkte. Doch
        der unsichtbare Punkt ist ganz alleine, von allen anderen Punkten gleich
        weit entfernt.
      </p>
      <p>Wie heißt diese Figur?</p>
    </>
  ),
  submit: ignoreCaseSolution('kreis'),
}
