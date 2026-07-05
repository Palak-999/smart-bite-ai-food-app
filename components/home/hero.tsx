'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Truck, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const stats = [
  { icon: Truck, label: 'Free delivery', value: 'On $15+' },
  { icon: Clock, label: 'Avg. delivery', value: '22 min' },
  { icon: Star, label: 'Rated', value: '4.8 / 5' },
]

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/restaurants?q=${encodeURIComponent(q)}` : '/restaurants')
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/60 to-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20 lg:px-8">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Truck className="size-4" />
            Free delivery on your first order
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Delicious food, <span className="text-primary">delivered</span> to your door
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground text-pretty">
            Order from the best local restaurants with SmartBite AI. Fast delivery,
            smart recommendations, and offers you will love.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-7 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-2 border-border px-2 sm:border-r">
              <MapPin className="size-5 text-primary" />
              <span className="whitespace-nowrap text-sm font-medium">Downtown, City</span>
            </div>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for restaurants or dishes"
                className="h-11 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
                aria-label="Search for food"
              />
            </div>
            <Button type="submit" size="lg" className="rounded-xl font-semibold">
              Find Food
            </Button>
          </form>

          <div className="mt-7 flex flex-wrap gap-6">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative animate-fade-up">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border shadow-xl sm:aspect-[4/3] lg:aspect-square">
            <Image
              src="/images/hero-food.png"
              alt="A vibrant spread of delicious food dishes"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg sm:flex">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Star className="size-6 fill-current" />
            </span>
            <div>
              <p className="text-lg font-bold text-foreground">50,000+</p>
              <p className="text-xs text-muted-foreground">Happy foodies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
