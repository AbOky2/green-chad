import { FileText } from 'lucide-react'

import ArticleCard from './ArticleCard'
import BlogPagination from './BlogPagination'
import { getArticlesPage } from '@/lib/articles'

export default async function ArticleList({ page, category }: { page: number; category: string }) {
  const { articles, totalPages, total } = await getArticlesPage(page, category)

  if (articles.length === 0) {
    return (
      <div className="card mx-auto max-w-lg p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <FileText className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-xl font-bold">Aucun article pour le moment</h2>
        <p className="mt-2 text-ink-soft">
          {category !== 'all' ? "Aucun article n'a encore été publié dans cette catégorie." : 'Revenez bientôt pour découvrir nos actualités.'}
        </p>
      </div>
    )
  }

  return (
    <>
      <p className="mb-6 text-sm text-muted">
        {total} article{total > 1 ? 's' : ''}
        {totalPages > 1 && ` · page ${page} sur ${totalPages}`}
      </p>
      <div className="stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <ArticleCard key={article.id} article={article} index={i} priority={page === 1 && i < 3} headingLevel="h2" />
        ))}
      </div>
      <BlogPagination currentPage={page} totalPages={totalPages} category={category} />
    </>
  )
}
