type Props = {
  eyebrow: string
  title: React.ReactNode
  description?: string
  dark?: boolean
  align?: 'left' | 'center'
  className?: string
  children?: React.ReactNode
}

/** En-tête de section : badge « eyebrow », grand titre, chapô facultatif. */
export default function SectionHeading({ eyebrow, title, description, dark = false, align = 'left', className = '', children }: Props) {
  const center = align === 'center'
  return (
    <div className={`reveal ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'} ${className}`}>
      <span className={`badge ${dark ? 'border-white/15 text-sun' : 'border-ink/10 bg-white text-ink'}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-sun" aria-hidden />
        {eyebrow}
      </span>
      <h2 className={`t-h2 mt-5 ${dark ? 'text-ivory' : 'text-ink'}`}>{title}</h2>
      {description && <p className={`t-lead mt-5 ${dark ? 'text-ivory/70' : 'text-ink-soft'}`}>{description}</p>}
      {children}
    </div>
  )
}
