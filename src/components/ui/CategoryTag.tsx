import { categoryChip, categoryLabel } from '@/lib/categories'

export default function CategoryTag({ value, className = '' }: { value: string; className?: string }) {
  return <span className={`chip ${categoryChip(value)} ${className}`}>{categoryLabel(value)}</span>
}
