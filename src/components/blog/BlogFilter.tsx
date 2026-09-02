import Link from 'next/link'

import { FILTER_CATEGORIES } from '@/lib/categories'

/** Filtres par catégorie : de simples liens, fonctionnels même sans JavaScript. */
export default function BlogFilter({ current }: { current: string }) {
  return (
    <nav aria-label="Filtrer par catégorie" className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      <ul className="flex min-w-max gap-2 sm:flex-wrap sm:justify-center">
        {FILTER_CATEGORIES.map((category) => {
          const active = current === category.value
          const href = category.value === 'all' ? '/blog' : `/blog?category=${category.value}`
          return (
            <li key={category.value}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`chip px-4! py-2! text-sm! transition-colors ${
                  active ? 'bg-brand-600 text-white shadow-soft' : 'border border-line bg-white text-ink-soft hover:border-brand-300 hover:text-ink'
                }`}
              >
                {category.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
