import type { Metadata } from 'next'
import { Footer } from '@/components/layout/footer'
import { RestaurantBrowser } from '@/components/restaurant/restaurant-browser'

export const metadata: Metadata = {
  title: 'Restaurants | SmartBite AI',
  description: 'Browse and filter the best restaurants near you on SmartBite AI.',
}

export default function RestaurantsPage() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Restaurants near you
          </h1>
          <p className="mt-1 text-muted-foreground">
            Discover top-rated places delivering to your door.
          </p>
        </header>
        <RestaurantBrowser />
      </main>
    </>
  )
}
