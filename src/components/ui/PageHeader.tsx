type Props = { eyebrow: string; title: React.ReactNode; description?: string; children?: React.ReactNode }

/** Tête de page intérieure : bloc sombre arrondi sous la barre flottante. */
export default function PageHeader({ eyebrow, title, description, children }: Props) {
  return (
    <header className="container-custom pt-24 sm:pt-28">
      <div className="relative overflow-hidden rounded-4xl bg-night px-6 py-12 text-ivory sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="dots-bg absolute inset-0 opacity-70" aria-hidden />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(246_178_27/0.25),transparent)]" aria-hidden />
        <div className="relative max-w-3xl">
          <span className="badge rise border-white/15 bg-white/5 text-ivory/85">
            <span className="h-1.5 w-1.5 rounded-full bg-sun" aria-hidden />
            {eyebrow}
          </span>
          <h1 className="t-h1 rise mt-6" style={{ '--d': '80ms' } as React.CSSProperties}>{title}</h1>
          {description && <p className="t-lead rise mt-5 text-ivory/70" style={{ '--d': '160ms' } as React.CSSProperties}>{description}</p>}
        </div>
        {children && <div className="relative mt-8 rise" style={{ '--d': '240ms' } as React.CSSProperties}>{children}</div>}
      </div>
    </header>
  )
}
