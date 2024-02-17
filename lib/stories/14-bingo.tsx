import { StoryData, ignoreCaseSolution } from '../data'

export const story14: StoryData = {
  title: 'Bingo #',
  x: 1300,
  y: 0,
  deps: [],
  render: () => (
    <>
      <p>
        Ich spiele mit Teo immer &quot;Mensch ärgere dich nicht!&quot;. Und wenn
        man Teo fragt, welche Zahl beim Würfel am häufigsten ist, dann sagt er:
        &quot;Die 1 kommt am häufigsten! Der Würfel ist immer so unfair!&quot;.
      </p>
      <p>
        Ich schmunzle, denn die Mathematik hat da eine andere Antwort: Alle
        Zahlen von 1 bis 6 kommen gleich oft vor. Das sieht anders aus, wenn man
        mit zwei Würfel gleichzeitig würfelt und die Augen addiert.
      </p>
      <img src="story14.png" alt="Deko: zwei Würfel" className="w-[400px]" />
      <p>
        Du siehst in der Tabelle alle möglichen Kombinationen. Darin gibt es
        eine Zahl, die häufiger vorkommt als alle anderen. Welche ist es?
      </p>
    </>
  ),
  submit: ignoreCaseSolution('7'),
}
