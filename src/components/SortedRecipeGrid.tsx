'use client'
import { useFavorites } from '@/lib/useFavorites'
import RecipeCard from './RecipeCard'
import type { Recipe } from '@/lib/types'

export default function SortedRecipeGrid({ recipes, max }: { recipes: Recipe[]; max?: number }) {
  const { favorites } = useFavorites()

  const sorted = [
    ...recipes.filter(r => favorites.includes(r.slug)),
    ...recipes.filter(r => !favorites.includes(r.slug)),
  ]

  const visible = max ? sorted.slice(0, max) : sorted

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {visible.map(recipe => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  )
}
