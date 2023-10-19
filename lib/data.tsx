import clsx from 'clsx'
import { Draft } from 'immer'
import React, { useState } from 'react'
import Clock from 'react-clock'
import { State } from '../components/App'
import { submit_event } from './submit'

interface StoryData {
  title: string
  x: number
  y: number
  deps: number[]
  render: (props: {
    core: State
    mut: (fn: (draft: Draft<State>) => void) => void
    onSubmit: (val: string) => void
    feedback: React.ReactNode
  }) => JSX.Element
  hideSubmit?: boolean
  submit: (props: {
    value: string
    mut: (fn: (draft: Draft<State>) => void) => void
    id: number
    core: State
  }) => void
}

export const storyData: { [key: number]: StoryData } = {
  1: {
    title: 'Hallo',
    x: 100,
    y: 100,
    deps: [],
    render: ({ core, mut }) => {
      if (!core.name && core.modal != 'name') {
        mut((c) => {
          c.modal = 'name'
        })
      }
      return (
        <>
          <p>
            Hallo{core.name ? <strong> {core.name}</strong> : ''}! Schön, dass
            du hier bist :)
          </p>
          <p>
            Und hat dir schon jemand gesagt, dass du wunderbare ✨Augen✨ hast?
            Love them.
          </p>
          <p>
            Mein Name ist Tina und ich bin eine Einhorn-Dame. Okay, ich bin erst
            13 Jahre alt, aber ich fühle mich schon richtig erwachsen. Im
            Gegensatz zu meinem putzigen Bruder Teo, er ist erst 7 Jahre alt.
          </p>
          <p>
            Das Leben ist nicht easy als Einhorn in unserer Gesellschaft. Es
            gibt nicht viele von uns und wir werden manchmal komisch angeschaut
            😢
          </p>
          <p>
            Aber darum soll es hier nicht gehen. Ich denke mir gerne kleine
            Mathe-Rätsel aus. Ich hoffe, diese machen dir genauso viel Spaß wie
            mir!
          </p>
          <p>Dein erstes Rätsel: Wie viele Buchstaben hat dein Name?</p>
        </>
      )
    },
    submit: ({ value, mut, id, core }) => {
      genericSubmitHandler(
        value,
        parseInt(value) == core.name?.length,
        mut,
        id,
        core
      )
    },
  },
  2: {
    title: 'Würfel',
    x: 280,
    y: 440,
    deps: [14],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Teo hat heute in der Schule Würfel gebastelt. Stolz zeigt er mir seine
          Ergebnisse.
        </p>

        <p>
          Er hat die Augenzahlen frei nach Lust und Laune aufgezeichnet. Aber du
          und ich wissen, dass man aufpassen muss: Die Summe auf
          gegenüberliegenden Seiten ergibt immer 7.
        </p>

        <p>
          Welche der 4 Würfel müssen sicher korrigiert werden? Wähle sie aus und
          klicke auf sie.
        </p>

        <DiceInput onSubmit={onSubmit} feedback={feedback} />
      </>
    ),
    hideSubmit: true,
    submit: ignoreCaseSolution('A D'),
  },
  3: {
    title: 'Uhrzeit',
    x: 520,
    y: 360,
    deps: [8, 9],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          &quot;22 Uhr, 23 Uhr, 24 Uhr, 25 Uhr ...&quot;, murmelt Teo vor sich
          hin, während er seine Hausaufgaben macht.
        </p>
        <p>
          Ich korrigiere ihn: &quot;Hey Teo, es gibt kein 25 Uhr. Das ist wieder
          1 Uhr.&quot;
        </p>
        <p>
          Natürlich ignoriert er mich und ärgert mich extra, indem er vergnügt
          weitermacht:
        </p>
        <p>&quot;26 Uhr, 27 Uhr, 28 Uhr, 29 Uhr ...&quot;</p>
        <p>
          Nach einer Weile ist er bei <strong>100 Uhr</strong> angekommen. Da
          interessiert es mich schon: Welcher Uhrzeit entspricht das ⌚?
          Verschiebe den Regler, um die Uhrzeit einzustellen:
        </p>
        <ClockInput onSubmit={onSubmit} feedback={feedback} />
      </>
    ),
    hideSubmit: true,
    submit: ignoreCaseSolution('4 Uhr'),
  },
  4: {
    title: 'Telepathie',
    x: 450,
    y: 170,
    deps: [13, 15],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Leider kann ich nicht Gedanken lesen. Aber mit bisschen Mathematik
          kann ich so tun, als ob ich das kann!
        </p>
        <p>
          Ich sage Teo, dass er sich eine Zahl ausdenken soll. Diese Zahl soll
          er halbieren, davon 11 abziehen und dann das Ergebnis mit 5
          multiplizieren. Nach viel Nachdenken kommt er auf die Antwort{' '}
          <strong>50</strong>.
        </p>
        <p>Welche Zahl hat Teo sich ausgedacht?</p>
      </>
    ),
    submit: ignoreCaseSolution('42'),
  },
  5: {
    title: 'Figur',
    x: 490,
    y: 71,
    deps: [15],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Teo mag zeichnen! Wir spielen oft ein Spiel, bei dem er mir ein Bild
          mit Worten beschreibt und ich versuche es nachzuzeichnen.
        </p>
        <p>Heute beschreibe ich. Ich gebe ihm diesen Hinweis:</p>
        <p className="pl-4 border-l-4 border-l-pink-600">
          Ein unsichtbarer Punkt regiert unendlich viele sichtbare Punkte. Doch
          der unsichtbare Punkt ist ganz alleine, von allen anderen Punkten
          gleich weit entfernt.
        </p>
        <p>Wie heißt diese Figur?</p>
      </>
    ),
    submit: ignoreCaseSolution('kreis'),
  },
  6: {
    title: 'Dreiecke',
    x: 250,
    y: 70,
    deps: [1],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Ich schaue Teo zu, wie er zwei Dreiecke zeichnet. Für sein Alter kann
          er ordentlich mit dem Lineal umgehen.
        </p>
        <img
          src="story6.png"
          alt="Ein großes Dreieck mit einem eingeschlossenen kleinen Dreieck"
          className="w-[350px]"
        ></img>
        <p>
          Er deutet auf das Bild und sagt: &quot;Schau mal, zwei Dreiecke!&quot;
        </p>
        <p>
          Ich schmunzle, denn es sind viel mehr als zwei Dreiecke. Wie viele
          Dreiecke kannst du sehen?
        </p>
      </>
    ),
    submit: ignoreCaseSolution('8', ['acht']),
  },
  7: {
    title: 'Pfoten',
    x: 180,
    y: 220,
    deps: [1],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>Bei uns Zuhause hängt dieses Bild an der Wand:</p>
        <img src="story7.png" alt="viele Pfoten" />
        <p>
          Eines Tages fängt Teo an, die Pfoten zu zählen und fängt in der ersten
          Reihe an: 1, 2, 3, ...
        </p>
        <p>
          Wenige Sekunden später habe ich das Ergebnis bereits im Kopf und
          schaue meinem Bruder beim Zählen zu. Wie viele Pfoten sind im Bild zu
          sehen?
        </p>
      </>
    ),
    submit: ignoreCaseSolution('32'),
  },
  8: {
    title: 'Winkel',
    x: 370,
    y: 360,
    deps: [10, 14],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Teo ist erst in der 1. Klasse. Ich konnte ihm bereits beibringen, wie
          man mit dem Geo-Dreieck Winkel misst. In diesem Dreieck hat er schon
          zwei Winkel gemessen.
        </p>
        <img
          src="story8.png"
          alt="Ein Dreieck mit Innenwinkel 46 und 60 Grad"
        />
        <p>
          Ich habe in der Schule gelernt, dass die Summe der drei Winkel eines
          Dreiecks immer 180 Grad beträgt. Damit möchte ich ihn überraschen. Ich
          sage ihm: &quot;Ich kann den Winkel mit bloßen Augen ablesen!&quot;
          und flüstere ihm das Ergebnis.
        </p>
        <p>
          Nachdem Teo den Winkel gemessen hat, ist er ganz erstaunt wie genau
          ich den Winkel geschätzt habe. Dabei habe ich gar nicht schätzen
          müssen, sondern konnte den Winkel ausrechnen. Wie groß ist der
          fehlende Winkel?
        </p>
      </>
    ),
    submit: ignoreCaseSolution('74', ['74°', '74 °', '74 grad']),
  },
  9: {
    title: 'Sudoku',
    x: 460,
    y: 280,
    deps: [10, 13],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Ich löse manchmal Sudoku, wenn mir langweilig ist. Heute schaut mir
          Teo zu und er fragt mich natürlich, was die Regeln sind.
        </p>
        <p>
          Ich weiß nicht, wie viel Chancen ich habe, einem 7-jährigen Sudoku zu
          erklären 😅. Ich versuche es aber (in jede Reihe, Spalte und 3x3-Feld
          muss jeder Ziffer von 1 bis 9 genau einmal vorkommen). Und am Ende
          konnte er das markierte Feld ausfüllen.
        </p>
        <img src="story9.png" alt="ein Sudoku" />
        <p>Welche Zahl kommt in das Feld?</p>
      </>
    ),
    submit: ignoreCaseSolution('3'),
  },
  10: {
    title: 'Rechenmauer',
    x: 286,
    y: 277,
    deps: [7],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Ich schaue Teo bei seinen Hausaufgaben zu, weil er so putzig ist und
          seine Aufgaben so leicht sind.
        </p>
        <p>
          Heute gibt es eine Rechenmauer. Dabei addiert man immer die zwei
          Zahlen unterhalb eines Felds. Das macht auch seiner großen Schwester
          Spaß!
        </p>
        <img
          alt="Zahlenpyramide mit Grundreihe 6, 4, 8, 1 und Addition"
          src="story10.png"
          className="w-[300px]"
        />
        <p>Welche Zahl steht im obersten Feld?</p>
      </>
    ),
    submit: ignoreCaseSolution('24'),
  },
  11: {
    title: 'Melonen',
    x: 580,
    y: 240,
    deps: [4, 9],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Das ist eines meiner Lieblings-Matherätsel. Es ist leider etwas zu
          kompliziert für Teo. Man muss dafür ein wenig Nachdenken.
        </p>
        <p className="pl-4 border-l-4 border-l-pink-600">
          Wassermelonen enthalten 99% Wasser. Ein Melonen-Händler lagert an
          einem heißen Tag 1000kg Melonen. Am Ende des Tages ist der
          Wassergehalt der Melonen auf 98% gesunken.
        </p>
        <p>Wie viel Kilogramm Melonen hat der Händler am Ende des Tages?</p>
      </>
    ),
    submit: ignoreCaseSolution('500', ['500kg', '500 kg']),
  },
  12: {
    title: 'Freunde',
    x: 420,
    y: 460,
    deps: [2, 8],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Freunde finden ist gar nicht so einfach! Ich versuche gerade
          auszurechnen, wie viele Personen ich begegnen muss um eine
          Einhorn-Freundin zu finden.
        </p>
        <p>
          Auf der Welt ist eine von 1000 Personen ein Einhorn. Eine von 5
          Einhörnern spricht meine Sprache. Bei einer von 100 Einhörnern gelingt
          es, Freunde zu werden (grob geschätzt).
        </p>
        <p>Wie viele Personen muss ich begegnen, um eine Freundin zu finden?</p>
      </>
    ),
    submit: ignoreCaseSolution('500000'),
  },
  13: {
    title: 'Zahlenfolge',
    x: 333,
    y: 164,
    deps: [6, 7],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Mein Vater hat mich gebeten, mit Teo für seinen nächsten Mathe-Test zu
          üben. Ein Thema darin sind Zahlenfolgen.
        </p>
        <p>
          Aber das sind keine interessanten Folgen, sondern nur langweilige wie
          2, 4, 6, 8, ... oder 11, 22, 33, ... Mein Vater hat mir verboten, ihm
          zu schwere Aufgaben zu stellen.
        </p>
        <p>
          Ich kann es natürlich nicht verkneifen, am Ende doch folgende Aufgabe
          zu stellen:
        </p>
        <img src="story13.png" alt="1, 1, 2, 3, 5, ?" />
        <p>
          Teo kommen die Tränen, als er die Folge nicht lösen kann. Mein Vater
          schaut prüfend zu mir und ich wische die Folge schnell weg. Wie lautet
          die nächste Zahl der Folge?
        </p>
      </>
    ),
    submit: ignoreCaseSolution('8'),
  },
  14: {
    title: 'Zufall',
    x: 183,
    y: 346,
    deps: [7],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Ich spiele mit Teo immer &quot;Mensch ärgere dich nicht!&quot;. Und
          wenn man Teo fragt, welche Zahl beim Würfel am häufigsten ist, dann
          sagt er: &quot;Die 1 kommt am häufigsten! Der Würfel ist immer so
          unfair!&quot;.
        </p>
        <p>
          Ich schmunzle, denn die Mathematik hat da eine andere Antwort: Alle
          Zahlen von 1 bis 6 kommen gleich oft vor. Das sieht anders aus, wenn
          man mit zwei Würfel gleichzeitig würfelt und die Augen addiert.
        </p>
        <img src="story14.png" alt="Deko: zwei Würfel" className="w-[400px]" />
        <p>
          Du siehst in der Tabelle alle möglichen Kombinationen. Darin gibt es
          eine Zahl, die häufiger vorkommt als alle anderen. Welche ist es?
        </p>
      </>
    ),
    submit: ignoreCaseSolution('7'),
  },
  15: {
    title: 'Körper',
    x: 370,
    y: 51,
    deps: [6],
    render: ({ onSubmit, feedback }) => (
      <>
        <p>
          Heute schaut ausnahmsweise Teo mir bei den Hausaufgaben zu. Viel lesen
          kann er noch nicht, aber folgendes Bild weckt seine Aufmerksamkeit.
        </p>

        <img src="story15.png" alt="Körpernetz mit Rechteck und zwei Kreisen" />
        <p>
          Er fragt: &quot;Was ist das?&quot; Ich erkläre: &quot;Stell dir vor,
          du schneidest das mit Papier aus und faltest es. Dann kommt ein ganz
          bestimmter Körper heraus.&quot; Ich zeige mit den Handen, wie es
          ungefähr aussieht.
        </p>
        <p>Wie lautet der Name dieses Körpers?</p>
      </>
    ),
    submit: ignoreCaseSolution('zylinder'),
  },
}

