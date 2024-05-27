import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { FaIcon } from './FaIcon'

interface HighscoreModalProps {
  onClose: () => void
}

export function HighscoreModal({ onClose }: HighscoreModalProps) {
  const [data, setData] = useState<
    { name: string; solves: number; createdAt: number }[] | null
  >(null)

  useEffect(
    () => {
      fetch('https://stats-einhorn.arrrg.de/highscore')
        .then((res) => res.json())
        .then((val) => {
          setData(val.entries)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div
      className="bg-black/20 fixed inset-0 flex justify-center items-center z-[150]"
      onClick={onClose}
    >
      <div
        className="h-[450px] w-[95%] sm:w-[500px] bg-white z-[200] rounded-xl relative pb-4"
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
          <p className="ml-4 font-bold text-lg mt-6 mb-4 text-center">
            Highscore
          </p>
          {data === null ? (
            <p>Daten werden geladen ...</p>
          ) : (
            <div>
              <table className="table-auto w-full mt-8">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>gelöste Aufgaben</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((entry, i, arr) => (
                    <tr
                      key={entry.name + '-' + entry.createdAt}
                      className="border-t-2"
                    >
                      <td
                        className="text-center"
                        title={new Date(entry.createdAt).toLocaleString()}
                      >
                        {entry.name}
                      </td>
                      <td className="text-center font-bold">{entry.solves}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-right mr-3 mt-6">
                <small className="italic">In den letzten 28 Tagen</small>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
