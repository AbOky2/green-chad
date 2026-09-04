'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { ArrowLeft } from '@/components/ui/Icons'

/** Filet de sécurité : une erreur de rendu affiche une page lisible plutôt qu'un écran vide. */
export default function FrontendError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[page] erreur de rendu', error)
  }, [error])

  return (
    <section className="container-custom pt-28">
      <div className="relative overflow-hidden rounded-4xl bg-night px-6 py-20 text-center text-ivory sm:py-28">
        <div className="dots-bg absolute inset-0 opacity-70" aria-hidden />
        <div className="relative">
          <p className="t-label text-sun">Erreur</p>
          <h1 className="t-h2 mt-3">Cette page n&apos;a pas pu s&apos;afficher</h1>
          <p className="mx-auto mt-4 max-w-md text-ivory/70">
            Le problème est temporaire. Réessayez, ou revenez à l&apos;accueil.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="btn-sun">Réessayer</button>
            <Link href="/" className="btn-ghost-light"><ArrowLeft />Accueil</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
