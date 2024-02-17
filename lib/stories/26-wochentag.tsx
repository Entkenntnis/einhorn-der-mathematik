import { StoryData, ignoreCaseSolution } from '../data'

export const story26: StoryData = {
  title: 'Wochentag',
  x: 75,
  y: 226,
  deps: [1],
  render: () => (
    <>
      <p>Wunderbar, dich wieder zu sehen ☺️</p>
      <p>Ich fühle mich gleich wohler, wenn du hier bist.</p>
      <p>
        Bei mir fühlen sich alle Tage aktuell sehr ähnlich an, weil wir gerade
        Ferien haben. Ohne einen festen Schulalltag weiß ich gar nicht mehr,
        welchen Tag wir in der Woche haben.
      </p>
      <p>
        Ich kann mich nur noch daran erinnern, dass in 5 Tagen die Schule an
        einem Montag beginnt.
      </p>
      <p>Hilf mir kurz auf die Sprünge. Welcher Wochentag ist heute?</p>
    </>
  ),
  submit: ignoreCaseSolution('Mittwoch', ['MI']),
}
