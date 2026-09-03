'use client'

import { useEffect, useRef } from 'react'

type Props = { value: number; suffix?: string; prefix?: string; className?: string; duration?: number }

/** Compteur animé (requestAnimationFrame, une seule fois quand visible). Rendu serveur = valeur finale. */
export default function Counter({ value, suffix = '', prefix = '', className = '', duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - p, 4)
          el.textContent = `${prefix}${Math.round(eased * value).toLocaleString('fr-FR')}${suffix}`
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, suffix, prefix, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}
