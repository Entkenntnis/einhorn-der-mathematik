import { StoryData, ignoreCaseSolution } from '../data'

export const story32: StoryData = {
  title: 'Turnier',
  x: 390,
  y: 70,
  deps: [6],
  render: () => (
    <>
      <p>
        Zum Geburtstag veranstaltet Teo eine Geburtstagparty und lädt dazu vier
        Freunde ein. Ich habe die herausfordernde Aufgabe bekommen, mir etwas
        Lustiges für den Tag auszudenken.
      </p>
      <p>
        Neben Klassiker wie Topfschlagen oder Reise nach Jerusalem plane ich zum
        Abschluss ein 4-gewinnt-Turnier. Ich habe dazu ein XXL-Version
        organisiert.
      </p>
      <img src="/story32.jpg" alt="XXL 4-gewinnt" className="w-[300px]" />
      <p className="!-mt-6">
        <small>
          <a
            href="https://i0.wp.com/mm-eventkonzepte.de/wp-content/uploads/2019/03/4-Gewinnt-XXL-2.jpg"
            target="_blank"
            className="!text-gray-400 underline"
          >
            Bildquelle
          </a>
        </small>
      </p>
      <p>
        Teo und seine vier Freunde sind zusammen fünf Turnier-Teilnehmer. Jeder
        soll zweimal gegen jeden spielen - einmal mit grün (darf anfangen) und
        einmal mit gelb. Danach zähle ich die Gewinne aus und berechne den
        Sieger.
      </p>
      <p>Wie viele Spiele werden in diesem Turnier insgesamt gespielt?</p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Ich kenne Teos Freunde nicht beim Namen - mathematisch gesehen ist das
        in dem Fall auch nicht notwendig zu wissen. Ich darf die Teilnehmer
        einfach A - E bezeichnen.
      </p>
      <img
        src="/story32_sol.png"
        alt="A, B, C, D, E mit eingezeichneten Möglichkeiten"
        className="w-[300px]"
      />
      <p>
        Du sieht die Spiele von A und B eingezeichnet. Jeder Teilnehmer spielt
        einmal gegen jeden. Und weil wir die Spiele A-B und B-A unterscheiden,
        spielen je zwei Spieler auch immer zweimal gegeneinander. Man kann ja
        festlegen, dass der erstgenannte Spieler anfangen darf und die Farbe
        grün erhält.
      </p>
      <p>
        Insgesamt sind es also <strong>5 · 4 = 20 Spiele</strong> in diesem
        Turnier.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('20'),
}
