import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { FaIcon } from './FaIcon'
import { makePost } from '../lib/make-post'
import { Draft } from 'immer'
import { State } from './App'

interface NameModalProps {
  onClose: () => void
  mut: (fn: (draft: Draft<State>) => void) => void
}

export function NameModal({ onClose, mut }: NameModalProps) {
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [checkStatus, setCheckStatus] = useState<'pending' | 'ok' | 'taken'>(
    'pending'
  )

  const isReady =
    name.trim().length >= 3 && pw.length >= 4 && checkStatus == 'ok'

  useEffect(() => {
    void (async () => {
      // todo sync
      setCheckStatus('pending')
      const response = await makePost('/check', { name })
      if (response.ok) {
        if (response.userExists) {
          setCheckStatus('taken')
        } else {
          setCheckStatus('ok')
        }
      }
    })()
  }, [name])

  return (
    <div className="bg-black/20 fixed inset-0 flex justify-center items-center z-[150]">
      <div
        className="h-[420px] sm:w-[500px] w-full bg-white z-[200] rounded-xl relative mx-3"
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
                tabIndex={1}
                value={name}
                placeholder="Bitte Name eingeben"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.code == 'Enter') {
                    submit()
                  }
                }}
                className="text-2xl border-pink-500 border-2 rounded outline-none px-1 w-full py-0.5"
                maxLength={30}
              />
            </p>
            <p className="mx-2 text-sm mt-1">
              {name.length > 0 && name.trim().length < 3 ? (
                <span className="text-pink-600">Mindestens 3 Zeichen</span>
              ) : name.length > 30 ? (
                <span className="text-pink-600">Höchstens 30 Zeichen</span>
              ) : checkStatus == 'taken' ? (
                <span className="text-pink-600">Name ist bereits vergeben</span>
              ) : null}
            </p>
            <p className="mx-2 flex justify-between mt-6">
              <span>Passwort</span>
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
                value={pw}
                placeholder="Bitte Passwort eingeben"
                onChange={(e) => {
                  setPw(e.target.value)
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
              {pw.length > 0 && pw.length < 4 ? (
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
            Loslegen!
          </button>
        </p>
      </div>
    </div>
  )

  function submit() {
    if (!isReady) return

    makePost('/register', { name, password: pw }).then((res) => {
      if (res.ok) {
        // alert('Registrierung erfolgreich')
        makePost('/login', { name, password: pw }).then((res) => {
          if (!res.ok) {
            alert('Fehler aufgetreten: ' + res.reason)
          }
          mut((state) => {
            state.playerData.loggedIn = true
            state.playerData.token = res.token
            state.playerData.name = res.data.name
            state.playerData.id = res.id
            state.modal = null
          })
        })
      } else {
        alert(
          'Es ist ein Fehler aufgetreten: ' +
            res.reason +
            '\n\nProbiere es erneut.'
        )
      }
    })
  }
}
