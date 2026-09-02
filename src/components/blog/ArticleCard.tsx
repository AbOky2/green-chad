import Image from 'next/image'
import Link from 'next/link'

import CategoryTag from '@/components/ui/CategoryTag'
import type { ArticleCard as ArticleCardData } from '@/lib/articles'
import { formatDate } from '@/lib/format'

type Props = {
  article: ArticleCardData
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
}

export default function ArticleCard({ article, priority = false, headingLevel: Heading = 'h3' }: Props) {
  return (
    <article className="group">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden border border-rule bg-paper-2">
          <Image
            src={article.image.url}
            alt={article.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <CategoryTag value={article.category} />
          <span className="t-label text-stone">·</span>
          <time dateTime={article.publishedAt} className="t-label text-stone">
            {formatDate(article.publishedAt, 'short')}
          </time>
        </div>
        <Heading className="t-h3 mt-3 transition-colors group-hover:text-terre">{article.title}</Heading>
        {article.excerpt && <p className="mt-3 line-clamp-2 text-graphite">{article.excerpt}</p>}
        <p className="mt-4 text-sm text-stone">Par {article.author}</p>
      </Link>
    </article>
  )
}
