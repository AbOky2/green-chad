import type { Media } from '@payload-types'

export type ImageRef = {
  url: string
  alt: string
  width?: number
  height?: number
}

/** Image de repli quand un document n'a pas (ou plus) de fichier associé. */
const FALLBACK_URL = '/logo.jpg'

type MediaSize = keyof NonNullable<Media['sizes']>

/**
 * Choisit la déclinaison la plus adaptée d'un média, avec repli sur l'original
 * puis sur le logo. Accepte une relation non peuplée (identifiant seul) sans planter.
 */
export const pickImage = (value: unknown, size: MediaSize, fallbackAlt: string): ImageRef => {
  if (!value || typeof value !== 'object') return { url: FALLBACK_URL, alt: fallbackAlt }

  const media = value as Media
  const variant = media.sizes?.[size]
  const url = variant?.url || media.url

  if (!url) return { url: FALLBACK_URL, alt: fallbackAlt }

  return {
    url,
    alt: media.alt || fallbackAlt,
    width: variant?.width ?? media.width ?? undefined,
    height: variant?.height ?? media.height ?? undefined,
  }
}

/** Champs de média réellement utilisés par le site (évite de charger le reste). */
export const MEDIA_POPULATE = {
  alt: true,
  url: true,
  width: true,
  height: true,
  sizes: true,
} as const
