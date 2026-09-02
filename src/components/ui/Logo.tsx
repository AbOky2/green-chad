import Image from 'next/image'
import Link from 'next/link'

import { SITE } from '@/lib/site'

export default function Logo({ priority = false, light = false }: { priority?: boolean; light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label={`${SITE.name} — accueil`}>
      <Image
        src="/logo.jpg"
        alt=""
        width={40}
        height={40}
        sizes="40px"
        priority={priority}
        className={`h-10 w-10 rounded-full border object-cover ${light ? 'border-paper/30' : 'border-rule'}`}
      />
      <span className={`serif text-[22px] leading-none ${light ? 'text-paper' : 'text-ink'}`}>{SITE.shortName}</span>
    </Link>
  )
}
