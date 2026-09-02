const TIME_ZONE = 'Africa/Ndjamena'

export const formatDate = (value: string | Date, style: 'long' | 'short' = 'long'): string => {
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('fr-FR', {
    timeZone: TIME_ZONE,
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  })
}

export const formatFileSize = (bytes: number): string => {
  if (!bytes || bytes <= 0) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} Ko`
  return `${(bytes / (1024 * 1024)).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Mo`
}
