import type { MetadataRoute } from 'next'
import { getAllPublishedRecipes, CATEGORIES } from '@/lib/recipes'

const SITE_URL = 'https://quickprep.recipes'

export default function sitemap(): MetadataRoute.Sitemap {
  const recipes = getAllPublishedRecipes()

  const recipeUrls = recipes.map(r => ({
    url: `${SITE_URL}/recipes/${r.slug}`,
    lastModified: new Date(r.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryUrls = CATEGORIES.map(c => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: new Date('2026-10-16'),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    { url: SITE_URL, lastModified: new Date('2026-10-16'), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/recipes`, lastModified: new Date('2026-10-16'), changeFrequency: 'daily', priority: 0.9 },
    ...categoryUrls,
    ...recipeUrls,
  ]
}
