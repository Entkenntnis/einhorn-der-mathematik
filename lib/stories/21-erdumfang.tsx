import { StoryData, ignoreCaseSolution } from '../data'

export const story21: StoryData = {
  title: 'Erdumfang',
  x: 1100,
  y: 200,
  deps: [],
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
  submit: ignoreCaseSolution('32'),
}
