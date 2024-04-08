import { StoryData, ignoreCaseSolution } from '../data'

export const story6: StoryData = {
  title: 'Dreiecke',
  x: 250,
  y: 63,
  deps: [1],
  render: () => (
    <>
      <p>
        Ich schaue Teo zu, wie er zwei Dreiecke zeichnet. Für sein Alter kann er
        ordentlich mit dem Lineal umgehen.
      </p>
      <img
        src="story6.png"
        alt="Ein großes Dreieck mit einem eingeschlossenen kleinen Dreieck"
        className="w-[350px]"
      ></img>
      <p>
        Er deutet auf das Bild und sagt: &quot;Schau mal, zwei Dreiecke!&quot;
      </p>
      <p>
        Ich schmunzle, denn es sind viel mehr als zwei Dreiecke. Wie viele
        Dreiecke kannst du sehen?
      </p>
    </>
  ),
  proof: () => (
    <>
      <img
        src="story6_sol.png"
        alt="Ein großes Dreieck mit einem eingeschlossenen kleinen Dreieck"
        className="w-[250px]"
      ></img>
      <p>
        Im Bild sind finden sich sechs kleine Dreiecke 1 - 6 und die zwei großen
        Dreiecke 7 und 8. Das sind insgesamt <strong>acht Dreiecke</strong>.
      </p>
      <p>
        Mehr ist erstmal nicht zu finden - aber wie kann ich mir ganz sicher
        sein, dass ich nicht doch noch ein Dreieck übersehen habe? Eine kleine
        Beweisidee:
      </p>
      <p>
        Jedes Dreieck hat eine Grundseite. Diese Grundseite muss mit einer der
        vorhandenen Linien übereinstimmen.
      </p>
      <img
        src="story6_proof.png"
        alt="Ein großes Dreieck mit einem eingeschlossenen kleinen Dreieck"
        className="w-[250px]"
      ></img>
      <p>
        Schaue dir eine Linie an. Diese ist dreimal unterteilbar. Die Grundseite
        des Dreiecks kann entweder aus einem einzelnen Stück A, B oder C
        bestehen, oder aus zwei Stücken A+B und B+C, oder die gesamte Länge
        nutzen A+B+C.
      </p>
      <p>
        Wenn man die Grundseite hat, kann man die Linien an den Enden gerade
        weiterverfolgen und nach gemeinsamen Schnittpunkten suchen. Für A, B, C
        und A+B+C finden sich jeweils ein Schnittpunkt und damit ein
        entsprechendes Dreieck. Für A+B und B+C aber sind die Linien fast
        parallel und haben keinen Schnitt. Daraus bilden sich keine Dreiecke.
      </p>
      <p>
        Mehr Möglichkeiten gibt es nicht, es kann also kein neuntes Dreieck
        geben. Was zu beweisen war.
      </p>
      <p>Jetzt kannst ich in Ruhe schlafen :)</p>
    </>
  ),
  submit: ignoreCaseSolution('8', ['acht']),
}
