import ContactForm from './ContactForm'
import SectionHeading from '@/components/ui/SectionHeading'
import { SITE, telHref } from '@/lib/site'

export default function Contact() {
  return (
    <section id="contact" className="container-custom section pt-0 lg:pt-0">
      <SectionHeading number="06" eyebrow="Contact" title="Une question, un projet, l'envie de vous engager ?" />

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="t-lead">Écrivez-nous, appelez-nous ou passez à nos bureaux. Nous répondons généralement sous 48 heures.</p>
          <dl className="mt-10 divide-y divide-rule border-y border-rule">
            <div className="grid gap-1 py-5 sm:grid-cols-3">
              <dt className="t-label text-stone">Adresse</dt>
              <dd className="sm:col-span-2">{SITE.address}</dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-3">
              <dt className="t-label text-stone">Email</dt>
              <dd className="sm:col-span-2">
                <a href={`mailto:${SITE.email}`} className="link-quiet break-all">{SITE.email}</a>
              </dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-3">
              <dt className="t-label text-stone">Téléphone</dt>
              <dd className="flex flex-col gap-1 sm:col-span-2">
                {SITE.phones.map((phone) => (
                  <a key={phone} href={telHref(phone)} className="link-quiet">{phone}</a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
