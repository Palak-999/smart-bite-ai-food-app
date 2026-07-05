'use client'

import Link from 'next/link'
import { Activity, CalendarDays, Flame, ListChecks } from 'lucide-react'
import { useMemo } from 'react'
import { useCart } from '@/context/cart-context'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function MonthlyCalorieDashboard() {
  const { items } = useCart()

  const totalCalories = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + item.food.nutrition.calories * item.quantity,
        0,
      ),
    [items],
  )

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  )

  const estimatedMonthly = totalCalories * 30
  const averageCaloriesPerItem = totalItems ? Math.round(totalCalories / totalItems) : 0

  const chartData = useMemo(() => {
    const baseline = Math.max(200, totalCalories)
    return dayLabels.map((day, index) => ({
      day,
      calories: Math.round(baseline * (0.75 + index * 0.05)),
    }))
  }, [totalCalories])

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
        <h1 className="text-2xl font-bold">Monthly Calorie Dashboard</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add food items to your cart to see estimated calorie totals and monthly insights.
        </p>
        <Link
          href="/restaurants"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Browse restaurants
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Monthly Calorie Dashboard"
        subtitle="Track calories from selected food items and estimate your monthly intake."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 text-primary">
            <Flame className="size-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Cart calories
            </p>
          </div>
          <p className="mt-6 text-4xl font-bold">{totalCalories.toLocaleString()} kcal</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Total calories for the items currently selected in your cart.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 text-amber-500">
            <Activity className="size-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Estimated monthly
            </p>
          </div>
          <p className="mt-6 text-4xl font-bold">{estimatedMonthly.toLocaleString()} kcal</p>
          <p className="mt-2 text-sm text-muted-foreground">
            If you eat this cart selection every day for 30 days.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 text-sky-500">
            <CalendarDays className="size-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Avg per item
            </p>
          </div>
          <p className="mt-6 text-4xl font-bold">{averageCaloriesPerItem.toLocaleString()} kcal</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Average calories per item in your current cart.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Selected food items</h2>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              {totalItems} item{totalItems === 1 ? '' : 's'}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {items.map(({ food, quantity }) => (
              <div key={food.id} className="rounded-3xl border border-border bg-background p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{food.name}</p>
                    <p className="text-sm text-muted-foreground">{quantity} × {food.nutrition.calories} kcal</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {quantity * food.nutrition.calories} kcal
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Weekly calorie trend</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your selected cart calories visualized across the week.
          </p>

          <div className="mt-6 space-y-4">
            {chartData.map((item) => (
              <div key={item.day} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{item.day}</span>
                  <span>{item.calories.toLocaleString()} kcal</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      'h-full rounded-full bg-gradient-to-r from-primary to-amber-400',
                    )}
                    style={{ width: `${Math.min(100, Math.max(15, (item.calories / Math.max(totalCalories, 1)) * 100))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
