'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Star, Flame, ShoppingCart, Store } from 'lucide-react'
import type { Food } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DietBadge, SpiceBadge } from '@/components/food/badges'
import { StarRating } from '@/components/star-rating'
import { useCart } from '@/context/cart-context'
import { toast } from 'sonner'

export function FoodDetail({ food }: { food: Food }) {
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()
  const ingredients = food.ingredients ?? []
  const reviews = food.reviews ?? []

  const handleAdd = () => {
    addItem(food, qty)
    toast.success(`${qty} × ${food.name} added to cart`, {
      description: `$${(food.price * qty).toFixed(2)} • ${food.restaurantName}`,
    })
  }

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-muted">
          <Image
            src={food.image || '/placeholder.svg'}
            alt={food.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <DietBadge diet={food.diet} />
            {food.popular && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <Link
            href={`/restaurants`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Store className="size-4" /> {food.restaurantName}
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance">
            {food.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-sm font-semibold text-primary">
              <Star className="size-3.5 fill-primary" />
              {food.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              {food.reviewCount} reviews
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Flame className="size-3.5" /> {food.nutrition.calories} cal
            </span>
            <SpiceBadge spice={food.spice} />
          </div>

          <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
            {food.description}
          </p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-bold">${food.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">per serving</span>
          </div>

          {/* Quantity + add */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center rounded-full border border-border bg-card p-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-10 text-center text-lg font-semibold" aria-live="polite">
                {qty}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <Button
              size="lg"
              onClick={handleAdd}
              className="flex-1 gap-2 rounded-full text-base"
            >
              <ShoppingCart className="size-5" />
              Add to Cart • ${(food.price * qty).toFixed(2)}
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Tabs */}
          <Tabs defaultValue="ingredients">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="mt-4">
              <ul className="flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="nutrition" className="mt-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Calories', value: `${food.nutrition.calories}`, unit: 'kcal' },
                  { label: 'Protein', value: `${food.nutrition.protein}`, unit: 'g' },
                  { label: 'Carbs', value: `${food.nutrition.carbs}`, unit: 'g' },
                  { label: 'Fat', value: `${food.nutrition.fat}`, unit: 'g' },
                ].map((n) => (
                  <div
                    key={n.label}
                    className="rounded-2xl border border-border bg-card p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-primary">{n.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {n.unit} · {n.label}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4 space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{rev.name}</p>
                        <p className="text-xs text-muted-foreground">{rev.date}</p>
                      </div>
                    </div>
                    <StarRating rating={rev.rating} size={14} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
