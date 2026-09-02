import { ARTICLE_CATEGORIES } from '@/payload/collections/Articles'

const DOTS: Record<string, string> = {
  environnement: 'bg-moss',
  education: 'bg-sky-700',
  sante: 'bg-rose-700',
  eauHygieneAssainissement: 'bg-cyan-700',
  actualites: 'bg-ink',
  evenements: 'bg-terre',
  securiteAlimentaire: 'bg-ocre',
  formation: 'bg-amber-700',
  violence: 'bg-red-800',
  paix: 'bg-emerald-800',
}

export const categoryDot = (value: string): string => DOTS[value] ?? 'bg-stone'

export const categoryLabel = (value: string): string =>
  ARTICLE_CATEGORIES.find((c) => c.value === value)?.label ?? value

/** Libellés courts pour les filtres (les intitulés complets sont longs). */
export const FILTER_CATEGORIES = [
  { label: 'Tous', value: 'all' },
  { label: 'Environnement', value: 'environnement' },
  { label: 'Éducation', value: 'education' },
  { label: 'Santé', value: 'sante' },
  { label: 'Eau & assainissement', value: 'eauHygieneAssainissement' },
  { label: 'Actualités', value: 'actualites' },
  { label: 'Événements', value: 'evenements' },
  { label: 'Sécurité alimentaire', value: 'securiteAlimentaire' },
  { label: 'Formation', value: 'formation' },
  { label: 'VBG', value: 'violence' },
  { label: 'Paix', value: 'paix' },
] as const
