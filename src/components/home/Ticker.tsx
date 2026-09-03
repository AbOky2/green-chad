const items = ['Environnement', 'Éducation', 'Paix', 'Formation technique', 'Violences basées sur le genre', 'Santé', 'Eau, hygiène et assainissement', 'Sécurité alimentaire']

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="display flex items-center gap-6 pr-6 text-lg font-semibold tracking-tight text-night/85 sm:text-xl">
          {item}
          <span className="h-2 w-2 rounded-full bg-night/30" aria-hidden />
        </li>
      ))}
    </ul>
  )
}

/** Ruban des domaines : défilement continu sur fond solaire, entre le hero et la suite. */
export default function Ticker() {
  return (
    <div className="marquee border-y border-night/10 bg-sun py-4 [--marquee-bg:var(--color-sun)] [--marquee-duration:32s]" aria-label="Nos domaines d'intervention">
      <div className="marquee-track">
        <Track />
        <Track hidden />
      </div>
    </div>
  )
}
