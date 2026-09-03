'use client'

import { useEffect } from 'react'

/**
 * Active les apparitions au défilement : ajoute `.is-in` aux éléments `.reveal`
 * quand ils entrent dans la fenêtre (une seule fois). Aucun coût de rendu React :
 * un seul IntersectionObserver pour toute la page, uniquement opacity/transform en CSS.
 */
export default function Reveal() {
  useEffect(() => {
    document.documentElement.classList.add('js')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])
  return null
}
