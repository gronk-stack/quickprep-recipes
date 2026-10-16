import Link from 'next/link'
import Image from 'next/image'
import SortedRecipeGrid from '@/components/SortedRecipeGrid'
import { getAllPublishedRecipes, getFeaturedRecipes, CATEGORIES } from '@/lib/recipes'

export default function HomePage() {
  const featured = getFeaturedRecipes()
  const all = getAllPublishedRecipes()

  return (
    <>
      {/* Hero — clean white, no color fill */}
      <section className="border-b border-border py-14 px-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-heading font-bold uppercase tracking-widest text-xs text-primary mb-3">Quick &amp; Healthy</p>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl leading-tight mb-4 text-gray-900">
            Recipes for Real Life
          </h1>
          <p className="text-lg md:text-xl font-body mb-8" style={{ color: '#4a4a4a' }}>
            30-minute weeknight dinners, meal prep ideas, and healthy food that actually fits your schedule.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.slice(0, 6).map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-4 py-2 rounded-sm border-2 border-gray-800 text-gray-800 font-heading font-semibold text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/recipes"
              className="px-4 py-2 rounded-full bg-primary text-white font-heading font-semibold text-xs uppercase tracking-wide hover:bg-primary-dark transition-colors"
            >
              All Recipes →
            </Link>
          </div>
        </div>
      </section>

      {/* Popular recipes — sorted with favorites first */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">Popular Recipes</h2>
            <Link href="/recipes" className="text-sm font-heading font-semibold text-primary uppercase tracking-wide hover:text-primary-dark">
              View all →
            </Link>
          </div>
          <SortedRecipeGrid recipes={featured} />
        </section>
      )}

      {/* Meet the Chef */}
      <section className="bg-surface border-y border-border py-14 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
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
          <div className="flex-1">
            <p className="font-heading font-bold uppercase tracking-widest text-xs text-primary mb-2">Meet the Chef</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-gray-900 mb-4">Hi, I&apos;m Caitlynd</h2>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: '#4a4a4a' }}>
              My mission is to provide you with healthy, fresh, and delicious recipes made with whole and minimally processed foods. My recipes are wholesome for all, mostly gluten-free, and customizable for special diets and food allergies.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: '#4a4a4a' }}>
              I&apos;m a Minnesota-based home cook and runner — training for local 5Ks and 10Ks means I know exactly what it&apos;s like to come home tired and still need a real meal on the table. Every recipe here is built for that reality: quick to prep, made with real ingredients, and worth making again on a Tuesday night.
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

      {/* Category grid */}
      <section className="py-14 px-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-8 text-gray-900">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center justify-center p-4 rounded-sm border-2 border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary transition-all group text-center"
              >
                <span className="font-heading font-semibold text-xs uppercase tracking-wide">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest recipes — favorites bubble to top, capped at 6 */}
      <section className="bg-surface border-t border-border px-4 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">Latest Recipes</h2>
            <Link href="/recipes" className="text-sm font-heading font-semibold text-primary uppercase tracking-wide hover:text-primary-dark">
              View all →
            </Link>
          </div>
          <SortedRecipeGrid recipes={all} max={6} />
        </div>
      </section>

      {/* Meal prep CTA — neutral, not green */}
      <section className="py-14 px-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-2xl mx-auto text-center border-2 border-primary rounded-2xl py-12 px-8">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-4 text-gray-900">
            Master Meal Prep
          </h2>
          <p className="font-body mb-6 text-lg" style={{ color: '#4a4a4a' }}>
            Save time and eat better all week. Browse our best meal prep recipes — each one designed for batch cooking and easy storage.
          </p>
          <Link
            href="/category/meal-prep"
            className="inline-block bg-primary text-white font-heading font-bold uppercase tracking-widest px-8 py-4 rounded-lg text-sm hover:bg-primary-dark transition-colors"
          >
            Meal Prep Recipes
          </Link>
        </div>
      </section>
    </>
  )
}
