import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/RichText'
import CategoryTag from '@/components/ui/CategoryTag'
import { ArrowLeft, ArrowRight } from '@/components/ui/Icons'
import { getArticleBySlug, getPublishedSlugs } from '@/lib/articles'
import { formatDate } from '@/lib/format'
import { SITE } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article introuvable' }

  return {
    title: article.title,
    description: article.excerpt || article.title,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt || '',
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: [article.hero.url],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [article.hero.url],
    datePublished: article.publishedAt,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.jpg` } },
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="container-custom pt-12 lg:pt-20">
        <Link href="/blog" className="link-text text-sm">
          <ArrowLeft />
          Actualités
        </Link>

        <div className="mx-auto mt-10 max-w-[680px]">
          <p className="rise flex flex-wrap items-center gap-x-3 gap-y-1">
            <CategoryTag value={article.category} />
            <span className="t-label text-stone">·</span>
            <time dateTime={article.publishedAt} className="t-label text-stone">{formatDate(article.publishedAt)}</time>
            <span className="t-label text-stone">·</span>
            <span className="t-label text-stone">{article.readingMinutes} min de lecture</span>
          </p>
          <h1 className="t-h1 rise rise-1 mt-6">{article.title}</h1>
          {article.excerpt && <p className="t-lead rise rise-2 mt-6">{article.excerpt}</p>}
          <p className="rise rise-2 mt-6 text-sm text-stone">Par {article.author}</p>
        </div>
      </header>

      <div className="container-custom mt-12">
        <figure className="rise rise-3 relative mx-auto aspect-[16/9] max-w-[1000px] overflow-hidden border border-rule bg-paper-2">
          <Image
            src={article.hero.url}
            alt={article.hero.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
        </figure>
      </div>

      <div className="container-custom py-12 lg:py-20">
        <div className="mx-auto max-w-[680px]">
          <RichText content={article.content} className="rich-text" />
        </div>
      </div>

      <aside className="container-custom pb-20 lg:pb-28">
        <div className="mx-auto max-w-[680px] border-t border-rule pt-10">
          <p className="serif text-3xl leading-tight">
            Vous souhaitez soutenir nos actions <em>sur le terrain</em> ?
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-primary">
              Nous contacter
              <ArrowRight />
            </Link>
            <Link href="/blog" className="btn-secondary">
              Autres articles
            </Link>
          </div>
        </div>
      </aside>
    </article>
  )
}
