'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, Frown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { restaurants, cuisineList } from '@/lib/data'
import { RestaurantCard } from '@/components/restaurant/restaurant-card'
import { RestaurantCardSkeleton } from '@/components/skeletons'

const quickFilters = [
  { id: 'rating', label: 'Rating 4.0+' },
  { id: 'fast', label: 'Fast Delivery' },
  { id: 'veg', label: 'Pure Veg' },
  { id: 'offers', label: 'Great Offers' },
] as const

type SortKey = 'relevance' | 'rating' | 'delivery' | 'priceLow' | 'priceHigh'
const PAGE_SIZE = 6

export function RestaurantBrowser() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string[]>([])
  const [cuisine, setCuisine] = useState<string>('all')
  const [sort, setSort] = useState<SortKey>('relevance')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const toggle = (id: string) => {
    setVisible(PAGE_SIZE)
    setActive((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const filtered = useMemo(() => {
    let list = restaurants.filter((r) => {
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some((c) => c.toLowerCase().includes(q))
      const matchesCuisine =
        cuisine === 'all' || r.cuisines.includes(cuisine)
      const matchesRating = !active.includes('rating') || r.rating >= 4.0
      const matchesFast = !active.includes('fast') || r.deliveryTime <= 30
      const matchesVeg = !active.includes('veg') || r.pureVeg
      const matchesOffers = !active.includes('offers') || Boolean(r.offer)
      return (
        matchesQuery &&
        matchesCuisine &&
        matchesRating &&
        matchesFast &&
        matchesVeg &&
        matchesOffers
      )
    })

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating
        case 'delivery':
          return a.deliveryTime - b.deliveryTime
        case 'priceLow':
          return a.priceForTwo - b.priceForTwo
        case 'priceHigh':
          return b.priceForTwo - a.priceForTwo
        default:
          return 0
      }
    })
    return list
  }, [query, active, cuisine, sort])

  const shown = filtered.slice(0, visible)

  return (
    <div>
      {/* Search + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setVisible(PAGE_SIZE)
            }}
            placeholder="Search restaurants or cuisines..."
            className="h-11 pl-9"
            aria-label="Search restaurants"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={cuisine} onValueChange={(v) => { setCuisine(v); setVisible(PAGE_SIZE) }}>
            <SelectTrigger className="h-11 w-40" aria-label="Filter by cuisine">
              <SelectValue placeholder="Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              {cuisineList.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-11 w-40" aria-label="Sort restaurants">
              <SlidersHorizontal className="size-4" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
              <SelectItem value="delivery">Fastest Delivery</SelectItem>
              <SelectItem value="priceLow">Price: Low to High</SelectItem>
              <SelectItem value="priceHigh">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick filter chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {quickFilters.map((f) => {
          const on = active.includes(f.id)
          return (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              aria-pressed={on}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
                on
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent',
              )}
            >
              {f.label}
            </button>
          )
        })}
        {(active.length > 0 || cuisine !== 'all' || query) && (
          <button
            onClick={() => {
              setActive([])
              setCuisine('all')
              setQuery('')
              setVisible(PAGE_SIZE)
            }}
            className="rounded-full px-4 py-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} restaurant{filtered.length === 1 ? '' : 's'} found
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
          <Frown className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No restaurants match your filters</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting or clearing your filters.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full px-8"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
