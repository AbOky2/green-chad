import ArticleCard from './ArticleCard'
import BlogPagination from './BlogPagination'
import { getArticlesPage } from '@/lib/articles'

export default async function ArticleList({ page, category }: { page: number; category: string }) {
  const { articles, totalPages, total } = await getArticlesPage(page, category)

  if (articles.length === 0) {
    return (
      <div className="border-y border-rule py-20 text-center">
        <p className="t-h3">Aucun article pour le moment</p>
        <p className="mt-3 text-graphite">
          {category !== 'all' ? "Aucun article n'a encore été publié dans cette catégorie." : 'Revenez bientôt pour découvrir nos actualités.'}
        </p>
      </div>
    )
  }

  return (
    <>
      <p className="t-label mb-8 text-stone">
        {total} article{total > 1 ? 's' : ''}
        {totalPages > 1 && ` · page ${page} sur ${totalPages}`}
      </p>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {articles.map((article, i) => (
          <ArticleCard key={article.id} article={article} priority={page === 1 && i < 3} headingLevel="h2" />
        ))}
      </div>
      <BlogPagination currentPage={page} totalPages={totalPages} category={category} />
    </>
  )
}
