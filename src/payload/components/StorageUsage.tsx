import type { ServerProps } from 'payload'
import React from 'react'

import { getStorageUsage } from '../hooks/storage'
import { formatBytes, MAX_FILE_SIZE_BYTES, STORAGE_WARN_PERCENT } from '../storage'

/**
 * Widget affiché en haut du tableau de bord de l'admin : espace utilisé sur Vercel Blob.
 * Calculé à partir des tailles enregistrées en base (rapide, sans appel à l'API Vercel).
 */
export const StorageUsage: React.FC<ServerProps> = async ({ payload }) => {
  let usage: Awaited<ReturnType<typeof getStorageUsage>>
  try {
    usage = await getStorageUsage(payload)
  } catch {
    return null
  }

  const critical = usage.percent >= 95
  const warning = !critical && usage.percent >= STORAGE_WARN_PERCENT
  const barColor = critical ? '#dc2626' : warning ? '#d97706' : '#16a34a'

  return (
    <section
      style={{
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 'var(--style-radius-m, 8px)',
        padding: 'calc(var(--base) * 0.75) var(--base)',
        marginBottom: 'var(--base)',
        background: 'var(--theme-elevation-50)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>Espace de stockage</h2>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>
          <strong>{formatBytes(usage.totalBytes)}</strong> utilisés sur {formatBytes(usage.quotaBytes)} ({usage.percent}%)
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={usage.percent}
        style={{
          height: 10,
          borderRadius: 999,
          background: 'var(--theme-elevation-150)',
          overflow: 'hidden',
          margin: '12px 0',
        }}
      >
        <div style={{ width: `${usage.percent}%`, height: '100%', background: barColor, transition: 'width .3s' }} />
      </div>

      <ul style={{ display: 'flex', gap: 24, flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.9rem' }}>
        {usage.collections.map((entry) => (
          <li key={entry.slug}>
            <a href={`/admin/collections/${entry.slug}`}>{entry.label}</a> : {formatBytes(entry.bytes)} ({entry.count}{' '}
            fichier{entry.count > 1 ? 's' : ''})
          </li>
        ))}
        <li style={{ opacity: 0.75 }}>Taille max. par fichier : {formatBytes(MAX_FILE_SIZE_BYTES)}</li>
      </ul>

      {(warning || critical) && (
        <p style={{ margin: '12px 0 0', color: barColor, fontWeight: 600 }}>
          {critical
            ? 'Stockage presque plein : les nouveaux envois seront refusés. Supprimez des fichiers inutiles (anciennes images, doublons).'
            : 'Attention : le quota approche. Pensez à supprimer les fichiers qui ne servent plus.'}
        </p>
      )}
    </section>
  )
}
