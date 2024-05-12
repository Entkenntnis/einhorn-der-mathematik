import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story21: StoryData = {
  title: 'Erdumfang',
  x: 920,
  y: 880,
  deps: [36],
  render: () => (
    <>
      <p>
        Es passiert selten, dass ich im Mathematik-Unterricht der Schule eine
        Überraschung erlebe. Doch das ist heute passiert. Wir haben gerade
        gelernt, dass der Umfang U aus dem Radius r mit der Formal 2∙π∙r
        berechnet werden kann. Dann kam diese Aufgabe. Die Antwort hat mich sehr
        verblüfft.
      </p>
      <p>
        Nehmen wir an, der Äquator sei ein perfekter Kreisring mit Radius
        6370km. Um den Äquator ist ein Seil gespannt, dass genau passend
        anliegt. Ich verlängere das Seil um 2 Meter und hebe es gleichmäßig
        hoch.
      </p>
      <p>
        Um wie viele Zentimeter hebt sich das Seil? Runde auf ganze Zentimeter.
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Das Seil ist 2 ∙ π ∙ 6370km lang, das entspricht 40023,89041km oder
        40023890,41m.
      </p>
      <p>
        Verlängere das Seil um 2 Meter. Berechne daraus den neuen Radius:
        40023892,41m : (2π) = 6370000,318m. Der neue Radius ist um{' '}
        <strong>32cm</strong> größer als der alte Radius. Es ist für einen
        Menschen möglich, unter dem Seil durchzukriechen.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('32'),
}
