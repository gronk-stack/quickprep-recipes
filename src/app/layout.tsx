import type { Metadata } from 'next'
import { Jost, Lato } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
  display: 'swap',
})

const SITE_URL = 'https://quickprep.recipes'
const SITE_NAME = 'QuickPrep Recipes'
const SITE_DESCRIPTION = 'Discover quick, healthy recipes perfect for meal prep and busy weeknights. Browse hundreds of easy dinner, breakfast, and dessert recipes with step-by-step instructions.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Quick, Healthy Recipes for Real Life`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['quick recipes', 'healthy recipes', 'meal prep', 'easy dinner recipes', 'weeknight meals'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Quick, Healthy Recipes for Real Life`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Quick, Healthy Recipes for Real Life`,
    description: SITE_DESCRIPTION,
  },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${lato.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
