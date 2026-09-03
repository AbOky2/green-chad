import Link from 'next/link'

import ChadDots from '@/components/ui/ChadDots'
import Logo from '@/components/ui/Logo'
import { NAV_LINKS, SITE, telHref } from '@/lib/site'

const socials = [
  { label: 'Facebook', href: SITE.socials.facebook },
  { label: 'TikTok', href: SITE.socials.tiktok },
  { label: 'LinkedIn', href: SITE.socials.linkedin },
]

const col = 'space-y-1 text-[15px] text-ivory/65'
const link = 'inline-block py-1 transition-colors hover:text-sun'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-ivory">
      <div className="dots-bg absolute inset-0 opacity-50" aria-hidden />
      <ChadDots className="pointer-events-none absolute -right-10 top-10 h-[420px] w-auto text-ivory/[0.06]" capital={false} />

      <div className="container-custom relative pt-20 lg:pt-28">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ivory/65">{SITE.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="badge border-white/15 text-ivory/80 hover:border-sun hover:text-sun">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="t-label mb-4 text-sun">Navigation</h3>
            <ul className={col}>
              {NAV_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="t-label mb-4 text-sun">Ressources</h3>
            <ul className={col}>
              <li><Link href="/blog" className={link}>Actualités</Link></li>
              <li><Link href="/documents" className={link}>Documents officiels</Link></li>
              <li><Link href="/admin" className={link}>Espace membres</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="t-label mb-4 text-sun">Contact</h3>
            <ul className={col}>
              <li className="py-1">{SITE.address}</li>
              <li><a href={`mailto:${SITE.email}`} className={`${link} break-all`}>{SITE.email}</a></li>
              {SITE.phones.map((phone) => (
                <li key={phone}><a href={telHref(phone)} className={link}>{phone}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <p className="display outline-text mt-20 select-none text-center text-[clamp(3.5rem,14vw,13rem)] font-bold leading-none tracking-tight" aria-hidden>
          GREEN-CHAD
        </p>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs font-semibold text-ivory/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <p>{SITE.recognition}</p>
        </div>
      </div>
    </footer>
  )
}
