type Props = {
  number?: string
  eyebrow: string
  title: React.ReactNode
  description?: string
  children?: React.ReactNode
}

/** Tête de page intérieure : fond papier, grand titre serif, chapô, sommaire optionnel. */
export default function PageHeader({ number, eyebrow, title, description, children }: Props) {
  return (
    <header className="container-custom pt-14 lg:pt-24">
      <p className="t-label flex items-center gap-3 text-terre">
        {number && <span className="index-number text-base">{number}</span>}
        <span aria-hidden className="h-px w-6 bg-terre/60" />
        {eyebrow}
      </p>
      <h1 className="t-h1 rise mt-6 max-w-4xl">{title}</h1>
      {description && <p className="t-lead rise rise-1 mt-6 max-w-2xl">{description}</p>}
      {children}
      <div className="rule mt-12" />
    </header>
  )
}
