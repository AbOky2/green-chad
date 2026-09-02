import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = { currentPage: number; totalPages: number; category: string }

const pageHref = (page: number, category: string) => {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/blog?${query}` : '/blog'
}

const pageButton = 'inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-line bg-white px-3 text-sm font-medium transition-colors'

export default function BlogPagination({ currentPage, totalPages, category }: Props) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  )

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1, category)} className={`${pageButton} hover:border-brand-300`} aria-label="Page précédente">
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className={`${pageButton} opacity-40`} aria-hidden><ChevronLeft className="h-4 w-4" /></span>
      )}

      {pages.map((page, i) => {
        const gap = i > 0 && page - pages[i - 1] > 1
        return (
          <span key={page} className="flex items-center gap-2">
            {gap && <span className="px-1 text-muted">…</span>}
            {page === currentPage ? (
              <span aria-current="page" className={`${pageButton} border-brand-600 bg-brand-600 text-white`}>{page}</span>
            ) : (
              <Link href={pageHref(page, category)} className={`${pageButton} hover:border-brand-300`}>{page}</Link>
            )}
          </span>
        )
      })}

      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1, category)} className={`${pageButton} hover:border-brand-300`} aria-label="Page suivante">
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={`${pageButton} opacity-40`} aria-hidden><ChevronRight className="h-4 w-4" /></span>
      )}
    </nav>
  )
}
