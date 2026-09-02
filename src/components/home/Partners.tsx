import Image from 'next/image'

import SectionHeading from '@/components/ui/SectionHeading'
import { PARTNERS } from '@/lib/partners'

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-16 pr-16 lg:gap-24 lg:pr-24" aria-hidden={hidden || undefined}>
      {PARTNERS.map((p) => (
        <li key={p.name} className="group flex shrink-0 items-center" title={p.description}>
          <Image
            src={p.image}
            alt={hidden ? '' : `${p.name} — ${p.description}`}
            width={p.width}
            height={p.height}
            sizes="(max-width: 640px) 160px, 200px"
            loading="lazy"
            className="h-14 w-auto opacity-70 grayscale transition-[filter,opacity] duration-400 group-hover:opacity-100 group-hover:grayscale-0 sm:h-16"
          />
        </li>
      ))}
    </ul>
  )
}

export default function Partners() {
  return (
    <section id="partners" className="container-custom section pt-0 lg:pt-0">
      <SectionHeading number="05" eyebrow="Partenaires" title="Ils nous accompagnent" />

      <div className="marquee mt-12 border-y border-rule py-10">
        <div className="marquee-track">
          <Track />
          <Track hidden />
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone">
        {PARTNERS.map((p) => (
          <li key={p.name}>
            <span className="text-ink">{p.name}</span> — {p.description}
          </li>
        ))}
      </ul>
    </section>
  )
}
