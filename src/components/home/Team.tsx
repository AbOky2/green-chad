import Image from 'next/image'

import SectionHeading from '@/components/ui/SectionHeading'

type Member = { name: string; role: string; image: string }

const coordinator: Member = { name: 'Abdallah Soumaine', role: 'Coordinateur National', image: '/coordo.jpg' }

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

function MemberCard({ member, lead = false, index = 0 }: { member: Member; lead?: boolean; index?: number }) {
  return (
    <li
      className={`reveal card card-hover flex flex-col items-center p-6 text-center ${lead ? 'border-brand-200 bg-gradient-to-b from-brand-50 to-white sm:px-10' : ''}`}
      style={{ '--i': index } as React.CSSProperties}
    >
      <span className={`relative overflow-hidden rounded-full ring-4 ${lead ? 'h-36 w-36 ring-brand-400' : 'h-28 w-28 ring-paper-2'}`}>
        <Image
          src={member.image}
          alt={`Portrait de ${member.name}`}
          fill
          sizes={lead ? '144px' : '112px'}
          loading="lazy"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </span>
      <h3 className={`mt-5 font-bold ${lead ? 'text-xl' : 'text-base'}`}>{member.name}</h3>
      <p className={`mt-1 text-sm ${lead ? 'font-semibold text-brand-700' : 'text-muted'}`}>{member.role}</p>
    </li>
  )
}

export default function Team() {
  return (
    <section id="team" className="section bg-white">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Organisation"
          title="Une équipe engagée"
          description="Des passionnés mobilisés pour la préservation de l'environnement et le développement durable au Tchad."
        />

        <ul className="mx-auto mt-14 flex max-w-sm justify-center">
          <MemberCard member={coordinator} lead />
        </ul>

        <ul className="stagger mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
