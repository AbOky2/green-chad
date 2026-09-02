import { ARTICLE_CATEGORIES } from '@/payload/collections/Articles'

type Style = { chip: string; dot: string }

const STYLES: Record<string, Style> = {
  environnement: { chip: 'bg-brand-100 text-brand-800', dot: 'bg-brand-500' },
  education: { chip: 'bg-sky-100 text-sky-800', dot: 'bg-sky-500' },
  sante: { chip: 'bg-rose-100 text-rose-800', dot: 'bg-rose-500' },
  eauHygieneAssainissement: { chip: 'bg-cyan-100 text-cyan-800', dot: 'bg-cyan-500' },
  actualites: { chip: 'bg-violet-100 text-violet-800', dot: 'bg-violet-500' },
  evenements: { chip: 'bg-pink-100 text-pink-800', dot: 'bg-pink-500' },
  securiteAlimentaire: { chip: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  formation: { chip: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500' },
  violence: { chip: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
  paix: { chip: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
}

const DEFAULT: Style = { chip: 'bg-paper-2 text-ink-soft', dot: 'bg-muted' }

export const categoryStyle = (value: string): Style => STYLES[value] ?? DEFAULT

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
