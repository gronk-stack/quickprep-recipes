'use client'
import { useState, useEffect, useCallback } from 'react'

const KEY = 'qp_favorites'
const SYNC = 'qp_favorites_sync'

function readStorage(): string[] {
  try {
    const s = localStorage.getItem(KEY)
    return s ? (JSON.parse(s) as string[]) : []
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
    // Read current state from localStorage (source of truth) to avoid stale closure
    const current = readStorage()
    const next = current.includes(slug)
      ? current.filter(s => s !== slug)
      : [...current, slug]

    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}

    // Update this instance directly, then notify others
    setFavorites(next)
    window.dispatchEvent(new Event(SYNC))
  }, [])

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
