import { Metadata } from 'next'

import 'tailwindcss/tailwind.css'
import 'react-clock/dist/Clock.css'

export const metadata: Metadata = {
  title: 'Einhorn der Mathematik',
  description: 'Mathe-Knobeleien, Cyperpunk',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
