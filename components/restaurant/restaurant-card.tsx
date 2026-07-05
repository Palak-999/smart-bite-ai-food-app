import Image from 'next/image'
import Link from 'next/link'
import { Clock, Wallet, BadgePercent } from 'lucide-react'
import { DietBadge, RatingBadge } from '@/components/food/badges'
import type { Restaurant } from '@/lib/types'

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      href={`/restaurants/${restaurant.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={restaurant.image || '/placeholder.svg'}
          alt={restaurant.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {restaurant.promoted && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2 py-0.5 text-[11px] font-semibold text-primary backdrop-blur">
            Promoted
          </span>
        )}
        {restaurant.offer && (
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2 pt-8 text-sm font-bold text-white">
            <BadgePercent className="size-4" />
            {restaurant.offer}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold text-foreground">
            {restaurant.name}
          </h3>
          <RatingBadge rating={restaurant.rating} />
        </div>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {restaurant.cuisines.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {restaurant.deliveryTime} min
          </span>
          <span className="flex items-center gap-1">
            <Wallet className="size-3.5" />${restaurant.priceForTwo} for two
          </span>
        </div>
        <div className="pt-1">
          <DietBadge diet={restaurant.diet} />
        </div>
      </div>
    </Link>
  )
}
