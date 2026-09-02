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

function Portrait({ member, size }: { member: Member; size: number }) {
  return (
    <span className="relative shrink-0 overflow-hidden rounded-full border border-rule" style={{ width: size, height: size }}>
      <Image
        src={member.image}
        alt={`Portrait de ${member.name}`}
        fill
        sizes={`${size}px`}
        loading="lazy"
        className="portrait object-cover"
      />
    </span>
  )
}

export default function Team() {
  return (
    <section id="team" className="container-custom section pt-0 lg:pt-0">
      <SectionHeading number="04" eyebrow="Équipe" title="Des femmes et des hommes engagés sur le terrain" />

      <div className="portrait-hover mt-12 flex items-center gap-6 border-y border-rule py-8 sm:gap-10">
        <Portrait member={coordinator} size={160} />
        <div>
          <p className="t-label text-terre">Coordination</p>
          <h3 className="t-h3 mt-2">{coordinator.name}</h3>
          <p className="mt-1 text-graphite">{coordinator.role}</p>
        </div>
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
        {members.map((m, i) => (
          <li
            key={m.name}
            className={`portrait-hover flex flex-col gap-5 border-b border-rule py-8 pr-6 ${i % 4 !== 0 ? 'lg:border-l lg:pl-6' : ''} ${i % 2 !== 0 ? 'sm:border-l sm:pl-6 lg:pl-6' : ''}`}
          >
            <Portrait member={m} size={112} />
            <div>
              <h3 className="text-lg font-semibold leading-snug">{m.name}</h3>
              <p className="mt-1 text-sm text-stone">{m.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
