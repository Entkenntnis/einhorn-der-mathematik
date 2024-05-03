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
  proof: () => (
    <>
      <p>
        Mit Rückwärts-Rechnen kann man die Aufgabe auf den ersten Weg lösen:
      </p>
      <p>
        Die Schule startet am Montag
        <br />
        Der Tag davor ist Sonntag,
        <br />
        zwei Tage davor ist Samstag,
        <br />
        drei Tage davor ist Freitag,
        <br />
        vier Tage davor ist Donnerstag,
        <br />
        und schließlich ist fünf Tage davor <strong>Mittwoch</strong>.
      </p>
      <hr />
      <p>
        Wer es aber etwas kreativer möchte, für den gibt es noch einen zweiten
        Weg: Die Wochentage wiederholen sich alle 7 Tage. Wenn in fünf Tagen ein
        Montag ist, dann war vor zwei Tagen ebenfalls ein Montag.
      </p>
      <p>
        Damit musst du nur zwei Tage vom Montag aus nach vorne zählen und kommst
        ebenfalls auf den Mittwoch.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('Mittwoch', ['MI']),
}
