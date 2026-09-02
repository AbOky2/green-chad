type Props = {
  number: string
  eyebrow: string
  title?: string
  children?: React.ReactNode
  className?: string
}

/** En-tête de section : filet pleine largeur, numéro + eyebrow en terre, titre serif. */
export default function SectionHeading({ number, eyebrow, title, children, className = '' }: Props) {
  return (
    <div className={`rule pt-5 ${className}`}>
      <p className="t-label flex items-center gap-3 text-terre">
        <span className="index-number text-base">{number}</span>
        <span aria-hidden className="h-px w-6 bg-terre/60" />
        {eyebrow}
      </p>
      {title && <h2 className="t-h2 mt-6 max-w-3xl">{title}</h2>}
      {children}
    </div>
  )
}
