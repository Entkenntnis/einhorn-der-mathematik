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
        className="h-[560px] overflow-y-auto w-[700px] bg-white z-[200] rounded-xl relative flex justify-between flex-col"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div>
          {' '}
          <p className="ml-4 font-bold text-lg mt-2 mb-4">Impressum</p>
          <p className="ml-4">Betreiber:</p>
          <p className="m-3 ml-4 mb-2">
            {impressum.name}
            <br />
            {impressum.address1}
            <br />
            {impressum.address2}
            <br />
            {impressum.contact}
          </p>
          <p className="ml-4 mb-4">
            <a
              href="https://github.com/Entkenntnis/einhorn-der-mathematik"
              target="_blank"
              className="underline"
            >
              Quellcode auf GitHub
            </a>{' '}
            <span className="ml-12 text-gray-800">Version: April 2024</span>
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
            , Regenbogen:{' '}
            <a
              className="underline"
              target="_blank"
              href="https://de.freepik.com/vektoren-kostenlos/mehrfarbige-regenbogenfahnen-design-vektorillustration_24046490.htm#fromView=search&page=1&position=31&uuid=0727ae31-c3eb-47fe-9b44-783763905947"
            >
              Bild von Rochak Shukla auf Freepik
            </a>
          </p>
          <p className="ml-4 font-bold text-lg mt-2 mb-4">Datenschutz</p>
          <p className="mx-4 mb-2">
            Diese Website wird auf einem Uberspace gehostet. Bei der Nutzung
            werden keine Daten auf dem Gerät gespeichert. Auf Wunsch kann der
            Fortschritt auf dem Gerät gespeichert werden. Dann wird der
            Spielstand dauerhaft im Browser hinterlegt. Es werden
            Aufrufstatistiken angelegt. Es werden Protokolle geführt, um die
            Qualität des Angebots zu verbessern. Daten werden nicht an Dritte
            weitergeben. Alle Daten werden innerhalb von Deutschland
            verarbeitet.
          </p>
          <p className="ml-4 mb-3">
            <button
              className="underline hover:text-red-500"
              onClick={() => {
                const val = confirm(
                  'Fortschritt jetzt zurücksetzen? Diese Aktion kann nicht rückgangig gemacht werden.'
                )
                if (val) {
                  sessionStorage.removeItem('einhorn_der_mathematik_data_v2')
                  localStorage.removeItem('einhorn_der_mathematik_data_v2')
                  window.location.reload()
                }
              }}
            >
              Fortschritt zurücksetzen
            </button>
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
