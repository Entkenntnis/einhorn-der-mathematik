import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story5: StoryData = {
  title: 'Figur',
  x: 160,
  y: 740,
  deps: [28, 35],
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
  proof: () => (
    <>
      <p>
        Da hat sich Tina wieder eine ganz poetische Beschreibung ausgedacht!
      </p>
      <img src="/story5_sol.png" alt="Kreis" />
      <p>
        Sie hat dabei die wichtigste Eigenschaft des Kreises umschrieben: Alle
        Punkte auf der Kreislinie haben vom Mittelpunkt den Abstand r (=
        Radius). Man könnte den Mittelpunkt wie Tina auch als Königin über die
        Kreislinie sehen. Sie ist ganz alleine - aber ich finde, sie ist von
        vielen Punkten umgeben und darf sich auch glücklich schätzen, im Zentrum
        zu stehen.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('kreis'),
}
