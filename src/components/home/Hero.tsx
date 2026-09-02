import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from '@/components/ui/Icons'
import Ruler from '@/components/ui/Ruler'
import { SITE } from '@/lib/site'

const figures = [
  { value: '08', label: "domaines d'intervention" },
  { value: String(SITE.since), label: 'année de création' },
  { value: '100 %', label: 'équipe tchadienne' },
]

export default function Hero() {
  return (
    <section className="container-custom pt-14 lg:pt-24">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="t-label rise text-terre">
            ONG nationale · N&apos;Djamena, Tchad · depuis {SITE.since}
          </p>
          <h1 className="t-display rise rise-1 mt-8">
            Outiller les citoyens tchadiens pour un développement <em>durable</em>.
          </h1>
          <p className="t-lead rise rise-2 mt-8 max-w-xl">
            Environnement, éducation, santé, paix : nous agissons sur le terrain, avec les communautés, pour un Tchad qui
            protège ses ressources et ses habitants.
          </p>
          <div className="rise rise-3 mt-10 flex flex-wrap gap-3">
            <Link href="/#about" className="btn-primary">
              Découvrir notre mission
              <ArrowRight />
            </Link>
            <Link href="/documents" className="btn-secondary">
              Documents officiels
            </Link>
          </div>
        </div>

        <div className="rise rise-2 lg:col-span-5">
          <figure className="flex aspect-square items-center justify-center border border-rule bg-paper-2/40 p-10 lg:mx-auto lg:max-w-[420px]">
            <span className="relative h-3/5 w-3/5">
              <Image src="/logo.jpg" alt={`Emblème de ${SITE.name}`} fill sizes="(max-width: 1024px) 60vw, 250px" priority className="rounded-full object-cover" />
            </span>
          </figure>
          <dl className="mt-8 grid grid-cols-3 divide-x divide-rule border-y border-rule lg:mx-auto lg:max-w-[420px]">
            {figures.map((f) => (
              <div key={f.label} className="flex flex-col px-4 py-5 first:pl-0 last:pr-0">
                <dd className="t-figure order-1 text-ink">{f.value}</dd>
                <dt className="t-label order-2 mt-3 text-stone">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Ruler className="mt-20 lg:mt-28" />
    </section>
  )
}
