import type { CollectionConfig } from 'payload'

import { adminFieldAccess, admins, adminsOrSelf } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { fr: 'Utilisateur' },
    plural: { fr: 'Utilisateurs' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: { fr: 'Administration' },
    description: { fr: "Comptes des membres de l'équipe. Seul un administrateur peut créer des comptes ou changer les rôles." },
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 jours
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
  },
  access: {
    // Les emails ne doivent pas être exposés publiquement : lecture réservée aux membres connectés.
    read: ({ req: { user } }) => Boolean(user),
    create: admins,
    update: adminsOrSelf,
    delete: admins,
    admin: ({ req: { user } }) => Boolean(user),
  },
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
      saveToJWT: true,
      access: {
        create: adminFieldAccess,
        update: adminFieldAccess,
      },
      admin: {
        position: 'sidebar',
        description:
          'Administrateur : tout gérer. Éditeur : gérer tous les articles et documents. Auteur : ses propres contenus.',
      },
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
