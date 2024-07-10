import { ChoiceInput } from '../../components/ChoiceInput'
import { ignoreCaseSolution, ignoreCaseSolutionWithGenData } from '../data'
import { shuffleArray } from '../helper/shuffle-array'
import { StoryData } from '../types'

interface DATA {
  friends: [string, number][]
}

const solution = ['nicht-binär', 'trans', 'schwul', 'lesbisch']

export const story46: StoryData<DATA> = {
  title: 'Queer',
  x: 590,
  y: 631,
  deps: [3, 13],
  generator: () => {
    return {
      friends: shuffleArray([
        ['Alex', 0],
        ['Jojo', 1],
        ['Luna', 2],
        ['Mika', 3],
      ]),
    }
  },
  render: ({ onSubmit, feedback, data }) => (
    <>
      <p>
        Viele meiner FreundInnen kenne ich über den queeren Jugendtreff. Ich
        möchte dir vier von ihnen vorstellen.
      </p>
      <p>
        Sie heißen Alex, Jojo, Luna und Mika. Je eine Person identifiziert sich
        als lesbisch, nicht-binär, schwul und trans.
      </p>
      <p>Ich gebe dir drei Hinweise:</p>
      <ol className="list-decimal pl-8 mt-4">
        <li>{data.friends[2][0]} ist schwul.</li>
        <li>
          {data.friends[1][0]} ist nicht lesbisch und {data.friends[0][0]} ist
          nicht trans.
        </li>
        <li>
          {data.friends[0][0]} und {data.friends[2][0]} sind ein Pärchen.
        </li>
      </ol>
      <p>Wie identifizieren sich meine queeren FreundInnen?</p>
      <ChoiceInput
        onSubmit={onSubmit}
        feedback={feedback}
        choices={['lesbisch', 'nicht-binär', 'schwul', 'trans']}
        renderContent={(renderSelect) => (
          <>
            <p>Alex ist {renderSelect(0)},</p>
            <p>Jojo ist {renderSelect(1)},</p>
            <p>Luna ist {renderSelect(2)},</p>
            <p>Mika ist {renderSelect(3)}.</p>
          </>
        )}
      />
    </>
  ),
  proof: ({ data }) => {
    return (
      <>
        <p>
          Ich habe früher viele von solchen logischen Rätsel gelöst. Meine
          Strategie dabei ist es, Schritt für Schritt vorzugehen und alle
          Informationen in einer Tabelle zu notieren.
        </p>
        <p>
          Ich trage als erstes den Hinweis &quot;{data.friends[2][0]} ist
          schwul&quot; ein:
        </p>
        <table className="border-collapse [&_td]:border [&_th]:border [&_td]:border-black [&_th]:border-black [&_td]:px-1 [&_th]:px-1 my-6 [&_td]:text-center">
          <thead>
            <th>&nbsp;</th>
            <th>lesbisch</th>
            <th>nicht-binär</th>
            <th>schwul</th>
            <th>trans</th>
          </thead>
          <tr>
            <td>{data.friends[0][0]}</td>
            <td></td>
            <td></td>
            <td>--</td>
            <td></td>
          </tr>
          <tr>
            <td>{data.friends[1][0]}</td>
            <td></td>
            <td></td>
            <td>--</td>
            <td></td>
          </tr>
          <tr>
            <td>{data.friends[2][0]}</td>
            <td>--</td>
            <td>--</td>
            <td>✓</td>
            <td>--</td>
          </tr>
          <tr>
            <td>{data.friends[3][0]}</td>
            <td></td>
            <td></td>
            <td>--</td>
            <td></td>
          </tr>
        </table>
        <p>
          Danach trage ich den zweiten Hinweis &quot;{data.friends[1][0]} ist
          nicht lesbisch und {data.friends[0][0]} ist nicht trans&quot; ein:
        </p>
        <table className="border-collapse [&_td]:border [&_th]:border [&_td]:border-black [&_th]:border-black [&_td]:px-1 [&_th]:px-1 my-6 [&_td]:text-center">
          <thead>
            <th>&nbsp;</th>
            <th>lesbisch</th>
            <th>nicht-binär</th>
            <th>schwul</th>
            <th>trans</th>
          </thead>
          <tr>
            <td>{data.friends[0][0]}</td>
            <td></td>
            <td></td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>{data.friends[1][0]}</td>
            <td>--</td>
            <td></td>
            <td>--</td>
            <td></td>
          </tr>
          <tr>
            <td>{data.friends[2][0]}</td>
            <td>--</td>
            <td>--</td>
            <td>✓</td>
            <td>--</td>
          </tr>
          <tr>
            <td>{data.friends[3][0]}</td>
            <td></td>
            <td></td>
            <td>--</td>
            <td></td>
          </tr>
        </table>
        <p>
          Der letzte Hinweis lautet &quot;{data.friends[0][0]} und{' '}
          {data.friends[2][0]} sind ein Pärchen&quot;. Weil {data.friends[2][0]}{' '}
          schwul ist, kann {data.friends[0][0]} nicht lesbisch sein, daher ist{' '}
          {data.friends[0][0]} nicht-binär*.
        </p>
        <table className="border-collapse [&_td]:border [&_th]:border [&_td]:border-black [&_th]:border-black [&_td]:px-1 [&_th]:px-1 my-6 [&_td]:text-center">
          <thead>
            <th>&nbsp;</th>
            <th>lesbisch</th>
            <th>nicht-binär</th>
            <th>schwul</th>
            <th>trans</th>
          </thead>
          <tr>
            <td>{data.friends[0][0]}</td>
            <td>--</td>
            <td>✓</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>{data.friends[1][0]}</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td></td>
          </tr>
          <tr>
            <td>{data.friends[2][0]}</td>
            <td>--</td>
            <td>--</td>
            <td>✓</td>
            <td>--</td>
          </tr>
          <tr>
            <td>{data.friends[3][0]}</td>
            <td></td>
            <td>--</td>
            <td>--</td>
            <td></td>
          </tr>
        </table>
        <p>
          Für {data.friends[1][0]} bleibt nur noch trans, für{' '}
          {data.friends[3][0]} schließlich lesbisch. Damit ist die Tabelle
          vollständig und ich habe meine Lösung:
        </p>
        <table className="border-collapse [&_td]:border [&_th]:border [&_td]:border-black [&_th]:border-black [&_td]:px-1 [&_th]:px-1 mt-6 [&_td]:text-center">
          <thead>
            <th>&nbsp;</th>
            <th>lesbisch</th>
            <th>nicht-binär</th>
            <th>schwul</th>
            <th>trans</th>
          </thead>
          <tr>
            <td>{data.friends[0][0]}</td>
            <td>--</td>
            <td>✓</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>{data.friends[1][0]}</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>{data.friends[2][0]}</td>
            <td>--</td>
            <td>--</td>
            <td>✓</td>
            <td>--</td>
          </tr>
          <tr>
            <td>{data.friends[3][0]}</td>
            <td>✓</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
          </tr>
        </table>
        <p className="text-gray-600 mt-6">
          <small>
            * Nicht-binäre Menschen können sich (auch) als männlich
            identifizieren und damit Teil eines schwulen Pärchen sein.
          </small>
        </p>
      </>
    )
  },
  submit: ({ data }) => {
    const result = ['x', 'x', 'x', 'x']
    data.friends.forEach(([, index], i) => {
      result[index] = solution[i]
    })
    return ignoreCaseSolutionWithGenData([result.join(' ')])
  },
  hideSubmit: true,
}
