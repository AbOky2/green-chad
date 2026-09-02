/** Règle graduée : motif décoratif unique du site (voir brief §8). */
export default function Ruler({ position = 'bottom', className = '' }: { position?: 'top' | 'bottom'; className?: string }) {
  return <div aria-hidden className={`ruler ${position === 'top' ? 'ruler-top' : ''} ${className}`} />
}
