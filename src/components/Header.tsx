'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES } from '@/lib/recipes'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src="/images/QPR.jpg"
              alt="QuickPrep Recipes logo"
              fill
              sizes="40px"
              className="object-cover object-center"
            />
          </div>
          <span className="font-heading font-extrabold text-lg text-nav leading-none">
            quickprep
            <span className="inline-flex items-center gap-0.5 text-primary">
              {/* Fork icon */}
              <svg className="w-3.5 h-3.5 mx-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11 2v7c0 1.66 1.34 3 3 3h1v10h2V12h1c1.66 0 3-1.34 3-3V2h-2v5h-1V2h-2v5h-1V2h-2zM5 2C3.34 2 2 3.34 2 5v6c0 1.48 1.01 2.72 2.38 3.08L4 20.5c-.06.83.6 1.5 1.43 1.5h.14c.74 0 1.37-.54 1.43-1.28L7.38 14.08C8.76 13.72 10 12.48 10 11V5c0-1.66-1.34-3-3-3H5z"/>
              </svg>
              .recipes
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-heading font-semibold uppercase tracking-wider" aria-label="Main navigation">
          <Link href="/" className="px-3 py-2 text-nav hover:text-primary transition-colors rounded">
            Home
          </Link>
          <Link href="/recipes" className="px-3 py-2 text-nav hover:text-primary transition-colors rounded">
            Explore Recipes
          </Link>
          <Link
            href="/category/meal-prep"
            className="px-4 py-1.5 bg-primary-light text-primary-dark rounded-full border border-primary/30 hover:bg-primary hover:text-white transition-colors"
          >
            Quick Meals
          </Link>

          {/* Categories dropdown */}
          <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
            <button className="px-3 py-2 text-nav hover:text-primary transition-colors rounded flex items-center gap-1">
              Categories
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="px-3 py-2 text-nav hover:text-primary transition-colors rounded flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.232.799 5.879 2.112M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            About
          </Link>
        </nav>

        {/* Right: search + mobile hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(s => !s)}
            aria-label="Toggle search"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-nav hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(s => !s)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-nav"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <input
              autoFocus
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search recipes..."
              className="flex-1 border border-gray-200 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-body"
            />
            <button
              type="submit"
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-heading font-semibold uppercase tracking-wide hover:bg-primary-dark transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-heading font-semibold uppercase tracking-wide text-nav hover:text-primary hover:bg-primary-light rounded transition-colors">
            Home
          </Link>
          <Link href="/recipes" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-heading font-semibold uppercase tracking-wide text-nav hover:text-primary hover:bg-primary-light rounded transition-colors">
            Explore Recipes
          </Link>
          <Link href="/category/meal-prep" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-heading font-semibold uppercase tracking-wide text-primary bg-primary-light rounded transition-colors">
            Quick Meals
          </Link>
          <div className="px-3 py-2 text-xs font-heading font-bold uppercase tracking-widest text-gray-400 mt-2">Categories</div>
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-light rounded transition-colors flex items-center gap-2">
              <span>{cat.icon}</span>{cat.name}
            </Link>
          ))}
          <Link href="/about" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-heading font-semibold uppercase tracking-wide text-nav hover:text-primary hover:bg-primary-light rounded transition-colors mt-1 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.232.799 5.879 2.112M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            About
          </Link>
        </nav>
      )}
    </header>
  )
}
