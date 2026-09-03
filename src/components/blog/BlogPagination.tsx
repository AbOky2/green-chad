import Link from 'next/link'

import { ArrowLeft, ArrowRight } from '@/components/ui/Icons'

type Props = { currentPage: number; totalPages: number; category: string }

const pageHref = (page: number, category: string) => {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const q = params.toString()
  return q ? `/blog?${q}` : '/blog'
}

const item = 'inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-bold transition-colors'

export default function BlogPagination({ currentPage, totalPages, category }: Props) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)

  return (
    <nav aria-label="Pagination" className="mt-14 flex flex-wrap items-center justify-between gap-4">
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1, category)} className="btn-ghost h-11"><ArrowLeft />Précédent</Link>
      ) : <span />}
      <ul className="flex items-center gap-1">
        {pages.map((page, i) => {
          const gap = i > 0 && page - pages[i - 1] > 1
          return (
            <li key={page} className="flex items-center">
              {gap && <span className="px-2 text-mute">…</span>}
              {page === currentPage ? (
                <span aria-current="page" className={`${item} bg-ink text-ivory`}>{page}</span>
              ) : (
                <Link href={pageHref(page, category)} className={`${item} text-ink-soft hover:bg-ink/6 hover:text-ink`}>{page}</Link>
              )}
            </li>
          )
        })}
      </ul>
      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1, category)} className="btn-ghost h-11">Suivant<ArrowRight /></Link>
      ) : <span />}
    </nav>
  )
}
