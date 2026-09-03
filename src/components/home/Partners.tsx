import Image from 'next/image'

import SectionHeading from '@/components/ui/SectionHeading'
import { PARTNERS } from '@/lib/partners'

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-stretch gap-5 pr-5" aria-hidden={hidden || undefined}>
      {PARTNERS.map((p) => (
        <li key={p.name} className="flex w-[220px] shrink-0 flex-col items-center justify-center rounded-3xl border border-line/80 bg-white px-6 py-6 shadow-[0_1px_2px_rgb(11_20_17/0.04)] transition-[transform,box-shadow] duration-400 ease-(--ease-out-expo) hover:-translate-y-1 hover:shadow-float sm:w-[260px]">
          <Image
            src={p.image}
            alt={hidden ? '' : `${p.name} — ${p.description}`}
            width={p.width}
            height={p.height}
            sizes="200px"
            loading="lazy"
            className="h-16 w-auto max-w-[180px] object-contain sm:h-20"
          />
          <span className="mt-4 text-center text-xs font-bold text-ink">{p.name}</span>
        </li>
      ))}
    </ul>
  )
}

/** Partenaires en couleur, défilement continu vers la gauche, ombres de bord ; pause au survol. */
export default function Partners() {
  return (
    <section id="partners" className="section container-custom">
      <SectionHeading
        align="center"
        eyebrow="Partenaires"
        title="Ils avancent avec nous"
        description="Institutions, entreprises et organisations de la société civile qui soutiennent nos actions au Tchad."
      />
      <div className="marquee reveal mt-12 py-4 [--marquee-duration:48s]" style={{ '--d': '120ms' } as React.CSSProperties}>
        <div className="marquee-track">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  )
}
