import Image from 'next/image'
import { Award, Eye, Target } from 'lucide-react'

import { SITE } from '@/lib/site'

const features = [
  {
    Icon: Target,
    title: 'Notre mission',
    description: 'Outiller les citoyens tchadiens pour leur permettre de relever efficacement le défi du développement durable.',
    tone: 'bg-brand-100 text-brand-700',
  },
  {
    Icon: Eye,
    title: 'Notre vision',
    description: "Protéger l'environnement et promouvoir les initiatives de la population orientées vers le développement durable.",
    tone: 'bg-sky-100 text-sky-700',
  },
  {
    Icon: Award,
    title: 'Notre statut',
    description: `ONG nationale reconnue (${SITE.decree}), œuvrant pour l'intérêt général.`,
    tone: 'bg-amber-100 text-amber-700',
  },
]

const bars = [40, 65, 45, 80, 60, 90]

export default function About() {
  return (
    <section id="about" className="section relative overflow-hidden bg-white">
      <div className="container-custom grid items-center gap-16 lg:grid-cols-2">
        <div className="reveal">
          <span className="eyebrow">À propos de nous</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">Engagés pour le Tchad de demain</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            L&apos;ONG Green-Chad est née de la volonté de préserver notre patrimoine naturel tout en favorisant le
            développement socio-économique. Nous croyons que la protection de l&apos;environnement est indissociable du
            bien-être des populations.
          </p>

          <ul className="mt-10 space-y-6">
            {features.map(({ Icon, title, description, tone }) => (
              <li key={title} className="flex gap-4">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tone}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-ink-soft">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-mesh opacity-80 blur-2xl" aria-hidden />
          <div className="relative grid grid-cols-2 gap-4">
            <div className="card col-span-2 overflow-hidden p-6">
              <div className="flex items-start justify-between">
                <span className="relative h-12 w-12 overflow-hidden rounded-2xl">
                  <Image src="/logo.jpg" alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span className="chip bg-brand-100 text-brand-800">Depuis {SITE.since}</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold">Impact global</h3>
              <p className="mt-1 text-sm text-ink-soft">Une approche holistique pour un Tchad vert.</p>
              <div className="mt-6 flex h-16 items-end gap-2" aria-hidden>
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-brand-600 to-brand-300 transition-all duration-500 hover:from-sun-500 hover:to-sun-400"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="card p-6">
              <p className="text-4xl font-bold text-brand-700">15+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Projets actifs</p>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-paper-2">
                <div className="h-full w-3/4 rounded-full bg-brand-500" />
              </div>
            </div>

            <div className="card flex flex-col justify-between bg-brand-900 p-6 text-white">
              <span className="flex h-2.5 w-2.5 rounded-full bg-sun-400 shadow-[0_0_0_4px_rgb(251_191_36/0.25)]" aria-hidden />
              <div>
                <p className="text-lg font-bold">100 % local</p>
                <p className="mt-1 text-sm text-brand-200">Une équipe tchadienne engagée sur le terrain.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
