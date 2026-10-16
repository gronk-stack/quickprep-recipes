import type { Metadata } from 'next'
import RecipeCard from '@/components/RecipeCard'
import { getAllPublishedRecipes, CATEGORIES } from '@/lib/recipes'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Recipes',
  description: 'Browse our full collection of quick, healthy recipes. Filter by category to find exactly what you need for dinner tonight or your weekly meal prep.',
  alternates: { canonical: 'https://quickprep.recipes/recipes' },
}

export default function RecipesPage() {
  const recipes = getAllPublishedRecipes()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="font-heading font-extrabold text-4xl text-gray-900 mb-3">All Recipes</h1>
        <p className="text-gray-500 font-body text-lg">
          {recipes.length} recipes and counting. Filter by category to find what you need.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link href="/recipes" className="px-4 py-2 rounded-full border-2 border-primary bg-primary text-white text-sm font-heading font-semibold uppercase tracking-wide">
          All
        </Link>
        {CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="px-4 py-2 rounded-full border-2 border-border text-sm font-heading font-semibold uppercase tracking-wide text-gray-600 hover:border-primary hover:text-primary transition-colors"
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
