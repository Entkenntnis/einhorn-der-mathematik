import { StoryData, genericSubmitHandler } from '../data'

export const story1: StoryData = {
  title: 'Hallo',
  x: 100,
  y: 100,
  deps: [],
  render: ({ core, mut }) => {
    if (!core.playerData.loggedIn && core.modal != 'name') {
      mut((c) => {
        c.modal = 'name'
      })
    }
    return (
      <>
        <p>
          Hallo
          {core.playerData.loggedIn ? (
            <strong> {core.playerData.name}</strong>
          ) : (
            ''
          )}
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
        <p>Dein erstes Rätsel: Wie viele Buchstaben hat dein Name?</p>
      </>
    )
  },
  submit: ({ value, mut, id, core }) => {
    genericSubmitHandler(
      value,
      parseInt(value) == core.playerData.name.length,
      mut,
      id,
      core
    )
  },
}
