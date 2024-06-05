import { arrayOfLength } from '../utils/array-of-length'
import { cn } from '../utils/cn'

interface PlaceValueChartProps {
  value: number
}

export function PlaceValueChart({ value = 0 }: PlaceValueChartProps) {
  const blocks = value
    .toString()
    .split('')
    .map((val) => parseInt(val))

  return (
    <div className="flex justify-start">
      <div className="flex gap-x-3 divide-x-2 divide-gray-200 pb-3 text-xl mt-6 bg-white pr-3 pt-3 rounded">
        {renderBlock('H', blocks[0], 'text-pink-500')}
        {renderBlock('Z', blocks[1], 'text-orange-400')}
        {renderBlock('E', blocks[2], 'text-purple-400')}
      </div>
    </div>
  )

  function renderBlock(title: string, amount: number, colorClass: string) {
    return (
      <div
        className={cn(
          'min-h-[90px] basis-[50px] py-2.5 pt-1 pl-3 mobile:basis-[130px]',
          colorClass
        )}
      >
        <div className="font-bold text-black text-center">{title}</div>
        <div className="mt-3 flex gap-1 mobile:flex-col sm:gap-1.5">
          <div className="flex flex-col gap-1 mobile:flex-row sm:gap-1.5">
            {arrayOfLength(Math.min(amount, 5)).map(renderCircle)}
          </div>
          <div className="flex flex-col gap-1 mobile:flex-row sm:gap-1.5">
            {arrayOfLength(Math.max(amount - 5, 0)).map(renderCircle)}
          </div>
        </div>
      </div>
    )
  }

  function renderCircle(_: unknown, i: number) {
    return (
      <div key={i} className="inline-block h-4 w-4 rounded-full bg-current" />
    )
  }
}
