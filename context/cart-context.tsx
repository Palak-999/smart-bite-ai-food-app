'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'
import type { CartItem, Food } from '@/lib/types'

interface CartContextValue {
  items: CartItem[]
  addItem: (food: Food, quantity?: number) => void
  removeItem: (foodId: string) => void
  updateQuantity: (foodId: string, quantity: number) => void
  clearCart: () => void
  getQuantity: (foodId: string) => number
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'smartbite-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, loaded])

  const addItem = useCallback((food: Food, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.food.id === food.id)
      if (existing) {
        return prev.map((i) =>
          i.food.id === food.id ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [...prev, { food, quantity }]
    })
  }, [])

  const removeItem = useCallback((foodId: string) => {
    setItems((prev) => prev.filter((i) => i.food.id !== foodId))
  }, [])

  const updateQuantity = useCallback((foodId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.food.id !== foodId)
        : prev.map((i) => (i.food.id === foodId ? { ...i, quantity } : i)),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const getQuantity = useCallback(
    (foodId: string) => items.find((i) => i.food.id === foodId)?.quantity ?? 0,
    [items],
  )

  const { totalItems, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => {
        acc.totalItems += i.quantity
        acc.subtotal += i.quantity * i.food.price
        return acc
      },
      { totalItems: 0, subtotal: 0 },
    )
  }, [items])

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getQuantity,
    totalItems,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
