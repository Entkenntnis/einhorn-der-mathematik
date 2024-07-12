import { ignoreCaseSolution, naturalNumberSolution } from '../data'
import { StoryData } from '../types'

export const story54: StoryData = {
  title: 'Süßigkeiten',
  x: 1130,
  y: 900,
  deps: [36],
  render: () => (
    <>
      <p>
        Ich sage dir: Passe auf, wenn du Süßigkeiten in die Schule mitnimmst.
        Die sind schneller weg als du sie zählen kannst.
      </p>
      <p>
        So spaziere ich am Montag mit einer vollen Packung saurer Glühwürmchen
        in die Aula. Mein erster Kumpel sieht die Packung und fragt, ob er für
        sich und seine Freunde welche mitnehmen kann. Ich stimme zu.
      </p>
      <p>
        Er öffnet die Packung, nimmt sich die Hälfte plus eins und geht weiter.
        Ein zweiter Kumpel kommt und nimmt sich auch die Hälfte plus eins. Ich
        schaue den beiden mit einem Kopfschütteln hinterher.
      </p>
      <p>
        Meine Freundin darf als nächstes, sie nimmt sich aus der Packung die
        Hälfte plus zwei. Am Ende bleiben mir noch 3 Glühwürmchen übrig. Besser
        als nichts, würde ich sagen.
      </p>
      <p>Wie viele Glühwürmchen waren am Anfang in der Packung?</p>
    </>
  ),
  submit: () => naturalNumberSolution(46, 5),
}
