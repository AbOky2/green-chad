type Props = {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}

export default function SectionHeading({ eyebrow, title, description, align = 'center', className = '' }: Props) {
  const centered = align === 'center'
  return (
    <div className={`reveal ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      <span className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</span>
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{description}</p>}
    </div>
  )
}
