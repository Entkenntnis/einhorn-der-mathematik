import {
  faCheck,
  faCircleDot,
  faLeftRight,
  faQuestion,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '../utils/cn'
import { FaIcon } from '../../FaIcon'
import { ExStatus } from '../feedback/exercise-feedback'

interface OverlayMarkerProps {
  index: number
  isActive: boolean
  exStatus: ExStatus
  isSearched?: boolean
  useQuestionIcon?: boolean
}

export function OverlayMarker({
  index,
  isActive,
  exStatus,
  isSearched,
  useQuestionIcon,
}: OverlayMarkerProps) {
  function getIcon() {
    if (useQuestionIcon) return faQuestion
    if (exStatus === 'correct') return faCheck
    if (exStatus === 'revealed') {
      if (isActive) return faXmark
      if (isSearched) return faCircleDot
    }
    return faLeftRight
  }

  function getColorClasses() {
    if (exStatus === 'revealed') {
      if (isActive) return 'bg-red-100 text-orange'
      if (isSearched) return 'bg-pink-600 text-white'
    }
    return exStatus === 'fresh'
      ? 'bg-pink-100 text-pink-500'
      : exStatus === 'incorrect'
      ? 'bg-red-100 text-red-600'
      : 'bg-pink-600 text-white'
  }

  return (
    <div
      key={index}
      className={cn(
        'relative -mb-8 h-16 w-[3px] shadow-menu',
        exStatus === 'incorrect' || (exStatus === 'revealed' && isActive)
          ? 'bg-red-100'
          : 'bg-pink-600'
      )}
      id={isActive ? 'range-input-user-maker' : undefined}
    >
      <div
        className={cn(
          'absolute -bottom-6 -left-[19px] h-10 w-10 rounded-full  pt-[7px] text-center text-lg shadow-menu',
          'transition-colors',
          isSearched && 'z-30',
          getColorClasses()
        )}
      >
        <FaIcon icon={getIcon()} />
      </div>
    </div>
  )
}
