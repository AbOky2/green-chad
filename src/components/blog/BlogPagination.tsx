import Link from 'next/link'

import { ArrowLeft, ArrowRight } from '@/components/ui/Icons'

type Props = { currentPage: number; totalPages: number; category: string }

const pageHref = (page: number, category: string) => {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/blog?${query}` : '/blog'
}

const item = 'serif inline-flex h-11 min-w-11 items-center justify-center px-2 text-xl transition-colors'

export default function BlogPagination({ currentPage, totalPages, category }: Props) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  )

  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-between border-t border-rule pt-6">
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1, category)} className="link-text">
          <ArrowLeft />
          Précédent
        </Link>
      ) : (
        <span aria-hidden />
      )}

      <ul className="flex items-center gap-1">
        {pages.map((page, i) => {
          const gap = i > 0 && page - pages[i - 1] > 1
          return (
            <li key={page} className="flex items-center">
              {gap && <span className="px-2 text-stone">…</span>}
              {page === currentPage ? (
                <span aria-current="page" className={`${item} text-terre underline decoration-1 underline-offset-[6px]`}>{page}</span>
              ) : (
                <Link href={pageHref(page, category)} className={`${item} text-stone hover:text-ink`}>{page}</Link>
              )}
            </li>
          )
        })}
      </ul>

      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1, category)} className="link-text">
          Suivant
          <ArrowRight />
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  )
}
