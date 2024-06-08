import { ChoiceInput } from '../../components/ChoiceInput'
import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'

export const story27: StoryData = {
  title: 'Griechisch',
  x: 390,
  y: 70,
  deps: [6],
  render: ({ onSubmit, feedback }) => (
    <>
      <p>
        Das antike Griechenland hat viele wilde Geschichten zu bieten - wer
        Percy Jackson gelesen hat, weiß, wovon ich rede.
      </p>

      <p>
        Neben den Geschichten haben die Griechen auch eine schöne Schrift. Ich
        finde, sie macht einfach was her. Ich bin so begeisterst, dass ich auch
        unbedingt Teo ein paar Zeichen beibringen möchte.
      </p>

      <p>
        Ich beginne mit diesen drei Buchstaben. Wähle die passenden Namen der
        Buchstaben aus.
      </p>
      <ChoiceInput
        onSubmit={onSubmit}
        feedback={feedback}
        choices={['Gamma', 'Alpha', 'Beta']}
        renderContent={(renderSelect) => (
          <>
            <p>α = {renderSelect(0)},</p>
            <p>β = {renderSelect(1)},</p>
            <p>γ = {renderSelect(2)}.</p>
          </>
        )}
      />
    </>
  ),
  proof: () => (
    <>
      <p>
        In der Mathematik kommen ziemlich häufig griechische Buchstaben vor für
        alle möglichen Dinge, wie Winkel, Summen, Abbildungen, ...
      </p>
      <p>
        Muss man? Eigentlich nicht. Aber vielleicht ist der Grund einfach: Weil
        die griechischen Zeichen cooler aussehen :)
      </p>
      <img src="/story27_sol.jpg" alt="Auflistung griechisches Alphabet" />
      <p className="!-mt-6">
        <small>
          <a
            href="https://www.math.uni-hamburg.de/home/kiechle/uebl/griechAlphabet.html"
            target="_blank"
            className="!text-gray-400 underline"
          >
            Bildquelle
          </a>
        </small>
      </p>
    </>
  ),
  hideSubmit: true,
  submit: ignoreCaseSolution('Alpha Beta Gamma'),
}
