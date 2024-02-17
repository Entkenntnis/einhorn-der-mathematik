import { StoryData, ignoreCaseSolution } from '../data'

export const story11: StoryData = {
  title: 'Melonen',
  x: 930,
  y: 200,
  deps: [16],
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
  submit: ignoreCaseSolution('500', ['500kg']),
}
