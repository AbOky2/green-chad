import { Mail, MapPin, Phone } from 'lucide-react'

import ContactForm from './ContactForm'
import { SITE, telHref } from '@/lib/site'

const items = [
  { Icon: MapPin, title: 'Notre adresse', content: <span>{SITE.address}</span> },
  {
    Icon: Mail,
    title: 'Email',
    content: (
      <a href={`mailto:${SITE.email}`} className="link-underline break-all">
        {SITE.email}
      </a>
    ),
  },
  {
    Icon: Phone,
    title: 'Téléphone',
    content: (
      <span className="flex flex-col gap-1">
        {SITE.phones.map((phone) => (
          <a key={phone} href={telHref(phone)} className="link-underline">
            {phone}
          </a>
        ))}
      </span>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden bg-paper">
      <div className="bg-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-custom relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal">
          <span className="eyebrow">Contactez-nous</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">Prêt à rejoindre le mouvement ?</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Une question, un projet, une envie de vous engager ? Écrivez-nous, appelez-nous ou passez nous voir à nos bureaux.
          </p>

          <ul className="mt-10 space-y-7">
            {items.map(({ Icon, title, content }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <div className="mt-1 text-ink-soft">{content}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal card p-6 sm:p-8 lg:p-10">
          <h3 className="text-2xl font-bold">Envoyez-nous un message</h3>
          <p className="mt-1 text-sm text-muted">Nous répondons généralement sous 48 heures.</p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
