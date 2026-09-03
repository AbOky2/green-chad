import type { MetadataRoute } from 'next'

import { getPublishedSlugs } from '@/lib/articles'
import { SITE } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPublishedSlugs()
  const now = new Date()

  return [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/documents`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ...slugs.map((slug) => ({
      url: `${SITE.url}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
