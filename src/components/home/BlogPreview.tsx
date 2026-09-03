import Link from 'next/link'

import ArticleCard from '@/components/blog/ArticleCard'
import { ArrowRight } from '@/components/ui/Icons'
import SectionHeading from '@/components/ui/SectionHeading'
import type { ArticleCard as ArticleCardData } from '@/lib/articles'

export default function BlogPreview({ articles }: { articles: ArticleCardData[] }) {
  if (articles.length === 0) return null
  return (
    <section id="blog" className="section container-custom">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Actualités" title="Sur le terrain, nos dernières nouvelles" />
        <Link href="/blog" className="btn-ghost shrink-0">
          Tous les articles
          <ArrowRight />
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <ArticleCard key={a.id} article={a} index={i} />
        ))}
      </div>
    </section>
  )
}