function genericSubmitHandler(
  value: string,
  isCorrect: boolean,
  mut: (fn: (draft: Draft<State>) => void) => void,
  id: number,
  core: State
) {
  if (value) {
    submit_event(core.userId, id, value)
  }
  if (isCorrect) {
    mut((c) => {
      c.storyFeedback = {
        correct: true,
        text: `"${value}" ist richtig`,
      }
    })
    addSolved(mut, core.userId, id)
  } else {
    mut((c) => {
      c.storyFeedback = {
        correct: false,
        text: `"${value}" ist falsch`,
      }
    })
  }
}

function ignoreCaseSolution(answer: string, alternatives?: string[]) {
  return (props: Parameters<StoryData['submit']>[0]) => {
    const value = props.value.trim().toLowerCase()
    const isCorrect =
      (answer.toLowerCase().trim() == value ||
        alternatives?.some((alt) => alt.toLowerCase().trim() == value)) ??
      false
    genericSubmitHandler(
      props.value.trim(),
      isCorrect,
      props.mut,
      props.id,
      props.core
    )
  }
}

function addSolved(
  mut: (fn: (draft: Draft<State>) => void) => void,
  userId: string,
  storyId: number
) {
  mut((c) => {
    c.solved.add(storyId)
  })
  const previousStorage = JSON.parse(
    sessionStorage.getItem('einhorn_der_mathematik_solved') ?? '[]'
  )
  if (!previousStorage.includes(storyId)) {
    previousStorage.push(storyId)
    sessionStorage.setItem(
      'einhorn_der_mathematik_solved',
      JSON.stringify(previousStorage)
    )
  }
  submit_event(userId, storyId)
}

