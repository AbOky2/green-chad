import SectionHeading from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/site'

const points = [
  {
    lead: 'Mission.',
    text: 'Outiller les citoyens tchadiens pour leur permettre de relever efficacement le défi du développement durable.',
  },
  {
    lead: 'Vision.',
    text: "Protéger l'environnement et promouvoir les initiatives de la population orientées vers le développement durable.",
  },
  {
    lead: 'Statut.',
    text: `ONG nationale reconnue par l'${SITE.decree.charAt(0).toLowerCase()}${SITE.decree.slice(1)}, œuvrant pour l'intérêt général.`,
  },
]

export default function About() {
  return (
    <section id="about" className="container-custom section">
      <SectionHeading number="01" eyebrow="À propos" />

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="t-h2">Engagés pour le Tchad de demain</h2>
        </div>
        <div className="lg:col-span-8">
          <p className="t-lead max-w-2xl">
            L&apos;ONG Green-Chad est née de la volonté de préserver notre patrimoine naturel tout en favorisant le
            développement socio-économique des communautés.
          </p>
          <dl className="mt-10 divide-y divide-rule border-y border-rule">
            {points.map((p) => (
              <div key={p.lead} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
                <dt className="serif text-2xl italic text-terre sm:col-span-3">{p.lead}</dt>
                <dd className="text-graphite sm:col-span-9">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <blockquote className="serif mt-20 max-w-5xl text-3xl leading-[1.15] text-ink sm:text-4xl lg:mt-28 lg:text-5xl">
        « La protection de l&apos;environnement est <em>indissociable</em> du bien-être des populations. »
      </blockquote>
    </section>
  )
}
