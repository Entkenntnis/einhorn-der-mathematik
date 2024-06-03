import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { ignoreCaseSolution } from '../data'
import { StoryData } from '../types'
import { useState } from 'react'
import { restrictToParentElement } from '@dnd-kit/modifiers'

export const story45: StoryData = {
  title: 'Tangram',
  x: 660,
  y: 531,
  deps: [3, 15],
  render: ({ back, onSubmit }) => (
    <>
      <p>
        Teo hat heute zum Geburtstag ein Tangram bekommen. Das liebt er so sehr,
        dass niemand anderes damit spielen darf - auch ich nicht!
      </p>
      <p>
        Ich möchte aber gerne spielen, daher warte ich, bis er am Abend
        eingeschlafen ist und hole dann leise das Tangram aus seinem Zimmer.
      </p>
      <p>
        Und jetzt lege ich eine Katze. Es macht wirklich Spaß, ich kann Teo
        verstehen. Du darfst auch mal probieren. Ziehe die farbigen Teile an die
        passende Position und löse das Tangram.
      </p>
      <Tangram
        done={() => {
          onSubmit('42')
          back()
        }}
      />
    </>
  ),
  submit: ignoreCaseSolution('42'),
  hideSubmit: true,
}

type Piece = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

interface PieceData {
  x: number
  y: number
  active: boolean
}

interface State {
  A: PieceData
  B: PieceData
  C: PieceData
  D: PieceData
  E: PieceData
  F: PieceData
  G: PieceData
}

const targets = {
  A: { x: 49, y: 32 },
  B: { x: 49 + 41, y: 32 },
  C: { x: 49, y: 32 + 41 },
  D: { x: 49 - 17, y: 32 + 123 },
  E: { x: 49 + 41, y: 32 + 123 },
  F: { x: 49 + 7, y: 32 + 205 },
  G: { x: 49 + 123, y: 32 + 280 },
}

function checkSnap(id: Piece, data: PieceData) {
  const distance = Math.sqrt(
    Math.pow(data.x - targets[id].x, 2) + Math.pow(data.y - targets[id].y, 2)
  )
  if (distance < 8) {
    data.active = false
    data.x = targets[id].x
    data.y = targets[id].y
  }
}

function Tangram({ done }: { done: () => void }) {
  const [state, setState] = useState<State>({
    A: { x: 273, y: 106, active: true },
    B: { x: 272, y: 203, active: true },
    C: { x: 250, y: 388, active: true },
    D: { x: 179, y: 107, active: true },
    E: { x: 14, y: 329, active: true },
    F: { x: 109, y: 369, active: true },
    G: { x: 206, y: 22, active: true },
  })

  const mouseSensor = useSensor(MouseSensor, {})
  const touchSensor = useSensor(TouchSensor, {})
  const keyboardSensor = useSensor(KeyboardSensor, {})
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  return (
    <div className="w-[344px] -ml-3 sm:ml-0 mt-6 bg-pink-100 h-[500px] relative">
      <DndContext
        sensors={sensors}
        onDragEnd={({ delta, active }) => {
          setState((old) => {
            const newState: State = JSON.parse(JSON.stringify(old))

            const id = active.id as Piece

            newState[id].x += delta.x
            newState[id].y += delta.y

            checkSnap(id, newState[id])

            return newState
          })
        }}
        modifiers={[restrictToParentElement]}
      >
        <svg
          viewBox="-17 0 263 321"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[263px] ml-8 pt-8"
        >
          <polygon
            points="82 82 41 123 0 82 41 41"
            style={{ stroke: 'black' }}
          />
          <polygon style={{ stroke: 'black' }} points="0 0 0 82 41 41" />
          <polygon style={{ stroke: 'black' }} points="82 0 82 82 41 41" />
          <polygon style={{ stroke: 'black' }} points="41 123 -17 181 41 239" />
          <polygon style={{ stroke: 'black' }} points="41 123 41 287 123 205" />
          <polygon style={{ stroke: 'black' }} points="123 205 7 321 123 321" />
          <polygon
            style={{ stroke: 'black' }}
            points="246 280 164 280 123 321 205 321"
          />
        </svg>
        <Draggable id="A" state={state} />
        <Draggable id="B" state={state} />
        <Draggable id="C" state={state} />
        <Draggable id="D" state={state} />
        <Draggable id="E" state={state} />
        <Draggable id="F" state={state} />
        <Draggable id="G" state={state} />
        {Object.values(state).every((data: PieceData) => !data.active) && (
          <div className="absolute left-[140px] top-[390px] flex flex-col items-center">
            <span>Miau, miau!</span>
            <button
              className="mt-3 px-2 py-0.5 bg-pink-300 hover:bg-pink-400 rounded"
              onClick={() => {
                done()
              }}
            >
              weiter
            </button>
          </div>
        )}
      </DndContext>
    </div>
  )
}

interface DraggableProps {
  state: State
  id: Piece
}

function Draggable({ state, id }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  if (!state[id].active) {
    return (
      <div
        className="absolute pointer-events-none"
        style={{ left: state[id].x, top: state[id].y }}
      >
        {renderSvg(id)}
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, left: state[id].x, top: state[id].y }}
      {...listeners}
      {...attributes}
      className="absolute opacity-80 z-10"
    >
      {renderSvg(id)}
    </div>
  )
}

function renderSvg(piece: Piece) {
  switch (piece) {
    case 'A':
      return (
        <svg
          viewBox="0 0 41 82"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[41px] text-red-500"
        >
          <polygon
            style={{ stroke: 'currentcolor', fill: 'currentcolor' }}
            points="0 0 0 82 41 41"
          />
        </svg>
      )
    case 'B':
      return (
        <svg
          viewBox="41 0 41 82"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[41px] text-orange-500"
        >
          <polygon
            style={{ stroke: 'currentcolor', fill: 'currentcolor' }}
            points="82 0 82 82 41 41"
          />
        </svg>
      )
    case 'C':
      return (
        <svg
          viewBox="0 41 82 82"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[82px] text-green-600"
        >
          <polygon
            points="82 82 41 123 0 82 41 41"
            style={{ stroke: 'currentcolor', fill: 'currentcolor' }}
          />
        </svg>
      )
    case 'D':
      return (
        <svg
          viewBox="-17 123 58 116"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[58px] text-cyan-500"
        >
          <polygon
            style={{ stroke: 'currentcolor', fill: 'currentcolor' }}
            points="41 123 -17 181 41 239"
          />
        </svg>
      )
    case 'E':
      return (
        <svg
          viewBox="41 123 82 164"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[82px] text-blue-500"
        >
          <polygon
            style={{ stroke: 'currentcolor', fill: 'currentcolor' }}
            points="41 123 41 287 123 205"
          />
        </svg>
      )
    case 'F':
      return (
        <svg
          viewBox="7 205 116 116"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[116px] text-fuchsia-500"
        >
          <polygon
            style={{ stroke: 'currentcolor', fill: 'currentcolor' }}
            points="123 205 7 321 123 321"
          />
        </svg>
      )
    case 'G':
      return (
        <svg
          viewBox="123 280 123 41"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[123px] text-pink-500"
        >
          <polygon
            style={{ stroke: 'currentcolor', fill: 'currentcolor' }}
            points="246 280 164 280 123 321 205 321"
          />
        </svg>
      )
  }
}
