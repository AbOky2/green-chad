'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import Logo from '@/components/ui/Logo'
import { NAV_LINKS } from '@/lib/site'

const isActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/'
  if (href.startsWith('/#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const menuId = useId()

  // Ferme le menu mobile sur Échap (les liens le ferment au clic).
  useEffect(() => {
    if (open!) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70">
      <div className="container-custom flex h-16 items-center justify-between lg:h-20">
        <Logo priority />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-brand-100 text-brand-800' : 'text-ink-soft hover:bg-paper-2 hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/#contact" className="btn-primary ml-3 px-5! py-2.5!">
            Nous contacter
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden"
          onClick={() => setOpen((v) => v!)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id={menuId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <nav className="overflow-hidden" aria-label="Navigation mobile">
          <ul className="container-custom flex flex-col gap-1 border-t border-line/70 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    isActive(pathname, link.href) ? 'bg-brand-100 text-brand-800' : 'text-ink hover:bg-paper-2'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                Nous contacter
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
