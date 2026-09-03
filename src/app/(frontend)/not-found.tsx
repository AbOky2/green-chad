import Link from 'next/link'

import ChadDots from '@/components/ui/ChadDots'
import { ArrowLeft } from '@/components/ui/Icons'

export default function NotFound() {
  return (
    <section className="container-custom pt-28">
      <div className="relative overflow-hidden rounded-4xl bg-night px-6 py-20 text-center text-ivory sm:py-28">
        <div className="dots-bg absolute inset-0 opacity-70" aria-hidden />
        <ChadDots className="pointer-events-none absolute -bottom-10 right-4 h-[320px] w-auto text-ivory/[0.06]" capital={false} />
        <div className="relative">
          <p className="display text-[clamp(6rem,20vw,12rem)] font-bold leading-none tracking-tight text-sun">404</p>
          <h1 className="t-h2 mt-2">Cette page n&apos;existe pas</h1>
          <p className="mx-auto mt-4 max-w-md text-ivory/70">Elle a peut-être été déplacée, ou l&apos;adresse comporte une erreur.</p>
          <Link href="/" className="btn-sun mt-10"><ArrowLeft />Retour à l&apos;accueil</Link>
        </div>
      </div>
    </section>
  )
}
