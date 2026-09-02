import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from 'lucide-react'

import { RichText } from '@/components/RichText'
import { getArticleBySlug, getPublishedSlugs } from '@/lib/articles'
import { categoryLabel, categoryStyle } from '@/lib/categories'
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

  const style = categoryStyle(article.category)

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
    <article className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="container-custom max-w-4xl pt-10 sm:pt-14">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" />
          Retour au blog
        </Link>

        <div className="animate-in mt-6">
          <span className={`chip ${style.chip}`}>{categoryLabel(article.category)}</span>
          <h1 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">{article.title}</h1>
          {article.excerpt && <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">{article.excerpt}</p>}

          <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Auteur</dt>
              <User className="h-4 w-4" aria-hidden />
              <dd className="font-medium text-ink">{article.author}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Date de publication</dt>
              <CalendarDays className="h-4 w-4" aria-hidden />
              <dd><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Temps de lecture</dt>
              <Clock className="h-4 w-4" aria-hidden />
              <dd>{article.readingMinutes} min de lecture</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="container-custom mt-10 max-w-5xl">
        <figure className="animate-in animate-in-delay-1 relative aspect-[16/9] overflow-hidden rounded-3xl bg-paper-2 shadow-lift">
          <Image
            src={article.hero.url}
            alt={article.hero.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </figure>
      </div>

      <div className="container-custom max-w-3xl py-12 sm:py-16">
        <RichText content={article.content} className="rich-text" />
      </div>

      <aside className="border-t border-line bg-paper">
        <div className="container-custom max-w-3xl py-14 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Vous souhaitez en savoir plus ?</h2>
          <p className="mt-3 text-ink-soft">Contactez-nous pour découvrir comment vous pouvez soutenir nos actions sur le terrain.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/#contact" className="btn-primary">
              Nous contacter
              <ArrowRight className="h-4 w-4" />
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
