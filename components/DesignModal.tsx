import { Draft } from 'immer'
import { State } from '../lib/types'
import { makePost } from '../lib/make-post'

interface AboutModalProps {
  onClose: () => void
  core: State
  mut: (fn: (draft: Draft<State>) => void) => void
}

export function DesignModal({ onClose, core, mut }: AboutModalProps) {
  return (
    <div
      className="bg-black/20 fixed inset-0 flex justify-center items-center z-[150]"
      onClick={onClose}
    >
      <div
        className="h-[300px] overflow-y-auto w-[400px] bg-white z-[200] rounded-xl relative flex justify-between flex-col"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div>
          <p className="ml-4 font-bold text-lg mt-2 mb-4">Aussehen</p>
          <p className="ml-4">
            <label>
              Hintergrundbild:{' '}
              <select
                value={core.background}
                onChange={(e) => {
                  mut((s) => {
                    s.background = e.target.value as any
                  })
                  makePost('/event', {
                    userId: core.playerData.id,
                    value: 'select_wallpaper_' + e.target.value,
                  })
                }}
                className="p-2"
              >
                <option value="pink-clouds">rose Wolken</option>
                <option value="night-sky">Nachthimmel</option>
                <option value="desert">Wüste</option>
                <option value="beach">Strand</option>
                <option value="mountains">Berge</option>
              </select>
            </label>
          </p>
          <p className="ml-4 mt-4">
            <label>
              Linienfarbe:{' '}
              <select
                value={core.lineColor}
                onChange={(e) => {
                  mut((s) => {
                    s.lineColor = e.target.value as any
                  })
                  makePost('/event', {
                    userId: core.playerData.id,
                    value: 'select_linecolor_' + e.target.value,
                  })
                }}
                className="p-2"
              >
                <option value="rainbow">Regenbogen</option>
                <option value="gray">grau</option>
                <option value="pink">pink</option>
              </select>
            </label>
          </p>
        </div>
        <p className="text-center mb-5 mt-3">
          <button
            className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
            onClick={onClose}
          >
            Schließen
          </button>
        </p>
      </div>
    </div>
  )
}
