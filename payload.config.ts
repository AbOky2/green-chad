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
import {
  DOCUMENT_MIME_TYPES,
  DOCUMENTS_PREFIX,
  MAX_FILE_SIZE_BYTES,
  MEDIA_MIME_TYPES,
  MEDIA_PREFIX,
} from './src/payload/storage'

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
  // Pas de `serverURL` : Payload l'ajouterait à sa liste CSRF (config/sanitize.js), et seule
  // cette origine exacte pourrait alors utiliser le cookie de session. L'administration
  // devenait inutilisable dès que l'URL consultée différait (déploiement de prévisualisation
  // Vercel, domaine avec ou sans « www ») : plus aucun auteur dans les listes, et « Vous n'êtes
  // pas autorisé » à chaque enregistrement. Le cookie reste protégé par SameSite=Lax, qui
  // empêche déjà son envoi depuis un autre site.
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
    // Le schéma est géré par les migrations (`npm run db:migrate`), y compris en développement.
    // Sans cela, `next dev` propose de supprimer les colonnes que le plugin de stockage
    // n'ajoute qu'en présence d'un jeton Blob : la base locale divergerait de la production
    // et une migration générée ensuite pourrait supprimer ces colonnes en production.
    push: false,
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
      // Les champs du plugin (dont « prefix ») font partie du schéma même sans jeton :
      // le schéma est ainsi identique en local et en production, et les migrations
      // générées ici s'appliquent telles quelles au déploiement.
      alwaysInsertFields: true,
      // URLs publiques directes vers le CDN Blob : les fichiers ne transitent plus par une fonction serverless.
      // Les médias restent à la racine du store (voir MEDIA_PREFIX) pour ne pas invalider les images déjà en ligne.
      collections: {
        media: { prefix: MEDIA_PREFIX, disablePayloadAccessControl: true },
        documents: { prefix: DOCUMENTS_PREFIX, disablePayloadAccessControl: true },
      },
    }),
    blobClientUploads({
      token: blobToken,
      collections: {
        media: { prefix: MEDIA_PREFIX, mimeTypes: MEDIA_MIME_TYPES },
        documents: { prefix: DOCUMENTS_PREFIX, mimeTypes: DOCUMENT_MIME_TYPES },
      },
    }),
  ],
  defaultDepth: 1,
  maxDepth: 3,
})
