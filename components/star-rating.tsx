import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  rating,
  size = 16,
  className,
}: {
  rating: number
  size?: number
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i
        const half = !filled && rating >= i - 0.5
        return (
          <span key={i} className="relative inline-flex">
            <Star
              style={{ width: size, height: size }}
              className="text-muted-foreground/40"
            />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? '100%' : '50%' }}
              >
                <Star
                  style={{ width: size, height: size }}
                  className="fill-primary text-primary"
                />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
