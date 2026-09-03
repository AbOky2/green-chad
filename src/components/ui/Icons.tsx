/* Pictos utilitaires en SVG inline (trait 2 px, 18 px, couleur courante). */
type IconProps = { className?: string }

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const ArrowRight = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowUpRight = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const ArrowDown = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
)
export const ArrowLeft = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
)
export const Spinner = ({ className }: IconProps) => (
  <svg {...base} className={`animate-spin ${className ?? ''}`}><path d="M12 3a9 9 0 1 0 9 9" /></svg>
)
export const Plus = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M12 5v14M5 12h14" /></svg>
)
