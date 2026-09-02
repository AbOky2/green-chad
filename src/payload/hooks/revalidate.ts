import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag, updateTag } from 'next/cache'

/**
 * Tags utilisés par le cache Next.js côté front (voir src/lib/*).
 * Chaque modification dans l'admin invalide instantanément les pages concernées,
 * ce qui permet de garder un cache long (rapide) sans afficher de contenu périmé.
 */
export const CACHE_TAGS = {
  articles: 'articles',
  documents: 'documents',
} as const

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]

const safeRevalidate = (tag: CacheTag, logger?: { warn: (msg: string) => void }) => {
  try {
    // Depuis l'admin (server action) : expiration immédiate, le contenu est à jour dès la prochaine visite.
    updateTag(tag)
    return
  } catch {
    // updateTag n'est autorisé que dans une server action : on retombe sur revalidateTag.
  }
  try {
    // Depuis l'API REST : « stale-while-revalidate », le contenu se met à jour au second chargement.
    revalidateTag(tag, 'max')
  } catch (error) {
    // Hors contexte Next (ex: CLI payload), la revalidation n'est pas disponible : on ignore.
    logger?.warn(`[revalidate] Impossible d'invalider le tag "${tag}": ${String(error)}`)
  }
}

export const revalidateAfterChange =
  (tag: CacheTag): CollectionAfterChangeHook =>
  ({ doc, req }) => {
    if (!req.context?.disableRevalidate) safeRevalidate(tag, req.payload.logger)
    return doc
  }

export const revalidateAfterDelete =
  (tag: CacheTag): CollectionAfterDeleteHook =>
  ({ doc, req }) => {
    if (!req.context?.disableRevalidate) safeRevalidate(tag, req.payload.logger)
    return doc
  }
