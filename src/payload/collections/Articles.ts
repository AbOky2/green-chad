import type { CollectionConfig } from 'payload'

import { authenticated, editorsOrOwner, publishedOrAuthenticated } from '../access'
import { CACHE_TAGS, revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { slugify } from '@/lib/slug'

export const ARTICLE_CATEGORIES = [
  { label: 'Environnement', value: 'environnement' },
  { label: 'Éducation', value: 'education' },
  { label: 'Santé', value: 'sante' },
  { label: "L'eau, l'hygiène et l'assainissement", value: 'eauHygieneAssainissement' },
  { label: 'Actualités', value: 'actualites' },
  { label: 'Événements', value: 'evenements' },
  { label: 'Sécurité alimentaire', value: 'securiteAlimentaire' },
  { label: 'Formation technique et professionnelle', value: 'formation' },
  { label: 'Violence basée sur le genre', value: 'violence' },
  { label: 'La paix', value: 'paix' },
] as const

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: { fr: 'Article' },
    plural: { fr: 'Articles' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedAt', 'status'],
    group: { fr: 'Contenu' },
    description: { fr: 'Articles et actualités du blog. Un article est visible sur le site une fois au statut « Publié ».' },
    listSearchableFields: ['title', 'excerpt'],
  },
  defaultSort: '-publishedAt',
  // Index composites : la requête du blog filtre sur le statut (et la catégorie)
  // puis trie par date de publication. Un seul index couvre chaque cas.
  indexes: [
    { fields: ['status', 'publishedAt'] },
    { fields: ['status', 'category', 'publishedAt'] },
  ],
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: editorsOrOwner('author'),
    delete: editorsOrOwner('author'),
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (!data) return data
        if (!data.slug && data.title) data.slug = slugify(data.title)
        else if (data.slug) data.slug = slugify(data.slug)
        if (operation === 'create' && !data.author && req.user) data.author = req.user.id
        if (data.status === 'published' && !data.publishedAt) data.publishedAt = new Date().toISOString()
        return data
      },
    ],
    afterChange: [revalidateAfterChange(CACHE_TAGS.articles)],
    afterDelete: [revalidateAfterDelete(CACHE_TAGS.articles)],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'Slug (URL)',
      admin: {
        position: 'sidebar',
        description: "Généré automatiquement à partir du titre si vide (ex: mon-premier-article).",
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extrait',
      admin: {
        description: 'Court résumé affiché dans les listes (150-200 caractères)',
      },
      maxLength: 250,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image à la une',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Contenu',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Auteur',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [...ARTICLE_CATEGORIES],
      required: true,
      label: 'Catégorie',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      index: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      index: true,
      label: 'Statut',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
