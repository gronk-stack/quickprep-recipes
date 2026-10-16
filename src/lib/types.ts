export interface Recipe {
  slug: string
  title: string
  description: string
  categories: string[]
  tags: string[]
  prepTime: number // minutes
  cookTime: number // minutes
  servings: string
  ingredients: string[]
  instructions: string[]
  image: string // path relative to /public, or '' for placeholder
  featured: boolean
  published: boolean
  datePublished: string // ISO date YYYY-MM-DD
}

export interface Category {
  name: string
  slug: string
  icon: string
  description: string
}
