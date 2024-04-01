import { StoryData, ignoreCaseSolution } from '../data'

export const story31: StoryData = {
  title: 'Barock',
  x: 700,
  y: 200,
  deps: [14, 23],
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
  submit: ignoreCaseSolution('bach'),
}
