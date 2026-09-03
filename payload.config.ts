import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { fr } from 'payload/i18n/fr'
import { Users } from './src/payload/collections/Users'
import { Articles } from './src/payload/collections/Articles'
import { Media } from './src/payload/collections/Media'
import { Documents } from './src/payload/collections/Documents'
import { blobClientUploads } from './src/payload/plugins/blobClientUploads'
import { DOCUMENT_MIME_TYPES, MAX_FILE_SIZE_BYTES, MEDIA_MIME_TYPES } from './src/payload/storage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const blobToken = process.env.BLOB_READ_WRITE_TOKEN

const textValue = (field: unknown): string => {
  if (typeof field === 'string') return field
  if (field && typeof field === 'object' && 'value' in field && typeof field.value === 'string') return field.value
  return ''
}

/** Ajoute les options SSL attendues par Neon, sauf pour une base locale ou si déjà précisées. */
const buildDatabaseUrl = (raw = ''): string => {
  if (!raw) return ''
  const isLocal = /@(localhost|127\.0\.0\.1)(:|\/)/.test(raw)
  if (isLocal || raw.includes('sslmode=')) return raw
  return `${raw}${raw.includes('?') ? '&' : '?'}uselibpqcompat=true&sslmode=require`
}

const databaseUrl = buildDatabaseUrl(process.env.DATABASE_URL)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || undefined,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Green-Chad',
    },
    components: {
      beforeDashboard: ['/src/payload/components/StorageUsage#StorageUsage'],
    },
  },
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
  },
  collections: [Users, Articles, Documents, Media],
  editor: lexicalEditor({}),
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
      // Vercel (serverless) : garder peu de connexions ouvertes vers Neon.
      max: 5,
      idleTimeoutMillis: 10_000,
    },
  }),
  upload: {
    // Envois passant par le serveur (développement local ou petits fichiers).
    limits: { fileSize: MAX_FILE_SIZE_BYTES },
    abortOnLimit: true,
  },
  plugins: [
    seoPlugin({
      collections: ['articles'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Green-Chad - ${textValue(doc.title)}`,
      generateDescription: ({ doc }) => textValue(doc.excerpt),
    }),
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      token: blobToken,
      // URLs publiques directes vers le CDN Blob : les fichiers ne transitent plus par une fonction serverless.
      collections: {
        media: { prefix: 'media', disablePayloadAccessControl: true },
        documents: { prefix: 'documents', disablePayloadAccessControl: true },
      },
    }),
    blobClientUploads({
      token: blobToken,
      collections: {
        media: { prefix: 'media', mimeTypes: MEDIA_MIME_TYPES },
        documents: { prefix: 'documents', mimeTypes: DOCUMENT_MIME_TYPES },
      },
    }),
  ],
  defaultDepth: 1,
  maxDepth: 3,
})
