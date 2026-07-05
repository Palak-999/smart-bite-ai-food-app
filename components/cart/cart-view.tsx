'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Minus,
  Plus,
  Trash2,
  Tag,
  Check,
  ShoppingBag,
  ArrowRight,
  Truck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { DietBadge } from '@/components/food/badges'
import { useCart } from '@/context/cart-context'
import { promoCodes, type Promo } from '@/lib/data'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const BASE_DELIVERY = 2.99
const PACKAGING = 1.5
const TAX_RATE = 0.05

export function CartView() {
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } =
    useCart()
  const [promoInput, setPromoInput] = useState('')
  const [applied, setApplied] = useState<Promo | null>(null)

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    const promo = promoCodes[code]
    if (!promo) {
      toast.error('Invalid promo code', {
        description: 'Try SMART50, WALLET8, FREEDEL or SMARTBITE.',
      })
      return
    }
    if (subtotal < promo.minSubtotal) {
      toast.error(`Add $${(promo.minSubtotal - subtotal).toFixed(2)} more`, {
        description: `Code ${promo.code} needs a $${promo.minSubtotal} minimum.`,
      })
      return
    }
    setApplied(promo)
    toast.success(`${promo.code} applied`, { description: promo.label })
  }

  const removePromo = () => {
    setApplied(null)
    setPromoInput('')
  }

  const { discount, deliveryFee } = useMemo(() => {
    let discount = 0
    let deliveryFee = subtotal >= 40 ? 0 : BASE_DELIVERY
    if (applied) {
      if (applied.type === 'percent') {
        discount = Math.min(subtotal * applied.value, 10)
      } else if (applied.type === 'flat') {
        discount = applied.value
      } else if (applied.type === 'freedel') {
        deliveryFee = 0
      }
    }
    return { discount, deliveryFee }
  }, [applied, subtotal])

  const taxes = useMemo(
    () => Math.max(0, (subtotal - discount) * TAX_RATE),
    [subtotal, discount],
  )
  const total = Math.max(0, subtotal - discount + deliveryFee + PACKAGING + taxes)

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl border border-dashed border-border py-20 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
          <ShoppingBag className="size-10 text-primary" />
        </div>
        <h2 className="mt-6 text-xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like you haven&apos;t added anything yet. Let&apos;s fix that.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full">
          <Link href="/restaurants">Browse Restaurants</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* Items */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {totalItems} item{totalItems === 1 ? '' : 's'} in your cart
          </p>
          <button
            onClick={clearCart}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
          >
            Clear cart
          </button>
        </div>

        <ul className="space-y-4">
          {items.map(({ food, quantity }) => (
            <li
              key={food.id}
              className="flex gap-4 rounded-2xl border border-border bg-card p-3 sm:p-4"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-24">
                <Image
                  src={food.image || '/placeholder.svg'}
                  alt={food.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <DietBadge diet={food.diet} size="sm" />
                      <Link
                        href={`/food/${food.slug}`}
                        className="font-semibold leading-tight hover:text-primary"
                      >
                        {food.name}
                      </Link>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {food.restaurantName}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(food.id)}
                    aria-label={`Remove ${food.name}`}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-full"
                      onClick={() => updateQuantity(food.id, quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-full"
                      onClick={() => updateQuantity(food.id, quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>
                  <span className="font-semibold">
                    ${(food.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-lg font-bold">Order Summary</h2>

          {/* Promo */}
          <div className="mt-4">
            {applied ? (
              <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-3 py-2.5">
                <span className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Check className="size-4" /> {applied.code} applied
                </span>
                <button
                  onClick={removePromo}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.nativeEvent.isComposing) applyPromo()
                    }}
                    placeholder="Promo code"
                    className="pl-9 uppercase"
                    aria-label="Promo code"
                  />
                </div>
                <Button variant="secondary" onClick={applyPromo}>
                  Apply
                </Button>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          <dl className="space-y-3 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            {discount > 0 && (
              <Row
                label="Discount"
                value={`-$${discount.toFixed(2)}`}
                valueClass="text-primary"
              />
            )}
            <Row
              label={
                <span className="flex items-center gap-1.5">
                  <Truck className="size-3.5" /> Delivery
                </span>
              }
              value={
                deliveryFee === 0 ? (
                  <span className="font-medium text-primary">FREE</span>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )
              }
            />
            <Row label="Packaging" value={`$${PACKAGING.toFixed(2)}`} />
            <Row label="Taxes (5%)" value={`$${taxes.toFixed(2)}`} />
          </dl>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <span className="text-base font-bold">Total</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>

          {subtotal < 40 && (
            <p className="mt-3 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
              Add ${(40 - subtotal).toFixed(2)} more for free delivery.
            </p>
          )}

          <Button
            size="lg"
            className="mt-5 w-full gap-2 rounded-full text-base"
            onClick={() =>
              toast.success('Order placed!', {
                description: `Your $${total.toFixed(2)} order is on its way.`,
              })
            }
          >
            Checkout <ArrowRight className="size-4" />
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Try codes: SMART50 · WALLET8 · FREEDEL · SMARTBITE
          </p>
        </div>
      </aside>
    </div>
  )
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: React.ReactNode
  value: React.ReactNode
  valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn('font-medium', valueClass)}>{value}</dd>
    </div>
  )
}
