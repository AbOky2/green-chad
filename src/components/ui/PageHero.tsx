type Props = {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
}

export default function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-band text-white">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="container-custom relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          {eyebrow && <span className="eyebrow text-brand-200! before:bg-brand-300!">{eyebrow}</span>}
          <h1 className="animate-in mt-3 text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="animate-in animate-in-delay-1 mt-5 text-lg leading-relaxed text-brand-100">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
