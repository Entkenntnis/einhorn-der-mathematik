import { StoryData, ignoreCaseSolution } from '../data'

export const story6: StoryData = {
  title: 'Dreiecke',
  x: 250,
  y: 63,
  deps: [1],
  render: ({ onSubmit, feedback }) => (
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
  submit: ignoreCaseSolution('8', ['acht']),
}
