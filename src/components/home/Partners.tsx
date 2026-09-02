const partners = [
  { name: 'IUSAH', description: 'Institut Universitaire' },
  { name: 'Partenaire 2', description: 'À venir' },
  { name: 'Partenaire 3', description: 'À venir' },
  { name: 'Partenaire 4', description: 'À venir' },
]

export default function Partners() {
  return (
    <section id="partners" className="border-y border-line bg-paper-2/60 py-14">
      <div className="container-custom">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted">Ils nous font confiance</p>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {partners.map((partner, i) => (
            <li
              key={partner.name}
              className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-4 py-6 text-center ${
                i === 0 ? 'border-solid bg-white shadow-soft' : 'opacity-70'
              }`}
            >
              <span className={`text-xl font-extrabold tracking-tight ${i === 0 ? 'text-ink' : 'text-muted'}`}>{partner.name}</span>
              <span className="mt-1 text-xs text-muted">{partner.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
