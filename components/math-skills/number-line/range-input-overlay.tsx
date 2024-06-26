import { cn } from '../utils/cn'
import { ExStatus } from '../feedback/exercise-feedback'
import { OverlayMarker } from './overlay-marker'

interface RangeInputOverlayProps {
  maxValue: number // highest value of number line
  selectedValue: number
  searchedValue: number
  exStatus: ExStatus
  useQuestionIcon?: boolean
}

const stepAmount = 40

export function RangeInputOverlay({
  maxValue,
  selectedValue,
  searchedValue,
  exStatus,
  useQuestionIcon,
}: RangeInputOverlayProps) {
  const step = maxValue / 40

  const selectedStep = selectedValue / step
  const searchedStep = searchedValue / step

  return (
    <div className="relative flex items-center justify-between">
      <div className="absolute -left-4 -right-7 top-[17px] h-[3px] bg-pink-600 sm:-right-10"></div>
      <div className="absolute -right-8 h-0 w-0 border-y-8 border-l-[16px] border-y-transparent border-l-pink-600 sm:-right-12"></div>

      {Array.from({ length: stepAmount + 1 }).map((_, i) => {
        const isActive = selectedStep === i
        const isSearched = searchedStep === i

        if (isActive || (exStatus === 'revealed' && isSearched)) {
          return (
            <OverlayMarker
              isActive={isActive}
              exStatus={exStatus}
              isSearched={isSearched}
              useQuestionIcon={useQuestionIcon}
              index={i}
              key={i}
            />
          )
        }

        const extraClasses =
          i % 10 === 0
            ? 'bg-pink-600 h-9'
            : i % 5 === 0
            ? 'h-7 bg-pink-300'
            : 'h-4 bg-pink-300'
        return <span key={i} className={cn('w-[3px]', extraClasses)}></span>
      })}
    </div>
  )
}
