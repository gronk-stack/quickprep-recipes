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
    <header className="sticky top-0 z-50 border-b border-[#d9d3c8] shadow-sm" style={{ backgroundColor: '#ece8df' }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/quickprep.recipes.jpg"
            alt="QuickPrep Recipes"
            width={220}
            height={48}
            className="h-11 w-auto"
            priority
          />
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
              <div className="absolute top-full left-0 mt-1 w-48 rounded-lg shadow-lg border border-[#d9d3c8] py-1 z-50" style={{ backgroundColor: '#ece8df' }}>
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
        <div className="border-t border-[#d9d3c8] px-4 py-3" style={{ backgroundColor: '#ece8df' }}>
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
        <nav className="lg:hidden border-t border-[#d9d3c8] px-4 py-3 flex flex-col gap-1" style={{ backgroundColor: '#ece8df' }}>
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
