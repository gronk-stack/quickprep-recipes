import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import RecipeCard from '@/components/RecipeCard'
import { getCategoryBySlug, getRecipesByCategory, CATEGORIES } from '@/lib/recipes'

const SITE_URL = 'https://quickprep.recipes'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}
  const url = `${SITE_URL}/category/${slug}`
  return {
    title: `${category.name} Recipes`,
    description: `${category.description} Browse all ${category.name.toLowerCase()} recipes on QuickPrep.`,
    alternates: { canonical: url },
    openGraph: { title: `${category.name} Recipes`, description: category.description, url },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const recipes = getRecipesByCategory(slug)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6 font-body">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><Link href="/recipes" className="hover:text-primary">Recipes</Link></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li className="text-gray-700">{category.name}</li>
        </ol>
      </nav>

      <header className="mb-10">
        <p className="text-4xl mb-3" aria-hidden="true">{category.icon}</p>
        <h1 className="font-heading font-extrabold text-4xl text-gray-900 mb-2">{category.name} Recipes</h1>
        <p className="text-gray-500 font-body text-lg">{category.description}</p>
        {recipes.length > 0 && (
          <p className="text-sm text-gray-400 mt-2 font-body">{recipes.length} recipes</p>
        )}
      </header>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`px-4 py-2 rounded-full border-2 text-sm font-heading font-semibold uppercase tracking-wide transition-colors ${
              cat.slug === slug
                ? 'border-primary bg-primary text-white'
                : 'border-border text-gray-600 hover:border-primary hover:text-primary'
            }`}
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4" aria-hidden="true">{category.icon}</p>
          <p className="font-heading font-semibold text-xl mb-2">No recipes yet</p>
          <p className="font-body mb-6">Check back soon — more {category.name.toLowerCase()} recipes are on the way.</p>
          <Link href="/recipes" className="text-primary font-heading font-semibold hover:underline">
            Browse all recipes →
          </Link>
        </div>
      )}
    </div>
  )
}
