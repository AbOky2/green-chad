import Link from 'next/link'

import ArticleCard from '@/components/blog/ArticleCard'
import { ArrowRight } from '@/components/ui/Icons'
import SectionHeading from '@/components/ui/SectionHeading'
import type { ArticleCard as ArticleCardData } from '@/lib/articles'

export default function BlogPreview({ articles }: { articles: ArticleCardData[] }) {
  if (articles.length === 0) return null

  return (
    <section id="blog" className="container-custom section pt-0 lg:pt-0">
      <SectionHeading number="03" eyebrow="Actualités">
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="t-h2 max-w-2xl">Sur le terrain, dernières nouvelles</h2>
          <Link href="/blog" className="link-text">
            Tous les articles
            <ArrowRight />
          </Link>
        </div>
      </SectionHeading>

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
