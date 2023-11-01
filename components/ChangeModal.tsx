import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { FaIcon } from './FaIcon'
import { makePost } from '../lib/make-post'
import { Draft } from 'immer'
import { State } from './App'

interface ChangeModalProps {
  onClose: () => void
  token: string
}

export function ChangeModal({ onClose, token }: ChangeModalProps) {
  const [pw, setPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [showPw, setShowPw] = useState(false)

  const isReady = newPw.length >= 4

  return (
    <div className="bg-black/20 fixed inset-0 flex justify-center items-center z-[150]">
      <div
        className="h-[370px] sm:w-[500px] w-full bg-white z-[200] rounded-xl relative mx-3"
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
            Passwort ändern
          </p>
          <div className="max-w-[365px] mx-auto">
            <p className="mx-2 mt-8">Aktuelles Passwort</p>
            <p className="mx-2">
              <input
                tabIndex={1}
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.code == 'Enter') {
                    submit()
                  }
                }}
                className="text-2xl border-pink-500 border-2 rounded outline-none px-1 w-full py-0.5"
                type="password"
              />
            </p>
            <p className="mx-2 flex justify-between mt-6">
              <span>Neues Passwort</span>
              <label className="select-none">
                <input
                  tabIndex={3}
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
                tabIndex={2}
                type={showPw ? 'text' : 'password'}
                value={newPw}
                onChange={(e) => {
                  setNewPw(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.code == 'Enter') {
                    submit()
                  }
                }}
                className="text-2xl border-pink-500 border-2 rounded outline-none px-1 w-full py-0.5"
              />
            </p>{' '}
            <p className="mx-2 text-sm mt-1">
              {newPw.length > 0 && newPw.length < 4 ? (
                <span className="text-pink-600">Mindestens 4 Zeichen</span>
              ) : null}
            </p>
          </div>
        </div>
        <p className="text-center mb-5 px-4 mt-12">
          <button
            tabIndex={4}
            className="px-2 py-0.5 bg-pink-200 hover:bg-pink-300 rounded disabled:bg-gray-200 disabled:text-gray-700"
            onClick={() => {
              submit()
            }}
            disabled={!isReady}
          >
            Passwort ändern
          </button>
        </p>
      </div>
    </div>
  )

  function submit() {
    if (!isReady) return

    makePost('/change', { password: pw, newPassword: newPw, token }).then(
      (res) => {
        if (res.ok) {
          // alert('Registrierung erfolgreich')
          alert('Passwort erfolgreich geändert.')
          onClose()
        } else {
          alert(res.reason)
        }
      }
    )
  }
}
