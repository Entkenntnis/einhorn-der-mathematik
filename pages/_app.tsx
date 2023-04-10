import { enableMapSet } from 'immer'
import { AppProps } from 'next/app'

import 'tailwindcss/tailwind.css'
import 'react-clock/dist/Clock.css'

enableMapSet()

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
