import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { DietBadge } from '@/components/food/badges'
import { AddToCartButton } from '@/components/food/add-to-cart-button'
import type { Food } from '@/lib/types'

export function FoodCard({ food }: { food: Food }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <Link
        href={`/food/${food.slug}`}
        className="relative aspect-[4/3] overflow-hidden"
        aria-label={food.name}
      >
        <Image
          src={food.image || '/placeholder.svg'}
          alt={food.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <DietBadge diet={food.diet} className="bg-background/90 backdrop-blur" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/food/${food.slug}`}>
            <h3 className="line-clamp-1 font-semibold text-foreground transition-colors hover:text-primary">
              {food.name}
            </h3>
          </Link>
          <span className="flex shrink-0 items-center gap-0.5 text-sm font-semibold text-amber-500">
            <Star className="size-3.5 fill-current" />
            {food.rating}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{food.description}</p>
        <p className="text-xs text-muted-foreground">{food.restaurantName}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-foreground">
            ${food.price.toFixed(2)}
          </span>
          <AddToCartButton food={food} />
        </div>
      </div>
    </div>
  )
}
