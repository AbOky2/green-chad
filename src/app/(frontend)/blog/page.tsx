import type { Metadata } from 'next'
import ArticleList from '@/components/blog/ArticleList'
import BlogFilter from '@/components/blog/BlogFilter'
import PageHeader from '@/components/ui/PageHeader'
import { isArticleCategory } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Actualités',
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
      <PageHeader
        eyebrow="Actualités"
        title={<>Sur le terrain, <em>au jour le jour</em></>}
        description="Nos actualités, articles et événements autour du développement durable au Tchad."
      >
        <div className="mt-10">
          <BlogFilter current={category} />
        </div>
      </PageHeader>

      <div className="container-custom py-12 lg:py-16">
        {/* Données en cache : pas de Suspense, l'image prioritaire est ainsi découverte dès le HTML initial. */}
        <ArticleList page={page} category={category} />
      </div>
    </>
  )
}
