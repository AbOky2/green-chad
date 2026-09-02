import { Briefcase, Droplets, GraduationCap, Handshake, HeartPulse, ShieldAlert, Sprout, Wheat } from 'lucide-react'

import SectionHeading from '@/components/ui/SectionHeading'

const activities = [
  { Icon: Sprout, title: "L'environnement", description: 'Protection de la biodiversité, reboisement et lutte contre le changement climatique.' },
  { Icon: GraduationCap, title: "L'éducation", description: 'Promotion de l’éducation pour tous, alphabétisation et sensibilisation scolaire.' },
  { Icon: Handshake, title: 'La paix', description: 'Renforcement de la cohésion sociale et prévention des conflits communautaires.' },
  { Icon: Briefcase, title: 'Formation technique', description: 'Apprentissage de métiers et renforcement des capacités pour l’insertion socio-professionnelle.' },
  { Icon: ShieldAlert, title: 'Violences basées sur le genre', description: 'Lutte contre les VBG et protection des personnes vulnérables.' },
  { Icon: HeartPulse, title: 'La santé', description: 'Amélioration de l’accès aux soins de base et campagnes de prévention sanitaire.' },
  { Icon: Droplets, title: 'Eau, hygiène et assainissement', description: 'Accès à l’eau potable, infrastructures d’assainissement et promotion de l’hygiène.' },
  { Icon: Wheat, title: 'Sécurité alimentaire', description: 'Soutien à l’agriculture durable et lutte contre la malnutrition.' },
]

export default function Activities() {
  return (
    <section id="activities" className="section bg-paper">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Nos domaines d'intervention"
          title="Des actions concrètes pour un impact réel"
          description="Nous intervenons sur plusieurs fronts pour assurer un développement holistique et durable."
        />

        <ul className="stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map(({ Icon, title, description }, i) => (
            <li key={title} className="reveal card card-hover group relative p-6" style={{ '--i': i } as React.CSSProperties}>
              <span className="absolute right-5 top-5 text-xs font-bold tabular-nums text-line transition-colors group-hover:text-brand-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
