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

export default function FavoriteButton({ slug, size = 'sm' }: { slug: string; size?: 'sm' | 'md' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [burst, setBurst] = useState(false)
  const active = isFavorite(slug)
  const dim = size === 'md' ? 'w-7 h-7' : 'w-5 h-5'

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
        className="group transition-transform duration-150 hover:scale-125 active:scale-95"
      >
        <svg
          className={`${dim} transition-colors duration-200 drop-shadow-sm ${
            active
              ? 'fill-red-500 stroke-red-500'
              : size === 'sm'
                ? 'fill-none stroke-white/80 group-hover:stroke-red-400'
                : 'fill-none stroke-gray-300 group-hover:stroke-red-400'
          }`}
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {burst && PARTICLES.map((p, i) => (
        <span
          key={i}
          onAnimationEnd={i === PARTICLES.length - 1 ? () => setBurst(false) : undefined}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: p.color,
            pointerEvents: 'none',
            animation: 'confetti-pop 0.55s ease-out forwards',
            '--tx': p.tx,
            '--ty': p.ty,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
