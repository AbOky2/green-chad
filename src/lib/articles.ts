import { unstable_cache } from 'next/cache'
import type { Where } from 'payload'
import type { Article, User } from '@payload-types'

import { getPayloadClient } from './payload'
import { MEDIA_POPULATE, pickImage, type ImageRef } from './media'
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
  image: ImageRef
}

export type ArticleDetail = ArticleCard & {
  content: Article['content']
  hero: ImageRef
  readingMinutes: number
}

export type ArticlesPage = {
  articles: ArticleCard[]
  totalPages: number
  total: number
}

/**
 * Champs chargés pour les listes. Le contenu enrichi (`content`) en est volontairement
 * exclu : c'est de loin le champ le plus lourd et il n'est pas affiché dans une liste.
 */
const LIST_SELECT = {
  title: true,
  slug: true,
  excerpt: true,
  category: true,
  publishedAt: true,
  createdAt: true,
  featuredImage: true,
  author: true,
} as const

const POPULATE = {
  media: MEDIA_POPULATE,
  users: { name: true },
} as const

/** Forme exacte d'un article tel que renvoyé par les requêtes de liste (voir LIST_SELECT). */
type ArticleListDoc = Pick<
  Article,
  'id' | 'title' | 'slug' | 'excerpt' | 'category' | 'publishedAt' | 'createdAt' | 'featuredImage' | 'author'
>

export const isArticleCategory = (value: string): value is ArticleCategory =>
  ARTICLE_CATEGORIES.some((category) => category.value === value)

const authorName = (author: Article['author']): string =>
  author && typeof author === 'object' ? ((author as User).name ?? 'Green-Chad') : 'Green-Chad'

/** Estimation du temps de lecture à partir du contenu Lexical (≈ 200 mots par minute). */
const estimateReadingMinutes = (content: unknown): number => {
  let words = 0
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    const current = node as { text?: string; children?: unknown[]; root?: unknown }
    if (typeof current.text === 'string') words += current.text.split(/\s+/).filter(Boolean).length
    if (Array.isArray(current.children)) current.children.forEach(walk)
    if (current.root) walk(current.root)
  }
  walk(content)
  return Math.max(1, Math.round(words / 200))
}

const toCard = (article: ArticleListDoc): ArticleCard => ({
  id: String(article.id),
  title: article.title,
  slug: article.slug ?? String(article.id),
  excerpt: article.excerpt ?? '',
  category: article.category,
  publishedAt: article.publishedAt ?? article.createdAt,
  author: authorName(article.author),
  image: pickImage(article.featuredImage, 'card', article.title),
})

const publishedWhere = (category?: string): Where => {
  const published: Where = { status: { equals: 'published' } }
  if (!category || category === 'all' || !isArticleCategory(category)) return published
  return { and: [published, { category: { equals: category } }] }
}

/** Articles mis en avant sur l'accueil. Sans pagination : une requête de comptage en moins. */
export const getFeaturedArticles = unstable_cache(
  async (limit = 3): Promise<ArticleCard[]> => {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'articles',
        where: publishedWhere(),
        sort: '-publishedAt',
        limit,
        pagination: false,
        depth: 1,
        draft: false,
        select: LIST_SELECT,
        populate: POPULATE,
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
  async (page: number, category?: string): Promise<ArticlesPage> => {
    try {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'articles',
        where: publishedWhere(category),
        sort: '-publishedAt',
        limit: ARTICLES_PER_PAGE,
        page: Math.max(1, page),
        depth: 1,
        draft: false,
        select: LIST_SELECT,
        populate: POPULATE,
      })
      return {
        articles: result.docs.map(toCard),
        totalPages: result.totalPages || 1,
        total: result.totalDocs,
      }
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
        pagination: false,
        depth: 1,
        draft: false,
        select: { ...LIST_SELECT, content: true },
        populate: POPULATE,
      })
      const article = docs[0]
      if (!article) return null
      return {
        ...toCard(article),
        content: article.content,
        hero: pickImage(article.featuredImage, 'featured', article.title),
        readingMinutes: estimateReadingMinutes(article.content),
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
      where: publishedWhere(),
      limit: 500,
      pagination: false,
      depth: 0,
      select: { slug: true },
      draft: false,
    })
    return docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug))
  } catch (error) {
    console.error('[articles] getPublishedSlugs', error)
    return []
  }
}
