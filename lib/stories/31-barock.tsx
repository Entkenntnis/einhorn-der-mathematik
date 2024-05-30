import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story31: StoryData = {
  title: 'Barock',
  x: 820,
  y: 140,
  deps: [42],
  render: () => (
    <>
      <p>
        Ich dachte zuerst, dass Musik nicht viel mit Mathematik zu tun hat -
        geht es dort doch viel mehr um Kreativität und Schönheit.
      </p>

      <p>
        Aber ein Video zum größten Barock-Komponisten hat mir die Augen
        geöffnet.
      </p>

      <p>
        Auch in der Musik findet man viele Strukturen, Muster - und auch manche
        geheime Botschaft.
      </p>

      <img src="/story31.png" alt="vier Noten" width={300} />

      <p>
        Die vier Noten stellen den Namen dieses Barock-Komponisten da. Von wem
        ist hier die Rede?
      </p>
    </>
  ),
  proof: () => (
    <>
      <p>
        Das hat Tina ja sehr poetisch formuliert :) Bach hat die Musik mit sehr
        viel Struktur betrachtet, aber trotzdem sein kreatives Gespür nie
        vernachlässigt. Es ist gar nicht weit hergeholt zu sagen, dass ein
        schöner mathematischer Beweis wie ein Musikstück klingen kann - fließen
        dort nicht auch Struktur und Kreativität zusammen.
      </p>
      <img src="/story31_sol.png" alt="vier Noten" width={300} />
      <p>
        Jetzt noch eine kleine Erklärung zu der geheimen Botschaft. Wenn man die
        Tonnamen der einzelnen Noten aufschreibt, werden die 4 Buchstaben
        B-A-C-H sichtbar. Dabei wurde die deutsche Schreibung verwendet.
      </p>
    </>
  ),
  submit: ignoreCaseSolution('bach'),
}
