import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { FaIcon } from './FaIcon'
import { makePost } from '../lib/make-post'
import { Draft } from 'immer'
import { State } from './App'

interface NameModalProps {
  onClose: () => void
  mut: (fn: (draft: Draft<State>) => void) => void
}

export function LoginModal({ onClose, mut }: NameModalProps) {
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')

  return (
    <div
      className="bg-black/20 fixed inset-0 flex justify-center items-center z-[150]"
      onClick={onClose}
    >
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
          <p className="font-bold text-lg mt-6 mb-4 text-center">Login</p>
          <div className="max-w-[365px] mx-auto">
            <p className="mx-2 mt-8">Name</p>
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
            <p className="mx-2  mt-6">
              <span>Passwort</span>
            </p>
            <p className="mx-2">
              <input
                tabIndex={2}
                type={'password'}
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
          >
            Einloggen!
          </button>
        </p>
      </div>
    </div>
  )

  function submit() {
    makePost('/login', { name, password: pw }).then((res) => {
      if (!res.ok) {
        alert(res.reason)
      }
      mut((state) => {
        state.playerData.loggedIn = true
        state.playerData.token = res.token
        state.playerData.name = res.data.name
        state.playerData.id = res.id
        state.modal = null
      })
    })
  }
}
