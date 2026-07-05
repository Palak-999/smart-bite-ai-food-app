import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { FoodDetail } from '@/components/food/food-detail'
import { DishCarousel } from '@/components/food/dish-carousel'
import { foods, getFoodBySlug, getRecommendedFoods } from '@/lib/data'

export function generateStaticParams() {
  return foods.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const food = getFoodBySlug(slug)
  if (!food) return { title: 'Dish not found | SmartBite AI' }
  return {
    title: `${food.name} | SmartBite AI`,
    description: food.description,
  }
}

export default async function FoodPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const food = getFoodBySlug(slug)
  if (!food) notFound()

  const recommended = getRecommendedFoods(food.id, 8)

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/restaurants" className="hover:text-primary">
            Restaurants
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="font-medium text-foreground">{food.name}</span>
        </nav>

        <FoodDetail food={food} />

        <section className="mt-16">
          <DishCarousel dishes={recommended} />
        </section>
      </main>
    </>
  )
}
