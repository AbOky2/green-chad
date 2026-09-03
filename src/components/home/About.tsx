import Image from 'next/image'

import SectionHeading from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/site'

const pillars = [
  { n: '01', title: 'Mission', text: 'Outiller les citoyens tchadiens pour leur permettre de relever efficacement le défi du développement durable.' },
  { n: '02', title: 'Vision', text: "Protéger l'environnement et promouvoir les initiatives de la population orientées vers le développement durable." },
  { n: '03', title: 'Statut', text: `ONG nationale reconnue (${SITE.decree}), œuvrant pour l'intérêt général au service des communautés.` },
]

export default function About() {
  return (
    <section id="about" className="section container-custom">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="À propos"
            title={<>Engagés pour le Tchad de <span className="text-leaf-deep">demain</span></>}
            description="Green-Chad est née de la volonté de préserver notre patrimoine naturel tout en favorisant le développement socio-économique. Protéger l'environnement et améliorer la vie des populations sont, pour nous, un seul et même combat."
          />
          <div className="reveal mt-10 flex items-center gap-4 rounded-3xl bg-white p-4 shadow-float" style={{ '--d': '120ms' } as React.CSSProperties}>
            <Image src="/logo.jpg" alt="" width={56} height={56} className="h-14 w-14 rounded-2xl object-cover" />
            <div>
              <p className="font-bold">{SITE.name}</p>
              <p className="text-sm text-mute">Depuis {SITE.since} · {SITE.address}</p>
            </div>
          </div>
        </div>

        <ul className="grid gap-4 lg:col-span-7">
          {pillars.map((p, i) => (
            <li key={p.n} className="reveal card card-hover group flex gap-6 p-7 sm:p-8" style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              <span className="display shrink-0 text-3xl font-bold text-sun transition-colors group-hover:text-leaf">{p.n}</span>
              <div>
                <h3 className="t-h3">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
