'use client'

import { useMemo, useState } from 'react'
import { MessageSquare, Send, Sparkles } from 'lucide-react'
import { useCart } from '@/context/cart-context'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

function generateResponse(message: string, cartItems: number, totalCalories: number) {
  const text = message.trim().toLowerCase()

  if (!text) {
    return 'Please type something so I can help you find the perfect meal.'
  }

  const wantsRecommendation = /recommend|suggest|best|top|popular|meal|dish/.test(text)
  const lowBudget = /budget|cheap|low price|affordable|inexpensive|cheaper|low-cost/.test(text)
  const mentionsFood = /pizza|burger|sushi|pasta|salad|bowl|dessert|desert|smoothie|rice|noodle|wrap|taco|sandwich|steak|chicken|fish|cake|ice cream|drink/.test(text)

  if (text.includes('calorie') || text.includes('calories')) {
    if (cartItems > 0) {
      return `Your current cart selection totals ${totalCalories} kcal. Use the Calorie Dashboard for deeper monthly nutrition insights.`
    }
    return 'Add food items to your cart and I can estimate calories for you instantly.'
  }

  if (text.includes('restaurant') || text.includes('restaurants')) {
    return 'You can browse restaurants by clicking the Restaurants link. I can help you find a place with great offers or fast delivery.'
  }

  if (text.includes('offer') || text.includes('discount') || text.includes('deal')) {
    return 'Check the Offers page for current promotions, or use code SMART50 for a discount on your order.'
  }

  if (mentionsFood || wantsRecommendation) {
    if (text.includes('pizza')) {
      return 'Try our best-selling Margherita Pizza or Pepperoni Pizza with garlic bread on the side.'
    }
    if (text.includes('burger')) {
      return 'The Classic Cheeseburger and Spicy Chicken Burger are fan favorites right now.'
    }
    if (text.includes('sushi')) {
      return 'Our sushi selection is great for lighter meals—try the Salmon Roll or Veggie Maki.'
    }
    if (text.includes('pasta')) {
      return 'Creamy Alfredo Pasta and Spicy Arrabiata are popular choices today.'
    }
    if (text.includes('salad') || text.includes('bowl')) {
      return 'The Rainbow Buddha Bowl and Green Salad are excellent for a healthy, balanced meal.'
    }
    if (text.includes('dessert') || text.includes('desert')) {
      return 'For something sweet, try the Berry Blast Smoothie Bowl or Chocolate Lava Cake.'
    }
    if (lowBudget) {
      return 'If you are on a budget, try affordable favorites like the Classic Cheeseburger, Veggie Wrap, or Simple Chicken Salad.'
    }
    if (cartItems > 0) {
      return `I see you already have ${cartItems} item${cartItems === 1 ? '' : 's'} in your cart. Based on that, I recommend adding a light salad or grilled protein to balance your meal.`
    }
    return 'For a tasty meal, try our popular dishes like Margherita Pizza, Classic Cheeseburger, or Berry Blast Smoothie Bowl.'
  }

  if (text.includes('healthy') || text.includes('diet') || text.includes('vegan') || text.includes('keto') || text.includes('gluten')) {
    return 'Try our healthy options like the Rainbow Buddha Bowl, Green Bowl, or Berry Blast Smoothie Bowl for a light, nutrient-packed meal.'
  }

  return 'I can help you choose dishes, estimate calories, and find great offers. Ask me for recommendations, calorie info, or restaurant suggestions.'
}

export function AIChatAssistant() {
  const { items } = useCart()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'assistant-welcome',
      role: 'assistant',
      text: 'Hi there! I am your SmartBite AI assistant. Ask me for meal recommendations, calorie advice, or restaurant suggestions.',
    },
  ])
  const [input, setInput] = useState('')

  const cartItemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items])
  const cartCalories = useMemo(
    () => items.reduce((total, item) => total + item.food.nutrition.calories * item.quantity, 0),
    [items],
  )

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    }

    const responseText = generateResponse(trimmed, cartItemCount, cartCalories)
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: responseText,
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setInput('')
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-card p-8">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-primary/10 text-primary">
            <MessageSquare className="size-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              AI Chat Assistant
            </p>
            <h1 className="mt-2 text-3xl font-bold">Chat with SmartBite AI</h1>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">Items in cart</p>
            <p className="mt-3 text-3xl font-bold">{cartItemCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Current selected items</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">Current calories</p>
            <p className="mt-3 text-3xl font-bold">{cartCalories.toLocaleString()} kcal</p>
            <p className="mt-2 text-sm text-muted-foreground">Estimated calories in your cart</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">Need help with</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>- Meal recommendations</li>
              <li>- Calorie estimations</li>
              <li>- Restaurant suggestions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-3xl p-4 ${
                  message.role === 'assistant'
                    ? 'bg-muted text-foreground'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <span>{message.role === 'assistant' ? 'SmartBite AI' : 'You'}</span>
                </div>
                <p className="mt-2 text-sm leading-6">{message.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about meals, calories, offers..."
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
            >
              <Send className="mr-2 size-4" />
              Send
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Tip: Ask about recommendations, calories, or current offers.
          </p>
        </div>
      </div>
    </div>
  )
}
