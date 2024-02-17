import { StoryData, ignoreCaseSolution } from '../data'

export const story16: StoryData = {
  title: 'Landkarte',
  x: 800,
  y: 300,
  deps: [14, 20],
  render: () => (
    <>
      <p>
        Mir macht es Spaß, Bilder für meine Geschichten zu entwerfen. Für meine
        neuste Geschichte habe ich diese Landkarte gezeichnet.
      </p>
      <img src="/story16.jpg" alt="Landkarte" className="w-[400px]" />
      <p>
        Die Insel hat eine Fläche von 620 Fußballfelder. Auf einer Insel leben
        die Gruppen A und B. Durch einen See mit zwei Flüssen wird die Insel in
        zwei gleich große Teile unterteilt. Gruppe B besitzt 180 Fußballfelder
        mehr Land als Gruppe A.
      </p>
      <p>Wie viel Fußballfelder Land besitzt Gruppe A?</p>
    </>
  ),
  submit: ignoreCaseSolution('220'),
}
