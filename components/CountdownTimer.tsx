import { useState, useEffect } from 'react'

export function CountdownTimer({ toWait }: { toWait: number }) {
  const [seconds, setSeconds] = useState(Math.ceil(toWait / 1000))
  useEffect(() => {
    seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000)
  }, [seconds])
  if (seconds == 0) return null
  return (
    <div className="mt-6 text-gray-600 italic">
      Warte noch {seconds} Sekunde{seconds == 1 ? '' : 'n'} bis zum nächsten
      Versuch.
    </div>
  )
}
