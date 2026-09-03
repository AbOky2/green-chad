import SectionHeading from '@/components/ui/SectionHeading'

type Domain = { title: string; text: string; span?: string; tone?: 'sun' | 'night' | 'leaf' }

const domains: Domain[] = [
  { title: 'Environnement', text: 'Protection de la biodiversité, reboisement et lutte contre le changement climatique.', span: 'md:col-span-2 md:row-span-2', tone: 'night' },
  { title: 'Éducation', text: 'Éducation pour tous, alphabétisation et sensibilisation scolaire.' },
  { title: 'Santé', text: 'Accès aux soins de base et campagnes de prévention.' },
  { title: 'Eau, hygiène et assainissement', text: 'Eau potable, infrastructures et promotion de l’hygiène.', span: 'md:col-span-2', tone: 'sun' },
  { title: 'Paix', text: 'Cohésion sociale et prévention des conflits.' },
  { title: 'Sécurité alimentaire', text: 'Agriculture durable et lutte contre la malnutrition.' },
  { title: 'Formation technique', text: 'Métiers et renforcement des capacités pour l’insertion professionnelle.', tone: 'leaf' },
  { title: 'Violences basées sur le genre', text: 'Protection des personnes vulnérables et lutte contre les VBG.' },
]

const tones = {
  night: 'bg-night text-ivory border-transparent [&_.n]:text-sun [&_p]:text-ivory/65',
  sun: 'bg-sun text-night border-transparent [&_.n]:text-night/50 [&_p]:text-night/75',
  leaf: 'bg-leaf text-ivory border-transparent [&_.n]:text-ivory/60 [&_p]:text-ivory/80',
}

export default function Domains() {
  return (
    <section id="domaines" className="section bg-ivory-2/60">
      <div className="container-custom">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Domaines d'intervention" title={<>Huit fronts, une seule ambition : un développement <span className="text-leaf-deep">durable</span></>} />
          <p className="reveal max-w-sm text-ink-soft lg:pb-2" style={{ '--d': '120ms' } as React.CSSProperties}>
            Nous intervenons là où les besoins sont les plus forts, avec une approche holistique qui relie environnement, éducation et santé.
          </p>
        </div>

        <ul className="mt-14 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-4">
          {domains.map((d, i) => (
            <li
              key={d.title}
              className={`reveal card card-hover group relative flex flex-col justify-between overflow-hidden p-6 sm:p-7 ${d.span ?? ''} ${d.tone ? tones[d.tone] : ''}`}
              style={{ '--d': `${(i % 4) * 70}ms` } as React.CSSProperties}
            >
              <span className="n display text-sm font-bold tracking-widest text-mute">{String(i + 1).padStart(2, '0')}</span>
              <div className="mt-10">
                <h3 className={`t-h3 ${d.span?.includes('row-span-2') ? 'sm:text-3xl' : ''}`}>{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{d.text}</p>
              </div>
              <span
                aria-hidden
                className={`absolute -bottom-10 -right-10 h-32 w-32 rounded-full transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-[1.6] ${
                  d.tone === 'night' ? 'bg-sun/15' : d.tone === 'sun' ? 'bg-night/10' : d.tone === 'leaf' ? 'bg-ivory/15' : 'bg-sun/15'
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
