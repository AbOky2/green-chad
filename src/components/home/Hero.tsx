import Link from 'next/link'

import ChadDots from '@/components/ui/ChadDots'
import Counter from '@/components/ui/Counter'
import { ArrowRight } from '@/components/ui/Icons'
import { SITE } from '@/lib/site'

const stats = [
  { value: 8, suffix: '', label: "domaines d'intervention" },
  { value: 15, suffix: '+', label: 'projets menés' },
  { value: 100, suffix: '%', label: 'équipe tchadienne' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-night text-ivory">
      <div className="dots-bg absolute inset-0" aria-hidden />
      {/* Halo solaire : un seul dégradé radial, discret, derrière la carte */}
      <div className="parallax-fade pointer-events-none absolute -right-40 top-1/3 h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(246_178_27/0.22),transparent)]" aria-hidden />

      <div className="container-custom relative grid min-h-[92svh] items-center gap-12 pb-20 pt-32 lg:grid-cols-12 lg:pb-24 lg:pt-40">
        <div className="lg:col-span-7">
          <span className="badge rise border-white/15 bg-white/5 text-ivory/85 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-sun" aria-hidden />
            {SITE.recognition}
          </span>

          <h1 className="t-hero rise mt-7" style={{ '--d': '40ms' } as React.CSSProperties}>
            Un Tchad <span className="text-leaf">vert</span>, prospère et&nbsp;résilient.
          </h1>

          <p className="t-lead rise mt-7 max-w-xl text-ivory/70" style={{ '--d': '90ms' } as React.CSSProperties}>
            Nous outillons les citoyens tchadiens pour relever le défi du développement durable : environnement, éducation,
            santé, paix, avec les communautés et sur le terrain.
          </p>

          <div className="rise mt-9 flex flex-wrap gap-3" style={{ '--d': '140ms' } as React.CSSProperties}>
            <Link href="/#domaines" className="btn-sun">
              Découvrir nos actions
              <ArrowRight />
            </Link>
            <Link href="/documents" className="btn-ghost-light">
              Documents officiels
            </Link>
          </div>

          <dl className="rise mt-14 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-8" style={{ '--d': '120ms' } as React.CSSProperties}>
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="t-num whitespace-nowrap text-ivory">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-2 text-xs font-semibold uppercase tracking-wider text-ivory/50">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-5">
          <div className="parallax-slow rise mx-auto max-w-[380px] lg:max-w-none" style={{ '--d': '100ms' } as React.CSSProperties}>
            <ChadDots className="h-auto w-full text-ivory/80 drop-shadow-[0_0_24px_rgb(246_178_27/0.15)]" title="Carte du Tchad — N'Djamena" />
          </div>
          <div className="rise absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-night/80 px-4 py-2 text-xs font-semibold text-ivory/80 backdrop-blur lg:bottom-8" style={{ '--d': '400ms' } as React.CSSProperties}>
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-sun align-middle" aria-hidden />
            Basés à N&apos;Djamena · actifs dans tout le pays
          </div>
        </div>
      </div>
    </section>
  )
}
