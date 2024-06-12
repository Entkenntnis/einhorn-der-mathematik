import { useState } from 'react'
import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'
import { ChoiceInput } from '../../components/ChoiceInput'

export const story23: StoryData = {
  title: 'Geschenk',
  x: 191,
  y: 320,
  deps: [7, 39],
  render: ({ onSubmit, feedback }) => (
    <>
      <p>
        Ich versuche die Verpackung so wenig zu beschädigen wie möglich, wenn
        ich ein Geschenk auspacke. Es macht Spaß sich zu überlegen, in welchen
        Schritte die Person beim Einpacken vorgegangen ist.
      </p>

      <p>
        Teo hat mir zu Weihnachten dieses Paket geschenkt mit vier farbigen
        Bändern (er hat sich wirklich Mühe gegeben). Daher versuche ich auch,
        die Bänder nicht kaputt zu machen.
      </p>

      <img src="story23.jpg" alt="Geschenk umwickelt mit Bändern" width={350} />
      <p>
        In welcher Reihenfolge muss ich das machen? Wähle die passenden
        Antworten.
      </p>
      <ChoiceInput
        onSubmit={onSubmit}
        feedback={feedback}
        choices={[
          'das blaue Band',
          'das violette Band',
          'das rote Band',
          'das grüne Band',
        ]}
        getShort={(i) => 'BVRG'.charAt(i)}
        renderContent={(renderSelect) => (
          <>
            <p>Entferne zuerst {renderSelect(0)},</p>
            <p>dann {renderSelect(1)},</p>
            <p>dann {renderSelect(2)},</p>
            <p>und als letztes {renderSelect(3)}.</p>
          </>
        )}
      />
    </>
  ),
  proof: () => {
    return (
      <>
        <img
          src="story23.jpg"
          alt="Geschenk umwickelt mit Bändern"
          width={350}
        />
        <p>
          Bei dieser Aufgabe braucht es einen scharfen Blick und bisschen
          Vorstellungskraft. Das rote Band muss als erstes entfernt werden, weil
          es von keinem anderen Band gekreuzt wird. Jetzt kann man die zwei
          Kreuzungen des roten Bandes ignorieren. Hier ein Bild, falls es dir
          schwerfällt, das vorzustellen:
        </p>
        <img
          src="story23_sol.jpg"
          alt="Geschenk umwickelt mit Bändern"
          width={350}
        />
        <p>
          Als nächstes liegt das grüne Band offen, dann das blaue Band und am
          Ende das violette Band.
        </p>
        <p>
          Bei der Aufgabe ist es so, dass die Reihenfolge eindeutig ist. Das
          muss nicht immer so sein. Es kann durchaus passieren, dass die Bände
          so liegen, dass es gar kein Reihenfolge gibt - oder mehrere mögliche
          Reihenfolgen.
        </p>
      </>
    )
  },
  hideSubmit: true,
  submit: ignoreCaseSolution('R G B V'),
}
