import { StoryData, ignoreCaseSolution } from '../data'

export const story22: StoryData = {
  title: 'Schatzkiste',
  x: 1100,
  y: 700,
  deps: [36],
  render: () => (
    <>
      <p>
        Stell dir vor, du hast eine magische Schatzkiste. Diese Kiste kann ihren
        Inhalt alle 5 Minuten verdoppeln.
      </p>

      <p>
        Du holst eine Goldmünze aus deiner Tasche und legst sie in die
        Schatzkiste. Nach einer Stunde ist die Schatzkiste voll und du bist
        reich.
      </p>

      <p>Nach wie vielen Minuten war die Schatzkiste genau halb voll?</p>
    </>
  ),
  submit: ignoreCaseSolution('55', ['55 min', '55 Minuten']),
}
