import Image from 'next/image'

import SectionHeading from '@/components/ui/SectionHeading'

type Member = { name: string; role: string; image: string }

const coordinator: Member = { name: 'Abdallah Soumaine', role: 'Coordinateur national', image: '/coordo.jpg' }

const members: Member[] = [
  { name: 'Payang Kana', role: 'Chargé de programme', image: '/membre2.jpg' },
  { name: 'Safia Mahamat Souleymane', role: 'Responsable administrative et financière', image: '/membre4.jpg' },
  { name: 'Fahad Azarak', role: 'Chargé des partenariats', image: '/membre1.jpg' },
  { name: 'Amandine Memndigngar', role: 'Chargée de programme adjointe', image: '/membre7.jpg' },
  { name: 'Mahamat Adoum Abdoulaye', role: 'Chargé de communication', image: '/membre3.jpg' },
  { name: 'Zakaria Youssouf', role: 'Responsable de mobilisation', image: '/membre5.jpg' },
  { name: 'Karim Moussa', role: 'Chargé des agents de terrain', image: '/membre6.jpg' },
  { name: 'Abdelkerim Abbas Abdelkerim', role: 'Responsable logistique', image: '/membreNew.jpg' },
]

function MemberCard({ m, i, lead = false }: { m: Member; i: number; lead?: boolean }) {
  return (
    <li className={`reveal card card-hover group overflow-hidden ${lead ? 'col-span-2 md:flex' : ''}`} style={{ '--d': `${(i % 4) * 80}ms` } as React.CSSProperties}>
      <div className={`relative overflow-hidden bg-ivory-2 ${lead ? 'aspect-[4/3] md:aspect-auto md:w-1/2' : 'aspect-[4/5]'}`}>
        <Image
          src={m.image}
          alt={`Portrait de ${m.name}`}
          fill
          sizes={lead ? '(max-width: 768px) 100vw, 320px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px'}
          loading="lazy"
          className="object-cover object-top transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
        />
      </div>
      <div className={`p-3.5 sm:p-5 ${lead ? 'flex flex-col justify-center md:w-1/2 md:p-8' : ''}`}>
        {lead && <span className="badge mb-4 w-fit border-transparent bg-sun/20 text-amber-800">Coordination</span>}
        <h3 className={lead ? 't-h3 sm:text-2xl' : 'text-sm font-bold leading-snug sm:text-base'}>{m.name}</h3>
        <p className={`mt-1 text-xs sm:text-sm ${lead ? 'text-ink-soft' : 'text-mute'}`}>{m.role}</p>
      </div>
    </li>
  )
}

export default function Team() {
  return (
    <section id="team" className="section bg-ivory-2/60">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Équipe"
          title="Des femmes et des hommes engagés sur le terrain"
          description="Une équipe tchadienne, ancrée dans les communautés, qui porte chaque projet du diagnostic à l'évaluation."
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <MemberCard m={coordinator} i={0} lead />
          {members.map((m, i) => (
            <MemberCard key={m.name} m={m} i={i + 1} />
          ))}
        </ul>
      </div>
    </section>
  )
}
