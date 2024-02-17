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
  submit: ignoreCaseSolution('10', ['10€', '10 euro']),
}
