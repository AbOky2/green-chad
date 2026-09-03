import Image from 'next/image'
import Link from 'next/link'

import CategoryTag from '@/components/ui/CategoryTag'
import { ArrowUpRight } from '@/components/ui/Icons'
import type { ArticleCard as ArticleCardData } from '@/lib/articles'
import { formatDate } from '@/lib/format'

type Props = { article: ArticleCardData; priority?: boolean; headingLevel?: 'h2' | 'h3'; index?: number }

export default function ArticleCard({ article, priority = false, headingLevel: Heading = 'h3', index = 0 }: Props) {
  return (
    <article className="reveal card card-hover group overflow-hidden" style={{ '--d': `${index * 90}ms` } as React.CSSProperties}>
      <Link href={`/blog/${article.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-ivory-2">
          <Image
            src={article.image.url}
            alt={article.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
          />
          <CategoryTag value={article.category} className="absolute left-4 top-4 bg-white/90 backdrop-blur" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <time dateTime={article.publishedAt} className="text-xs font-semibold uppercase tracking-wider text-mute">
            {formatDate(article.publishedAt, 'short')} · {article.author}
          </time>
          <Heading className="t-h3 mt-3 line-clamp-2">{article.title}</Heading>
          {article.excerpt && <p className="mt-2 line-clamp-2 text-[15px] text-ink-soft">{article.excerpt}</p>}
          <span className="link-arrow mt-auto pt-6 text-sm text-ink">
            Lire l&apos;article
            <ArrowUpRight />
          </span>
        </div>
      </Link>
    </article>
  )
}
