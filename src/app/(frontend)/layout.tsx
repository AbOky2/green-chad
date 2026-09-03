import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import '../globals.css'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/ui/Reveal'
import { SITE } from '@/lib/site'

/* Polices variables auto-hébergées (sous-ensembles latins, ≈ 47 Ko au total). */
const space = localFont({
  src: '../../fonts/SpaceGrotesk-Variable.woff2',
  weight: '300 700',
  variable: '--font-space',
  display: 'swap',
  adjustFontFallback: 'Arial',
})
const manrope = localFont({
  src: '../../fonts/Manrope-Variable.woff2',
  weight: '200 800',
  variable: '--font-manrope',
  display: 'swap',
  adjustFontFallback: 'Arial',
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
  themeColor: '#0b1411',
  width: 'device-width',
  initialScale: 1,
}

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${space.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:text-night"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <Reveal />
      </body>
    </html>
  )
}
