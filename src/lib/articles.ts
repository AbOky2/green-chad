import { unstable_cache } from 'next/cache'
import type { Where } from 'payload'
import type { Article, Media, User } from '@payload-types'

import { getPayloadClient } from './payload'
import { CACHE_TAGS } from '@/payload/hooks/revalidate'
import { ARTICLE_CATEGORIES } from '@/payload/collections/Articles'

export const ARTICLES_PER_PAGE = 9
const CACHE_SECONDS = 60 * 60

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]['value']

export type ArticleCard = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  publishedAt: string
  author: string
  image: { url: string; alt: string; width?: number; height?: number }
}

export type ArticleDetail = ArticleCard & {
  content: Article['content']
  hero: { url: string; alt: string }
  readingMinutes: number
}

export const categoryLabel = (value: string): string =>
  ARTICLE_CATEGORIES.find((c) => c.value === value)?.label ?? value

export const isArticleCategory = (value: string): value is ArticleCategory =>
  ARTICLE_CATEGORIES.some((c) => c.value === value)

/** Sans Vercel Blob (dev local), Payload renvoie une URL absolue vers notre propre serveur : on la rend relative. */
export const toImageSrc = (url: string | null | undefined): string => {
  if (!url) return '/logo.jpg'
  const own = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '')
  return own && url.startsWith(own) ? url.slice(own.length) : url
}

const pickImage = (media: Article['featuredImage'], size: 'card' | 'featured', fallbackAlt: string) => {
  if (!media || typeof media !== 'object') return { url: '/logo.jpg', alt: fallbackAlt }
  const m = media as Media
  const variant = m.sizes?.[size]
  return {
    url: toImageSrc(variant?.url || m.url),
    alt: m.alt || fallbackAlt,
    width: variant?.width ?? m.width ?? undefined,
    height: variant?.height ?? m.height ?? undefined,
  }
}

const authorName = (author: Article['author']): string =>
  author && typeof author === 'object' ? (author as User).name : 'Green-Chad'

/** Estimation du temps de lecture à partir du contenu Lexical (≈ 200 mots/min). */
const estimateReadingMinutes = (content: unknown): number => {
  let words = 0
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    const n = node as { text?: string; children?: unknown[]; root?: unknown }
    if (typeof n.text === 'string') words += n.text.split(/\s+/).filter(Boolean).length
    if (Array.isArray(n.children)) n.children.forEach(walk)
    if (n.root) walk(n.root)
  }
  walk(content)
  return Math.max(1, Math.round(words / 200))
}

const toCard = (a: Article): ArticleCard => ({
  id: String(a.id),
  title: a.title,
  slug: a.slug ?? String(a.id),
  excerpt: a.excerpt ?? '',
  category: a.category,
  publishedAt: a.publishedAt ?? a.createdAt,
  author: authorName(a.author),
  image: pickImage(a.featuredImage, 'card', a.title),
})

export const getFeaturedArticles = unstable_cache(
  async (limit = 3): Promise<ArticleCard[]> => {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'articles',
        where: { status: { equals: 'published' } },
        sort: '-publishedAt',
        limit,
        depth: 1,
        draft: false,
      })
      return docs.map(toCard)
    } catch (error) {
      console.error('[articles] getFeaturedArticles', error)
      return []
    }
  },
  ['featured-articles'],
  { tags: [CACHE_TAGS.articles], revalidate: CACHE_SECONDS },
)

export const getArticlesPage = unstable_cache(
  async (page: number, category?: string): Promise<{ articles: ArticleCard[]; totalPages: number; total: number }> => {
    try {
      const payload = await getPayloadClient()
      const where: Where = { status: { equals: 'published' } }
      if (category && isArticleCategory(category)) where.category = { equals: category }
      const result = await payload.find({
        collection: 'articles',
        where,
        sort: '-publishedAt',
        limit: ARTICLES_PER_PAGE,
        page: Math.max(1, page),
        depth: 1,
        draft: false,
      })
      return { articles: result.docs.map(toCard), totalPages: result.totalPages || 1, total: result.totalDocs }
    } catch (error) {
      console.error('[articles] getArticlesPage', error)
      return { articles: [], totalPages: 1, total: 0 }
    }
  },
  ['articles-page'],
  { tags: [CACHE_TAGS.articles], revalidate: CACHE_SECONDS },
)

export const getArticleBySlug = unstable_cache(
  async (slug: string): Promise<ArticleDetail | null> => {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'articles',
        where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
        limit: 1,
        depth: 1,
        draft: false,
      })
      const a = docs[0]
      if (!a) return null
      return {
        ...toCard(a),
        content: a.content,
        hero: pickImage(a.featuredImage, 'featured', a.title),
        readingMinutes: estimateReadingMinutes(a.content),
      }
    } catch (error) {
      console.error('[articles] getArticleBySlug', error)
      return null
    }
  },
  ['article-by-slug'],
  { tags: [CACHE_TAGS.articles], revalidate: CACHE_SECONDS },
)

/** Slugs publiés, pour pré-générer les pages d'articles au build. */
export const getPublishedSlugs = async (): Promise<string[]> => {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      limit: 200,
      depth: 0,
      select: { slug: true },
      draft: false,
    })
    return docs.map((d) => d.slug).filter((s): s is string => Boolean(s))
  } catch {
    return []
  }
}
