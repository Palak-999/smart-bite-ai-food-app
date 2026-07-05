'use client'

import { Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import type { Food } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  food: Food
  quantity?: number
  className?: string
  size?: 'sm' | 'default' | 'lg'
  fullWidth?: boolean
  label?: string
}

export function AddToCartButton({
  food,
  quantity = 1,
  className,
  size = 'sm',
  fullWidth,
  label = 'Add',
}: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem(food, quantity)
    setAdded(true)
    toast.success(`${food.name} added to cart`, {
      description: `${quantity} × $${food.price.toFixed(2)} from ${food.restaurantName}`,
    })
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Button
      onClick={handleAdd}
      size={size}
      className={cn('rounded-full font-semibold', fullWidth && 'w-full', className)}
    >
      {added ? <Check className="size-4" /> : <Plus className="size-4" />}
      {added ? 'Added' : label}
    </Button>
  )
}
