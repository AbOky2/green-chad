import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, User } from 'lucide-react'

import type { ArticleCard as ArticleCardData } from '@/lib/articles'
import { categoryLabel, categoryStyle } from '@/lib/categories'
import { formatDate } from '@/lib/format'

type Props = {
  article: ArticleCardData
  index?: number
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
}

export default function ArticleCard({ article, index = 0, priority = false, headingLevel: Heading = 'h3' }: Props) {
  const style = categoryStyle(article.category)
  return (
    <article className="reveal card card-hover group flex h-full flex-col overflow-hidden" style={{ '--i': index } as React.CSSProperties}>
      <Link href={`/blog/${article.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
          <Image
            src={article.image.url}
            alt={article.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className={`chip absolute left-4 top-4 shadow-soft ${style.chip}`}>{categoryLabel(article.category)}</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <Heading className="line-clamp-2 text-lg font-bold leading-snug transition-colors group-hover:text-brand-700">
            {article.title}
          </Heading>
          {article.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>}
          <dl className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Auteur</dt>
              <User className="h-3.5 w-3.5" aria-hidden />
              <dd>{article.author}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Date</dt>
              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
              <dd>
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, 'short')}</time>
              </dd>
            </div>
          </dl>
        </div>
      </Link>
    </article>
  )
}
