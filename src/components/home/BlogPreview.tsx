import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import ArticleCard from '@/components/blog/ArticleCard'
import SectionHeading from '@/components/ui/SectionHeading'
import type { ArticleCard as ArticleCardData } from '@/lib/articles'

export default function BlogPreview({ articles }: { articles: ArticleCardData[] }) {
  if (articles.length === 0) return null

  return (
    <section id="blog" className="section bg-paper">
      <div className="container-custom">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Notre blog"
            title="Actualités et articles"
            description="Nos dernières initiatives, événements et réflexions sur le développement durable au Tchad."
          />
          <Link href="/blog" className="btn-secondary shrink-0">
            Tous les articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="stagger mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
