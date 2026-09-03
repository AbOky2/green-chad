import ChadDots from '@/components/ui/ChadDots'
import ContactForm from './ContactForm'
import SectionHeading from '@/components/ui/SectionHeading'
import { SITE, telHref } from '@/lib/site'

const rows = [
  { label: 'Adresse', value: <span>{SITE.address}</span> },
  { label: 'Email', value: <a href={`mailto:${SITE.email}`} className="break-all underline decoration-sun/60 underline-offset-4 hover:decoration-sun">{SITE.email}</a> },
  {
    label: 'Téléphone',
    value: (
      <span className="flex flex-col gap-1">
        {SITE.phones.map((p) => (
          <a key={p} href={telHref(p)} className="underline decoration-sun/60 underline-offset-4 hover:decoration-sun">{p}</a>
        ))}
      </span>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section container-custom">
      <div className="relative overflow-hidden rounded-4xl bg-night px-6 py-14 text-ivory sm:px-10 lg:px-16 lg:py-20">
        <div className="dots-bg absolute inset-0 opacity-70" aria-hidden />
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgb(246_178_27/0.25),transparent)]" aria-hidden />
        <ChadDots className="pointer-events-none absolute -bottom-16 right-0 h-[380px] w-auto text-ivory/[0.05]" capital={false} />

        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              eyebrow="Contact"
              title={<>Une question, un projet, l&apos;envie de vous <span className="text-sun">engager</span> ?</>}
              description="Écrivez-nous, appelez-nous ou passez à nos bureaux. Nous répondons généralement sous 48 heures."
            />
            <dl className="reveal mt-10 divide-y divide-white/10 border-y border-white/10" style={{ '--d': '120ms' } as React.CSSProperties}>
              {rows.map((r) => (
                <div key={r.label} className="grid gap-1 py-4 sm:grid-cols-3">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ivory/50">{r.label}</dt>
                  <dd className="text-ivory/85 sm:col-span-2">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal lg:col-span-7" style={{ '--d': '160ms' } as React.CSSProperties}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
