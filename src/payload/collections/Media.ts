import type { CollectionConfig } from 'payload'

import { authenticated, editorsOrOwner } from '../access'
import { enforceStorageLimits, setUploadedBy } from '../hooks/storage'
import { MEDIA_MIME_TYPES } from '../storage'

const webp = { format: 'webp' as const, options: { quality: 78 } }

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { fr: 'Média' },
    plural: { fr: 'Médias' },
  },
  admin: {
    group: { fr: 'Contenu' },
    description: {
      fr: "Images du site. Elles sont automatiquement réduites (max. 1600 px) et converties en WebP pour économiser l'espace de stockage.",
    },
    defaultColumns: ['filename', 'alt', 'filesize', 'uploadedBy', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: authenticated,
    update: editorsOrOwner('uploadedBy'),
    delete: editorsOrOwner('uploadedBy'),
  },
  hooks: {
    beforeValidate: [enforceStorageLimits],
    beforeChange: [setUploadedBy],
  },
  upload: {
    mimeTypes: MEDIA_MIME_TYPES,
    // L'original est réduit avant stockage : une photo de téléphone de 5 Mo devient ~300 Ko.
    resizeOptions: { width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true },
    formatOptions: webp,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre', formatOptions: webp },
      { name: 'card', width: 800, height: 520, position: 'centre', formatOptions: webp },
      { name: 'featured', width: 1400, height: 800, position: 'centre', formatOptions: webp, withoutEnlargement: true },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
      required: true,
      admin: { description: "Décrit l'image pour l'accessibilité et le référencement." },
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Légende',
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Déposé par',
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
}
