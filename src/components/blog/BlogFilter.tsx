import Link from 'next/link'

import { FILTER_CATEGORIES } from '@/lib/categories'

/** Filtres par catégorie : de simples liens, fonctionnels même sans JavaScript. */
export default function BlogFilter({ current }: { current: string }) {
  return (
    <nav aria-label="Filtrer par catégorie" className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
      <ul className="flex min-w-max gap-x-6 gap-y-3 lg:flex-wrap">
        {FILTER_CATEGORIES.map((category) => {
          const active = current === category.value
          const href = category.value === 'all' ? '/blog' : `/blog?category=${category.value}`
          return (
            <li key={category.value}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`t-label inline-block py-2 underline-offset-[6px] transition-colors ${
                  active ? 'text-ink underline decoration-terre decoration-1' : 'text-stone hover:text-ink'
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
