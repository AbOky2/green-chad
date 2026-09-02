import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook, Payload } from 'payload'
import { ValidationError } from 'payload'
import { del } from '@vercel/blob'
import path from 'path'

import {
  formatBytes,
  getBlobBaseUrl,
  MAX_FILE_SIZE_BYTES,
  STORAGE_QUOTA_BYTES,
} from '../storage'

export type StorageUsage = {
  totalBytes: number
  quotaBytes: number
  percent: number
  collections: { slug: 'media' | 'documents'; label: string; bytes: number; count: number }[]
}

/**
 * Espace occupé d'après les tailles enregistrées en base (original + déclinaisons d'images).
 * Peu coûteux : une requête par collection, uniquement les champs de taille.
 */
export const getStorageUsage = async (payload: Payload): Promise<StorageUsage> => {
  const [media, documents] = await Promise.all([
    payload.find({
      collection: 'media',
      depth: 0,
      limit: 0,
      pagination: false,
      overrideAccess: true,
      select: { filesize: true, sizes: true },
    }),
    payload.find({
      collection: 'documents',
      depth: 0,
      limit: 0,
      pagination: false,
      overrideAccess: true,
      select: { filesize: true },
    }),
  ])

  let mediaBytes = 0
  for (const doc of media.docs) {
    mediaBytes += doc.filesize ?? 0
    for (const size of Object.values(doc.sizes ?? {})) {
      mediaBytes += size?.filesize ?? 0
    }
  }
  const documentBytes = documents.docs.reduce((sum, doc) => sum + (doc.filesize ?? 0), 0)

  const totalBytes = mediaBytes + documentBytes
  return {
    totalBytes,
    quotaBytes: STORAGE_QUOTA_BYTES,
    percent: Math.min(100, Math.round((totalBytes / STORAGE_QUOTA_BYTES) * 100)),
    collections: [
      { slug: 'media', label: 'Images (médias)', bytes: mediaBytes, count: media.totalDocs },
      { slug: 'documents', label: 'Documents', bytes: documentBytes, count: documents.totalDocs },
    ],
  }
}

const deleteClientUploadedBlob = async (file: NonNullable<Parameters<CollectionBeforeValidateHook>[0]['req']['file']>) => {
  const baseUrl = getBlobBaseUrl()
  const context = file.clientUploadContext
  if (!baseUrl || !context || typeof context !== 'object') return
  const prefix = 'prefix' in context && typeof context.prefix === 'string' ? context.prefix : ''
  try {
    await del(`${baseUrl}/${path.posix.join(prefix, encodeURIComponent(file.name))}`)
  } catch {
    // Le fichier sera de toute façon absent de la base : au pire il reste un orphelin visible dans le tableau de bord.
  }
}

/**
 * Refuse un fichier trop lourd ou qui ferait dépasser le quota global.
 * S'applique aux envois classiques (serveur) et sert de filet de sécurité aux envois directs.
 */
export const enforceStorageLimits: CollectionBeforeValidateHook = async ({ data, req, originalDoc }) => {
  const file = req.file
  if (!file) return data

  const reject = async (message: string) => {
    await deleteClientUploadedBlob(file)
    throw new ValidationError({ errors: [{ message, path: 'file' }] })
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    await reject(
      `Fichier trop volumineux (${formatBytes(file.size)}). Taille maximale : ${formatBytes(MAX_FILE_SIZE_BYTES)}.`,
    )
  }

  const usage = await getStorageUsage(req.payload)
  // En cas de remplacement, l'ancien fichier sera supprimé : on le déduit.
  const previousSize = typeof originalDoc?.filesize === 'number' ? originalDoc.filesize : 0
  const projected = usage.totalBytes - previousSize + file.size
  if (projected > STORAGE_QUOTA_BYTES) {
    await reject(
      `Espace de stockage insuffisant : ${formatBytes(usage.totalBytes)} utilisés sur ${formatBytes(STORAGE_QUOTA_BYTES)}. Supprimez d'anciens fichiers ou contactez un administrateur.`,
    )
  }

  return data
}

/** Renseigne automatiquement le membre qui a déposé le fichier. */
export const setUploadedBy: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create' && req.user && !data.uploadedBy) {
    return { ...data, uploadedBy: req.user.id }
  }
  return data
}
