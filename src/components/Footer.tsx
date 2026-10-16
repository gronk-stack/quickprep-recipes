import Link from 'next/link'
import { CATEGORIES } from '@/lib/recipes'

const CURRENT_YEAR = 2026

export default function Footer() {
  return (
    <footer className="bg-nav text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-heading font-extrabold text-xl text-white mb-3">
            quickprep<span className="text-primary">.recipes</span>
          </p>
          <p className="text-sm leading-relaxed text-gray-400">
            Quick, healthy recipes for real life. From weeknight dinners to weekend meal prep — we have you covered.
          </p>
        </div>

        <div>
          <h3 className="font-heading font-bold uppercase tracking-widest text-xs text-accent mb-4">Categories</h3>
          <ul className="space-y-2">
            {CATEGORIES.map(cat => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="text-sm hover:text-primary transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-bold uppercase tracking-widest text-xs text-accent mb-4">Site</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/recipes" className="hover:text-white transition-colors">All Recipes</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {CURRENT_YEAR} QuickPrep.recipes — All rights reserved.
      </div>
    </footer>
  )
}
