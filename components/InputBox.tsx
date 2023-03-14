import clsx from 'clsx'
import { useState } from 'react'

interface InputBoxProps {
  className?: string
  submit: (value: string) => void
}

export function InputBox({ className, submit }: InputBoxProps) {
  const [value, setValue] = useState('')

  return (
    <div>
      <input
        type="text"
        className={clsx(
          'bg-gray-50 border-gray-300 text-gray-900 rounded-lg outline-none',
          ' focus:ring-pink-500 focus:border-pink-500 border p-1 w-[250px]',
          className
        )}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.code == 'Enter') {
            submit(value)
          }
        }}
      />
      <button
        className="ml-4 px-3 py-1 rounded bg-pink-300 hover:bg-pink-400"
        onClick={() => {
          submit(value)
        }}
      >
        Los
      </button>
    </div>
  )
}
