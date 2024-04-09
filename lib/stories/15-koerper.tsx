import { StoryData, ignoreCaseSolution } from '../data'

export const story15: StoryData = {
  title: 'Körper',
  x: 560,
  y: 430,
  deps: [8, 35],
  render: () => (
    <>
      <p>
        Heute schaut ausnahmsweise Teo mir bei den Hausaufgaben zu. Viel lesen
        kann er noch nicht, aber folgendes Bild weckt seine Aufmerksamkeit.
      </p>

      <img
        src="story15.png"
        alt="Körpernetz mit Rechteck und zwei Kreisen"
        width={200}
      />
      <p>
        Er fragt: &quot;Was ist das?&quot; Ich erkläre: &quot;Stell dir vor, du
        schneidest das mit Papier aus und faltest es. Dann kommt ein ganz
        bestimmter Körper heraus.&quot; Ich zeige mit den Handen, wie es
        ungefähr aussieht.
      </p>
      <p>Wie lautet der Name dieses Körpers?</p>
    </>
  ),
  submit: ignoreCaseSolution('würfel'),
}
