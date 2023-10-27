import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { FaIcon } from './FaIcon'
import { submit_event } from '../lib/submit'

interface NameModalProps {
  onClose: () => void
  setUserName: (name: string) => void
  userId: string
}

export function NameModal({ onClose, setUserName, userId }: NameModalProps) {
  const [name, setName] = useState('')
  const [showPw, setShowPw] = useState(false)
  return (
    <div className="bg-black/20 fixed inset-0 flex justify-center items-center z-[150]">
      <div
        className="h-[400px] sm:w-[500px] w-full bg-white z-[200] rounded-xl relative mx-3"
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
          <p className="font-bold text-lg mt-6 mb-4 text-center">
            Herzlich Willkommen!
          </p>
          <div className="max-w-[365px] mx-auto">
            <p className="mt-2 text-center">
              Erstellen einen neuen Account und lege los.
            </p>
            <p className="mx-2 mt-8">Dein Name</p>
            <p className="mx-2">
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.code == 'Enter' && name.trim()) {
                    submit(name.trim())
                  }
                }}
                className="text-2xl border-pink-500 border-2 rounded outline-none px-1 w-full py-0.5"
                maxLength={30}
              />
            </p>
            <p className="mx-2 text-sm mt-1">
              {name.length > 0 && name.length < 3 ? (
                <span className="text-pink-600">Mindestens 3 Zeichen</span>
              ) : name.length > 30 ? (
                <span className="text-pink-600">Höchstens 30 Zeichen</span>
              ) : null}
            </p>
            <p className="mx-2 flex justify-between mt-6">
              <span>Passwort</span>
              <label className="select-none">
                <input
                  type="checkbox"
                  className="mr-1"
                  onChange={(e) => {
                    setShowPw(e.target.checked)
                  }}
                />
                anzeigen
              </label>
            </p>{' '}
            <p className="mx-2">
              <input
                type={showPw ? 'text' : 'password'}
                className="text-2xl border-pink-500 border-2 rounded outline-none px-1 w-full py-0.5"
              />
            </p>
          </div>
        </div>
        <p className="text-center mb-5 px-4 mt-12">
          <button
            className="px-2 py-0.5 bg-pink-200 hover:bg-pink-300 rounded disabled:bg-gray-200 disabled:text-gray-700"
            onClick={() => {
              submit(name.trim())
            }}
            disabled={!name.trim()}
          >
            Loslegen!
          </button>
        </p>
      </div>
    </div>
  )

  function submit(name: string) {
    setUserName(name)
    sessionStorage.setItem('einhorn_der_mathematik_name', name)
    submit_event(userId, -1, name)
  }
}
