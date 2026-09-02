import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="bg-mesh">
      <div className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-brand-600 shadow-soft">
          <Compass className="h-8 w-8" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Erreur 404</p>
        <h1 className="mt-2 text-3xl sm:text-5xl">Page introuvable</h1>
        <p className="mt-4 max-w-md text-ink-soft">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  )
}
