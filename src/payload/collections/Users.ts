import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { fr: 'Utilisateur' },
    plural: { fr: 'Utilisateurs' },
  },
  admin: {
    useAsTitle: 'name',
    group: { fr: 'Administration' },
    description: { fr: 'Gérez les comptes des membres de l\'équipe' },
  },
  access: {
    read: () => true,
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rôle',
      options: [
        { label: 'Administrateur', value: 'admin' },
        { label: 'Éditeur', value: 'editor' },
        { label: 'Auteur', value: 'author' },
      ],
      required: true,
      defaultValue: 'author',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biographie',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo de profil',
    },
  ],
}
