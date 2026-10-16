'use client'
import { useState } from 'react'
import { useFavorites } from '@/lib/useFavorites'

const PARTICLES = [
  { color: '#ef4444', tx: '0px',   ty: '-22px' },
  { color: '#f97316', tx: '19px',  ty: '-13px' },
  { color: '#eab308', tx: '19px',  ty: '13px'  },
  { color: '#22c55e', tx: '0px',   ty: '22px'  },
  { color: '#3b82f6', tx: '-19px', ty: '13px'  },
  { color: '#a855f7', tx: '-19px', ty: '-13px' },
]

function Heart({ active, className }: { active: boolean; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeWidth={2}
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )
}

/** Icon-only — used on recipe cards over the image */
export function FavoriteIconButton({ slug }: { slug: string }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [burst, setBurst] = useState(false)
  const active = isFavorite(slug)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!active) setBurst(true)
    toggleFavorite(slug)
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <button
        onClick={handleClick}
        aria-label={active ? 'Remove from favorites' : 'Save to favorites'}
        className={`p-1.5 rounded-full transition-all duration-150 hover:scale-110 active:scale-95 focus:outline-none shadow-md ${
          active ? 'bg-red-500' : 'bg-black/40'
        }`}
      >
        <Heart active={active} className={`w-4 h-4 ${active ? 'text-white' : 'text-white'}`} />
      </button>
      {burst && PARTICLES.map((p, i) => (
        <span
          key={i}
          onAnimationEnd={i === PARTICLES.length - 1 ? () => setBurst(false) : undefined}
          style={{
            position: 'absolute', left: '50%', top: '50%',
            width: 5, height: 5, borderRadius: '50%',
            backgroundColor: p.color, pointerEvents: 'none',
            animation: 'confetti-pop 0.55s ease-out forwards',
            '--tx': p.tx, '--ty': p.ty,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

/** Text button — used on the recipe detail page */
export default function FavoriteButton({ slug }: { slug: string }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [burst, setBurst] = useState(false)
  const active = isFavorite(slug)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!active) setBurst(true)
    toggleFavorite(slug)
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <button
        onClick={handleClick}
        aria-label={active ? 'Remove from favorites' : 'Save to favorites'}
        className="relative flex items-center justify-center gap-2 w-36 py-2.5 border-2 border-gray-900 rounded-lg font-heading font-bold text-sm uppercase tracking-wide transition-all duration-150 hover:scale-105 active:scale-95 focus:outline-none"
        style={{ backgroundColor: '#f4a940', color: '#1a1a1a' }}
      >
        {active ? 'Favorited' : 'Favorite'}
        <Heart active={active} className={`w-4 h-4 ${active ? 'text-red-600' : 'text-gray-900'}`} />
      </button>
      {burst && PARTICLES.map((p, i) => (
        <span
          key={i}
          onAnimationEnd={i === PARTICLES.length - 1 ? () => setBurst(false) : undefined}
          style={{
            position: 'absolute', left: '50%', top: '50%',
            width: 5, height: 5, borderRadius: '50%',
            backgroundColor: p.color, pointerEvents: 'none',
            animation: 'confetti-pop 0.55s ease-out forwards',
            '--tx': p.tx, '--ty': p.ty,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
