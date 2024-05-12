import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story4: StoryData = {
  title: 'Telepathie',
  x: 667,
  y: 744,
  deps: [9, 17],
  render: () => (
    <>
      <p>
        Leider kann ich nicht Gedanken lesen. Aber mit bisschen Mathematik kann
        ich so tun, als ob ich das kann!
      </p>
      <p>
        Ich sage Teo, dass er sich eine Zahl ausdenken soll. Diese Zahl soll er
        halbieren, davon 11 abziehen und dann das Ergebnis mit 5 multiplizieren.
        Nach viel Nachdenken kommt er auf die Antwort <strong>50</strong>.
      </p>
      <p>Welche Zahl hat Teo sich ausgedacht?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Haha, ist ja klar, dass Tina die Antwort auf fast alles als Zahl
        genommen hat! Um rechnerisch auf dieses Ergebnis zu kommen, würde ich so
        vorgehen:
      </p>
      <p>
        Im letzten Schritt hat Teo mit 5 multpliziert und erhält 50. Ich drehe
        das um und rechne 50 : 5 = 10.
      </p>
      <p>
        Im zweiten Schritt hat Teo 11 abgezogen, ich addiere also 11, d.h. 10 +
        11 = 21.
      </p>
      <p>
        Im ersten Schritt hat Teo die Zahl halbiert, jetzt muss ich die 21
        verdoppeln und erhalte das Ergebnis <strong>42</strong>.
      </p>
      <p>
        Wer das gerne systematisch macht stellt die Gleichung (x : 2 - 11) · 5 =
        50 auf und löst sie nach x.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('42'),
}
