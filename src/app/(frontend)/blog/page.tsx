import type { Metadata } from 'next'
import { Suspense } from 'react'

import ArticleList from '@/components/blog/ArticleList'
import BlogFilter from '@/components/blog/BlogFilter'
import BlogSkeleton from '@/components/blog/BlogSkeleton'
import PageHero from '@/components/ui/PageHero'
import { isArticleCategory } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Blog',
  description: "Actualités, articles et événements de l'ONG Green-Chad pour le développement durable au Tchad.",
  alternates: { canonical: '/blog' },
}

type Props = {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1)
  const category = params.category && isArticleCategory(params.category) ? params.category : 'all'

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Actualités & articles"
        description="Découvrez nos actualités, articles et événements autour du développement durable au Tchad."
      />

      <div className="container-custom py-12 sm:py-16">
        <BlogFilter current={category} />
        <div className="mt-10">
          <Suspense key={`${category}-${page}`} fallback={<BlogSkeleton count={6} />}>
            <ArticleList page={page} category={category} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
