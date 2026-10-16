import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Caitlynd',
  description: "I'm Caitlynd, a Minnesota home cook and runner who created QuickPrep Recipes to help busy people eat healthy without spending hours in the kitchen.",
  alternates: { canonical: 'https://quickprep.recipes/about' },
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="flex-shrink-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/caitlynd.jpg"
              alt="Caitlynd in her kitchen"
              fill
              priority
              sizes="320px"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div>
          <p className="font-heading font-bold uppercase tracking-widest text-xs text-accent mb-2">The Person Behind the Recipes</p>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-gray-900 mb-4">
            Hi, I&apos;m Caitlynd
          </h1>
          <p className="font-body text-xl text-gray-600 leading-relaxed">
            Minnesota-based home cook, runner, and the person behind every recipe on this site.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="prose prose-lg max-w-none font-body text-gray-700 space-y-6 mb-16">
        <h2 className="font-heading font-bold text-2xl text-gray-900">My Story</h2>
        <p>
          I&apos;m Caitlynd, and I&apos;m based in Minnesota. Outside the kitchen, you&apos;ll find me training for local 5Ks and 10Ks — running is my thing, and eating well is a big part of that. When you&apos;re logging miles and juggling a full schedule, you need food that&apos;s nourishing and fast. That&apos;s exactly how this site started.
        </p>
        <p>
          I created QuickPrep Recipes for anyone who wants to eat healthy but doesn&apos;t have hours to spend in the kitchen. Whether you&apos;re a runner fueling your training, a parent getting weeknight dinners on the table, or someone who just wants to stop reaching for takeout — these recipes are for you. Everything here is straightforward, made with real ingredients, and designed so you can prep ahead and actually stick to it.
        </p>
        <p>
          Every recipe has been made in my own kitchen and tested until I&apos;d happily make it again on a Tuesday night after a long day. If it&apos;s complicated for no reason, it doesn&apos;t make the cut.
        </p>

        <h2 className="font-heading font-bold text-2xl text-gray-900 pt-4">What You&apos;ll Find Here</h2>
        <ul className="list-none space-y-3 pl-0">
          {[
            '🥗 Quick weeknight dinners ready in 30–60 minutes',
            '📦 Meal prep recipes designed for batch cooking and easy storage',
            '🌿 Healthy food that actually tastes good',
            '🧾 Clear, step-by-step instructions with no fluff',
            '❄️ Freezer-friendly recipes labeled so you can cook ahead',
          ].map(item => (
            <li key={item} className="flex items-start gap-2 text-gray-700">
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-surface rounded-2xl p-8 text-center border border-border">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-3">Ready to Cook?</h2>
        <p className="font-body text-gray-500 mb-6">Start with the recipes — all quick, all tested, all worth making again.</p>
        <Link
          href="/recipes"
          className="inline-block bg-primary text-white font-heading font-bold uppercase tracking-widest px-8 py-4 rounded-lg text-sm hover:bg-primary-dark transition-colors"
        >
          Browse All Recipes
        </Link>
      </div>
    </div>
  )
}
