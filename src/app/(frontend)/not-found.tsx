import Link from 'next/link'

import { ArrowLeft } from '@/components/ui/Icons'

export default function NotFound() {
  return (
    <section className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="serif text-[10rem] leading-none text-terre sm:text-[14rem]">404</p>
      <h1 className="t-h2 mt-4">Cette page n&apos;existe pas</h1>
      <p className="mt-4 max-w-md text-graphite">Elle a peut-être été déplacée, ou l&apos;adresse comporte une erreur.</p>
      <Link href="/" className="link-text mt-10">
        <ArrowLeft />
        Retour à l&apos;accueil
      </Link>
    </section>
  )
}