interface ClockInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
}

function ClockInput({ onSubmit, feedback }: ClockInputProps) {
  const [val, setVal] = useState(12)
  return (
    <>
      <Clock
        className="mt-6"
        value={new Date(2023, 0, 1, val)}
        renderSecondHand={false}
        renderMinuteHand={false}
        hourHandLength={70}
      />
      <p className="ml-12">{val} Uhr</p>
      {feedback}
      <div className="flex mt-4">
        <input
          type="range"
          min={0}
          max={24}
          step={1}
          className="w-64 mr-4 inline-block"
          value={val}
          onInput={(e) =>
            setVal(parseInt((e.target as HTMLInputElement).value))
          }
        />
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400"
          onClick={() => {
            onSubmit(`${val} Uhr`)
          }}
        >
          Los
        </button>
      </div>
    </>
  )
}

interface DiceInputProps {
  onSubmit: (val: string) => void
  feedback: React.ReactNode
}

function DiceInput({ onSubmit, feedback }: DiceInputProps) {
  const [selected, setSelected] = useState<number[]>([])
  return (
    <>
      <div className="flex flex-wrap mt-3">
        {renderDice('/story2_1.png', 'Würfel mit Augenzahlen 1, 2, 6', 0)}
        {renderDice('/story2_2.png', 'Würfel mit Augenzahlen 1, 2, 4', 1)}
        {renderDice('/story2_3.png', 'Würfel mit Augenzahlen 3, 5, 6', 2)}
        {renderDice('/story2_4.png', 'Würfel mit Augenzahlen 2, 4, 5', 3)}
      </div>
      <div className="ml-2 -mt-2">{feedback}</div>
      <div className="mt-4 ml-2">
        <button
          className="px-3 py-1 rounded bg-pink-300 hover:bg-pink-400"
          onClick={() => {
            const letters = ['A', 'B', 'C', 'D']
            onSubmit(
              letters
                .filter((letter) => selected.includes(letters.indexOf(letter)))
                .join(' ')
            )
          }}
        >
          Los
        </button>
      </div>
    </>
  )

  function renderDice(src: string, alt: string, id: number) {
    return (
      <div>
        <img
          src={src}
          alt={alt}
          className={clsx(
            'w-40 m-2 border-2 cursor-pointer',
            selected.includes(id) ? 'border-pink-500' : 'border-transparent'
          )}
          onClick={() => {
            if (selected.includes(id)) {
              setSelected(selected.filter((s) => s != id))
            } else {
              setSelected([...selected, id])
            }
          }}
        />
      </div>
    )
  }
}
