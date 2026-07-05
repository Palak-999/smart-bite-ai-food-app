'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Wand2, Loader2, Star, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { DietBadge } from '@/components/food/badges'
import { AddToCartButton } from '@/components/food/add-to-cart-button'
import { recommendMeals, type ScoredFood } from '@/lib/recommend'
import type { Mood, DietType, SpiceLevel } from '@/lib/types'
import { cn } from '@/lib/utils'

const moods: Mood[] = ['Happy', 'Tired', 'Working', 'Party']
const diets: DietType[] = ['Veg', 'Non-Veg', 'Vegan']
const spices: SpiceLevel[] = ['Mild', 'Medium', 'Hot']

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
              value === opt
                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                : 'border-border bg-background text-foreground hover:border-primary/50',
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export function AiRecommender() {
  const [budget, setBudget] = useState(15)
  const [mood, setMood] = useState<Mood>('Happy')
  const [diet, setDiet] = useState<DietType>('Non-Veg')
  const [spice, setSpice] = useState<SpiceLevel>('Medium')
  const [results, setResults] = useState<ScoredFood[] | null>(null)
  const [loading, setLoading] = useState(false)

  function handleGenerate() {
    setLoading(true)
    setResults(null)
    // simulate AI "thinking"
    setTimeout(() => {
      setResults(recommendMeals({ budget, mood, diet, spice }))
      setLoading(false)
    }, 900)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-accent/70 via-card to-card shadow-sm">
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2">
          {/* Controls */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary">
              <Sparkles className="size-4" />
              AI Meal Recommender
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
              Not sure what to eat? Let AI decide.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Tell us your budget, mood, and cravings — we will match you with three
              perfect meals from our menu.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Budget</p>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-bold text-primary">
                    ${budget}
                  </span>
                </div>
                <Slider
                  value={[budget]}
                  onValueChange={(v) => setBudget(v[0])}
                  min={5}
                  max={30}
                  step={1}
                  aria-label="Budget"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>$5</span>
                  <span>$30</span>
                </div>
              </div>

              <ChipGroup label="Mood" options={moods} value={mood} onChange={setMood} />
              <ChipGroup
                label="Dietary preference"
                options={diets}
                value={diet}
                onChange={setDiet}
              />
              <ChipGroup label="Spice level" options={spices} value={spice} onChange={setSpice} />
            </div>

            <Button
              onClick={handleGenerate}
              size="lg"
              disabled={loading}
              className="mt-6 w-full rounded-xl font-semibold sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Finding your meals...
                </>
              ) : (
                <>
                  <Wand2 className="size-4" />
                  Recommend meals
                </>
              )}
            </Button>
          </div>

          {/* Results */}
          <div className="flex flex-col">
            {loading && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/30 bg-background/50 p-8 text-center">
                <Loader2 className="size-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-muted-foreground">
                  Analyzing your taste profile...
                </p>
              </div>
            )}

            {!loading && !results && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/30 bg-background/50 p-8 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="size-7" />
                </span>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Set your preferences and hit{' '}
                  <span className="font-semibold text-foreground">Recommend meals</span> to
                  see AI-picked dishes here.
                </p>
              </div>
            )}

            {!loading && results && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">
                    Your top {results.length} matches
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary"
                  >
                    <RefreshCw className="size-3.5" />
                    Regenerate
                  </button>
                </div>
                {results.length === 0 && (
                  <p className="rounded-2xl border border-border bg-background p-6 text-center text-sm text-muted-foreground">
                    No perfect match found. Try increasing your budget or changing filters.
                  </p>
                )}
                {results.map(({ food, reasons }, i) => (
                  <div
                    key={food.id}
                    className="flex gap-3 rounded-2xl border border-border bg-background p-3 shadow-sm transition-all hover:border-primary/40 animate-fade-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <Link
                      href={`/food/${food.slug}`}
                      className="relative size-24 shrink-0 overflow-hidden rounded-xl"
                    >
                      <Image
                        src={food.image || '/placeholder.svg'}
                        alt={food.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/food/${food.slug}`} className="min-w-0">
                          <h3 className="line-clamp-1 font-semibold text-foreground hover:text-primary">
                            {food.name}
                          </h3>
                        </Link>
                        <span className="flex shrink-0 items-center gap-0.5 text-sm font-semibold text-amber-500">
                          <Star className="size-3.5 fill-current" />
                          {food.rating}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {reasons.map((r) => (
                          <span
                            key={r}
                            className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">
                            ${food.price.toFixed(2)}
                          </span>
                          <DietBadge diet={food.diet} />
                        </div>
                        <AddToCartButton food={food} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
