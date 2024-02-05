interface RedirectModalProps {
  onClose: () => void
}

export function RedirectModal({ onClose }: RedirectModalProps) {
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
          <p className="ml-4  text-2xl mt-6 mb-7 text-center ">
            Das Einhorn ist umgezogen!
          </p>
          <img
            src="/einhorn.png"
            className="w-[230px] mx-auto"
            alt="Kopf eines Einhorn"
          />
          <p className="mx-5 mt-8">
            Die Inhalte hier wurden auf Serlo übertragen. Dort wird daran aktiv
            weitergearbeitet und es entstehen laufend neue Inhalte.
          </p>
          <p className="mx-3 mt-6 text-center">
            <a
              href="https://de.serlo.org/mathe/298181/einhorn-der-mathematik-%C3%BCbersicht-aller-episoden"
              className="px-4 py-2 bg-pink-300 hover:bg-pink-400 rounded text-lg"
            >
              Zur neuen Oberfläche
            </a>
          </p>
        </div>
        <p className="ml-6 mb-5 mt-3">
          <button className="text-gray-600 underline" onClick={onClose}>
            Hier bleiben
          </button>
        </p>
      </div>
    </div>
  )
}
