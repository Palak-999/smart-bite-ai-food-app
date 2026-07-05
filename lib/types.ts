export type DietType = 'Veg' | 'Non-Veg' | 'Vegan'
export type Mood = 'Happy' | 'Tired' | 'Working' | 'Party'
export type SpiceLevel = 'Mild' | 'Medium' | 'Hot'

export interface Review {
  id: string
  name: string
  rating: number
  date: string
  comment: string
}

export interface Nutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Food {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  rating: number
  reviewCount: number
  category: string
  cuisine: string
  diet: DietType
  spice: SpiceLevel
  mood: Mood[]
  restaurantId: string
  restaurantName: string
  ingredients: string[]
  nutrition: Nutrition
  reviews: Review[]
  popular?: boolean
}

export interface Restaurant {
  id: string
  name: string
  slug: string
  image: string
  cuisines: string[]
  rating: number
  deliveryTime: number
  priceForTwo: number
  diet: 'Veg' | 'Non-Veg'
  offer?: string
  promoted?: boolean
  location: string
}

export interface Category {
  id: string
  name: string
  image: string
  icon: string
}

export interface Offer {
  id: string
  title: string
  subtitle: string
  code: string
  color: string
}

export interface CartItem {
  food: Food
  quantity: number
}
