import { StoryData, ignoreCaseSolution } from '../data'

export const story28: StoryData = {
  title: 'Taschengeld',
  x: 66,
  y: 350,
  deps: [26],
  render: () => (
    <>
      <p>
        Ich und Teo bekommen pro Monat zusammen 15€ Taschengeld. Meine Eltern
        wollen uns damit nicht &quot;verwöhnen&quot;, wir sollen bitte selbst
        kreativ werden und uns was zu arbeiten suchen, wenn wir mehr Geld
        brauchen. Anstrengend 😤
      </p>

      <p>
        Immerhin habe ich mit Teo ausmachen können, dass ich 5€ mehr bekomme als
        er. Das ist trotzdem recht wenig, aber damit muss ich halt klar kommen.
      </p>

      <p>Wie viel Euro Taschengeld bekomme ich im Monat?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Von den 15€ weißt du, dass Tina davon 5€ bekommt. Die restlichen 10€
        werden gleichmäßig auf Tina und Teo aufgeteilt, also für beide je 5€.
        Damit bekommt Tina <strong>10€ im Monat</strong>, Teo bekommt 5€ im
        Monat. Die Probe geht auf.
      </p>
      <p>
        Man könnte hier auch die Gleichung x + 5 = x aufstellen und das formal
        lösen. Wenn dir dieser Weg leichter fällt, ist das sehr legit. Aber
        manchmal gefällt es mir auch, mal nicht mit Formeln zu arbeiten.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('10', ['10€', '10 euro']),
}
