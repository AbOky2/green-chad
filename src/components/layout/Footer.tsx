import Link from 'next/link'
import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

import Logo from '@/components/ui/Logo'
import { NAV_LINKS, SITE, telHref } from '@/lib/site'

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const socials = [
  { label: 'Facebook', href: SITE.socials.facebook, Icon: Facebook },
  { label: 'TikTok', href: SITE.socials.tiktok, Icon: TiktokIcon },
  { label: 'LinkedIn', href: SITE.socials.linkedin, Icon: Linkedin },
]

export default function Footer() {
  return (
    <footer className="border-t border-brand-900/30 bg-brand-950 text-brand-100">
      <div className="container-custom grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-5">
          <Logo light />
          <p className="max-w-sm text-sm leading-relaxed text-brand-200/90">{SITE.description}</p>
          <ul className="flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-800 text-brand-200 transition-colors hover:border-brand-400 hover:bg-brand-900 hover:text-white"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white">Navigation</h3>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white">Ressources</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/blog" className="transition-colors hover:text-white">Actualités &amp; articles</Link></li>
            <li><Link href="/documents" className="transition-colors hover:text-white">Documents officiels</Link></li>
            <li><Link href="/admin" className="transition-colors hover:text-white">Espace membres</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-400" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-400" />
              <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-white">{SITE.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-400" />
              <span className="flex flex-col gap-1">
                {SITE.phones.map((phone) => (
                  <a key={phone} href={telHref(phone)} className="transition-colors hover:text-white">{phone}</a>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-900">
        <div className="container-custom flex flex-col items-center justify-between gap-3 py-6 text-xs text-brand-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <p>{SITE.recognition}</p>
        </div>
      </div>
    </footer>
  )
}
