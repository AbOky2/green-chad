import type { CollectionConfig } from 'payload'

import { authenticated, editorsOrOwner, publishedOrAuthenticated } from '../access'
import { CACHE_TAGS, revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { enforceStorageLimits, setUploadedBy } from '../hooks/storage'
import { DOCUMENT_MIME_TYPES } from '../storage'

export const DOCUMENT_CATEGORIES = [
  { label: 'Règlement intérieur', value: 'reglement' },
  { label: 'Statuts', value: 'statuts' },
  { label: 'Chartes', value: 'charte' },
  { label: "Rapports d'activités", value: 'rapport' },
  { label: 'Procès-verbaux', value: 'pv' },
  { label: 'Formulaires', value: 'formulaire' },
  { label: 'Autres', value: 'autre' },
] as const

/**
 * Documents internes mis à disposition du public (règlement intérieur, chartes signées, rapports…).
 * Les membres déposent leurs fichiers ici ; ils apparaissent sur la page /documents une fois publiés.
 */
export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: { fr: 'Document' },
    plural: { fr: 'Documents' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'filesize', 'uploadedBy', 'publishedAt', 'status'],
    group: { fr: 'Contenu' },
    description: {
      fr: 'Fichiers téléchargeables par le public (PDF, Word, Excel…). Visibles sur le site une fois au statut « Publié ».',
    },
    listSearchableFields: ['title', 'description'],
  },
  defaultSort: '-publishedAt',
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: editorsOrOwner('uploadedBy'),
    delete: editorsOrOwner('uploadedBy'),
  },
  hooks: {
    beforeValidate: [
      enforceStorageLimits,
      ({ data }) => {
        if (data?.status === 'published' && !data.publishedAt) data.publishedAt = new Date().toISOString()
        return data
      },
    ],
    beforeChange: [setUploadedBy],
    afterChange: [revalidateAfterChange(CACHE_TAGS.documents)],
    afterDelete: [revalidateAfterDelete(CACHE_TAGS.documents)],
  },
  upload: {
    mimeTypes: DOCUMENT_MIME_TYPES,
    crop: false,
    focalPoint: false,
    pasteURL: false,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
      admin: { description: 'Ex : Règlement intérieur 2025' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      maxLength: 400,
      admin: { description: 'Quelques mots pour expliquer le contenu du document (facultatif).' },
    },
    {
      name: 'category',
      type: 'select',
      options: [...DOCUMENT_CATEGORIES],
      required: true,
      defaultValue: 'autre',
      index: true,
      label: 'Catégorie',
      admin: { position: 'sidebar' },
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
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      index: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
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
