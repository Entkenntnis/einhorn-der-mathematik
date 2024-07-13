import { naturalNumberSolution } from '../data'
import { randomItemFromArray } from '../helper/random-item-from-array'
import { shuffleArray } from '../helper/shuffle-array'
import { StoryData } from '../types'

interface DATA {
  a: number
  b: number
  c: number
}

export const story54: StoryData<DATA> = {
  title: 'Süßigkeiten',
  x: 1130,
  y: 900,
  deps: [36],
  generator: () => {
    const [a, b, c] = shuffleArray([1, 2, 3])
    return { a, b, c }
  },
  render: ({ data }) => (
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
        Er öffnet die Packung, nimmt sich die Hälfte plus {data.a} und geht
        weiter. Ein zweiter Kumpel kommt und nimmt sich auch die Hälfte plus{' '}
        {data.b}. Ich schaue den beiden mit einem Kopfschütteln hinterher.
      </p>
      <p>
        Meine Freundin darf als nächstes, sie nimmt sich aus der Packung die
        Hälfte plus {data.c}. Am Ende bleiben mir noch 3 Glühwürmchen übrig.
        Besser als nichts, würde ich sagen.
      </p>
      <p>Wie viele Glühwürmchen waren am Anfang in der Packung?</p>
    </>
  ),
  proof: ({ data }) => {
    const preF = (3 + data.c) * 2
    const preK2 = (preF + data.b) * 2
    const preK1 = (preK2 + data.a) * 2
    return (
      <>
        <p>
          Das ist eine typische Situation, wo ich wieder systematisch rückwärts
          rechne.
        </p>
        <p>
          Bevor die Freundin sich an der Packung bedient, waren es (3 + {data.c}
          ) · 2 = {preF} Glühwürmchen in der Packung.
        </p>
        <p>
          Bevor der zweite Kumpel sich an der Packung bedient, waren es ({preF}{' '}
          + {data.b}) · 2 = {preK2} Glühwürmchen in der Packung.
        </p>
        <p>
          Bevor der erste Kumpel sich an der Packung bedient, waren es ({preK2}{' '}
          + {data.a}) · 2 = <strong>{preK1}</strong> Glühwürmchen in der
          Packung.
        </p>
        <p>
          Die Rechnungen sind nicht schwer. Man muss aber präzise arbeiten, um
          das das richtige Ergebnis zu erhalten.
        </p>
      </>
    )
  },
  submit: ({ data }) =>
    naturalNumberSolution((((3 + data.c) * 2 + data.b) * 2 + data.a) * 2, 5),
}
