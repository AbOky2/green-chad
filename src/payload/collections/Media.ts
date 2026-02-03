import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { fr: 'Média' },
    plural: { fr: 'Médias' },
  },
  admin: {
    group: { fr: 'Contenu' },
    description: { fr: 'Images et fichiers uploadés' },
  },
  access: {
    read: () => true,
  },
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 500,
        position: 'centre',
      },
      {
        name: 'featured',
        width: 1200,
        height: 600,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Légende',
    },
  ],
}
