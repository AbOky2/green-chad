import type { Access, FieldAccess, PayloadRequest } from 'payload'

export type Role = 'admin' | 'editor' | 'author'

type UserLike = { id?: number | string; role?: string | null } | null | undefined

const roleOf = (user: UserLike): Role | null => {
  const role = user?.role
  return role === 'admin' || role === 'editor' || role === 'author' ? role : null
}

export const isAdminUser = (user: UserLike): boolean => roleOf(user) === 'admin'
export const isEditorUser = (user: UserLike): boolean => {
  const role = roleOf(user)
  return role === 'admin' || role === 'editor'
}

const userOf = (req: PayloadRequest): UserLike => req.user as UserLike

/** Tout utilisateur connecté à l'admin. */
export const authenticated: Access = ({ req }) => Boolean(req.user)

/** Uniquement les administrateurs. */
export const admins: Access = ({ req }) => isAdminUser(userOf(req))

/** Administrateurs et éditeurs. */
export const editors: Access = ({ req }) => isEditorUser(userOf(req))

/** Champ modifiable uniquement par un administrateur. */
export const adminFieldAccess: FieldAccess = ({ req }) => isAdminUser(userOf(req))

/**
 * Le public ne voit que les contenus publiés ; les membres connectés voient tout.
 * Le champ `status` doit exister sur la collection.
 */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { status: { equals: 'published' } }
}

/**
 * Admins et éditeurs gèrent tout ; les auteurs ne gèrent que leurs propres contenus.
 * `ownerField` est le champ relationnel qui pointe vers l'utilisateur (auteur / déposant).
 */
export const editorsOrOwner =
  (ownerField: string): Access =>
  ({ req }) => {
    const user = userOf(req)
    if (!user?.id) return false
    if (isEditorUser(user)) return true
    return { [ownerField]: { equals: user.id } }
  }

/** Un admin peut tout lire ; un membre ne lit que sa propre fiche. */
export const adminsOrSelf: Access = ({ req }) => {
  const user = userOf(req)
  if (!user?.id) return false
  if (isAdminUser(user)) return true
  return { id: { equals: user.id } }
}
