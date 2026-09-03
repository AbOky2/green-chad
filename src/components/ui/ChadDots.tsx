import { CHAD_DOTS, CHAD_VIEWBOX, NDJAMENA } from '@/lib/chad-shape'

type Props = {
  className?: string
  /** Couleur des points (classe Tailwind `fill-*` ou `text-*` + currentColor). */
  dotClass?: string
  /** Affiche N'Djamena en point solaire qui pulse. */
  capital?: boolean
  title?: string
}

/**
 * Silhouette du Tchad en matrice de points (données Natural Earth), un seul <path>.
 * C'est le dispositif graphique du site : il remplace toute icône décorative.
 */
export default function ChadDots({ className = '', dotClass = 'fill-current', capital = true, title }: Props) {
  return (
    <svg viewBox={CHAD_VIEWBOX} className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path d={CHAD_DOTS} className={dotClass} />
      {capital && (
        <g>
          <circle cx={NDJAMENA.x} cy={NDJAMENA.y} r="7" className="pulse fill-sun/60" style={{ transformOrigin: `${NDJAMENA.x}px ${NDJAMENA.y}px` }} />
          <circle cx={NDJAMENA.x} cy={NDJAMENA.y} r="5" className="fill-sun" />
        </g>
      )}
    </svg>
  )
}
