'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@/components/ui/Logo'
import { CloseIcon, MenuIcon } from '@/components/ui/Icons'
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

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper">
      <div className="container-custom flex h-[72px] items-center justify-between">
        <Logo priority />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`text-[15px] underline-offset-[6px] transition-colors hover:text-terre ${
                  active ? 'text-ink underline decoration-terre decoration-1' : 'text-graphite'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/#contact" className="btn-primary ml-2">
            Nous contacter
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-rule text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Menu mobile plein écran, fond encre */}
      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-0 z-[55] flex flex-col bg-ink text-paper lg:hidden"
      >
        <div className="container-custom flex h-[72px] items-center">
          <Logo light />
        </div>
        <nav className="container-custom flex flex-1 flex-col justify-center" aria-label="Navigation mobile">
          <ul className="divide-y divide-paper/15">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="serif flex items-baseline gap-4 py-4 text-4xl leading-none"
                >
                  <span className="text-sm text-paper/50 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#contact" onClick={close} className="btn-light mt-10 self-start">
            Nous contacter
          </Link>
        </nav>
      </div>
    </header>
  )
}
