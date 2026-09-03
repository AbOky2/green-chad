import { ARTICLE_CATEGORIES } from '@/payload/collections/Articles'

const CHIPS: Record<string, string> = {
  environnement: 'bg-leaf/12 text-leaf-deep',
  education: 'bg-sky-500/12 text-sky-800',
  sante: 'bg-rose-500/12 text-rose-800',
  eauHygieneAssainissement: 'bg-cyan-500/12 text-cyan-800',
  actualites: 'bg-ink/8 text-ink',
  evenements: 'bg-sun/20 text-amber-800',
  securiteAlimentaire: 'bg-amber-500/15 text-amber-800',
  formation: 'bg-orange-500/12 text-orange-800',
  violence: 'bg-terre/12 text-terre-deep',
  paix: 'bg-emerald-500/12 text-emerald-800',
}

export const categoryChip = (value: string): string => CHIPS[value] ?? 'bg-ink/8 text-ink'

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
