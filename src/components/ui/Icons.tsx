/* Pictos utilitaires dessinés à la main : trait 1,5 px, 16 px, couleur courante. */
type IconProps = { className?: string }

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const ArrowRight = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
)

export const ArrowUpRight = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 12 12 4M5.5 4H12v6.5" />
  </svg>
)

export const ArrowDown = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
  </svg>
)

export const ArrowLeft = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
  </svg>
)

export const MenuIcon = ({ className }: IconProps) => (
  <svg {...base} width={20} height={20} viewBox="0 0 20 20" className={className}>
    <path d="M2 6h16M2 14h16" />
  </svg>
)

export const CloseIcon = ({ className }: IconProps) => (
  <svg {...base} width={20} height={20} viewBox="0 0 20 20" className={className}>
    <path d="M4 4l12 12M16 4 4 16" />
  </svg>
)

export const Spinner = ({ className }: IconProps) => (
  <svg {...base} className={`animate-spin ${className ?? ''}`}>
    <path d="M8 2.5a5.5 5.5 0 1 0 5.5 5.5" />
  </svg>
)
