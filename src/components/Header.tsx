'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES } from '@/lib/recipes'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-nav text-white text-xs text-center py-2 px-4 font-heading font-semibold tracking-widest uppercase">
        Quick, Healthy Recipes for Real Life
      </div>

      {/* Main header */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="font-heading font-extrabold text-2xl md:text-3xl text-primary hover:text-primary-dark transition-colors">
          QuickPrep<span className="text-accent">.</span>recipes
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {CATEGORIES.slice(0, 6).map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-3 py-2 text-sm font-heading font-semibold uppercase tracking-wide text-gray-700 hover:text-primary hover:bg-primary-light rounded transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/recipes"
            className="ml-2 px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wide bg-primary text-white rounded hover:bg-primary-dark transition-colors"
          >
            All Recipes
          </Link>
        </nav>

        <button
          onClick={() => setSearchOpen(s => !s)}
          aria-label="Toggle search"
          className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </button>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-border bg-surface px-4 py-3">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <input
              autoFocus
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search recipes..."
              className="flex-1 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-body"
            />
            <button
              type="submit"
              className="bg-primary text-white px-5 py-2 rounded text-sm font-heading font-semibold uppercase tracking-wide hover:bg-primary-dark transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile nav */}
      <nav className="lg:hidden border-t border-border overflow-x-auto">
        <div className="flex gap-1 px-4 py-2 min-w-max">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-3 py-1.5 text-xs font-heading font-semibold uppercase tracking-wide text-gray-700 hover:text-primary whitespace-nowrap rounded hover:bg-primary-light transition-colors"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
