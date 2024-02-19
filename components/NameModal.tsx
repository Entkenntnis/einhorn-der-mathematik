import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { FaIcon } from './FaIcon'

interface NameModalProps {
  onClose: () => void
  setUserName: (name: string) => void
}

export function NameModal({ onClose, setUserName }: NameModalProps) {
  const [name, setName] = useState('')
  return (
    <div className="bg-black/20 fixed inset-0 flex justify-center items-center z-[150]">
      <div
        className="h-[250px] w-[95%] sm:w-[500px] bg-white z-[200] rounded-xl relative"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <button
          className="absolute top-3 right-3 h-8 w-8 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={() => {
            onClose()
          }}
        >
          <FaIcon icon={faTimes} />
        </button>
        <div>
          <p className="ml-4 font-bold text-lg mt-6 mb-4 text-center">
            Herzlich Willkommen!
          </p>
          <p className="text-center mt-6">Wie lautet dein Name?</p>
          <p className="text-center">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.code == 'Enter' && name.trim()) {
                  setUserName(name.trim())
                }
              }}
              className="mt-4 text-3xl border-pink-500 border-2 rounded text-center outline-none w-[90%]"
            />
          </p>
        </div>
        <p className="text-center px-4 mt-8">
          <button
            className="px-2 py-0.5 bg-pink-200 hover:bg-pink-300 rounded disabled:bg-gray-200 disabled:text-gray-700"
            onClick={() => {
              const trimmedName = name.trim()
              setUserName(trimmedName)
            }}
            disabled={!name.trim()}
          >
            Loslegen!
          </button>
        </p>
      </div>
    </div>
  )
}
