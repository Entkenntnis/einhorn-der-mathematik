import { impressum } from '../impressum'

interface AboutModalProps {
  onClose: () => void
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div
      className="bg-black/20 fixed inset-0 flex justify-center items-center z-[150]"
      onClick={onClose}
    >
      <div
        className="h-[480px] overflow-y-auto w-[700px] bg-white z-[200] rounded-xl relative flex justify-between flex-col"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div>
          {' '}
          <p className="ml-4 font-bold text-lg mt-2 mb-4">Impressum</p>
          <p className="ml-4">Betreiber:</p>
          <p className="m-3 ml-4 mb-6">
            {impressum.name}
            <br />
            {impressum.address1}
            <br />
            {impressum.address2}
            <br />
            {impressum.contact}
          </p>
          <p className="ml-4 mb-4">
            Hintergrund:{' '}
            <a
              href="https://www.wallpaperflare.com/pink-and-blue-sky-sky-clouds-nature-wallpaper-275895"
              className="underline"
              target="_blank"
            >
              wallpaperflare
            </a>
          </p>
          <p className="ml-4 font-bold text-lg mt-2 mb-4">Datenschutz</p>
          <p className="mx-4 mb-4">
            Diese Website wird auf einem Uberspace gehostet. Bei der
            Registrierung werden Benutzername und gelöste Aufgaben auf dem
            Server gespeichert. Es werden Aufrufstatistiken angelegt, um die
            Qualität des Angebots zu verbessern. Auf dem Gerät werden keine
            Daten gespeichert. Alle Daten werden innerhalb von Deutschland
            verarbeitet.
          </p>
        </div>
        <p className="text-center mb-5 mt-3">
          <button
            className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
            onClick={onClose}
          >
            Schließen
          </button>
        </p>
      </div>
    </div>
  )
}
