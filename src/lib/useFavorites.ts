'use client'
import { useState, useEffect, useCallback } from 'react'

const KEY = 'qp_favorites'
const SYNC = 'qp_favorites_sync'

function readStorage(): string[] {
  try {
    const s = localStorage.getItem(KEY)
    return s ? JSON.parse(s) : []
  } catch { return [] }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(readStorage())
    const onSync = () => setFavorites(readStorage())
    window.addEventListener(SYNC, onSync)
    return () => window.removeEventListener(SYNC, onSync)
  }, [])

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
        window.dispatchEvent(new Event(SYNC))
      } catch {}
      return next
    })
  }, [])

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
