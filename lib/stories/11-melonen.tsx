import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story11: StoryData = {
  title: 'Melonen',
  x: 850,
  y: 1050,
  deps: [55, 56],
  render: () => (
    <>
      <p>
        Das ist eines meiner Lieblings-Matherätsel. Es ist leider etwas zu
        kompliziert für Teo. Man muss dafür ein wenig Nachdenken.
      </p>
      <p className="pl-4 border-l-4 border-l-pink-600">
        Wassermelonen enthalten 99% Wasser. Ein Melonen-Händler lagert an einem
        heißen Tag 1000kg Melonen. Am Ende des Tages ist der Wassergehalt der
        Melonen auf 98% gesunken.
      </p>
      <p>Wie viel Kilogramm Melonen hat der Händler am Ende des Tages?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Wenn 1000kg Wassermelonen zu 99% aus Wasser bestehen, bleiben noch 1% =
        10kg für Nicht-Wasser. Dieser Anteil verändert sich im Laufe des Tages
        nicht.
      </p>
      <p>
        Am Ende des Tages entsprechen diese 10kg = 2% der Melonen. Der Grundwert
        berechnet sich dann auf 500kg.
      </p>
      <p>
        Dem Händler bleiben am Ende des Tages nur noch <strong>500kg</strong>{' '}
        Melonen.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('500', ['500kg']),
}
