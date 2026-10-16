import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getRecipeBySlug, getAllPublishedRecipes, toIsoDuration, getRecipeImage } from '@/lib/recipes'

const SITE_URL = 'https://quickprep.recipes'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPublishedRecipes().map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)
  if (!recipe) return {}
  const url = `${SITE_URL}/recipes/${slug}`
  return {
    title: recipe.title,
    description: recipe.description,
    keywords: [...recipe.categories, ...recipe.tags, 'recipe', 'quick recipe', 'healthy recipe'],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: recipe.title,
      description: recipe.description,
      url,
      images: recipe.image ? [{ url: recipe.image, alt: recipe.title }] : [],
      publishedTime: recipe.datePublished,
      tags: recipe.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description,
    },
  }
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)
  if (!recipe) notFound()

  const totalTime = recipe.prepTime + recipe.cookTime

  // Recipe JSON-LD schema for Google rich results
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: [`${SITE_URL}${getRecipeImage(recipe)}`],
    author: { '@type': 'Person', name: 'Caitlynd', url: `${SITE_URL}/about` },
    datePublished: recipe.datePublished,
    prepTime: toIsoDuration(recipe.prepTime),
    cookTime: toIsoDuration(recipe.cookTime),
    totalTime: toIsoDuration(totalTime),
    recipeYield: recipe.servings,
    recipeCategory: recipe.categories[0],
    keywords: recipe.tags.join(', '),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step,
    })),
    nutrition: { '@type': 'NutritionInformation' },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6 font-body">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li aria-hidden="true" className="text-gray-300">/</li>
            <li><Link href="/recipes" className="hover:text-primary">Recipes</Link></li>
            {recipe.categories[0] && (
              <>
                <li aria-hidden="true" className="text-gray-300">/</li>
                <li>
                  <Link
                    href={`/category/${recipe.categories[0].toLowerCase().replace(/ /g, '-')}`}
                    className="hover:text-primary"
                  >
                    {recipe.categories[0]}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-gray-300">/</li>
            <li className="text-gray-700">{recipe.title}</li>
          </ol>
        </nav>

        {/* Title + meta */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.categories.map(cat => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs font-heading font-bold uppercase tracking-widest text-primary bg-primary-light px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-gray-900 mb-4 leading-tight">
            {recipe.title}
          </h1>
          <p className="text-lg text-gray-600 font-body leading-relaxed mb-6">{recipe.description}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 py-4 border-y border-border text-sm font-body">
            {recipe.prepTime > 0 && (
              <div>
                <p className="font-heading font-bold uppercase tracking-widest text-xs text-gray-400 mb-1">Prep</p>
                <p className="font-semibold text-gray-800">{recipe.prepTime} min</p>
              </div>
            )}
            {recipe.cookTime > 0 && (
              <div>
                <p className="font-heading font-bold uppercase tracking-widest text-xs text-gray-400 mb-1">Cook</p>
                <p className="font-semibold text-gray-800">{recipe.cookTime} min</p>
              </div>
            )}
            {totalTime > 0 && (
              <div>
                <p className="font-heading font-bold uppercase tracking-widest text-xs text-gray-400 mb-1">Total</p>
                <p className="font-semibold text-gray-800">{totalTime} min</p>
              </div>
            )}
            <div>
              <p className="font-heading font-bold uppercase tracking-widest text-xs text-gray-400 mb-1">Servings</p>
              <p className="font-semibold text-gray-800">{recipe.servings}</p>
            </div>
          </div>
        </header>

        {/* Hero image or gradient */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-gradient-to-br from-primary-light to-surface">
          <Image
            src={getRecipeImage(recipe)}
            alt={recipe.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {recipe.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-body capitalize">
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}

        {/* Ingredients + Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Ingredients */}
          <aside className="md:col-span-2">
            <div className="sticky top-24 bg-surface rounded-xl p-6 border border-border">
              <h2 className="font-heading font-bold text-xl mb-4 text-gray-900">Ingredients</h2>
              <p className="text-xs text-gray-500 font-body mb-4">{recipe.servings}</p>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-body text-gray-700">
                    <span className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Instructions */}
          <section className="md:col-span-3">
            <h2 className="font-heading font-bold text-xl mb-6 text-gray-900">Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white font-heading font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="font-body text-gray-700 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </>
  )
}
