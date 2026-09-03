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
    openGraph: { type: 'article', title: article.title, description: article.excerpt || '', publishedTime: article.publishedAt, authors: [article.author], images: [article.hero.url] },
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

      <header className="container-custom pt-28 sm:pt-32">
        <Link href="/blog" className="link-arrow text-sm text-ink-soft hover:text-ink">
          <ArrowLeft />
          Actualités
        </Link>
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <div className="rise flex flex-wrap items-center justify-center gap-3">
            <CategoryTag value={article.category} />
            <span className="text-xs font-semibold uppercase tracking-wider text-mute">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {article.readingMinutes} min de lecture
            </span>
          </div>
          <h1 className="t-h1 rise mt-6" style={{ '--d': '80ms' } as React.CSSProperties}>{article.title}</h1>
          {article.excerpt && <p className="t-lead rise mt-5 text-ink-soft" style={{ '--d': '160ms' } as React.CSSProperties}>{article.excerpt}</p>}
          <p className="rise mt-5 text-sm font-semibold text-mute" style={{ '--d': '200ms' } as React.CSSProperties}>Par {article.author}</p>
        </div>
      </header>

      <div className="container-custom mt-10">
        <figure className="rise relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-4xl bg-ivory-2 shadow-lift" style={{ '--d': '240ms' } as React.CSSProperties}>
          <Image src={article.hero.url} alt={article.hero.alt} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
        </figure>
      </div>

      <div className="container-custom py-12 lg:py-20">
        <div className="mx-auto max-w-[700px]">
          <RichText content={article.content} className="rich-text" />
        </div>
      </div>

      <aside className="container-custom pb-20 lg:pb-28">
        <div className="mx-auto max-w-[700px] rounded-4xl bg-night p-8 text-ivory sm:p-10">
          <p className="t-h3 sm:text-2xl">Vous souhaitez soutenir nos actions <span className="text-sun">sur le terrain</span> ?</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-sun">Nous contacter<ArrowRight /></Link>
            <Link href="/blog" className="btn-ghost-light">Autres articles</Link>
          </div>
        </div>
      </aside>
    </article>
  )
}
