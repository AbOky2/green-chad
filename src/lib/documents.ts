import { unstable_cache } from 'next/cache'
import type { Document as PayloadDocument, User } from '@payload-types'

import { getPayloadClient } from './payload'
import { CACHE_TAGS } from '@/payload/hooks/revalidate'
import { DOCUMENT_CATEGORIES } from '@/payload/collections/Documents'

export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number]['value']

export type PublicDocument = {
  id: string
  title: string
  description: string
  category: DocumentCategory
  url: string
  downloadUrl: string
  filename: string
  mimeType: string
  extension: string
  filesize: number
  publishedAt: string
  uploadedBy: string
}

export type DocumentGroup = {
  category: DocumentCategory
  label: string
  documents: PublicDocument[]
}

export const documentCategoryLabel = (value: string): string =>
  DOCUMENT_CATEGORIES.find((c) => c.value === value)?.label ?? value

const extensionOf = (filename: string, mimeType: string): string => {
  const fromName = filename.includes('.') ? filename.split('.').pop()!.toLowerCase() : ''
  if (fromName) return fromName
  if (mimeType === 'application/pdf') return 'pdf'
  return 'fichier'
}

/** URL forçant le téléchargement (Vercel Blob interprète `?download=1`). */
const toDownloadUrl = (url: string): string => {
  if (!url.startsWith('http')) return url
  const u = new URL(url)
  u.searchParams.set('download', '1')
  return u.toString()
}

/** Forme exacte d'un document tel que renvoyé par la requête publique (voir le `select`). */
type DocumentListDoc = Pick<
  PayloadDocument,
  'id' | 'title' | 'description' | 'category' | 'publishedAt' | 'createdAt' | 'uploadedBy' | 'url' | 'filename' | 'mimeType' | 'filesize'
>

const toPublic = (d: DocumentListDoc): PublicDocument | null => {
  if (!d.url) return null
  const filename = d.filename ?? d.title
  const mimeType = d.mimeType ?? 'application/octet-stream'
  return {
    id: String(d.id),
    title: d.title,
    description: d.description ?? '',
    category: d.category,
    url: d.url,
    downloadUrl: toDownloadUrl(d.url),
    filename,
    mimeType,
    extension: extensionOf(filename, mimeType),
    filesize: d.filesize ?? 0,
    publishedAt: d.publishedAt ?? d.createdAt,
    uploadedBy: d.uploadedBy && typeof d.uploadedBy === 'object' ? (d.uploadedBy as User).name : 'Green-Chad',
  }
}

export const getPublicDocuments = unstable_cache(
  async (): Promise<DocumentGroup[]> => {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'documents',
        where: { status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 200,
        pagination: false,
        depth: 1,
        select: {
          title: true,
          description: true,
          category: true,
          publishedAt: true,
          createdAt: true,
          uploadedBy: true,
          url: true,
          filename: true,
          mimeType: true,
          filesize: true,
        },
        populate: { users: { name: true } },
      })
      const publicDocs = docs.map(toPublic).filter((d): d is PublicDocument => d !== null)
      return DOCUMENT_CATEGORIES.map((c) => ({
        category: c.value,
        label: c.label,
        documents: publicDocs.filter((d) => d.category === c.value),
      })).filter((group) => group.documents.length > 0)
    } catch (error) {
      console.error('[documents] getPublicDocuments', error)
      return []
    }
  },
  ['public-documents'],
  { tags: [CACHE_TAGS.documents], revalidate: 60 * 60 },
)
