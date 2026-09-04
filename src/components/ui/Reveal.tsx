'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SAFETY_DELAY = 4000

const revealAll = () => {
  document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => el.classList.add('is-in'))
}

/**
 * Apparition des sections au défilement.
 *
 * Les éléments `.reveal` sont masqués par CSS puis révélés quand ils entrent dans la fenêtre.
 * Trois garde-fous évitent qu'un contenu reste invisible (page qui paraît blanche) :
 *  1. l'observateur est réarmé à chaque changement de page — sans cela, une navigation
 *     côté client laissait les nouvelles sections masquées jusqu'au rechargement ;
 *  2. un MutationObserver prend en charge les éléments ajoutés après coup (streaming, filtres) ;
 *  3. un délai de sécurité et le retour via l'historique révèlent tout, quoi qu'il arrive.
 */
export default function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.classList.add('js')

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      // Seuil à 0 : une section plus haute que l'écran doit apparaître dès son premier pixel.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )

    const observePending = () => {
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => observer.observe(el))
    }
    observePending()

    let frame = 0
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(observePending)
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    const safety = window.setTimeout(revealAll, SAFETY_DELAY)
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) revealAll()
    }
    window.addEventListener('pageshow', onPageShow)

    return () => {
      observer.disconnect()
      mutations.disconnect()
      cancelAnimationFrame(frame)
      window.clearTimeout(safety)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [pathname])

  return null
}
