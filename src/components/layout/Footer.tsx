import Link from 'next/link'

import Logo from '@/components/ui/Logo'
import Ruler from '@/components/ui/Ruler'
import { NAV_LINKS, SITE, telHref } from '@/lib/site'

const socials = [
  { label: 'Facebook', href: SITE.socials.facebook },
  { label: 'TikTok', href: SITE.socials.tiktok },
  { label: 'LinkedIn', href: SITE.socials.linkedin },
]

const col = 'space-y-1 text-sm text-paper/75'
const link = 'inline-block py-1 transition-colors hover:text-paper'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-custom py-16 lg:py-24">
        <p className="serif max-w-3xl text-4xl leading-[1.05] lg:text-6xl">
          Ensemble pour un Tchad <em>durable</em>.
        </p>

        <div className="mt-16 grid gap-12 border-t border-paper/15 pt-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/70">{SITE.description}</p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="t-label mb-5 text-paper/60">Navigation</h3>
            <ul className={col}>
              {NAV_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="t-label mb-5 text-paper/60">Ressources</h3>
            <ul className={col}>
              <li><Link href="/blog" className={link}>Actualités</Link></li>
              <li><Link href="/documents" className={link}>Documents officiels</Link></li>
              <li><Link href="/admin" className={link}>Espace membres</Link></li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>{s.label} ↗</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="t-label mb-5 text-paper/60">Contact</h3>
            <ul className={col}>
              <li>{SITE.address}</li>
              <li><a href={`mailto:${SITE.email}`} className={`${link} break-all`}>{SITE.email}</a></li>
              {SITE.phones.map((phone) => (
                <li key={phone}><a href={telHref(phone)} className={link}>{phone}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="t-label mt-16 flex flex-col gap-2 border-t border-paper/15 pt-6 text-paper/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>{SITE.recognition}</p>
        </div>
      </div>
      <Ruler position="bottom" className="opacity-20" />
    </footer>
  )
}
