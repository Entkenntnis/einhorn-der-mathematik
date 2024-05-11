import { createContext } from 'react'

export const CounterContext = createContext({
  count: 0,
  target: 5,
  increment: () => {},
  onDone: () => {},
})
