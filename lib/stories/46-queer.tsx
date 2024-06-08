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
  submit: ignoreCaseSolutionWithGenData<DATA>((data) => {
    const result = ['x', 'x', 'x', 'x']
    data.friends.forEach(([, index], i) => {
      result[index] = solution[i]
    })
    return [result.join(' ')]
  }),
  hideSubmit: true,
}
