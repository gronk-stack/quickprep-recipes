import Link from 'next/link'
import Image from 'next/image'
import RecipeCard from '@/components/RecipeCard'
import { getAllPublishedRecipes, getFeaturedRecipes, CATEGORIES } from '@/lib/recipes'

export default function HomePage() {
  const featured = getFeaturedRecipes()
  const all = getAllPublishedRecipes()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl leading-tight mb-4">
            Quick, Healthy Recipes<br />
            <span className="text-accent">for Real Life</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 font-body">
            From 30-minute weeknight dinners to weekend meal prep — find your next favorite recipe.
          </p>
          <Link
            href="/recipes"
            className="inline-block bg-accent text-white font-heading font-bold uppercase tracking-widest px-8 py-4 rounded-lg text-sm hover:bg-accent-dark transition-colors shadow-lg"
          >
            Browse All Recipes
          </Link>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-8 text-gray-900">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border bg-surface hover:border-primary hover:bg-primary-light transition-all group text-center"
            >
              <span className="text-3xl" aria-hidden="true">{cat.icon}</span>
              <span className="font-heading font-semibold text-xs uppercase tracking-wide text-gray-700 group-hover:text-primary">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured recipes */}
      {featured.length > 0 && (
        <section className="bg-surface py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">Featured Recipes</h2>
              <Link href="/recipes" className="text-sm font-heading font-semibold text-primary uppercase tracking-wide hover:text-primary-dark">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(recipe => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All recipes */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">Latest Recipes</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {all.map(recipe => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Meet Caitlynd */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0">
            <div className="relative w-48 h-64 md:w-56 md:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-primary-light">
              <Image
                src="/images/caitlynd.jpg"
                alt="Caitlynd, founder of QuickPrep Recipes"
                fill
                sizes="288px"
                className="object-cover object-[center_12%]"
              />
            </div>
          </div>
          <div>
            <p className="font-heading font-bold uppercase tracking-widest text-xs text-accent mb-2">Meet the Chef</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-gray-900 mb-4">Hi, I&apos;m Caitlynd</h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-6">
              I&apos;m a Minnesota-based home cook with a passion for running local 5Ks and 10Ks. I built this site for people like me — busy schedules, limited time, and a real desire to eat healthy without it taking over your evening. Every recipe here is quick to prep and built for real life.
            </p>
            <Link
              href="/about"
              className="inline-block border-2 border-primary text-primary font-heading font-bold uppercase tracking-widest px-6 py-3 rounded-lg text-sm hover:bg-primary hover:text-white transition-colors"
            >
              More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Meal prep CTA */}
      <section className="bg-primary text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-4">
            Master Meal Prep
          </h2>
          <p className="font-body text-white/80 mb-6 text-lg">
            Save time and eat better all week. Browse our best meal prep recipes — each one designed for batch cooking and easy storage.
          </p>
          <Link
            href="/category/meal-prep"
            className="inline-block bg-white text-primary font-heading font-bold uppercase tracking-widest px-8 py-4 rounded-lg text-sm hover:bg-accent hover:text-white transition-colors"
          >
            Meal Prep Recipes
          </Link>
        </div>
      </section>
    </>
  )
}
