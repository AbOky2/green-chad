import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Droplets, GraduationCap, Leaf, Sprout } from 'lucide-react'

import { SITE } from '@/lib/site'

const stats = [
  { value: '8', label: "domaines d'intervention" },
  { value: `${SITE.since}`, label: 'année de création' },
  { value: '100 %', label: 'équipe locale' },
]

const floating = [
  { Icon: Sprout, label: 'Environnement', className: '-left-3 top-[16%] sm:-left-8', delay: '0s' },
  { Icon: GraduationCap, label: 'Éducation', className: '-right-3 top-[42%] sm:-right-8', delay: '1.5s' },
  { Icon: Droplets, label: 'Eau & hygiène', className: '-left-3 bottom-[28%] sm:-left-6', delay: '3s' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh">
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" aria-hidden />

      <div className="container-custom relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <span className="animate-in inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-brand-800 shadow-soft backdrop-blur">
            <Leaf className="h-3.5 w-3.5 text-brand-600" />
            {SITE.recognition}
          </span>

          <h1 className="animate-in animate-in-delay-1 mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
            Ensemble pour un{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-sun-500 bg-clip-text text-transparent">
              Tchad vert
            </span>{' '}
            et prospère
          </h1>

          <p className="animate-in animate-in-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            Nous outillons les citoyens tchadiens pour relever le défi du développement durable et protéger notre environnement,
            à travers des actions concrètes sur le terrain.
          </p>

          <div className="animate-in animate-in-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#about" className="btn-primary">
              Découvrir notre mission
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#contact" className="btn-secondary">
              Nous contacter
            </Link>
          </div>

          <dl className="animate-in animate-in-delay-3 mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-last text-xs font-medium uppercase tracking-wider text-muted">{stat.label}</dt>
                <dd className="text-2xl font-bold text-ink sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="animate-in animate-in-delay-2 relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-band p-8 shadow-lift sm:aspect-square lg:aspect-[4/5]">
            <div className="absolute inset-0 bg-dots opacity-40" aria-hidden />
            <div className="relative flex h-full flex-col justify-between text-white">
              <p className="text-right text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">{SITE.name}</p>
              <div className="flex justify-center">
                <span className="relative h-40 w-40 overflow-hidden rounded-full bg-white p-2 shadow-lift ring-8 ring-white/15 sm:h-48 sm:w-48">
                  <Image src="/logo.jpg" alt={`Logo ${SITE.name}`} fill sizes="192px" priority className="rounded-full object-cover" />
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">Depuis {SITE.since}</p>
                  <p className="text-sm text-brand-200">au service des communautés</p>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">N&apos;Djamena</span>
              </div>
            </div>
          </div>

          {floating.map(({ Icon, label, className, delay }) => (
            <div
              key={label}
              className={`animate-float absolute ${className} flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 text-sm font-semibold text-ink shadow-lift backdrop-blur`}
              style={{ animationDelay: delay }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
