import type { Config, PayloadHandler, PayloadRequest, UploadCollectionSlug } from 'payload'
import { APIError, Forbidden } from 'payload'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import path from 'path'

import { getStorageUsage } from '../hooks/storage'
import { getBlobBaseUrl, MAX_FILE_SIZE_BYTES, STORAGE_QUOTA_BYTES } from '../storage'

export type ClientUploadCollection = {
  /** Sous-dossier dans le store Blob (ex: "documents"). */
  prefix: string
  /** Types MIME acceptés (vérifiés par le jeton Vercel puis par Payload). */
  mimeTypes: string[]
}

type Options = {
  token: string | undefined
  collections: Partial<Record<UploadCollectionSlug, ClientUploadCollection>>
  cacheControlMaxAge?: number
}

const CLIENT_HANDLER_PATH = '/src/payload/components/ClientUploadHandler#ClientUploadHandler'
const UPLOAD_ROUTE = '/blob-client-upload'
const USAGE_ROUTE = '/storage-usage'

type UploadHandler = NonNullable<
  Extract<NonNullable<NonNullable<Config['collections']>[number]['upload']>, object>['handlers']
>[number]

/**
 * Handler appelé par Payload pour récupérer un fichier envoyé directement depuis le navigateur
 * (le serveur en a besoin pour vérifier le type, générer les tailles d'images, etc.).
 */
const fetchClientUploadedFile = (baseUrl: string): UploadHandler =>
  (async (_req, { params: { clientUploadContext, filename } }) => {
    if (!clientUploadContext || typeof clientUploadContext !== 'object') return undefined
    const prefix =
      'prefix' in clientUploadContext && typeof clientUploadContext.prefix === 'string'
        ? clientUploadContext.prefix
        : ''
    const url = `${baseUrl}/${path.posix.join(prefix, encodeURIComponent(filename))}`
    const response = await fetch(url, { cache: 'no-store' })
    if (!response.ok) {
      throw new APIError(`Fichier introuvable dans le stockage : ${filename}`, 404)
    }
    return response
  }) as UploadHandler

/**
 * Envoi direct navigateur → Vercel Blob.
 *
 * Pourquoi : les fonctions Vercel refusent les requêtes de plus de 4,5 Mo ; un PDF scanné
 * ne passerait donc jamais par le serveur. Le navigateur demande ici un jeton temporaire,
 * puis envoie le fichier lui-même. Le jeton porte les garde-fous : taille maximale,
 * types autorisés et espace restant dans le quota, calculés côté serveur.
 */
export const blobClientUploads =
  ({ token, collections, cacheControlMaxAge = 60 * 60 * 24 * 365 }: Options) =>
  (config: Config): Config => {
    const baseUrl = getBlobBaseUrl(token)
    const enabled = Boolean(token && baseUrl)

    // Le composant client est toujours déclaré (même sans jeton) pour que l'importMap
    // généré en local reste identique à celui utilisé en production.
    const admin = config.admin ?? {}
    const components = admin.components ?? {}
    const providers = [...(components.providers ?? [])]
    for (const [slug, options] of Object.entries(collections)) {
      if (!options) continue
      providers.push({
        path: CLIENT_HANDLER_PATH,
        clientProps: {
          collectionSlug: slug,
          enabled,
          prefix: options.prefix,
          serverHandlerPath: UPLOAD_ROUTE,
          extra: {
            allowedTypes: options.mimeTypes,
            maxFileSize: MAX_FILE_SIZE_BYTES,
            prefix: `${options.prefix}/`,
            usagePath: USAGE_ROUTE,
          },
        },
      })
    }
    const usageRoute: PayloadHandler = async (req: PayloadRequest) => {
      if (!req.user) throw new Forbidden(req.t)
      const usage = await getStorageUsage(req.payload)
      return Response.json({ ...usage, maxFileSize: MAX_FILE_SIZE_BYTES })
    }

    const configWithProviders: Config = {
      ...config,
      admin: { ...admin, components: { ...components, providers } },
      endpoints: [...(config.endpoints ?? []), { path: USAGE_ROUTE, method: 'get', handler: usageRoute }],
    }

    // Pas de stockage Blob (ex: développement local) : envoi classique via le serveur.
    if (!enabled || !token || !baseUrl) return configWithProviders

    const uploadRoute: PayloadHandler = async (req) => {
      if (!req.user) throw new Forbidden(req.t)
      if (!req.json) throw new APIError('Requête invalide.', 400)
      const body = (await req.json()) as HandleUploadBody

      const result = await handleUpload({
        body,
        request: req as unknown as Request,
        token,
        onBeforeGenerateToken: async (pathname, clientPayload) => {
          const slug = clientPayload as UploadCollectionSlug | null
          const collection = slug ? collections[slug] : undefined
          if (!slug || !collection) throw new APIError('Collection inconnue.', 400)
          if (!pathname.startsWith(`${collection.prefix}/`) || pathname.includes('..')) {
            throw new APIError('Chemin de fichier invalide.', 400)
          }

          const collectionConfig = req.payload.collections[slug]?.config
          const createAccess = collectionConfig?.access?.create
          const allowed = createAccess ? await createAccess({ req, data: {} }) : true
          if (!allowed) throw new Forbidden(req.t)

          const usage = await getStorageUsage(req.payload)
          const remaining = STORAGE_QUOTA_BYTES - usage.totalBytes
          if (remaining <= 0) throw new APIError('Espace de stockage épuisé.', 400)

          return {
            addRandomSuffix: false,
            allowedContentTypes: collection.mimeTypes,
            cacheControlMaxAge,
            maximumSizeInBytes: Math.min(MAX_FILE_SIZE_BYTES, remaining),
          }
        },
        onUploadCompleted: async () => {},
      })

      return Response.json(result)
    }

    return {
      ...configWithProviders,
      endpoints: [...(configWithProviders.endpoints ?? []), { path: UPLOAD_ROUTE, method: 'post', handler: uploadRoute }],
      collections: (config.collections ?? []).map((collection) => {
        if (!collections[collection.slug as UploadCollectionSlug] || !collection.upload) return collection
        const upload = typeof collection.upload === 'object' ? collection.upload : {}
        return {
          ...collection,
          upload: {
            ...upload,
            handlers: [...(upload.handlers ?? []), fetchClientUploadedFile(baseUrl)],
          },
        }
      }),
    }
  }
