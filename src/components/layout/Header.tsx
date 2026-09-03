'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@/components/ui/Logo'
import { ArrowUpRight } from '@/components/ui/Icons'
import { NAV_LINKS, SITE, telHref } from '@/lib/site'

const isActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/'
  if (href.startsWith('/#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Barre flottante en pilule : transparente sur le hero sombre de l'accueil,
 * puis fond flouté + ombre dès que la page défile. Burger animé → menu plein écran en cascade.
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const menuId = useId()
  const onDark = pathname === '/' && !scrolled

  useEffect(() => {
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > 24)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
  const textTone = onDark ? 'text-ivory/80 hover:text-ivory' : 'text-ink-soft hover:text-ink'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`nav-pill container-custom flex items-center justify-between rounded-full border ${
          scrolled
            ? 'border-ink/8 bg-ivory/85 py-2 shadow-float backdrop-blur-xl supports-[backdrop-filter]:bg-ivory/70'
            : 'border-transparent bg-transparent py-3'
        }`}
      >
        <Logo priority light={onDark} className="relative z-[60]" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${textTone} ${
                  active ? (onDark ? 'bg-white/10 text-ivory' : 'bg-ink/6 text-ink') : ''
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/#contact" className="btn-sun ml-3 h-11 px-5">
            Nous contacter
          </Link>
        </nav>

        <button
          type="button"
          className={`relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
            open ? 'border-white/20 text-ivory' : onDark ? 'border-white/20 text-ivory' : 'border-ink/12 bg-white text-ink'
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span className={`burger ${open ? 'is-open' : ''}`} aria-hidden>
            <span /><span /><span />
          </span>
        </button>
      </div>

      {/* Menu mobile plein écran */}
      <div id={menuId} className={`menu-overlay fixed inset-0 z-[55] flex flex-col bg-night text-ivory lg:hidden ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="dots-bg absolute inset-0 opacity-60" aria-hidden />
        <nav className="container-custom relative flex flex-1 flex-col justify-center pt-24" aria-label="Navigation mobile">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="menu-item" style={{ '--i': i } as React.CSSProperties}>
                <Link
                  href={link.href}
                  onClick={close}
                  tabIndex={open ? 0 : -1}
                  className="display group flex items-center justify-between border-b border-white/10 py-4 text-4xl font-bold tracking-tight sm:text-5xl"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-6 w-6 text-sun opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-item mt-10 flex flex-wrap items-center gap-4" style={{ '--i': NAV_LINKS.length } as React.CSSProperties}>
            <Link href="/#contact" onClick={close} tabIndex={open ? 0 : -1} className="btn-sun">
              Nous contacter
            </Link>
            <a href={telHref(SITE.phones[0])} tabIndex={open ? 0 : -1} className="text-sm font-semibold text-ivory/70 hover:text-ivory">
              {SITE.phones[0]}
            </a>
          </div>
        </nav>
        <p className="menu-item container-custom relative pb-8 text-xs font-semibold uppercase tracking-widest text-ivory/40" style={{ '--i': NAV_LINKS.length + 1 } as React.CSSProperties}>
          {SITE.recognition}
        </p>
      </div>
    </header>
  )
}
