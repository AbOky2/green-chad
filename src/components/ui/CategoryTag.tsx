import { categoryDot, categoryLabel } from '@/lib/categories'

export default function CategoryTag({ value, className = '' }: { value: string; className?: string }) {
  return (
    <span className={`t-label inline-flex items-center gap-2 text-stone ${className}`}>
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${categoryDot(value)}`} />
      {categoryLabel(value)}
    </span>
  )
}
