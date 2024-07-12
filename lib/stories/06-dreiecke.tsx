import { naturalNumberSolution } from '../data'
import { StoryData } from '../types'

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
        Dreiecke siehst du?
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
    </>
  ),
  submit: () => naturalNumberSolution(8, 2),
}
