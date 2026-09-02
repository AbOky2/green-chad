import SectionHeading from '@/components/ui/SectionHeading'

const activities = [
  { title: 'Environnement', description: 'Protection de la biodiversité, reboisement et lutte contre le changement climatique.' },
  { title: 'Éducation', description: 'Promotion de l’éducation pour tous, alphabétisation et sensibilisation scolaire.' },
  { title: 'Paix', description: 'Renforcement de la cohésion sociale et prévention des conflits communautaires.' },
  { title: 'Formation technique et professionnelle', description: 'Apprentissage de métiers et renforcement des capacités pour l’insertion socio-professionnelle.' },
  { title: 'Violences basées sur le genre', description: 'Lutte contre les VBG et protection des personnes vulnérables.' },
  { title: 'Santé', description: 'Amélioration de l’accès aux soins de base et campagnes de prévention sanitaire.' },
  { title: 'Eau, hygiène et assainissement', description: 'Accès à l’eau potable, infrastructures d’assainissement et promotion de l’hygiène.' },
  { title: 'Sécurité alimentaire', description: 'Soutien à l’agriculture durable et lutte contre la malnutrition.' },
]

export default function Activities() {
  return (
    <section id="activities" className="container-custom section pt-0 lg:pt-0">
      <SectionHeading number="02" eyebrow="Domaines d'intervention" title="Huit fronts pour un développement holistique" />

      <ol className="mt-12 border-b border-rule">
        {activities.map((a, i) => (
          <li key={a.title} className="index-row grid gap-2 border-t border-rule py-6 sm:grid-cols-12 sm:gap-6 lg:py-8">
            <span className="index-number text-2xl sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="t-h3 sm:col-span-4">{a.title}</h3>
            <p className="text-graphite sm:col-span-6 sm:col-start-7">{a.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
