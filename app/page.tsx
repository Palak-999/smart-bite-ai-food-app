import { Hero } from '@/components/home/hero'
import { AiRecommender } from '@/components/home/ai-recommender'
import { Offers } from '@/components/home/offers'
import { CategoryCard } from '@/components/category-card'
import { RestaurantCard } from '@/components/restaurant/restaurant-card'
import { FoodCard } from '@/components/food/food-card'
import { SectionHeading } from '@/components/section-heading'
import { categories, restaurants, foods } from '@/lib/data'
import Link from 'next/link'
import { ChevronRight, FileText, ListChecks, MessageSquare, Sparkles } from 'lucide-react'

export default function HomePage() {
  const popularRestaurants = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)
  const popularDishes = foods.filter((f) => f.popular).slice(0, 8)

  return (
    <div>
      <Hero />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="What's on your mind?"
          subtitle="Browse by category and find your craving"
          href="/restaurants"
          linkLabel="All restaurants"
        />
        <div className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-8">
          {categories.map((category) => (
            <div key={category.id} className="shrink-0">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommender */}
      <AiRecommender />

      {/* Popular restaurants */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <SectionHeading
          title="Popular restaurants near you"
          subtitle="Top-rated spots loved by foodies in your area"
          href="/restaurants"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Popular dishes */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="Trending dishes"
          subtitle="The most ordered dishes this week"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularDishes.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* Offers */}
      <Offers />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            AI-Powered Tools
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground">
            Tools for smarter ordering and meal tracking
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Use SmartBite AI to chat with recommendations, track your calories, and export nutrition reports for every order.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'AI Assistant',
                description: 'Get meal suggestions, calorie advice, and restaurant tips from a conversational assistant.',
                href: '/ai-chat-assistant',
                icon: MessageSquare,
              },
              {
                title: 'Calorie Dashboard',
                description: 'Monitor calories across meals and stay on top of your daily intake.',
                href: '/monthly-calorie-dashboard',
                icon: ListChecks,
              },
              {
                title: 'Excel Report',
                description: 'Download a CSV nutrition report for your cart with calories, quantities, and prices.',
                href: '/excel-calorie-report',
                icon: FileText,
              },
            ].map((feature) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="rounded-3xl border border-border bg-background p-6 transition hover:border-primary hover:bg-primary/5"
                >
                  <div className="flex items-center gap-3 text-primary">
                    <Icon className="size-5" />
                    <p className="text-sm font-semibold">{feature.title}</p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                    <span>Explore</span>
                    <ChevronRight className="size-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
