import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

/** Origine du site, autorisée pour next/image quand les fichiers sont servis par Payload. */
const ownOrigin = ((): { protocol: 'http' | 'https'; hostname: string }[] => {
  const raw = process.env.NEXT_PUBLIC_SERVER_URL
  if (!raw) return []
  try {
    const { protocol, hostname } = new URL(raw)
    return [{ protocol: protocol === 'http:' ? 'http' : 'https', hostname }]
  } catch {
    return []
  }
})()

const nextConfig: NextConfig = {
  reactCompiler: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Images servies par le CDN Vercel Blob (cas normal en production).
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Repli : sans jeton Blob, Payload sert les fichiers depuis le site lui-même
      // (URL absolue construite à partir de NEXT_PUBLIC_SERVER_URL). Sans cette entrée,
      // next/image refuse l'image et la page entière échoue.
      ...ownOrigin,
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [64, 128, 256, 400],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
