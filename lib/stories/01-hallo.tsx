import { genericSubmitHandler } from '../data'
import { StoryData } from '../types'

export const story1: StoryData = {
  title: 'Start',
  x: 100,
  y: 100,
  deps: [],
  render: ({ core, mut }) => {
    if (!core.playerData.name && core.modal != 'name' && !core.analyze) {
      mut((c) => {
        c.modal = 'name'
      })
    }
    const nameIsAlphabetical = /^[a-zA-ZäöüÄÜÖß()]+$/.test(core.playerData.name)
    return (
      <>
        <p>
          Hallo
          {core.playerData.name ? <strong> {core.playerData.name}</strong> : ''}
          ! Schön, dass du hier bist :)
        </p>
        <p>
          Und hat dir schon jemand gesagt, dass du wunderbare ✨Augen✨ hast?
          Love them.
        </p>
        <p>
          Mein Name ist Tina und ich bin eine Einhorn-Dame. Okay, ich bin erst
          13 Jahre alt, aber ich fühle mich schon richtig erwachsen. Im
          Gegensatz zu meinem putzigen Bruder Teo, er ist erst 7 Jahre alt.
        </p>
        <p>
          Das Leben ist nicht easy als Einhorn in unserer Gesellschaft. Es gibt
          nicht viele von uns und wir werden manchmal komisch angeschaut 😢
        </p>
        <p>
          Aber darum soll es hier nicht gehen. Ich denke mir gerne kleine
          Mathe-Rätsel aus. Ich hoffe, diese machen dir genauso viel Spaß wie
          mir!
        </p>
        <p>
          Das erste Rätsel: Wie viele{' '}
          {nameIsAlphabetical ? 'Buchstaben' : 'Zeichen'} hat dein Name?
        </p>
      </>
    )
  },
  proof: () => (
    <>
      <p>
        <strong>Hallöööchen!</strong> Ich bin Tea, Tina&apos;s Einhorn-Tante.
        Ich studiere Mathematik an der Akademie und freue mich sehr, dass sich
        Tina für Mathematik begeistert.
      </p>
      <p>
        Tina hat mir erlaubt, dass ich nach jeder Aufgabe ein paar Zusatz-Infos
        geben darf - für alle, die gerne ein wenig über den Tellerrand
        hinausschauen wollen. Ach, es gibt wenig schönere Dinge als einen
        eleganten mathematischen Beweis 🥰
      </p>
      <p>Bis gleich bei der nächsten Aufgabe :)</p>
    </>
  ),
  submit: ({ value, mut, id, core }) => {
    genericSubmitHandler(
      value,
      parseInt(value) == countCodePoints(core.playerData.name),
      mut,
      id,
      core
    )
  },
}

function countCodePoints(str: string) {
  let c = 0
  for (const v of str) {
    c++
  }
  return c
}
