/**
 * Paramètres de stockage (Vercel Blob).
 *
 * L'offre gratuite de Vercel est limitée : on impose donc
 *  - une taille maximale par fichier (MAX_FILE_SIZE_MB, défaut 20 Mo) ;
 *  - un quota global sur l'ensemble des fichiers (STORAGE_QUOTA_MB, défaut 1000 Mo) ;
 *  - un seuil d'alerte affiché dans l'admin (STORAGE_WARN_PERCENT, défaut 80 %).
 * Ces valeurs se surchargent via les variables d'environnement Vercel.
 */

const MB = 1024 * 1024

const readNumber = (name: string, fallback: number): number => {
  const raw = process.env[name]
  const value = raw ? Number(raw) : NaN
  return Number.isFinite(value) && value > 0 ? value : fallback
}

export const MAX_FILE_SIZE_BYTES = readNumber('MAX_FILE_SIZE_MB', 20) * MB
export const STORAGE_QUOTA_BYTES = readNumber('STORAGE_QUOTA_MB', 1000) * MB
export const STORAGE_WARN_PERCENT = readNumber('STORAGE_WARN_PERCENT', 80)

/**
 * Préfixes (dossiers) dans le store Vercel Blob.
 *
 * Les médias historiques ont été déposés à la racine du store : leur donner un préfixe
 * casserait l'URL de toutes les images déjà en ligne. Ils restent donc à la racine.
 * La collection Documents est récente : elle peut être rangée dans son propre dossier.
 */
export const MEDIA_PREFIX = ''
export const DOCUMENTS_PREFIX = 'documents'

/** Collections dont les fichiers comptent dans le quota. */
export const STORAGE_COLLECTIONS = ['media', 'documents'] as const
export type StorageCollection = (typeof STORAGE_COLLECTIONS)[number]

/** Types de fichiers acceptés pour les documents partagés. */
export const DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  // Anciens formats Office (.doc/.xls/.ppt) : conteneur OLE détecté ainsi par l'analyse binaire
  'application/x-cfb',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.presentation',
  'text/plain',
  'text/csv',
  'image/jpeg',
  'image/png',
  'image/webp',
]

export const MEDIA_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

export const formatBytes = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 o'
  const units = ['o', 'Ko', 'Mo', 'Go']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** index
  return `${value.toLocaleString('fr-FR', { maximumFractionDigits: index >= 2 ? 2 : 0 })} ${units[index]}`
}

/** Format d'un jeton Vercel Blob : vercel_blob_rw_<storeId>_<random>. */
export const getBlobStoreId = (token = process.env.BLOB_READ_WRITE_TOKEN): string | undefined =>
  token?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()

export const getBlobBaseUrl = (token = process.env.BLOB_READ_WRITE_TOKEN): string | undefined => {
  const storeId = getBlobStoreId(token)
  return storeId ? `https://${storeId}.public.blob.vercel-storage.com` : undefined
}

/** Nom de fichier propre et unique (URL lisible, pas de collision entre membres). */
export const toUniqueFilename = (original: string): string => {
  const dot = original.lastIndexOf('.')
  const ext = dot > 0 ? original.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : ''
  const base = (dot > 0 ? original.slice(0, dot) : original)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'fichier'
  const suffix = Math.random().toString(36).slice(2, 8)
  return `${base}-${suffix}${ext ? `.${ext}` : ''}`
}
