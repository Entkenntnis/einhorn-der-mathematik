import { Metadata } from 'next'

import 'tailwindcss/tailwind.css'
import 'react-clock/dist/Clock.css'
import './faicon.css'

export const metadata: Metadata = {
  title: 'Einhorn der Mathematik',
  description:
    'Löse kleine Rätsel mit der Einhorn-Dame Tina und ihrem Bruder Teo. Knobel-Spaß für alle Altersgruppen',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  )
}
