'use client'
import { useFavorites } from '@/lib/useFavorites'
import RecipeCard from './RecipeCard'
import type { Recipe } from '@/lib/types'

export default function FavoritesSection({ recipes }: { recipes: Recipe[] }) {
  const { favorites } = useFavorites()
  const favorited = recipes.filter(r => favorites.includes(r.slug)).slice(0, 6)
  if (favorited.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-4 py-14 border-b border-border">
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-8">Your Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorited.map(recipe => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </section>
  )
}
