import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story7: StoryData = {
  title: 'Hufeisen',
  x: 190,
  y: 175,
  deps: [1],
  render: () => (
    <>
      <p>
        &quot;Eins, zwei, drei, ...&quot;, murmelt Teo. Er möchte mir zeigen,
        dass er gut mit Zahlen umgehen kann. Dazu zählt er die Hufeisen in
        diesem Bild.
      </p>
      <img src="story7.png" alt="viele Hufeisen" className="w-[300px]" />
      <p>
        Er muss sich wirklich konzentrieren, um keine Hufeisen doppelt zu
        zählen. Stolz sagt er mir sein Ergebnis. Er schaut mich voller Erwartung
        an.
      </p>
      <p>
        Ich zähle schnell selbst nach. Das muss schnell gehen, zum Glück kann
        ich das Muster im Bild nutzen. Ich sage ihm, dass sein Ergebnis richtig
        ist. Das macht ihn glücklich. Wie viele Hufeisen sind im Bild zu sehen?
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Ich nutze die Struktur des Bilds, um mir die Arbeit etwas zu
        erleichtern:
      </p>
      <img src="story7_sol1.png" alt="viele Hufeisen" className="w-[300px]" />
      <p>
        Ich unterteile das Bild in 4er-Gruppen und rechne 7 · 4 ={' '}
        <strong>28</strong>.
      </p>
      <p>
        In der Mathematik gibt es zwar oft nur eine Lösung, aber viele Wege,
        dahin zu kommen. Diese Kreativität macht mir an Mathe so viel Spaß und
        ich löse gerne Aufgaben, die mir bisschen Freiheit erlauben.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('28'),
}
