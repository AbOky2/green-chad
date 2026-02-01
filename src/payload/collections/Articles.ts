import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', 'status'],
    group: 'Contenu',
    description: 'Gérez les articles et actualités du blog',
  },
  access: {
    read: ({ req: { user } }) => {
      // Public peut lire les articles publiés
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      // Authentifiés peuvent tout voir
      return true
    },
  },
  versions: {
    drafts: true,
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
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: {
        description: 'URL de l\'article (ex: mon-premier-article)',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extrait',
      admin: {
        description: 'Court résumé (150-200 caractères)',
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
      options: [
        { label: 'Environnement', value: 'environnement' },
        { label: 'Éducation', value: 'education' },
        { label: 'Santé', value: 'sante' },
        { label: 'Agriculture', value: 'agriculture' },
        { label: 'Actualités', value: 'actualites' },
        { label: 'Événements', value: 'evenements' },
      ],
      required: true,
      label: 'Catégorie',
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
      label: 'Statut',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
