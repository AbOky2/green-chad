'use client'

import { createClientUploadHandler } from '@payloadcms/plugin-cloud-storage/client'
import { upload } from '@vercel/blob/client'
import { formatAdminURL } from 'payload/shared'

import { formatBytes, toUniqueFilename } from '../storage'

type Extra = {
  allowedTypes?: string[]
  maxFileSize?: number
  prefix?: string
  usagePath?: string
}

type Usage = { totalBytes: number; quotaBytes: number }

/**
 * Côté navigateur : vérifie la taille et le type avant d'envoyer, puis téléverse
 * directement vers Vercel Blob avec un jeton fourni par /api/blob-client-upload.
 * Les messages d'erreur sont affichés tels quels dans l'admin (toast).
 */
export const ClientUploadHandler = createClientUploadHandler({
  handler: async ({ apiRoute, collectionSlug, extra, file, serverHandlerPath, serverURL, updateFilename }) => {
    const { allowedTypes, maxFileSize, prefix = '', usagePath } = (extra ?? {}) as Extra

    if (maxFileSize && file.size > maxFileSize) {
      throw new Error(
        `Fichier trop volumineux (${formatBytes(file.size)}). Taille maximale : ${formatBytes(maxFileSize)}.`,
      )
    }
    if (allowedTypes?.length && file.type && !allowedTypes.includes(file.type)) {
      throw new Error(`Type de fichier non accepté (${file.type}).`)
    }

    if (usagePath) {
      try {
        const response = await fetch(formatAdminURL({ apiRoute, path: usagePath as `/${string}`, serverURL }), {
          credentials: 'include',
        })
        if (response.ok) {
          const usage = (await response.json()) as Usage
          if (usage.totalBytes + file.size > usage.quotaBytes) {
            throw new Error(
              `Espace de stockage insuffisant : ${formatBytes(usage.totalBytes)} utilisés sur ${formatBytes(usage.quotaBytes)}. Supprimez d'anciens fichiers avant d'en ajouter.`,
            )
          }
        }
      } catch (error) {
        if (error instanceof Error && error.message.startsWith('Espace de stockage')) throw error
        // Indisponible : le serveur refusera de toute façon un dépassement.
      }
    }

    const filename = toUniqueFilename(file.name)
    const handleUploadUrl = formatAdminURL({ apiRoute, path: serverHandlerPath, serverURL })

    try {
      await upload(`${prefix}${filename}`, file, {
        access: 'public',
        clientPayload: collectionSlug,
        contentType: file.type || 'application/octet-stream',
        handleUploadUrl,
      })
    } catch (error) {
      console.error('[upload] échec envoi Blob', error)
      throw new Error(
        "Échec de l'envoi du fichier : type refusé, fichier trop lourd ou espace de stockage insuffisant.",
      )
    }

    updateFilename(filename)
    return { prefix }
  },
})
