import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import '../globals.css'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/lib/site'

/* Police de titrage auto-hébergée (sous-ensemble latin, ≈ 43 Ko pour les deux styles). */
const instrument = localFont({
  src: [
    { path: '../../fonts/InstrumentSerif-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/InstrumentSerif-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-instrument',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE.name,
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
    images: ['/logo.jpg'],
  },
  twitter: {
    card: 'summary',
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
    images: ['/logo.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f2eb',
  width: 'device-width',
  initialScale: 1,
}

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={instrument.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
