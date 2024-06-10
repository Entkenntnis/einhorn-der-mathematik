import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { randomIntBetween } from '../helper/random-int-between'
import { StoryData } from '../types'

interface DATA {
  v_m: number
  v_r: number
}

export const story44: StoryData = {
  title: 'Eisenbahn',
  x: 760,
  y: 421,
  deps: [15, 20],
  generator: () => {
    let v_m = randomIntBetween(65, 77)
    if (v_m === 69) {
      v_m += 1
    }
    const v_r = Math.round((v_m / 100) * 87 * 3.6)
    return { v_m, v_r }
  },
  render: ({ data }) => (
    <>
      <p>
        Wir sind heute bei unserem Onkel zu besuchen. Das ist immer was
        Besonderes, weil er im Keller eine große Modell-Eisenbahn-Landschaft
        hat. Die Züge sind viel kleiner als die Wirklichkeit. Er erklärt uns
        stolz: &quot;Meine Züge sind im Maßstab 1:87, d.h. sie sind um 87-fach
        kleiner als die Wirklichkeit.&quot;
      </p>
      <img
        src="/story44.jpg"
        alt="BR 103 Modelleisenbahn"
        className="w-[300px]"
      />
      <p className="!-mt-6">
        <small>
          <a
            href="https://commons.wikimedia.org/wiki/File:BR_103_TEE-Lackierung_%26_orientrot.jpg"
            target="_blank"
            className="!text-gray-400 underline"
          >
            Bildquelle
          </a>
        </small>
      </p>
      <p>
        Wir lassen die Züge fahren und sie sind echt schnell. In einer Sekunde
        schafft der Zug eine Strecke von {data.v_m}&nbsp;cm. Wie viel km/h
        entspricht das in der Wirklichkeit? Runde dein Ergebnis auf eine ganze
        Zahl.
      </p>
      <p>
        <small className="text-gray-700">
          Mit dem Faktor 3,6 kommst du von m/s auf km/h.
        </small>
      </p>
    </>
  ),
  proof: ({ data }) => {
    return (
      <>
        <p>
          Meine Physik-Kenntnisse sind etwas eingerostet. Das Umrechnen der
          Einheiten hat daher etwas gedauert.
        </p>
        <p>
          Zuerst habe ich die cm/s in m/s umgerechnet, dazu teile ich durch 100.
          Die Züge fahren mit 0,{data.v_m}&nbsp;m/s. Als nächstes berücksichtige
          ich den Maßstab und multipliziere mit 87. Die Züge würden in der
          Realität mit{' '}
          {(Math.round(data.v_m * 87) / 100).toLocaleString('de-De')}&nbsp;m/s
          fahren.
        </p>
        <p>
          Als letztes multipliziere ich mit 3,6 und komme gerundet auf{' '}
          <strong>{data.v_r}&nbsp;km/h.</strong>
        </p>
        <p>
          Der Umrechnungsfaktor 3,6 ergibt sich daraus, dass eine Stunde 3600
          Sekunden und ein Kilometer 1000 Meter hat. Wenn man alle Variablen auf
          die richtigen Seiten stellt, bleibt der Faktor 3600/1000 = 3,6 stehen.
        </p>
      </>
    )
  },
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => [
    `${data.v_r}`,
    `${data.v_r}kmh`,
    `${data.v_r}km/h`,
  ]),
}
