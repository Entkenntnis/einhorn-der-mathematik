import { Draft } from 'immer'
import { State } from '../components/App'
import { InputBox } from '../components/InputBox'

interface StoryData {
  title: string
  x: number
  y: number
  deps: number[]
  render: () => JSX.Element
  submit: (props: {
    value: string
    mut: (fn: (draft: Draft<State>) => void) => void
    id: number
    core: State
  }) => void
}

export const storyData: { [key: number]: StoryData } = {
  1: {
    title: 'Hallo!',
    x: 100,
    y: 100,
    deps: [],
    render: () => (
      <>
        <p>Herzlich Willkommen! Schön, dass du hier bist :)</p>
        <p>
          Und hat dir schon jemand gesagt, dass du heute wunderbare Augen hast?
          Love them.
        </p>
        <p>
          Mein Name ist Tina und ich bin eine Einhorn-Dame. Okay, ich bin erst
          13 Jahre alt, aber ich fühle mich schon richtig erwachsen. Im
          Gegensatz zu meinem putzigen Bruder Teo, er ist erst 7 Jahre alt.
        </p>
        <p>
          Das Leben ist nicht easy als Einhorn in unserer Gesellschaft. Es gibt
          nicht viele von uns und wir haben doch manchmal ... andere
          Bedürfnisse.
        </p>
        <p>
          Und manchmal fühle ich mich auch etwas alleine - aber in solchen
          Momenten versuche ich mich abzulenken, zum Beispiel durch das
          Ausdenken von kleinen Mathe-Rätseln. Ich hoffe, diese machen dir
          genauso viel Spaß wie mir.
        </p>
        <p>So viel zu mir. Nun, sage mir, wie darf ich dich nennen?</p>
      </>
    ),
    submit: ({ value, mut, id, core }) => {
      if (value) {
        if (core.name) {
          mut((c) => {
            c.storyFeedback = {
              correct: false,
              text: 'Du hast bereits einen Namen eingefügt.',
            }
          })
        } else {
          const trimmed = value.trim()
          if (trimmed) {
            mut((c) => {
              c.storyFeedback = {
                correct: true,
                text: `Dein Name "${trimmed}" wurde gespeichert.`,
              }
              c.solved.add(id)
              c.name = trimmed
            })
          }
        }
      }
    },
  },
  2: {
    title: 'Würfel',
    x: 250,
    y: 70,
    deps: [1],
    render: () => (
      <>
        <p>
          Die Summe der Augenzahlen auf einem Würfel muss auf gegenüberliegenden
          Seiten immer 7 betragen. Das weißt du bestimmt schon.
        </p>
        <p>
          Mein Bruder Teo weiß das noch nicht. Er hat heute in der Schule eine
          handvoll Würfel gebastelt und auf dem ersten Blick sehe ich schon,
          dass einige falsch sind.
        </p>
        <img src="/story2.jpg" alt="5 Würfel" />
        <p>
          Das sage ich ihm natürlich nicht, sondern lobe ihn für seine Mühe :)
          Aber mir kannst du das sagen: Welche Würfel sind sicherlich falsch?
          Gib die entsprechenden Buchstaben als Antwort ein, z.B.{' '}
          <code>a b c</code>.
        </p>
      </>
    ),
    submit: ({ value, mut, id }) => {
      const letters = new Set(
        value
          .toLowerCase()
          .split('')
          .map((x) => x.trim())
          .filter(Boolean)
      )
      const isCorrect =
        letters.size == 3 &&
        letters.has('a') &&
        letters.has('d') &&
        letters.has('e')

      genericSubmitHandler(value, isCorrect, mut, id)
    },
  },
  3: {
    title: 'Uhrzeit',
    x: 180,
    y: 220,
    deps: [1],
    render: () => (
      <>
        <p>
          &quot;22 Uhr, 23 Uhr, 24 Uhr, 25 Uhr ... &quot;, so murmelt Teo vor
          sich hin.
        </p>
        <p>
          Als verantwortungsvoll Schwester korrigiere ich ihn: &quot;Hey Teo, es
          gibt kein 25 Uhr. Das ist dann wieder 1 Uhr&quot;
        </p>
        <p>
          Aber natürlich ignoriert er mich. Und er macht vergnügt weiter, jetzt
          extra um mich zu ärgern:
        </p>
        <p>&quot;26 Uhr, 27 Uhr, 28 Uhr, 29 Uhr ... &quot;</p>
        <p>
          Nach einer Weile ist er bei 100 Uhr angekommen. Da interessiert es
          mich schon: Welcher echten Uhrzeit entspricht das? Schreibe die
          Antwort als Zahl, z.b. <code>10</code>.
        </p>
      </>
    ),
    submit: ignoreCaseSolution('4'),
  },
}

function genericSubmitHandler(
  value: string,
  isCorrect: boolean,
  mut: (fn: (draft: Draft<State>) => void) => void,
  id: number
) {
  if (isCorrect) {
    mut((c) => {
      c.storyFeedback = {
        correct: true,
        text: `"${value}" ist richtig`,
      }
      c.solved.add(id)
    })
  } else {
    mut((c) => {
      c.storyFeedback = {
        correct: false,
        text: `"${value}" ist falsch`,
      }
    })
  }
}

function ignoreCaseSolution(answer: string) {
  return (props: Parameters<StoryData['submit']>[0]) => {
    const value = props.value.trim().toLowerCase()
    const isCorrect = answer.toLowerCase().trim() == value
    genericSubmitHandler(value, isCorrect, props.mut, props.id)
  }
}
