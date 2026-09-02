import Image from 'next/image'
import Link from 'next/link'

import { SITE } from '@/lib/site'

export default function Logo({ priority = false, light = false }: { priority?: boolean; light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${SITE.name} — accueil`}>
      <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-brand-500/70 ring-offset-2 ring-offset-transparent transition-transform duration-300 group-hover:scale-105">
        <Image src="/logo.jpg" alt="" fill sizes="44px" priority={priority} className="object-cover" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>{SITE.shortName}</span>
        <span className={`text-[0.7rem] font-medium uppercase tracking-[0.18em] ${light ? 'text-brand-200' : 'text-brand-600'}`}>
          ONG · Tchad
        </span>
      </span>
    </Link>
  )
}
