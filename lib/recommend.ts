import { foods } from './data'
import type { Food, Mood, DietType, SpiceLevel } from './types'

export interface RecommendInput {
  budget: number
  mood: Mood
  diet: DietType
  spice: SpiceLevel
}

export interface ScoredFood {
  food: Food
  score: number
  reasons: string[]
}

// Client-side scoring engine that mimics an AI recommender.
export function recommendMeals(input: RecommendInput): ScoredFood[] {
  const { budget, mood, diet, spice } = input

  const scored: ScoredFood[] = foods.map((food) => {
    let score = 0
    const reasons: string[] = []

    // Budget: reward meals comfortably within budget
    if (food.price <= budget) {
      score += 30
      const headroom = budget - food.price
      if (headroom <= budget * 0.4) {
        score += 10
        reasons.push('Great value for your budget')
      } else {
        reasons.push('Well within your budget')
      }
    } else {
      // slightly over budget still possible but penalized
      score -= (food.price - budget) * 4
    }

    // Diet matching
    if (diet === 'Vegan') {
      if (food.diet === 'Vegan') {
        score += 40
        reasons.push('100% vegan')
      } else score -= 100
    } else if (diet === 'Veg') {
      if (food.diet === 'Veg' || food.diet === 'Vegan') {
        score += 40
        reasons.push('Vegetarian friendly')
      } else score -= 100
    } else {
      // Non-Veg users can eat anything, prefer non-veg
      if (food.diet === 'Non-Veg') {
        score += 25
        reasons.push('Hearty non-veg pick')
      } else {
        score += 10
      }
    }

    // Mood matching
    if (food.mood.includes(mood)) {
      score += 25
      reasons.push(`Perfect for a ${mood.toLowerCase()} mood`)
    }

    // Spice matching
    if (food.spice === spice) {
      score += 20
      reasons.push(`${spice} spice, just right`)
    } else {
      const order: SpiceLevel[] = ['Mild', 'Medium', 'Hot']
      const diff = Math.abs(order.indexOf(food.spice) - order.indexOf(spice))
      score -= diff * 6
    }

    // Quality boost
    score += food.rating * 3

    return { food, score, reasons: reasons.slice(0, 2) }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}
