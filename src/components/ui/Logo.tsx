import Image from 'next/image'
import Link from 'next/link'

import { SITE } from '@/lib/site'

export default function Logo({ priority = false, light = false, className = '' }: { priority?: boolean; light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label={`${SITE.name} — accueil`}>
      <Image src="/logo.jpg" alt="" width={36} height={36} sizes="36px" priority={priority} className="h-9 w-9 rounded-full object-cover ring-2 ring-white/70" />
      <span className={`display text-[19px] font-bold tracking-tight ${light ? 'text-ivory' : 'text-ink'}`}>{SITE.shortName}</span>
    </Link>
  )
}
