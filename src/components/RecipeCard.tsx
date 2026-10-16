import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/lib/types'
import { getRecipeImage } from '@/lib/recipes'

// Gradient placeholders by category for when no image is provided
const CATEGORY_GRADIENTS: Record<string, string> = {
  Breakfast: 'from-amber-100 to-orange-200',
  Lunch: 'from-green-100 to-emerald-200',
  Dinner: 'from-slate-100 to-blue-200',
  Desserts: 'from-pink-100 to-rose-200',
  'Meal Prep': 'from-teal-100 to-cyan-200',
  Snacks: 'from-yellow-100 to-amber-200',
  Sides: 'from-lime-100 to-green-200',
  Drinks: 'from-sky-100 to-blue-200',
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTime + recipe.cookTime
  const gradient = CATEGORY_GRADIENTS[recipe.categories[0]] ?? 'from-gray-100 to-gray-200'
  const imageSrc = getRecipeImage(recipe)

  return (
    <article className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        {/* Image with gradient fallback shown behind it */}
        <div className={`relative aspect-[4/3] w-full bg-gradient-to-br ${gradient}`}>
          <Image
            src={imageSrc}
            alt={recipe.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          {/* Category pills */}
          <div className="flex flex-wrap gap-1 mb-2">
            {recipe.categories.slice(0, 2).map(cat => (
              <span key={cat} className="text-xs font-heading font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-sm border border-gray-300 text-gray-600 bg-white">
                {cat}
              </span>
            ))}
          </div>

          <h3 className="font-heading font-bold text-base text-gray-900 group-hover:text-primary transition-colors leading-tight mb-3">
            {recipe.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-body">
            {totalTime > 0 && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
                </svg>
                <span>{totalTime} min</span>
              </>
            )}
            {recipe.servings && (
              <>
                <span className="text-gray-300">·</span>
                <span>{recipe.servings}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
