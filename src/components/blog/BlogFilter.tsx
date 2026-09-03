import Link from 'next/link'

import { FILTER_CATEGORIES } from '@/lib/categories'

/** Filtres par catégorie : de simples liens (fonctionnent sans JavaScript). */
export default function BlogFilter({ current }: { current: string }) {
  return (
    <nav aria-label="Filtrer par catégorie" className="-mx-6 overflow-x-auto px-6 pb-1 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
      <ul className="flex min-w-max gap-2">
        {FILTER_CATEGORIES.map((c) => {
          const active = current === c.value
          const href = c.value === 'all' ? '/blog' : `/blog?category=${c.value}`
          return (
            <li key={c.value}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex h-10 items-center rounded-full border px-4 text-sm font-bold transition-colors ${
                  active ? 'border-sun bg-sun text-night' : 'border-white/15 text-ivory/75 hover:border-white/40 hover:text-ivory'
                }`}
              >
                {c.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
