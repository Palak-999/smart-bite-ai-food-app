import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DietType, SpiceLevel } from '@/lib/types'

export function DietBadge({
  diet,
  className,
}: {
  diet: DietType | 'Veg' | 'Non-Veg'
  className?: string
}) {
  const isVeg = diet === 'Veg' || diet === 'Vegan'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold',
        isVeg
          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
          : 'border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400',
        className,
      )}
      aria-label={diet}
    >
      <span
        className={cn(
          'flex size-3 items-center justify-center rounded-[3px] border',
          isVeg ? 'border-emerald-600' : 'border-red-600',
        )}
      >
        <span
          className={cn(
            'size-1.5 rounded-full',
            isVeg ? 'bg-emerald-600' : 'bg-red-600',
          )}
        />
      </span>
      {diet}
    </span>
  )
}

export function SpiceBadge({
  spice,
  className,
}: {
  spice: SpiceLevel
  className?: string
}) {
  const tone =
    spice === 'Hot'
      ? 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300'
      : spice === 'Medium'
      ? 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300'
      : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold',
        tone,
        className,
      )}
      aria-label={`${spice} spice`}
    >
      {spice}
    </span>
  )
}

export function RatingBadge({
  rating,
  className,
}: {
  rating: number
  className?: string
}) {
  const tone =
    rating >= 4.5
      ? 'bg-emerald-600'
      : rating >= 4
        ? 'bg-emerald-500'
        : rating >= 3
          ? 'bg-amber-500'
          : 'bg-red-500'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold text-white',
        tone,
        className,
      )}
    >
      {rating.toFixed(1)}
      <Star className="size-3 fill-current" />
    </span>
  )
}
